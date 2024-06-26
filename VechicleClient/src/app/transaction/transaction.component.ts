import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TransactionService } from '../Service/transaction.service';
import { Transaction } from '../Models/Transaction';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';

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
  public defaultSortColumn: string = "transactionType";
  public defaultSortOrder: "asc" | "desc" = "asc";
  defaultFilterColumn: string = "transactionType";
  filterQuery?: string;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  filterTextChanged: Subject<string> = new Subject<string>()

  constructor(
    private transactionService: TransactionService,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
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

    this.transactionService.getData2(event.pageIndex, event.pageSize, sortColumn, sortOrder,
      filterColumn, filterQuery).subscribe({
        next: (result) => {
          this.paginator.length = result.totalCount;
          this.paginator.pageIndex = result.pageIndex;
          this.paginator.pageSize = result.pageSize;
          this.transactions = new MatTableDataSource<Transaction>(result.data);
        },
        error: (error) => console.error(error)
      });

  }

  onDelete() {
    // retrieve the ID from the 'id' parameter
    var idParam = this.activatedRoute.snapshot.paramMap.get('id');
    var id = idParam ? +idParam : 0;

    if (confirm('Are you sure to delete this Item')) {
      this.transactionService.delete(id).subscribe({
        next: () => {
          this.toastr.error('Transaction Deleted Successfully');
          this.router.navigate(['/transactions']);
        },
        error: (err) => console.log(err),
      });
    }
  }
  
}
