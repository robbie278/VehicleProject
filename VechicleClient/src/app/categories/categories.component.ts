import { Component, OnInit,ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICategory } from '../Models/Category';
import { environment } from './../../environments/environment';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit {
  public displayedColumns: string[] = [
    'No',
    'Name',
    'Description',
    'Edit',
    'Delete',
  ];
  public categories!:  MatTableDataSource<ICategory>;
  defaultPageIndex: number = 1;
  defaultPageSize: number = 5;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    var pageEvent = new PageEvent();
    pageEvent.pageIndex = this.defaultPageIndex;
    pageEvent.pageSize = this.defaultPageSize;
    this.getData(pageEvent);
  }

  getData(event: PageEvent) {
    var url = 'https://localhost:40443/api/Categories';
    //   var params = new HttpParams()
    // .set("pageIndex", event.pageIndex.toString())
    // .set("pageSize", event.pageSize.toString());
    this.http.get<ICategory[]>(url).subscribe({
      next: (result) => {
        console.log(result);
        this.categories = new MatTableDataSource(result);
        this.categories.paginator = this.paginator
      },
      error: (error) => console.error(error),
    });
  }
}
