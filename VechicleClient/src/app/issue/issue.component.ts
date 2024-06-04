import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Issue } from '../Models/Issue';
import { Item } from '../Models/item';
import { Store } from '../Models/Store';
import { StoreKeeper } from '../Models/Store-keeper';
import { User } from '../Models/User';
import { IssueService } from '../Service/issue.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.scss'],
})
export class IssueComponent implements OnInit {
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
    public dialogRef: MatDialogRef<IssueComponent>
  ) {}
  ngOnInit() {
    this.form = new FormGroup(
      {
        itemId: new FormControl('', Validators.required),
        storeId: new FormControl('', Validators.required),
        storeKeeperId: new FormControl('', Validators.required),
        transactionType: new FormControl('Issue', Validators.required),
        padNumberStart: new FormControl('', [
          Validators.required,
          Validators.pattern(/^\d+$/),
        ]),
        padNumberEnd: new FormControl('', [
          Validators.required,
          Validators.pattern(/^\d+$/),
        ]),
        quantity: new FormControl('', [
          Validators.required,
          Validators.pattern(/^\d+$/),
        ]),
      },
      { validators: this.padNumberValidator() }
    );

    this.loadData();
  }

  loadData() {
    this.title = 'Issueing Goods';
    this.loadItems();
    this.loadStore();
    this.loadStoreKeeper();
    this.loadUser();
  }

  loadItems() {
    //fetch all categories from server
    this.issueService.getItem().subscribe({
      next: (result) => {
        this.item = result;
      },
      error: (err) => console.log(err),
    });
  }
  loadStore() {
    //fetch all categories from server
    this.issueService.getStore().subscribe({
      next: (result) => {
        this.store = result;
      },
      error: (err) => console.log(err),
    });
  }
  loadStoreKeeper() {
    //fetch all categories from server
    this.issueService.getStoreKeeper().subscribe({
      next: (result) => {
        this.storeKeeper = result;
      },
      error: (err) => console.log(err),
    });
  }
  loadUser() {
    //fetch all categories from server
    this.issueService.getUser().subscribe({
      next: (result) => {
        this.user = result;
      },
      error: (err) => console.log(err),
    });
  }

  onSubmit() {
    var issue = <Issue>{};

    issue = this.form.value

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
      const start = control.get('padNumberStart')?.value;
      const end = control.get('padNumberEnd')?.value;
      const quantity = control.get('quantity')?.value;

      if (!start || !end || !quantity) {
        return null; // Return null if any of the values are not provided
      }

      const startNum = parseInt(start, 10);
      const endNum = parseInt(end, 10);
      const quantityNum = parseInt(quantity, 10);

      if (isNaN(startNum) || isNaN(endNum) || isNaN(quantityNum)) {
        return { invalidNumber: true };
      }

      const isValid = endNum - startNum + 1 === quantityNum;

      return isValid ? null : { invalidPadNumbers: true };
    };
  }
}
