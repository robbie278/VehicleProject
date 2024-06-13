import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Issue } from '../Models/Issue';
import { Item } from '../Models/item';
import { Store } from '../Models/Store';
import { StoreKeeper } from '../Models/Store-keeper';
import { User } from '../Models/User';
import { IssueService } from '../Service/issue.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TransactionType } from '../enums/transaction-type.enum';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss'],
})
export class TransactionFormComponent implements OnInit {
  transactionType: TransactionType = TransactionType.Issue;
  title?: string;
  id?: number;
  issue?: Issue;
  item?: Item[];
  store?: Store[];
  storeKeeper?: StoreKeeper[];
  user?: User[];
  form!: FormGroup;

  constructor(
    private issueService: IssueService,
    private router: Router,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<TransactionFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.transactionType = data.transactionType || TransactionType.Issue;
  }

  ngOnInit() {
    this.form = new FormGroup(
      {
        itemId: new FormControl('', Validators.required),
        storeId: new FormControl('', Validators.required),
        storeKeeperId: new FormControl('', Validators.required),
        transactionType: new FormControl(this.transactionType, Validators.required),
        singleItem: new FormControl(false),
        padNumberStart: new FormControl('', [
          Validators.required,
          Validators.pattern(/^\d+$/),
        ]),
        padNumberEnd: new FormControl('', [
          Validators.pattern(/^\d+$/),
        ]),
        quantity: new FormControl({ value: 0, disabled: true },),
      },
      { validators: this.padNumberValidator() }
    );

    this.form.get('singleItem')?.valueChanges.subscribe((isSingleItem) => {
      if (isSingleItem) {
        this.form.get('padNumberEnd')?.clearValidators();
        this.form.get('padNumberEnd')?.updateValueAndValidity();
        this.form.get('quantity')?.setValue(1);
      } else {
        this.form.get('padNumberEnd')?.setValidators([Validators.required, Validators.pattern(/^\d+$/)]);
        this.form.get('padNumberEnd')?.updateValueAndValidity();
        this.calculateQuantity();
      }
    });

    this.form.get('padNumberStart')?.valueChanges.subscribe(() => this.calculateQuantity());
    this.form.get('padNumberEnd')?.valueChanges.subscribe(() => this.calculateQuantity());

    this.loadData();
   
  }

  loadData() {
    this.title = this.transactionType === TransactionType.Issue ? 'Issuing Goods' : 'Receiving Goods';
    this.loadItems();
    this.loadStore();
    this.loadStoreKeeper();
    this.loadUser();
  }

  loadItems() {
    this.issueService.getItem().subscribe({
      next: (result) => {
        this.item = result;
      },
      error: (err) => console.log(err),
    });
  }

  loadStore() {
    this.issueService.getStore().subscribe({
      next: (result) => {
        this.store = result;
      },
      error: (err) => console.log(err),
    });
  }

  loadStoreKeeper() {
    this.issueService.getStoreKeeper().subscribe({
      next: (result) => {
        this.storeKeeper = result;
      },
      error: (err) => console.log(err),
    });
  }

  loadUser() {
    this.issueService.getUser().subscribe({
      next: (result) => {
        this.user = result;
      },
      error: (err) => console.log(err),
    });
  }

  onSubmit() {
    const issue: Issue = this.form.getRawValue();

    this.issueService.post(issue).subscribe({
      next: (response) => {
        this.toastr.info(response);
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.log(err);
        this.toastr.error(err.error);
      },
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  padNumberValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const singleItem = control.get('singleItem')?.value;
      const start = control.get('padNumberStart')?.value;
      const end = control.get('padNumberEnd')?.value;
      const quantity = control.get('quantity')?.value;

      if (singleItem) {
        return null;
      }

      if (!start || !end || !quantity) {
        return null; // Return null if any of the values are not provided
      }

      const startNum = parseInt(start, 10);
      const endNum = parseInt(end, 10);
      const quantityNum = parseInt(quantity, 10);

      if (isNaN(startNum) || isNaN(endNum) || isNaN(quantityNum)) {
        return { invalidNumber: true };
      }

      if(quantityNum < 1){
        return { negativePadNumbers: true };
      }

      const isValid = endNum - startNum + 1 === quantityNum;

      return isValid ? null : { invalidPadNumbers: true };
    };
  }

  private calculateQuantity() {
    const start = this.form.get('padNumberStart')?.value;
    const end = this.form.get('padNumberEnd')?.value;

    if (this.form.get('singleItem')?.value) {
      this.form.get('quantity')?.setValue(1);
    } else if (start && end) {
      const startNum = parseInt(start, 10);
      const endNum = parseInt(end, 10);
      const quantity = endNum - startNum + 1;
      if (!isNaN(quantity)) {
        this.form.get('quantity')?.setValue(quantity);
      } else {
        this.form.get('quantity')?.setValue('');
      }
    } else {
      this.form.get('quantity')?.setValue('');
    }
  }

 
}
