import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from './Store';
import { MatPaginator } from '@angular/material/paginator';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrl: './store.component.scss'
})
export class StoreComponent implements OnInit {
  public displayedColumns: string[] = ['storeId', 'name', 'address', 'Store Keeper'];
  stores!: MatTableDataSource<Store>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private http: HttpClient, private toastr: ToastrService){}

  ngOnInit() {
    const url = 'http://localhost:40080/api/Store'
    this.http.get(url).subscribe({
      next: (result: any) => {
        this.stores = new MatTableDataSource(result);
        this.stores.paginator = this.paginator
      }
    })
    
  }

  deleteStore(store: Store){
    const url = 'http://localhost:40080/api/Store/'+ store.storeId
    this.http.delete(url).subscribe({
      next: () => {
       this.toastr.success('yay! deleted')
       location.reload()
      }
    })
  }



}
