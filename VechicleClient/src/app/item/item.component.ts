import { Component, OnInit,ViewChild} from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator,PageEvent } from '@angular/material/paginator';
import { ItemService } from '../Service/item.service';
import { Item } from '../Models/item';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss'
})
export class ItemComponent implements OnInit {
  public displayedColumns: string[] = ['index', 'name', 'description','categoryName', 'action'];
 public items!:Item[];
constructor(private itemService:ItemService,private http: HttpClient,
  private activatedRoute: ActivatedRoute,  
  private router: Router,
  private toastr: ToastrService  
) {
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

   onDelete(){
    // retrieve the ID from the 'id' parameter 
var idParam = this.activatedRoute.snapshot.paramMap.get('id')
var id = idParam ? +idParam : 0

if(confirm("Are you sure to delete this Item")){

this.itemService.delete(id).subscribe({
 next: () => {
   this.toastr.error("Item Deleted Successfully")
   this.router.navigate(['/items'])
 },
 error: (err) => console.log(err)
})
}
   }
  }
