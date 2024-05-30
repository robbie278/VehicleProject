import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Issue } from '../Models/Issue';
import { Item } from '../Models/item';
import { Store } from '../Models/Store';
import { StoreKeeper } from '../Models/Store-keeper';
import { User } from '../Models/User';
import { IssueService } from '../Service/issue.service';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrl: './issue.component.scss'
})
export class IssueComponent  implements OnInit  {
  title?: string
  id?: number
  issue?: Issue
  item?: Item[]
  store?: Store[]
  storeKeeper?: StoreKeeper[]
  user?: User[]
  form!: FormGroup
  
  constructor(private issueService: IssueService,
    private activatedRoute: ActivatedRoute,  
    private router: Router,
    private toastr: ToastrService  
  
      
  ){}
  ngOnInit() {
    this.form = new FormGroup({
      itemId: new FormControl('', Validators.required),
      storeId: new FormControl('', Validators.required),
      userId: new FormControl('', Validators.required),
      storeKeeperId: new FormControl('', Validators.required),
      transactionType: new FormControl('Issue', Validators.required),
      quantity: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)])
    })
    this.loadData()
  }

  loadData () {
     this.title = "Issuing Goods"
     this.loadItems();
     this.loadStore();
     this.loadStoreKeeper();
     this.loadUser();

  }


  loadItems(){
    //fetch all categories from server
    this.issueService.getItem().subscribe({
      next:(result) =>{
        this.item = result
      },
      error: err => console.log(err)
    })
  }
  loadStore(){
    //fetch all categories from server
    this.issueService.getStore().subscribe({
      next:(result) =>{
        this.store = result
      },
      error: err => console.log(err)
    })
  }
  loadStoreKeeper(){
    //fetch all categories from server
    this.issueService.getStoreKeeper().subscribe({
      next:(result) =>{
        this.storeKeeper = result
      },
      error: err => console.log(err)
    })
  }
  loadUser(){
    //fetch all categories from server
    this.issueService.getUser().subscribe({
      next:(result) =>{
        this.user = result
      },
      error: err => console.log(err)
    })
  }

onSubmit(){
var issue =  <Issue>{}
  
  issue.itemId = this.form.controls['itemId'].value
  issue.storeId = this.form.controls['storeId'].value
  issue.userId = this.form.controls['userId'].value
  issue.storeKeeperId = this.form.controls['storeKeeperId'].value
  issue.quantity = this.form.controls['quantity'].value
  issue.transactionType = this.form.controls['transactionType'].value


  this.issueService.post(issue).subscribe({
    next: ()=>{
      this.toastr.info("issued Successfully")
        //go back to storeKepper view
        this.router.navigate([''])
    },
    error: err => console.log(err)
  })

}
}


