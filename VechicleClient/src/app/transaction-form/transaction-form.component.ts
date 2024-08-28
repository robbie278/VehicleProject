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
import { Issue } from '../models/Issue';
import { Item } from '../models/item';
import { Store } from '../models/Store';
import { StoreKeeper } from '../models/Store-keeper';
import { User } from '../models/User';
import { TransactionFormService } from '../services/transaction-form.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TransactionType } from '../enums/transaction-type.enum';
import { ICategory } from '../models/Category';
import { TransactionService } from '../services/transaction.service';
import { TranslateService } from '@ngx-translate/core';
import { LookupService } from '../services/lookup.service';
import { LanguageService } from '../services/language.service';
import { IVSMSService } from '../services/ivsms.service';

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
  isChecked: boolean = false;
  isPlateChecked: boolean = false;
  itIsPlate: boolean = false;
  prefixList: string[] = ['', 'A', 'B', 'C', 'D'];

  plateCategoryList: any[] = [];
  regionList: any[] = [];
  majorList: any[] = [];
  minorList: any[] = [];
  plateSizeList: any[] = [];

  selectedVehicleCategoryId?: number;
  selectedVehicleRegionId?: number;
  selectedVehiclePlateSizeId?: number;
  selectedVehicleMajorId?: number;
  selectedVehicleMinorId?: number;

  constructor(
    private transactionFormService: TransactionFormService,
    private transactionService: TransactionService,
    private router: Router,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<TransactionFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public translate: TranslateService,
    public languageService: LanguageService,
    private lookupService: LookupService,
    private ivsmsService: IVSMSService
  ) {
    this.transactionType = data.transactionType || TransactionType.Issue;
  }

  isBulk = false;

  isSingleBoxChage(event: any) {
    this.itIsPlate = event.checked;
    this.form.get('majorId')?.updateValueAndValidity();
    this.form.get('minorId')?.updateValueAndValidity();
    this.form.get('plateSizeId')?.updateValueAndValidity();
    this.form.get('plateRegionId')?.updateValueAndValidity();
  }

  onItemChange(event: any) {
    const selectedItemId = event.value;
    const selectedItem = this.item?.find(
      (item) => item.itemId == selectedItemId
    );

    if (selectedItem?.isPlate) {
      this.loadPlateRelatedData();
      this.itIsPlate = true;
      this.form.get('isPlate')?.setValue(true);
      console.log(selectedItem.isPlate);
    } else {
      this.itIsPlate = false;
      console.log(selectedItem?.isPlate);
    }
  }

  ngOnInit() {
    const translatedTransactionType = this.translate.instant(
      `others.${this.transactionType}`
    );

    this.form = new FormGroup(
      {
        categoryId: new FormControl('', Validators.required),
        itemId: new FormControl('', Validators.required),
        storeId: new FormControl('', Validators.required),
        storeKeeperId: new FormControl('', Validators.required),
        userId: new FormControl(''),
        transactionType: new FormControl(
          translatedTransactionType,
          Validators.required
        ),
        singleItem: new FormControl(false),
        isPlate: new FormControl(false),
        padNumberStart: new FormControl('', [
          Validators.required,
          Validators.pattern(/^\d+$/),
        ]),
        padNumberEnd: new FormControl('', [Validators.pattern(/^\d+$/)]),
        quantity: new FormControl('', Validators.required),
        transactionDate: new FormControl(new Date(), [
          Validators.required,
          this.futureDateValidator(),
        ]),

        // plate related fields
        majorId: new FormControl(''),
        minorId: new FormControl(),
        plateSizeId: new FormControl(),
        plateRegionId: new FormControl(),
        prefix: new FormControl(),
        vehicleCategoryId: new FormControl(),
      },
      { validators: this.padNumberValidator() }
    );

    // if (this.transactionType === TransactionType.Issue) {
    //   this.form.get('userId')?.setValidators(Validators.required);
    // } else {
    //   this.form.get('userId')?.setValue(null);
    // }
    this.form.get('isPlate')?.valueChanges.subscribe((isPlate) => {
      if (this.itIsPlate) {
        this.form.get('padNumberEnd')?.clearValidators();
        this.form.get('padNumberEnd')?.updateValueAndValidity();
        this.form.get('quantity')?.setValue(1);
        this.calculateQuantity();
      } else {
        this.form
          .get('padNumberEnd')
          ?.setValidators([Validators.pattern(/^\d+$/)]);
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
    this.loadItems();
  }

  futureDateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const date = control.value;
      if (date && new Date(date) > new Date()) {
        return { futureDate: true };
      }
      return null;
    };
  }

  loadItems() {
    this.transactionFormService.getItem().subscribe({
      next: (result) => {
        this.item = result.data as Item[];
        console.log('this is items: ' + this.item);
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
    const formValue = this.form.getRawValue();
    const issue: Issue = {
      ...formValue,
      userId: formValue.userId || null,
      padNumberEnd: formValue.padNumberEnd || null,
      transactionType: this.transactionType,
      // plate related fields
      majorId: this.form.controls['majorId'].value,
      minorId: this.form.controls['minorId'].value,
      plateRegionId: this.form.controls['plateRegionId'].value,
      vehicleCategoryId: this.form.controls['VehicleCategoryId'].value,
      // plateSizeId: this.form.controls['plateSizeId'].value,
      // if (!item.platePool) {
      //   item.platePool = <PlatePool>{};
      // }
    };
    if (!this.isChecked)
      this.transactionFormService.post(issue).subscribe({
        next: (response) => {
          console.log(issue);
          this.toastr.info(response);
          this.dialogRef.close(true);
        },
        error: (err) => {
          console.log(err);
          this.toastr.error(err.error);
        },
      });
    if (this.isChecked)
      this.transactionFormService.postSingle(issue).subscribe({
        next: (response) => {
          console.log(issue);
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

  onCheckboxChange(event: any) {
    this.isChecked = event.checked;

    if (this.isChecked) {
      this.form.get('padNumberEnd')?.clearValidators();
      this.form.get('padNumberEnd')?.updateValueAndValidity();
      this.form.get('quantity')?.setValue(1);
      this.calculateQuantity();
    } else {
      this.form
        .get('padNumberEnd')
        ?.setValidators([Validators.pattern(/^\d+$/)]);
      this.form.get('padNumberEnd')?.updateValueAndValidity();
      this.calculateQuantity();
    }
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
    this.storeId = id;
    this.transactionFormService.getStoreKeeperByStore(id).subscribe((items) => {
      this.storeKeeper = items;
    });
  }

  loadPlateRelatedData() {
    this.loadRegionsData();
    this.loadMajorData();
    this.loadMinorData();
    this.loadPlatSizeData();
    this.loadPlateCategoryData();
  }

  loadPlateCategoryData() {
    this.ivsmsService.setParams({})
    this.ivsmsService
      .getLookupData<any[]>('VehiclePlateCategory/GetAll', 'route')
      .subscribe((res: any[]) => {
        this.plateCategoryList = res;
      });
  }

  loadRegionsData() {
    this.lookupService.setParams({ addressType: 1 });
    this.lookupService
      .getLookupData<any[]>('AddressTableLookUp/type', 'route')
      .subscribe((res: any[]) => {
        this.regionList = res;
      });
  }

  loadMajorData() {
    this.ivsmsService.setParams({});
    this.ivsmsService
      .getLookupData<any[]>('MajorPlate/GetAll', 'route')
      .subscribe((res: any[]) => {
        this.majorList = res;
      });
  }

  loadMinorData() {
    if (this.form.get('majorId')?.value) {
      this.ivsmsService.setParams({ majorId: this.form.get('majorId')?.value });
      this.ivsmsService
        .getLookupData<any[]>('MinorPlate/GetMinorByMajorId', 'route')
        .subscribe((res: any[]) => {
          this.minorList = res;
        });
    } else {
      this.ivsmsService.setParams({});
      this.ivsmsService
        .getLookupData<any[]>('MinorPlate/GetAll', 'route')
        .subscribe((res: any[]) => {
          this.minorList = res;
        });
    }
  }

  loadPlatSizeData() {
    this.ivsmsService.setParams({});
    this.ivsmsService
      .getLookupData<any[]>('PlateSize/GetAll', 'route')
      .subscribe((res: any[]) => {
        this.plateSizeList = res;
      });
  }
}
