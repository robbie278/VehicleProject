import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../Service/category.service';
import { ICategory } from '../Models/Category';
import { CategoriesEditComponent } from './categories-edit.component';
import { MatSort } from '@angular/material/sort';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { ConfirmDialogComponent } from '../confirm-dialog-component/confirm-dialog-component.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  public displayedColumns: string[] = ['No', 'name', 'Description', 'action'];
  public categories!: MatTableDataSource<ICategory>;
  defaultPageIndex: number = 0;
  defaultPageSize: number = 10;
  public defaultSortColumn: string = "name";
  public defaultSortOrder: "asc" | "desc" = "asc";
  defaultFilterColumn: string = "name";
  filterQuery?: string;
  title : string = "Category"
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  filterTextChanged: Subject<string> = new Subject<string>()

  constructor(
    private categoryService: CategoryService,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) {}

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

    this.categoryService.getData2(event.pageIndex, event.pageSize, sortColumn, sortOrder,
       filterColumn, filterQuery).subscribe({
      next: (result) => {
        this.paginator.length = result.totalCount;
        this.paginator.pageIndex = result.pageIndex;
        this.paginator.pageSize = result.pageSize;
        this.categories = new MatTableDataSource<ICategory>(result.data);
        
      },
      error: (err) => console.log(err)
    });
  }

  openDialog(id?: number): void {
    const dialogRef = this.dialog.open(CategoriesEditComponent, {
      width: '45%',
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
      this.categoryService.delete(id).subscribe({
        next: () => {
          this.toastr.error('StoreKeeper Deleted Successfully');
          this.loadData();
        },
        error: (err) => console.log(err),
      });
    }
  });
  }
}