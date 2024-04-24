import { Component, OnInit,ViewChild} from '@angular/core';
import { Item } from '../Model/item';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator,PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss'
})
export class ItemComponent implements OnInit {
  public displayedColumns: string[] = ['id', 'name', 'description', 'quantity','availability','categoryName'];
  public items!: MatTableDataSource<Item>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
constructor(private http: HttpClient) {
}ngOnInit() {
  var pageEvent = new PageEvent();
   pageEvent.pageIndex = 0;
   pageEvent.pageSize = 10;
  this.getData(pageEvent);
   }
  getData(event: PageEvent) {
  var url = environment.baseUrl + 'api/Cities';
  var params = new HttpParams()
   .set("pageIndex", event.pageIndex.toString())
   .set("pageSize", event.pageSize.toString());
  this.http.get<any>(url, { params })
   .subscribe({
   next: (result) => {
   this.paginator.length = result.totalCount;
   this.paginator.pageIndex = result.pageIndex;
   this.paginator.pageSize = result.pageSize;
   this.items = new MatTableDataSource<Item>(result.data);
   },
   error: (error) => console.error(error)
   });
   }
}
