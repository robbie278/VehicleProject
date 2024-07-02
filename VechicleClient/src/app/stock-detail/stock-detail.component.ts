import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { StockDetailService } from '../Service/stock-detail.service';
import { MatTableDataSource } from '@angular/material/table';
import { StockDetail } from '../Models/StockDetail';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-stock-detail',
  templateUrl: './stock-detail.component.html',
  styleUrl: './stock-detail.component.scss'
})
export class StockDetailComponent implements OnInit {

  public displayedColumns: string[] = ['index', 'storeName', 'itemName','padNumber'];
  public stockDetail!:MatTableDataSource<StockDetail>
  defaultPageIndex: number = 0;
  defaultPageSize: number = 10  ;
  public defaultSortColumn: string = "padNumber";
  public defaultSortOrder: "asc" | "desc" = "asc";
  defaultFilterColumn: string = "itemName";
  filterQuery?: string;
  itemId: number
  storeId:number
 
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  filterTextChanged: Subject<string> = new Subject<string>()

   constructor(private stockDetailService:StockDetailService,
    public dialogRef: MatDialogRef<StockDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) 
   {
    this.itemId = data.itemId
    this.storeId = data.storeId
   }
 
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
       console.log(this.itemId , this.storeId);
     }
     
     getData(event: PageEvent) {
       var sortColumn = (this.sort) ? this.sort.active : this.defaultSortColumn
       var sortOrder = (this.sort) ? this.sort.direction : this.defaultSortOrder
       var filterColumn = (this.filterQuery) ? this.defaultFilterColumn : null
       var filterQuery = (this.filterQuery) ? this.filterQuery : null
 
       this.stockDetailService.getData2(this.storeId, this.itemId, event.pageIndex, event.pageSize, sortColumn, sortOrder,
     filterColumn, filterQuery).subscribe({
       next: (result) => {
         this.paginator.length = result.totalCount;
         this.paginator.pageIndex = result.pageIndex;
         this.paginator.pageSize = result.pageSize;
         this.stockDetail = new MatTableDataSource<StockDetail>(result.data);
       },
       error: (error) => console.error(error)
     });
   }
 
   onCancel(): void {
    this.dialogRef.close();
  }

}
