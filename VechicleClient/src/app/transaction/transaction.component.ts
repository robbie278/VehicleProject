import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Transaction } from '../Models/Transaction';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { TransactionEditComponent } from './transaction-edit.component';
import { MatDialog } from '@angular/material/dialog';
import { TransactionViewComponent } from './transaction-view.component';
import { ConfirmDialogComponent } from '../confirm-dialog-component/confirm-dialog-component.component';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '../Models/store';
import { Item } from '../Models/item';
import { TransactionService } from '../services/transaction.service';
import { MatMenuTrigger } from '@angular/material/menu';

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
  public defaultSortColumn: string = 'itemName';
  public defaultSortOrder: 'asc' | 'desc' = 'asc';
  defaultFilterColumn: string = 'itemName';
  filterQuery?: string;
  public transactionTypes: string[] = ['Issue', 'Receipt', 'Damaged', 'Return'];
  public selectedTransactionTypes: string[] = [];
  public translatedTransactionTypes: string[] = [];

  public selectedTransactionType: string = 'All';
  title: string = 'Transaction';
  stores?: Store[];
  items?: Item[];
  storeId?: number;
  itemId?: number;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  filterTextChanged: Subject<string> = new Subject<string>();

  constructor(
    private transactionService: TransactionService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private translateService: TranslateService
  ) {}
  ngOnInit() {
    this.loadData();
    this.loadStores();
    this.loadItems();
    this.translateTransactionTypes();
  }

  loadStores() {
    this.transactionService
      .getStore()
      .subscribe((data) => (this.stores = data.data));
  }

  loadItems() {
    this.transactionService
      .getItem()
      .subscribe((data) => (this.items = data.data));
  }

  onStoreOrItemChange() {
    this.loadData();
  }

  translateTransactionTypes() {
    this.translatedTransactionTypes = this.transactionTypes.map((type) =>
      this.translateService.instant(type)
    );
    this.selectedTransactionType = this.translatedTransactionTypes[0]; // Initialize with the translated 'All'
  }

  onFilterTextChanged(filterText: string) {
    if (!this.filterTextChanged.observed) {
      this.filterTextChanged
        .pipe(debounceTime(1000), distinctUntilChanged())
        .subscribe((query) => {
          this.loadData(query);
        });
    }
    this.filterTextChanged.next(filterText);
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
    var sortColumn = this.sort ? this.sort.active : this.defaultSortColumn;
    var sortOrder = this.sort ? this.sort.direction : this.defaultSortOrder;
    var filterColumn = this.filterQuery ? this.defaultFilterColumn : null;
    var filterQuery = this.filterQuery ? this.filterQuery : null;

    // Update filter logic to include multiple transaction types
    let selectedTypes = this.selectedTransactionTypes.length
      ? this.selectedTransactionTypes
      : null;

    this.transactionService
      .getData2(
        event.pageIndex,
        event.pageSize,
        sortColumn,
        sortOrder,
        filterColumn,
        filterQuery,
        selectedTypes, // Pass the selected types
        this.itemId,
        this.storeId
      )
      .subscribe({
        next: (result) => {
          this.paginator.length = result.totalCount;
          this.paginator.pageIndex = result.pageIndex;
          this.paginator.pageSize = result.pageSize;
          this.transactions = new MatTableDataSource<Transaction>(result.data);
        },
        error: (error) => console.error(error),
      });
  }

  onTransactionTypesChanged() {
    this.loadData();
  }

  openDialog(id?: number): void {
    const dialogRef = this.dialog.open(TransactionEditComponent, {
      width: '70%',
      disableClose: true,
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      data: { id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadData();
      }
    });
  }
  onRead(id?: number): void {
    const dialogRef = this.dialog.open(TransactionViewComponent, {
      width: '40%',
      disableClose: true,
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      data: { id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadData();
      }
    });
  }

  onDelete(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '40%',
      data: { title: this.title },
    });

    dialogRef.afterClosed().subscribe((result) => {
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

  clearSelections() {
    this.selectedTransactionTypes = [];
    this.storeId = undefined;
    this.itemId = undefined;
    this.onStoreOrItemChange();
  }
  
}
