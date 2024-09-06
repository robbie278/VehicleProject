import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from '../services/category.service';
import { ICategory } from '../models/Category';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { Observable, map } from 'rxjs';


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
    private toastr: ToastrService,
    private translateService: TranslateService
  ) {
    this.id = data.id;
    this.title = translateService.instant( this.id ? 'others.Edit_Category' : 'others.Create_Category');
  }

  ngOnInit(): void {
    this.instantiateForm();
    if (this.id) {
      this.fetchData();
    }
  }

  instantiateForm() {
    this.form = new FormGroup({
      name: new FormControl('', {
        validators: Validators.required,
        asyncValidators: this.isDupeCategory(),
        updateOn: 'blur' // Run async validation after the user finishes typing
      }),
      nameAm: new FormControl('',Validators.required), // Add validation here if required
      description: new FormControl('', Validators.required),
      descriptionAm: new FormControl('',Validators.required) // Add validation here if required
    });
  }
  

  
  fetchData() {
    this.categoryService.get(this.id).subscribe({
      next: (result) => {
        this.category = result;
        this.form.patchValue(this.category);
        console.log(this.category)
      },
      error: (error) => console.error(error)
    });
  }

  onSubmit() {
    const category = this.id ? this.category : <ICategory>{};
    category.name = this.form.controls['name'].value;
    category.nameAm = this.form.controls['nameAm'].value;
    category.description = this.form.controls['description'].value;
    category.descriptionAm = this.form.controls['descriptionAm'].value;

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

  getButtonLabel(): string {
    return this.id ? 'FORM.UPDATE' : 'FORM.CREATE';
  }
 

  isDupeCategory(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {

      if (!control.value || control.value.trim() === '') {
        return new Observable(null); // No value to check for duplicates
      }
  
      var category = <ICategory>{};
      category.categoryId = (this.id) ? this.id : 0;
      category.name = this.form.controls['name'].value; 
  
     return this.categoryService.isDupeCategory(category).pipe(map(result => {
  
        return (result ? { isDupeCategory: true } : null);
      }));
    }
  }
}
