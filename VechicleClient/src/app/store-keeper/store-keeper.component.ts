import { Component, OnInit } from '@angular/core';
import { StoreKeeper } from '../Models/Store-keeper';
import { StoreKeeperService } from '../Service/store-keeper.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-store-keeper',
  templateUrl: './store-keeper.component.html',
  styleUrl: './store-keeper.component.scss'
})
export class StoreKeeperComponent implements OnInit {
  public displayedColumns: string[] = ['storeKeeperId', 'name', 'email' , 'storeName']; 
  public storeKeeper!:StoreKeeper[];

  constructor(private storeKeeperService: StoreKeeperService, private http:HttpClient){}

  ngOnInit() {
    this.getData()
    
  }
getData(){
this.storeKeeperService.getData().subscribe({
  next:(result) =>{
    this.storeKeeper = result
  },
  error: err => console.log(err)
})
}


}