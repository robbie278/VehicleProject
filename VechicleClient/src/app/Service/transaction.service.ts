import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Transaction } from '../Models/Transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService extends BaseService<Transaction> {
  constructor(http: HttpClient) { 
    super(http)
  }

  override getData(): Observable<Transaction[]> {
    var url = this.getUrl("api/StockTransaction")
    return this.http.get<Transaction[]>(url)
  }

  override get(id: number): Observable<Transaction> {
    var url = this.getUrl("api/StockTransaction/" + id)
    return this.http.get<Transaction>(url)
  }

  override put(transaction: Transaction): Observable<Transaction> {
     var url = this.getUrl("api/StockTransaction/" + transaction.transactionId)
     return this.http.put<Transaction>(url, transaction)

  }

  override post(transaction: Transaction): Observable<Transaction> {
    var url = this.getUrl("api/StockTransaction")
     return this.http.post<Transaction>(url, transaction)
  }

  override delete(id: number): Observable<Transaction> {
    var url = this.getUrl("api/StockTransaction/" + id)
    return this.http.delete<Transaction>(url)
  }
  
//   getCategories(): Observable<ICategory[]>{
//     var url = this.getUrl('api/Categories')
//     return this.http.get<ICategory[]>(url)
//   }
}