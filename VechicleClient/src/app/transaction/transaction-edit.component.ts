import { Component, Inject } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Observable, map } from 'rxjs';
import { TransactionService } from '../services/transaction.service';
import { Transaction } from '../models/Transaction';
import { Item } from '../models/item';
import { Store } from '../models/Store';
import { StoreKeeper } from '../models/Store-keeper';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-transaction-edit',
  templateUrl: './transaction-edit.component.html',
  styleUrl: './transaction-edit.component.scss'
})
export class TransactionEditComponent {
  title: string
  transaction!: Transaction
  id: number
  items!: Item[]
  stores!: Store[]
  storeKeepers!: StoreKeeper[]
  form!: FormGroup
  
  constructor(
    public dialogRef: MatDialogRef<TransactionEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private transactionService: TransactionService,
    private toastr: ToastrService,
    private translateService: TranslateService,   
  ){
    this.id = data.id;
    
    this.title = translateService.instant(this.id ? 'others.Edit_Transaction' : 'others.Create_Item');
  }
  
  ngOnInit() {
    this.instantiateForm();
    this.loadStores();
    this.loadItems();
    this.loadStoreKeeper();
    if(this.id){
      this.fetchData()
    }
  }
  
   instantiateForm(){
    this.form = new FormGroup({
      itemId: new FormControl('', Validators.required),
        storeId: new FormControl('', Validators.required),
        storeKeeperId: new FormControl('', Validators.required),
        quantity: new FormControl('', Validators.required ),
        padNumberStart: new FormControl('', Validators.required ),
        padNumberEnd: new FormControl('', Validators.required ),
        transactionType: new FormControl('', Validators.required )
    })
    console.log(this.id)
  }
  
  fetchData() {
    this.transactionService.get(this.id).subscribe({
      next: (result) => {
        this.transaction = result;
        this.form.patchValue(this.transaction);
        this.form.controls['quantity']?.setValue(result.quantity);
        this.form.controls['padNumberStart']?.setValue(result.padNumberStart);
        this.form.controls['padNumberEnd']?.setValue(result.padNumberEnd);
        console.log(this.form.controls['quantity']?.value);
        console.log(this.form.controls['padNumberStart']?.value);
        console.log(this.form.controls['padNumberEnd']?.value);
        console.log(result)

      },
      error: (error) => console.error(error)
    });
  }
    
     loadStores(){
          //fetch all categories from server
          this.transactionService.getStore().subscribe({
            next:(result) =>{
              this.stores = result.data as Store[]
              console.log(result);
            },
            error: err => console.log(err)
          })
        }


        loadItems(){
          //fetch all categories from server
          this.transactionService.getItem().subscribe({
            next:(result) =>{
              this.items = result.data as Item[]
              console.log(result);
            },
            error: err => console.log(err)
          })
        }

        loadStoreKeeper(){
          //fetch all categories from server
          this.transactionService.getStoreKeeper().subscribe({
            next:(result) =>{
              this.storeKeepers = result.data as StoreKeeper[]
              console.log(result);
            },
            error: err => console.log(err)
          })
        }
  
        onSubmit() {
          const transaction = this.id ? this.transaction : <Transaction>{}
          transaction.itemId = this.form.controls['itemId'].value
          transaction.storeId = this.form.controls['storeId'].value
          transaction.storeKeeperId = this.form.controls['storeKeeperId'].value
          transaction.quantity = this.form.controls['quantity'].value
          transaction.padNumberStart = this.form.controls['padNumberStart'].value
          transaction.padNumberEnd = this.form.controls['padNumberEnd'].value
                    
      
          if (this.id) {
            this.transactionService.put(transaction).subscribe({
              next: () => {
                this.toastr.info('Item Updated Successfully');
                this.dialogRef.close(true);
              },
              error: (error) => console.error(error)
            });
          } else {
            this.transactionService.post(transaction).subscribe({
              next: () => {
                this.toastr.success('Item Added Successfully');
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
        
      
}
