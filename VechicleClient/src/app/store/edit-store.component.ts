import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Store } from '../Models/Store';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StoreService } from '../Service/store.service';

@Component({
  selector: 'app-edit-store',
  templateUrl: './edit-store.component.html',
  styleUrl: './edit-store.component.scss'
})
export class EditStoreComponent implements OnInit {

  form!: FormGroup;
  id: number;
  stores!: Store;
  title: string;

  constructor(
    public dialogRef: MatDialogRef<EditStoreComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService,
    private storeService: StoreService
  ) {
    this.id = data.id;
    this.title = this.id ? 'Edit Store' : 'Create Store';
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
      address: new FormControl('', Validators.required)
    });
  }

  fetchData() {
    this.storeService.get(this.id).subscribe({
      next: (result) => {
        this.stores = result;
        this.form.patchValue(this.stores);
      },
      error: (error) => console.error(error)
    });
  }

  onSubmit() {
    const store = (this.id) ? this.stores : <Store>{};
    store.name = this.form.controls['name'].value;
    store.address = this.form.controls['address'].value;

    if (this.id) {
      this.storeService.put(store).subscribe({
        next: () => {
          this.toastr.info('Store Updated Successfully');
          this.dialogRef.close(true);
        },
        error: (error) => console.error(error)
      });
    } else {
      this.storeService.post(store).subscribe({
        next: (result) => {
          this.toastr.success('Store Added Successfully');
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
