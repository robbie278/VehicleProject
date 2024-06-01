import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from '../Service/category.service';
import { ICategory } from '../Models/Category';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-categories-edit',
  templateUrl: './categories-edit.component.html',
  styleUrls: ['./categories-edit.component.scss'],
})
export class CategoriesEditComponent implements OnInit {
  title: string;
  form!: FormGroup;
  category!: ICategory;
  id: number;

  constructor(
    public dialogRef: MatDialogRef<CategoriesEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private categoryService: CategoryService,
    private toastr: ToastrService
  ) {
    this.id = data.id;
    this.title = this.id ? 'Edit Category' : 'Create Category';
  }

  ngOnInit(): void {
    this.instantiateForm();
    if (this.id) {
      this.fetchData();
    }
  }

  instantiateForm() {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });
  }

  
  fetchData() {
    this.categoryService.get(this.id).subscribe({
      next: (result) => {
        this.category = result;
        this.form.patchValue(this.category);
      },
      error: (error) => console.error(error)
    });
  }

  onSubmit() {
    const category = this.id ? this.category : <ICategory>{};
    category.name = this.form.controls['name'].value;
    category.description = this.form.controls['description'].value;

    if (this.id) {
      this.categoryService.put(category).subscribe({
        next: () => {
          this.toastr.info('Category Updated Successfully');
          this.dialogRef.close(true);
        },
        error: (error) => console.error(error)
      });
    } else {
      this.categoryService.post(category).subscribe({
        next: (result) => {
          this.toastr.success('Category Added Successfully');
          this.dialogRef.close(true);
        },
        error: (error) => console.error(error)
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
