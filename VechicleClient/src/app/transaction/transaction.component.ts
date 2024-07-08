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
import { TransactionViewComponent } from './transaction-view.component';
import { ConfirmDialogComponent } from '../confirm-dialog-component/confirm-dialog-component.component';
import { TranslateService } from '@ngx-translate/core'

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
  public translatedTransactionTypes: string[] = [];

  public selectedTransactionType: string = "All";
  title : string = "Transaction"




  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  filterTextChanged: Subject<string> = new Subject<string>()

  constructor(
    private transactionService: TransactionService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private translateService:TranslateService
  
  ) { }
  ngOnInit() {
    this.loadData();
    this.translateTransactionTypes()
  }

  translateTransactionTypes() {
    this.translatedTransactionTypes = this.transactionTypes.map(type => this.translateService.instant(type));
    this.selectedTransactionType = this.translatedTransactionTypes[0]; // Initialize with the translated 'All'
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

    //let selectedType = this.selectedTransactionType !== this.translateService.instant('others.all') ? this.selectedTransactionType : null;
    let selectedType = this.selectedTransactionType !== this.translateService.instant('All') ? this.selectedTransactionType : null;


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
      width: '70%',
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
  onRead(id?: number): void{
    const dialogRef = this.dialog.open(TransactionViewComponent, {
      width: '40%',
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

      onDelete( id:number) {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
          width: '40%',
          data: {title: this.title},
        });
      
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.transactionService.delete(id).subscribe({
              next: () => {
                this.toastr.error('Transaction Deleted Successfully');
                this.loadData();
              },
              error: (err) => console.log(err),
            });
          }
        });
      }
}
