import { Component, OnInit,ViewChild} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ItemService } from '../Service/item.service';
import { Item } from '../Models/item';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ItemEditComponent } from './item-edit.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss'
})
export class ItemComponent implements OnInit {
  public displayedColumns: string[] = ['index', 'name', 'description','categoryName', 'action'];
 public items!:MatTableDataSource<Item>
 defaultPageIndex: number = 0;
 defaultPageSize: number = 10;
 public defaultSortColumn: string = "name";
 public defaultSortOrder: "asc" | "desc" = "asc";
 defaultFilterColumn: string = "name";
 filterQuery?: string;


 @ViewChild(MatPaginator) paginator!: MatPaginator;
 @ViewChild(MatSort) sort!: MatSort;

 filterTextChanged: Subject<string> = new Subject<string>()
  constructor(private itemService:ItemService,
              private toastr: ToastrService,
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

    this.filterTextChanged.next(filterText)}

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

      this.itemService.getData2(event.pageIndex, event.pageSize, sortColumn, sortOrder,
    filterColumn, filterQuery).subscribe({
      next: (result) => {
        this.paginator.length = result.totalCount;
        this.paginator.pageIndex = result.pageIndex;
        this.paginator.pageSize = result.pageSize;
        this.items = new MatTableDataSource<Item>(result.data);
      },
      error: (error) => console.error(error)
    });
  }

  openDialog(id?: number): void {
    const dialogRef = this.dialog.open(ItemEditComponent, {
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


 
   onDelete(id:number){
  if(confirm("Are you sure to delete this Item")){

  this.itemService.delete(id).subscribe({
  next: () => {
    this.toastr.error("Item Deleted Successfully")
    location.reload()
    },
  error: (err) => console.log(err)
  })
  }
    }


  }
