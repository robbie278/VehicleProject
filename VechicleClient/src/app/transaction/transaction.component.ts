import { Component, OnInit, ViewChild } from '@angular/core';;
import { ToastrService } from 'ngx-toastr';
import { TransactionService } from '../Service/transaction.service';
import { Transaction } from '../Models/Transaction';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { TransactionEditComponent } from './transaction-edit.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.scss',
})
export class TransactionComponent implements OnInit {
  public displayedColumns: string[] = [
    'index',
    'transactionType',
    'itemName',
    'storeName',
    'storeKeeperName',
    'quantity',
    'action',
  ];
  public transactions!: MatTableDataSource<Transaction>;
  defaultPageIndex: number = 0;
  defaultPageSize: number = 10;
  public defaultSortColumn: string = "itemName";
  public defaultSortOrder: "asc" | "desc" = "asc";
  defaultFilterColumn: string = "itemName";
  filterQuery?: string;
  public transactionTypes: string[] = ["All", "Issue", "Receipt", "Damaged", "Return"];
  public selectedTransactionType: string = "All";



  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  filterTextChanged: Subject<string> = new Subject<string>()

  constructor(
    private transactionService: TransactionService,
    private toastr: ToastrService,
    private dialog: MatDialog,
  
  ) { }
  ngOnInit() {
    this.loadData();
  }


  onFilterTextChanged(filterText: string) {
    if (!this.filterTextChanged.observed) {
      this.filterTextChanged.pipe(debounceTime(1000), distinctUntilChanged()).subscribe(query => {
        this.loadData(query)
      })
    }
    this.filterTextChanged.next(filterText)
  }
  onTransactionTypeChanged() {
    this.loadData();
  }
  loadData(query?: string) {
    var pageEvent = new PageEvent();
    pageEvent.pageIndex = this.defaultPageIndex;
    pageEvent.pageSize = this.defaultPageSize;
    this.filterQuery = query;
    this.getData(pageEvent);
  }
  
  getData(event: PageEvent) {
    var sortColumn = (this.sort) ? this.sort.active : this.defaultSortColumn
    var sortOrder = (this.sort) ? this.sort.direction : this.defaultSortOrder
    var filterColumn = (this.filterQuery) ? this.defaultFilterColumn : null
    var filterQuery = (this.filterQuery) ? this.filterQuery : null

    let selectedType = this.selectedTransactionType !== "All" ? this.selectedTransactionType : null;

    this.transactionService.getData2(event.pageIndex, event.pageSize, sortColumn, sortOrder,
      filterColumn, filterQuery, selectedType).subscribe({
        next: (result) => {
          this.paginator.length = result.totalCount;
          this.paginator.pageIndex = result.pageIndex;
          this.paginator.pageSize = result.pageSize;
          this.transactions = new MatTableDataSource<Transaction>(result.data);
        },
        error: (error) => console.error(error)
      });

  }


  openDialog(id?: number): void {
    const dialogRef = this.dialog.open(TransactionEditComponent, {
      width: '60%',
      disableClose: true,
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      data: { id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadData();
      }
    });
  }

  onDelete(id:number){
    if(confirm("Are you sure to delete this Item")){
  
    this.transactionService.delete(id).subscribe({
    next: () => {
      this.toastr.error("Item Deleted Successfully")
      location.reload()
      },
    error: (err) => console.log(err)
    })
    }
      }
}
