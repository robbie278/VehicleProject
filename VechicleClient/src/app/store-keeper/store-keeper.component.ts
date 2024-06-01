import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { StoreKeeper } from '../Models/Store-keeper';
import { StoreKeeperService } from '../Service/store-keeper.service';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { StoreKeeperEditComponent } from './store-keeper-edit.component';

@Component({
  selector: 'app-store-keeper',
  templateUrl: './store-keeper.component.html',
  styleUrl: './store-keeper.component.scss'
})
export class StoreKeeperComponent implements OnInit {
  public displayedColumns: string[] = ['index', 'name', 'email' , 'storeName' , 'action']; 
  public storeKeeper!: MatTableDataSource<StoreKeeper>
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
              private storeKeeperService: StoreKeeperService,
              private toastr: ToastrService ,
              private dialog: MatDialog
  )
  {}
  
 

  ngOnInit() {
    this.getData()
    
  }
getData(){
this.storeKeeperService.getData().subscribe({
  next:(result) =>{
    this.storeKeeper = new MatTableDataSource<StoreKeeper>(result);
  },
  error: err => console.log(err)
})
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
      this.getData();
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