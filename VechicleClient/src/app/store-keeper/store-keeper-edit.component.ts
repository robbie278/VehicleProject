import { Component, Inject, OnInit } from '@angular/core';
import { StoreKeeper } from '../Models/Store-keeper';
import { Store } from '../Models/Store';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, Validators } from '@angular/forms';
import { StoreKeeperService } from '../Service/store-keeper.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, map } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-store-keeper-edit',
  templateUrl: './store-keeper-edit.component.html',
  styleUrl: './store-keeper-edit.component.scss'
})
export class StoreKeeperEditComponent implements OnInit{
title: string
storeKeeper!: StoreKeeper
id: number
stores!: Store[]
form!: FormGroup


constructor(
  public dialogRef: MatDialogRef<StoreKeeperEditComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any,
  private storeKeeperService: StoreKeeperService,
  private toastr: ToastrService,
  private translateService: TranslateService       
)
{
  this.id = data.id;
  this.title = this.id ? 'Edit StoreKeeper' : 'Create StoreKeeper';
  this.title = translateService.instant( this.id ? 'others.Edit_StoreKeeper' : 'others.Create_StoreKeeper');
}

  ngOnInit() {
    this.instantiateForm();
   this.loadStores();
    if(this.id){
      this.fetchData();
    }
  }

   instantiateForm(){
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      storeId: new FormControl('', Validators.required)
    },null, this.isDupeStoreKeeper())
  }

  fetchData(){
    this.storeKeeperService.get(this.id).subscribe({
      next: (result) =>{
        this.storeKeeper = result
        //populate the from with storeKeeper value
        this.form.patchValue(this.storeKeeper)
      }
    });
  }

 

  loadStores(){
    //fetch all stores from server
    this.storeKeeperService.getStores().subscribe({
      next:(result) =>{
        this.stores = result.data as Store[]
      },
      error: err => console.log(err)
    })
  }    

  onSubmit() {
    const storeKepper = this.id? this.storeKeeper : <StoreKeeper>{}
    storeKepper.name = this.form.controls['name'].value
    storeKepper.email = this.form.controls['email'].value
    storeKepper.storeId = this.form.controls['storeId'].value

    if (this.id) {
      this.storeKeeperService.put(storeKepper).subscribe({
        next: () => {
          this.toastr.info('StoreKepper Updated Successfully');
          this.dialogRef.close(true);
        },
        error: (error) => console.error(error)
      });
    } else {
      this.storeKeeperService.post(storeKepper).subscribe({
        next: () => {
          this.toastr.success('StoreKepper Added Successfully');
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

  isDupeStoreKeeper(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
  
      var storeKeeper = <StoreKeeper>{};
      storeKeeper.storeKeeperId = (this.id) ? this.id : 0;
      storeKeeper.name = this.form.controls['name'].value; 
      storeKeeper.email = this.form.controls['email'].value;
      storeKeeper.storeId = +this.form.controls['storeId'].value;
  
     return this.storeKeeperService.isDupeStoreKeeper(storeKeeper).pipe(map(result => {
  
        return (result ? { isDupeStoreKeeper: true } : null);
      }));
    }
  }
}
