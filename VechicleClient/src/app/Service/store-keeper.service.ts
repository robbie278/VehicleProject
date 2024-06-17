import { Injectable } from '@angular/core';
import { ApiResult, BaseService } from './base.service';
import { StoreKeeper } from '../Models/Store-keeper';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Store } from '../Models/Store';

@Injectable({
  providedIn: 'root'
})
export class StoreKeeperService extends BaseService<StoreKeeper> {
  constructor(http: HttpClient) { 
    super(http)
  }

  getData2(pageIndex: number, pageSize: number, sortColumn: string, sortOrder: string,
    filterColumn: string | null, filterQuery: string | null): Observable<ApiResult<StoreKeeper>> {
    var url = this.getUrl("api/StoreKeepers")
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
    return this.http.get<ApiResult<StoreKeeper>>(url, { params })
  }
  
  override getData(): Observable<StoreKeeper[]> {
    var url = this.getUrl("api/StoreKeepers")
    return this.http.get<StoreKeeper[]>(url)
  }
  
  override get(id: number): Observable<StoreKeeper> {
    var url = this.getUrl("api/StoreKeepers/" + id)
    return this.http.get<StoreKeeper>(url)
  }

  override put(item: StoreKeeper): Observable<StoreKeeper> {
     var url = this.getUrl("api/StoreKeepers/" + item.storeKeeperId)
     return this.http.put<StoreKeeper>(url, item)

  }

  override post(item: StoreKeeper): Observable<StoreKeeper> {
    var url = this.getUrl("api/StoreKeepers")
     return this.http.post<StoreKeeper>(url, item)
  }

  override delete(id: number): Observable<StoreKeeper> {
    var url = this.getUrl("api/StoreKeepers/" + id)
    return this.http.delete<StoreKeeper>(url)
  }
  
  getStores(): Observable<Store[]>{
    var url = this.getUrl('api/Store')
    return this.http.get<Store[]>(url)
  }
  isDupeStoreKeeper(item:StoreKeeper): Observable<boolean>{
    var url = this.getUrl("api/StoreKeepers/isDupeStoreKeeper")
    return this.http.post<boolean>(url, item)
  }
  
}
