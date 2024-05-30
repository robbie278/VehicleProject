import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Receipt } from '../Models/Receipt';
import { Item } from '../Models/item';
import { Store } from '../Models/Store';
import { StoreKeeper } from '../Models/Store-keeper';
import { User } from '../Models/User';
import { ReceiptService } from '../Service/receipt.service';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrl: './receipt.component.scss'
})
export class ReceiptComponent  implements OnInit  {
  title?: string
  id?: number
  receipt?: Receipt
  item?: Item[]
  store?: Store[]
  storeKeeper?: StoreKeeper[]
  user?: User[]
  form!: FormGroup
  
  constructor(private receiptService: ReceiptService,
    private activatedRoute: ActivatedRoute,  
    private router: Router,
    private toastr: ToastrService  
  
      
  ){}
  ngOnInit() {
    this.form = new FormGroup({
      itemId: new FormControl('', Validators.required),
      storeId: new FormControl('', Validators.required),
      storeKeeperId: new FormControl('', Validators.required),
      transactionType: new FormControl('Receipt', Validators.required),
      quantity: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)])
    })
    this.loadData()
  }

  loadData () {
     this.title = "Receipting Goods"
     this.loadItems();
     this.loadStore();
     this.loadStoreKeeper();
     this.loadUser();

  }


  loadItems(){
    //fetch all categories from server
    this.receiptService.getItem().subscribe({
      next:(result) =>{
        this.item = result
      },
      error: err => console.log(err)
    })
  }
  loadStore(){
    //fetch all categories from server
    this.receiptService.getStore().subscribe({
      next:(result) =>{
        this.store = result
      },
      error: err => console.log(err)
    })
  }
  loadStoreKeeper(){
    //fetch all categories from server
    this.receiptService.getStoreKeeper().subscribe({
      next:(result) =>{
        this.storeKeeper = result
      },
      error: err => console.log(err)
    })
  }
  loadUser(){
    //fetch all categories from server
    this.receiptService.getUser().subscribe({
      next:(result) =>{
        this.user = result
      },
      error: err => console.log(err)
    })
  }

onSubmit(){
var receipt =  <Receipt>{}
  
receipt.itemId = this.form.controls['itemId'].value
receipt.storeId = this.form.controls['storeId'].value
receipt.storeKeeperId = this.form.controls['storeKeeperId'].value
receipt.quantity = this.form.controls['quantity'].value
receipt.transactionType = this.form.controls['transactionType'].value


  this.receiptService.post(receipt).subscribe({
    next: ()=>{
      this.toastr.info("receipted Successfully")
        //go back to storeKepper view
        this.router.navigate([''])
    },
    error: err => console.log(err)
  })

}
}