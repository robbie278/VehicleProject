import { Component, Inject, OnInit } from '@angular/core';
import { Transaction } from '../models/Transaction';
import { ActivatedRoute } from '@angular/router';
import { TransactionService } from '../services/transaction.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-transaction-view',
  templateUrl: './transaction-view.component.html',
  styleUrls: ['./transaction-view.component.scss']
})
export class TransactionViewComponent implements OnInit {
  transaction!: Transaction;
  id: number
  form!: FormGroup


  constructor(
    public dialogRef: MatDialogRef<TransactionViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private transactionService: TransactionService
  ) {
    this.id = data.id;

  }

  ngOnInit(){
    if(this.id){
      this.fetchData()
    }
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
    });}

    onCancel(): void {
      this.dialogRef.close();
    }
  }
    