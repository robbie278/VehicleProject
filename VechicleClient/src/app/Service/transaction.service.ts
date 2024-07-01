import { Injectable } from '@angular/core';
import { ApiResult, BaseService } from './base.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Transaction } from '../Models/Transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService extends BaseService<Transaction> {
  constructor(http: HttpClient) {
    super(http)
  }


  getData2(pageIndex: number, pageSize: number, sortColumn: string, sortOrder: string,
    filterColumn: string | null, filterQuery: string | null): Observable<ApiResult<Transaction>> {
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

  getPadNumbers(quantity: number): Observable<any> {
    var url = this.getUrl(`api/StockTransactionDetail/pad-numbers?quantity=${quantity}`)
    return this.http.get<any>(url);
  }
  
  //   getCategories(): Observable<ICategory[]>{
  //     var url = this.getUrl('api/Categories')
  //     return this.http.get<ICategory[]>(url)
  //   }
}