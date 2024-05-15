import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../Service/category.service';
import { ICategory } from '../Models/Category';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { error } from 'console';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-categories-edit',
  templateUrl: './categories-edit.component.html',
  styleUrls: ['./categories-edit.component.scss'],
})
export class CategoriesEditComponent implements OnInit {
  // the view title
  title?: string;
  // the form model
  form!: FormGroup;
  // the category object to edit
  category?: ICategory;
  // the category object id, as fetched from the active route:
  // It's NULL when we're adding a new city,
  // and not NULL when we're editing an existing one.
  id?: number;

  constructor(
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}
  ngOnInit() {
    this.instantiateForm();
    this.loadData();
  }

  instantiateForm() {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
  }

  loadData() {
    // retrieve the ID from the 'id' parameter
    this.id = this.getIdFromRoute();
    if (this.id) {
      //Edit Mode
      this.fetchData();
    } else {
      this.title = 'create a new category';
    }
  }

  getIdFromRoute(): number {
    const idParam = this.activatedRoute.snapshot.paramMap.get('id');
    return idParam ? +idParam : 0;
  }

  // fetch the category from the server
  fetchData() {
    this.categoryService.get(this.id).subscribe({
      next: (result) => {
        this.category = result;
        console.log('category', this.category);

        this.title = 'Edit - ' + this.category.name;

        // up date the form with the category
        this.form.patchValue(this.category);
      },
      error: (error) => console.error(error),
    });
  }

  onSubmit() {
    var category = this.id ? this.category : <ICategory>{};
    console.log(category);
    console.log(this.id);

    if (category) {
      category.name = this.form.controls['name'].value;
      category.description = this.form.controls['description'].value;

      //editing the form
      if (this.id) {
        console.log(category);
        console.log(this.id);
        // category.CategoryId = this.id;
        this.categoryService.put(category).subscribe({
          next: () => {
            this.toastr.info('category Updated Successfully');
            //go back to category view
            this.router.navigate(['/categories']);
          },
          error: (error) => console.error(error),
        });
      }
      // addding a new category
      else {
        this.categoryService.post(category).subscribe({
          next: (result) => {
            this.toastr.success('Categories added SuccessFully');
            //go back to category view
            this.router.navigate(['/categories']);
          },
          error: (error) => console.error(error),
        });
      }
    }
  }

  onDelete() {
    // retrieve the ID from the 'id' parameter
    this.id = this.getIdFromRoute();
    //var idParam = this.activatedRoute.snapshot.paramMap.get('id')
    //var id = idParam ? +idParam : 0

    if (confirm('Are you sure to delete this category')) {
      this.categoryService.delete(this.id).subscribe({
        next: () => {
          this.toastr.error(' category Deleted Successfully');
          this.router.navigate(['/Categories']);
        },
        error: (err) => console.log(err),
      });
    }
  }
}
