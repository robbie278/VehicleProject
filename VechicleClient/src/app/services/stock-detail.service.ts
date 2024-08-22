import { Injectable } from '@angular/core';
import { ApiResult, BaseService } from './base.service';
import { StockDetail } from '../models/StockDetail';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StockDetailService extends BaseService<StockDetail> {

  constructor(http: HttpClient) { 
    super(http)
  }
  getData2(storeId: number, itemId: number, pageIndex: number,
     pageSize: number, sortColumn: string, sortOrder: string,
    filterColumn: string | null, filterQuery: string | null): Observable<ApiResult<StockDetail>>{

   var url = this.getUrl('api/StockTransactionDetail/stockitems')
   var params = new HttpParams()
   .set("storeId", storeId)
   .set("itemId", itemId)
   .set("pageIndex", pageIndex.toString())
   .set("pageSize", pageSize.toString())
   .set("sortColumn", sortColumn)
   .set("sortOrder", sortOrder);

   if (filterQuery && filterColumn) {
    params = params
      .set("filterColumn", filterColumn)
      .set("filterQuery", filterQuery);
  }

  return this.http.get<ApiResult<StockDetail>>(url, {params})
  }

  override getData(): Observable<StockDetail[]> {
    throw new Error('Method not implemented.');
  }
  override get(id: number): Observable<StockDetail> {
    throw new Error('Method not implemented.');
  }
  override put(item: StockDetail): Observable<StockDetail> {
    throw new Error('Method not implemented.');
  }
  override post(item: StockDetail): Observable<string | StockDetail> {
    throw new Error('Method not implemented.');
  }
  override delete(id: number): Observable<StockDetail> {
    throw new Error('Method not implemented.');
  }


}
