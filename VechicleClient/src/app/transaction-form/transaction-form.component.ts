import { Component, OnInit, Inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Issue } from '../Models/Issue';
import { Item } from '../Models/item';
import { Store } from '../Models/Store';
import { StoreKeeper } from '../Models/Store-keeper';
import { User } from '../Models/User';
import { TransactionFormService } from '../Service/transaction-form.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TransactionType } from '../enums/transaction-type.enum';
import { ICategory } from '../Models/Category';
import { TransactionService } from '../Service/transaction.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss'],
})
export class TransactionFormComponent implements OnInit {
  transactionType: TransactionType = TransactionType.Issue;
  TransactionType = TransactionType;
  title?: string;
  id?: number;
  issue?: Issue;
  categories?: ICategory[];
  item?: Item[];
  store?: Store[];
  storeKeeper?: StoreKeeper[];
  user?: User[];
  form!: FormGroup;
  categoryId: number = 0;
  storeId: number = 0;

  constructor(
    private transactionFormService: TransactionFormService,
    private transactionService: TransactionService,
    private router: Router,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<TransactionFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private translate: TranslateService
  ) {
    this.transactionType = data.transactionType || TransactionType.Issue;
  }

  ngOnInit() {
    const translatedTransactionType = this.translate.instant(`others.${this.transactionType}`);

    this.form = new FormGroup(
      {
        categoryId: new FormControl('', Validators.required),
        itemId: new FormControl('', Validators.required),
        storeId: new FormControl('', Validators.required),
        storeKeeperId: new FormControl('', Validators.required),
        userId: new FormControl(''),
        transactionType: new FormControl(
          this.transactionType,
          Validators.required
        ),
        singleItem: new FormControl(false), 
        padNumberStart: new FormControl('', [
          Validators.required,
          Validators.pattern(/^\d+$/),
        ]),
        padNumberEnd: new FormControl('', [Validators.pattern(/^\d+$/)]),
        quantity: new FormControl('', Validators.required),
      },
      { validators: this.padNumberValidator() }
    );

    this.form.get('singleItem')?.valueChanges.subscribe((isSingleItem) => {
      if (isSingleItem) {
        this.form.get('padNumberEnd')?.clearValidators();
        this.form.get('padNumberEnd')?.updateValueAndValidity();
        this.form.get('quantity')?.setValue(1);
      } else {
        this.form
          .get('padNumberEnd')
          ?.setValidators([Validators.required, Validators.pattern(/^\d+$/)]);
        this.form.get('padNumberEnd')?.updateValueAndValidity();
        this.calculateQuantity();
      }
    });

    this.form
      .get('padNumberStart')
      ?.valueChanges.subscribe(() => this.calculateQuantity());
    this.form
      .get('padNumberEnd')
      ?.valueChanges.subscribe(() => this.calculateQuantity());

    this.loadData();
  }

  loadData() {
    switch (this.transactionType) {
      case TransactionType.Issue:
        this.title = this.translate.instant('others.Issuing_Goods');
        break;
      case TransactionType.Receipt:
        this.title = this.translate.instant('others.Receiving_Goods');
        break;
      case TransactionType.Damaged:
        this.title = this.translate.instant('others.Damaged_Goods');
        break;
      case TransactionType.Return:
        this.title = this.translate.instant('others.Return_Goods');
        break;
    }

    this.loadCategories();
    this.loadStore();
    //this.loadStoreKeeper();
    this.loadUser();
  }

  loadItems() {
    this.transactionFormService.getItem().subscribe({
      next: (result) => {
        this.item = result.data as Item[];
      },
      error: (err) => console.log(err),
    });
  }

  loadStore() {
    this.transactionFormService.getStore().subscribe({
      next: (result) => {
        this.store = result.data as Store[];
      },
      error: (err) => console.log(err),
    });
  }

  loadStoreKeeper() {
    this.transactionFormService.getStoreKeeper().subscribe({
      next: (result) => {
        this.storeKeeper = result.data as StoreKeeper[];
      },
      error: (err) => console.log(err),
    });
  }

  loadUser() {
    this.transactionFormService.getUser().subscribe({
      next: (result) => {
        this.user = result;
      },
      error: (err) => console.log(err),
    });
  }

  onSubmit() {
    const issue: Issue = this.form.getRawValue();

    this.transactionFormService.post(issue).subscribe({
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

  onQuantityChange() {
    const quantity = this.form.get('quantity')?.value;
    if (quantity) {
      this.transactionService.getPadNumbers(quantity).subscribe({
        next: (response) => {
          const padNumbers = response.data;
          this.form.get('padNumberStart')?.setValue(padNumbers.start);
          this.form.get('padNumberEnd')?.setValue(padNumbers.end);
        },
        error: (err) => {
          console.log(err);
          this.toastr.error(err.error);
        },
      });
    }
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

      if (quantityNum < 1) {
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

  loadCategories() {
    this.transactionFormService.getAllCategory().subscribe((categories) => {
      this.categories = categories.data;
    });
  }

  getItemsByCategory(id: number) {
    console.log('The id is', id);
    this.categoryId = id;
    this.transactionFormService.getItemsByCategory(id).subscribe((items) => {
      this.item = items;
    });
  }

  getStoreKeeperByStore(id: number) {
    console.log('The id is', id);
    this.storeId = id
    this.transactionFormService.getStoreKeeperByStore(id).subscribe(items => {
      this.storeKeeper = items
    })
  }

}
