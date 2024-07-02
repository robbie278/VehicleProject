import { Component, Inject } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Observable, map } from 'rxjs';
import { TransactionService } from '../Service/transaction.service';
import { Transaction } from '../Models/Transaction';
import { Item } from '../Models/item';
import { Store } from '../Models/Store';
import { StoreKeeper } from '../Models/Store-keeper';

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
    private toastr: ToastrService     
  ){
    this.id = data.id;
    this.title = this.id ? 'Edit Transaction' : 'Create Transaction';
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
        quantity: new FormControl('', Validators.required )
    })
    console.log(this.id)
  }
  
  fetchData() {
    this.transactionService.get(this.id).subscribe({
      next: (result) => {
        this.transaction = result;
        this.form.patchValue(this.transaction);
        this.form.controls['quantity']?.setValue(result.quantity);
        console.log(this.form.controls['quantity']?.value);
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
