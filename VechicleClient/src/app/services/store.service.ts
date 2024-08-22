import { Injectable } from '@angular/core';
import { ApiResult, BaseService } from './base.service';
import { Store } from '../models/Store';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StoreService extends BaseService<Store> {

  constructor(http: HttpClient) { 
    super(http)
  }

  override getData(): Observable<Store[]> {
    var url = this.getUrl("api/Store")
    return this.http.get<Store[]>(url)
  }

  getData2(pageIndex: number, pageSize: number, sortColumn: string, sortOrder: string,
    filterColumn: string | null, filterQuery: string | null): Observable<ApiResult<Store>> {
    var url = this.getUrl("api/Store")
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
    return this.http.get<ApiResult<Store>>(url, { params })
  }


  override get(id: number): Observable<Store> {
    var url = this.getUrl("api/Store/" + id)
    return this.http.get<Store>(url)
  }

  override put(item: Store): Observable<Store> {
     var url = this.getUrl("api/Store/" + item.storeId)
     return this.http.put<Store>(url, item)

  }

  override post(item: Store): Observable<Store> {
    var url = this.getUrl("api/Store")
     return this.http.post<Store>(url, item)
  }

  override delete(id: number): Observable<Store> {
    var url = this.getUrl("api/Store/" + id)
    return this.http.delete<Store>(url)
  }

  isDupeStore(store: Store): Observable<boolean>{
    var url = this.getUrl("api/Store/isDupeStore/")
    return this.http.post<boolean>(url, store)
  }

 
}
