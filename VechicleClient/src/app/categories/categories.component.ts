import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../Service/category.service';
import { ICategory } from '../Models/Category';
import { CategoriesEditComponent } from './categories-edit.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  public displayedColumns: string[] = ['No', 'Name', 'Description', 'action'];
  public categories!: MatTableDataSource<ICategory>;
  defaultPageIndex: number = 1;
  defaultPageSize: number = 5;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private categoryService: CategoryService,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.categoryService.getData().subscribe({
      next: (result) => {
        this.categories = new MatTableDataSource<ICategory>(result);
        this.categories.paginator = this.paginator;
      },
      error: (err) => console.log(err)
    });
  }

  openDialog(id?: number): void {
    const dialogRef = this.dialog.open(CategoriesEditComponent, {
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
    if (confirm('Are you sure to delete this category?')) {
      this.categoryService.delete(id).subscribe({
        next: () => {
          this.toastr.error('Category Deleted Successfully');
          this.getData();
        },
        error: (err) => console.log(err)
      });
    }
  }
}
