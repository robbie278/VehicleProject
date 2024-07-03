import { Injectable } from '@angular/core';
import { ApiResult, BaseService } from './base.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Transaction } from '../Models/Transaction';
import { Item } from '../Models/item';
import { Store } from '../Models/Store';

@Injectable({
  providedIn: 'root'
})
export class TransactionService extends BaseService<Transaction> {
  constructor(http: HttpClient) {
    super(http)
  }


  getData2(pageIndex: number, pageSize: number, sortColumn: string, sortOrder: string,
    filterColumn: string | null, filterQuery: string | null ,transactionType?: string| null): Observable<ApiResult<Transaction>> {
    var url = this.getUrl("api/StockTransaction")
    var params = new HttpParams()
      .set("pageIndex", pageIndex.toString())
      .set("pageSize", pageSize.toString())
      .set("sortColumn", sortColumn)
      .set("sortOrder", sortOrder);

    if (filterQuery && filterColumn) {
      params = params
        .set("filterColumn", filterColumn)
        .set("filterQuery", filterQuery);
    }

    if (transactionType) {
      params = params.set('transactionType', transactionType);
    }
    
    return this.http.get<ApiResult<Transaction>>(url, { params })
  }

  override getData(): Observable<Transaction[]> {
    var url = this.getUrl("api/Stock")
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

  getItem(): Observable<any>{
    var url = this.getUrl('api/Items')
    return this.http.get<Item[]>(url)
  }
  getStore(): Observable<any>{
    var url = this.getUrl('api/Store')
    return this.http.get<Store[]>(url)
  }
  getStoreKeeper(): Observable<any>{
    var url = this.getUrl('api/StoreKeepers')
    return this.http.get<any>(url)
  }
  getPadNumbers(quantity: number): Observable<any> {
    var url = this.getUrl(`api/StockTransactionDetail/pad-numbers?quantity=${quantity}`)
    return this.http.get<any>(url);
  }
  
 
}