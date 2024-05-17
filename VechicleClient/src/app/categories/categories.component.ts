import { Component, OnInit,ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICategory } from '../Models/Category';
import { environment } from './../../environments/environment';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { CategoryService } from '../Service/category.service';
import { ToastrService } from 'ngx-toastr';

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
    'action'
  ];
  public categories!:  MatTableDataSource<ICategory>;
  defaultPageIndex: number = 1;
  defaultPageSize: number = 5;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private categoryService: CategoryService,
    private toastr: ToastrService, private http : HttpClient
){}

  ngOnInit() {
    var pageEvent = new PageEvent();
    pageEvent.pageIndex = this.defaultPageIndex;
    pageEvent.pageSize = this.defaultPageSize;
    this.getData();
  }
  getData(){
    this.categoryService.getData().subscribe({
      next:(result) =>{
        this.categories = new MatTableDataSource<ICategory>(result);
      },
      error: err => console.log(err)
    })
    }
  // getData(event: PageEvent) {
  //   var url = 'https://localhost:40443/api/Categories';
  //   //   var params = new HttpParams()
  //   // .set("pageIndex", event.pageIndex.toString())
  //   // .set("pageSize", event.pageSize.toString());
  //   this.http.get<ICategory[]>(url).subscribe({
  //     next: (result) => {
  //       console.log(result);
  //       this.categories = new MatTableDataSource(result);
  //       this.categories.paginator = this.paginator
  //     },
  //     error: (error) => console.error(error),
  //   });
  // }

  onDelete(id:number){

    if(confirm("Are you sure to delete this Category")){
    
    this.categoryService.delete(id).subscribe({
    next: () => {
     this.toastr.error("Category Deleted Successfully")
     location.reload()
    
      },
        error: (err) => console.log(err)
      })
      }
    }
}
