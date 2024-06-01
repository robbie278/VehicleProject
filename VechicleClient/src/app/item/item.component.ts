import { Component, OnInit,ViewChild} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { ItemService } from '../Service/item.service';
import { Item } from '../Models/item';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ItemEditComponent } from './item-edit.component';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss'
})
export class ItemComponent implements OnInit {
  public displayedColumns: string[] = ['index', 'name', 'description','categoryName', 'action'];
 public items!:MatTableDataSource<Item>

  constructor(private itemService:ItemService,
              private toastr: ToastrService,
              private dialog: MatDialog
 
  ) {
  }

ngOnInit() {
  this.getData();
   }


   getData() {
    this.itemService.getData().subscribe({
      next: (result) => {
        this.items = new MatTableDataSource<Item>(result);
      },
      error: (err) => console.log(err)
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
        this.getData();
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
