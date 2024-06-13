import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { StoreKeeper } from '../Models/Store-keeper';
import { StoreKeeperService } from '../Service/store-keeper.service';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { StoreKeeperEditComponent } from './store-keeper-edit.component';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-store-keeper',
  templateUrl: './store-keeper.component.html',
  styleUrl: './store-keeper.component.scss'
})
export class StoreKeeperComponent implements OnInit {
  public displayedColumns: string[] = ['index', 'name', 'email' , 'storeName' , 'action']; 
  public storeKeeper!: MatTableDataSource<StoreKeeper>
  defaultPageIndex: number = 0;
  defaultPageSize: number = 10;
  public defaultSortColumn: string = "name";
  public defaultSortOrder: "asc" | "desc" = "asc";
  defaultFilterColumn: string = "name";
  filterQuery?: string;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  filterTextChanged: Subject<string> = new Subject<string>()

  constructor(
              private storeKeeperService: StoreKeeperService,
              private toastr: ToastrService ,
              private dialog: MatDialog
  )
  {}
  
 

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

  this.storeKeeperService.getData2(event.pageIndex, event.pageSize, sortColumn, sortOrder,
    filterColumn, filterQuery).subscribe({
      next: (result) => {
        this.paginator.length = result.totalCount;
        this.paginator.pageIndex = result.pageIndex;
        this.paginator.pageSize = result.pageSize;
        this.storeKeeper = new MatTableDataSource<StoreKeeper>(result.data);
      },
      error: (error) => console.error(error)
    });

}

openDialog(id?: number): void {
  const dialogRef = this.dialog.open(StoreKeeperEditComponent, {
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

onDelete(id:number){

if(confirm("Are you sure to delete this StoreKeeper")){

this.storeKeeperService.delete(id).subscribe({
next: () => {
 this.toastr.error("StoreKeeper Deleted Successfully")
 location.reload()

  },
    error: (err) => console.log(err)
  })
  }
}


}