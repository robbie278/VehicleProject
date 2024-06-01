import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Store } from '../Models/Store';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

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

 
}
