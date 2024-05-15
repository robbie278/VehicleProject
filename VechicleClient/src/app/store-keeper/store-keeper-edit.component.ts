import { Component, OnInit } from '@angular/core';
import { StoreKeeper } from '../Models/Store-keeper';
import { Store } from '../Models/Store';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StoreKeeperService } from '../Service/store-keeper.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-store-keeper-edit',
  templateUrl: './store-keeper-edit.component.html',
  styleUrl: './store-keeper-edit.component.scss'
})
export class StoreKeeperEditComponent implements OnInit{
title?: string
storeKeeper?: StoreKeeper
id?: number
stores?: Store[]
form!: FormGroup


constructor(private storeKeeperService: StoreKeeperService,
            private activatedRoute: ActivatedRoute,  
            private router: Router,
            private toastr: ToastrService  
){}

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      storeId: new FormControl('', Validators.required)
    })
    this.loadData()
  }

  loadData(){
 this.loadStores()

 //get id from Id from id parameter
 var idParam = this.activatedRoute.snapshot.paramMap.get('id')
  this.id = idParam ? +idParam : 0

 if(this.id){
  //Edit Mode

  //fetch storekeeper from server
  this.storeKeeperService.get(this.id).subscribe({
    next: (result) =>{
      this.storeKeeper = result
      this.title = "Edit- " + this.storeKeeper.name

      //populate the from with storeKeeper value
      this.form.patchValue(this.storeKeeper)
    }
  })

 }
 else{
  //Add new StoreKeeper

  this.title = 'Add new StoreKepper'


 }

  }

  loadStores(){
    //fetch all stores from server
    this.storeKeeperService.getStores().subscribe({
      next:(result) =>{
        this.stores = result
      },
      error: err => console.log(err)
    })
  }

  onSubmit(){
    var storeKepper = (this.id)? this.storeKeeper : <StoreKeeper>{}

    if(storeKepper){
      storeKepper.name = this.form.controls['name'].value
      storeKepper.email = this.form.controls['email'].value
      storeKepper.storeId = this.form.controls['storeId'].value

      if(this.id){
        //Edit Mode

        this.storeKeeperService.put(storeKepper).subscribe({
          next: ()=>{
            this.toastr.info("StoreKeeper Updated Successfully")
              //go back to storeKepper view
              this.router.navigate(['/storekeppers'])
          },
          error: err => console.log(err)
        })
      }
      else{
        //Add New Mode

        this.storeKeeperService.post(storeKepper).subscribe({
          next: () =>{
            this.toastr.success("StoreKeeper Inserted SuccessFully")
           //go back to storeKepper view
            this.router.navigate(['/storekeppers'])
          },
          error: err => console.log(err)
        })
      }
    }
  }

  onDelete(){
         // retrieve the ID from the 'id' parameter 
  var idParam = this.activatedRoute.snapshot.paramMap.get('id')
  var id = idParam ? +idParam : 0
  
  if(confirm("Are you sure to delete this StoreKeeper")){

    this.storeKeeperService.delete(id).subscribe({
      next: () => {
        this.toastr.error("StoreKeeper Deleted Successfully")
        this.router.navigate(['/storekeppers'])
      },
      error: (err) => console.log(err)
    })
  }
  }
}
