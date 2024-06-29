import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { StoreService } from '../Service/store.service';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '../Models/Store';
import { EditStoreComponent } from './edit-store.component';
import { MatSort } from '@angular/material/sort';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrl: './store.component.scss'
})
export class StoreComponent implements OnInit {
  public displayedColumns: string[] = ['index', 'name', 'address', 'action'];
  public stores!: MatTableDataSource<Store>;
  defaultPageIndex: number = 0;
  defaultPageSize: number = 10;
  public defaultSortColumn: string = "name";
  public defaultSortOrder: "asc" | "desc" = "asc";
  defaultFilterColumn: string = "name";
  filterQuery?: string;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort

  filterTextChanged: Subject<string> = new Subject<string>

  constructor(
    private dialog: MatDialog, 
    private toastr: ToastrService,
    private storeService:StoreService,
    private router: Router,
  ){}

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


  // getData() {
  //   this.storeService.getData().subscribe({
  //     next: (result) => {
  //       this.stores = new MatTableDataSource<Store>(result);
  //       this.stores.paginator = this.paginator;
  //     },
  //     error: (err) => console.log(err)
  //   });
  // }
  // -------------------------
  getData(event: PageEvent) {
    var sortColumn = (this.sort) ? this.sort.active : this.defaultSortColumn
    var sortOrder = (this.sort) ? this.sort.direction : this.defaultSortOrder
    var filterColumn = (this.filterQuery) ? this.defaultFilterColumn : null
    var filterQuery = (this.filterQuery) ? this.filterQuery : null

    this.storeService.getData2(event.pageIndex, event.pageSize, sortColumn, sortOrder,
      filterColumn, filterQuery).subscribe({
        next: (result) => {
          this.paginator.length = result.totalCount;
          this.paginator.pageIndex = result.pageIndex;
          this.paginator.pageSize = result.pageSize;
          this.stores = new MatTableDataSource<Store>(result.data);
          this.stores.paginator = this.paginator; // bind paginator
          this.stores.sort = this.sort; // bind sort
          
        },
        error: (error) => console.error(error)
      });

  }
  // -------------------------

  openDialog(id?: number): void {
    const dialogRef = this.dialog.open(EditStoreComponent, {
      width: '40%',
      disableClose: true,
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      data: { id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getData({} as PageEvent);
      }
    });
  }

  onDelete(id: number) {
    if (confirm('Are you sure to delete this Store?')) {
      this.storeService.delete(id).subscribe({
        next: () => {
          this.toastr.error('Store Deleted Successfully');
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        },
        error: (err) => console.log(err)
      });
    }
  }

}
