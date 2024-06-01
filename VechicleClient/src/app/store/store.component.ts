import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { StoreService } from '../Service/store.service';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '../Models/Store';
import { EditStoreComponent } from './edit-store.component';


@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrl: './store.component.scss'
})
export class StoreComponent implements OnInit {
  public displayedColumns: string[] = ['index', 'name', 'address', 'action'];
  public stores!: MatTableDataSource<Store>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private dialog: MatDialog, 
    private toastr: ToastrService,
    private storeService:StoreService
  ){}

  ngOnInit() {
    this.getData();
  }


  getData() {
    this.storeService.getData().subscribe({
      next: (result) => {
        this.stores = new MatTableDataSource<Store>(result);
        this.stores.paginator = this.paginator;
      },
      error: (err) => console.log(err)
    });
  }

  openDialog(id?: number): void {
    const dialogRef = this.dialog.open(EditStoreComponent, {
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

  onDelete(id: number) {
    if (confirm('Are you sure to delete this Store?')) {
      this.storeService.delete(id).subscribe({
        next: () => {
          this.toastr.error('Store Deleted Successfully');
          this.getData();
        },
        error: (err) => console.log(err)
      });
    }
  }

}
