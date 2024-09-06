import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AsyncValidatorFn, AbstractControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Store } from '../Models/store';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StoreService } from '../services/store.service';
import { Observable, map, of } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

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
    private storeService: StoreService,
    private translateService: TranslateService
  ) {
    console.log(data)
    this.id = data.id;
    this.title = this.id ? 'Edit Store' : 'Create Store';
    this.title = translateService.instant( this.id ? 'others.Edit_Store' : 'others.Create_Store');
    
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
      address: new FormControl('', Validators.required),

      nameAm: new FormControl('', Validators.required),
      addressAm: new FormControl('', Validators.required)
    } ,{
      asyncValidators: [this.isDupeStore()]
    });
  }

  fetchData() {
    this.storeService.get(this.id).subscribe({
      next: (result) => {
        console.log(result)
        this.stores = result;
        this.form.patchValue(this.stores);
      },
      error: (error) => console.error(error)
    });
  }

  onSubmit() {
    const store = (this.id) ? this.stores : <Store>{};
    store.name = this.form.controls['name'].value;
    store.nameAm = this.form.controls['nameAm'].value;
    store.address = this.form.controls['address'].value;
    store.addressAm = this.form.controls['addressAm'].value;

    if (this.id) {
      this.storeService.put(store).subscribe({
        next: () => {
          this.toastr.info('Store Updated Successfully');
          this.dialogRef.close(true);
          this.fetchData();
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

  getButtonLabel(): string {
    return this.id ? 'FORM.UPDATE' : 'FORM.CREATE';
  }

  isDupeStore(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
  
      var store = <Store>{};
      store.storeId = (this.id) ? this.id : 0;
      store.name = this.form.controls['name'].value; 
      store.address = this.form.controls['address'].value;
      
  
     return this.storeService.isDupeStore(store).pipe(map(result => {
  
      if (!this.form) {
        return of(null);  // Ensure the form is initialized
      }
       return result ? { isDupeStore: true } : null;
      }));
    }
  }
}
