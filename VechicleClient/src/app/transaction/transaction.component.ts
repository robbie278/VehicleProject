import { Component, OnInit,ViewChild} from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TransactionService } from '../Service/transaction.service';
import { Transaction } from '../Models/Transaction';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.scss'
})
export class TransactionComponent implements OnInit {
  public displayedColumns: string[] = ['index','transactionType', 'itemName','storeName','userName','storeKeeperName','quantity','action'];
 public transactions!:Transaction[];
constructor(private transactionService:TransactionService,private http: HttpClient,
  private activatedRoute: ActivatedRoute,  
  private router: Router,
  private toastr: ToastrService  
) {
}
ngOnInit() {
  this.getData();
   }
  getData() {
    this.transactionService.getData().subscribe({

   next: (result) => {
    this.transactions = result
    console.log(result);
   },
   error: (error) => console.log(error)
   });
   }

   onDelete(){
    // retrieve the ID from the 'id' parameter 
var idParam = this.activatedRoute.snapshot.paramMap.get('id')
var id = idParam ? +idParam : 0

if(confirm("Are you sure to delete this Item")){

this.transactionService.delete(id).subscribe({
 next: () => {
   this.toastr.error("Transaction Deleted Successfully")
   this.router.navigate(['/transactions'])
 },
 error: (err) => console.log(err)
})
}
   }
  }
