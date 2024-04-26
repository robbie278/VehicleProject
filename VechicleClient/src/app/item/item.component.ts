import { Component, OnInit,ViewChild} from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator,PageEvent } from '@angular/material/paginator';
import { ItemService } from '../Service/item.service';
import { Item } from '../Model/Item';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss'
})
export class ItemComponent implements OnInit {
  public displayedColumns: string[] = [ 'name', 'description', 'quantity','availability','categoryName'];
 public items!:Item[];
constructor(private itemService:ItemService,private http: HttpClient) {
}
ngOnInit() {
  this.getData();
   }
  getData() {
    this.itemService.getData().subscribe({

   next: (result) => {
    this.items = result
   },
   error: (error) => console.log(error)
   });
   }
}
