import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from './../../environments/environment';
import { Store } from './Store';
import { StoreKeepers } from './StoreKeepers';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-store',
  templateUrl: './edit-store.component.html',
  styleUrl: './edit-store.component.scss'
})
export class EditStoreComponent implements OnInit {


  form!: FormGroup;
  id?: number;
  stores?: Store;
  title?: string;

  // StoreKeepers?: StoreKeepers[];


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private toastr: ToastrService

  ) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      // storeId: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      // StoreKeeperName: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      // email: new FormControl('',Validators.required),
      // StoreKeepers: new FormControl('', Validators.required)
    }, null,);

    this.loadData();
    console.log(this.stores)
  }

  // isDupestore(): AsyncValidatorFn {
  //   return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {

  //     var store = <store>{};
  //     store.id = (this.id) ? this.id : 0;
  //     store.name = this.form.controls['name'].value;
  //     store.email = +this.form.controls['email'].value;
  //     store.lon = +this.form.controls['lon'].value;
  //     store.countryId = +this.form.controls['countryId'].value;

  //     var url = environment.baseUrl + 'api/Cities/IsDupestore';
  //     return this.http.post<boolean>(url, store).pipe(map(result => {

  //       return (result ? { isDupestore: true } : null);
  //     }));
  //   }
  // }

  loadData() {
    var idParam = this.activatedRoute.snapshot.paramMap.get('id');
    this.id = idParam ? +idParam : 0;
    console.log(idParam)

    if (this.id) {
      var url = environment.baseUrl + 'api/Store/' + this.id;
      this.http.get<Store>(url).subscribe({
        next: (result) => {
          this.stores = result;
         
          this.title = "Edit - " + this.stores.name;

          // update the form with the store value
          this.form.patchValue(this.stores);
        },
        error: (error) => console.error(error)
      });

    } else {
      // ADD NEW MODE

      this.title = "Create a new store";
    }
  }

  // loadStoreKeepers() {
  //   // fetch all the countries from the server
  //   var url = environment.baseUrl + 'api/Store';
  //   // var params = new HttpParams()
  //   //   .set("pageIndex", "0")
  //   //   .set("pageSize", "9999")
  //   //   .set("sortColumn", "name");

  //   this.http.get<any>(url).subscribe({
  //     next: (result) => {
  //       this.stores = result.data;
  //       this.title = 'edit - '+ this.stores?.name

  //       // to update this form
  //       this.form.patchValue(this.stores);

  //     },
  //     error: (error) => console.error(error)
  //   });
  // }
  onSubmit() {
    var store = (this.id) ? this.stores : <Store>{};
    console.log(this.stores, 'this store')
    console.log(this.id, 'this')
    if (store) {
      store.name = this.form.controls['name'].value;
      // store.storeKeeperName = this.form.controls['StoreKeeperstoreKeeperNameName'].value;
      store.address = this.form.controls['address'].value


      if (this.id) {
        // EDIT mode

        // http://localhost:40080/api/Store/1
        var url = environment.baseUrl + 'api/Store/' + store.storeId;
        this.http
          .put<Store>(url, store)
          .subscribe({
            next: (result) => {
              console.log(result)
              console.log("store " + store!.storeId + " has been updated.");
              this.toastr.success('Store updated successfully!', 'Success');

              // go back to cities view
              this.router.navigate(['/store']);
            },
            error: (error) => console.error(error)
          });
      }
      else {
        // ADD NEW mode
        var url = 'http://localhost:40080/api/Store';
        this.http
          .post<Store>(url, store)
          .subscribe({
            next: (result) => {

              console.log("store " + result.storeId + " has been created.");
              this.toastr.success('yay! store created')

              // go back to cities view
              this.router.navigate(['/store']);
            },
            error: (error) => console.error(error)
          });
      }
    }
    
  }
}
