import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { StoreKeeper } from '../Models/Store-keeper';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Store } from '../Models/Store';

@Injectable({
  providedIn: 'root'
})
export class StoreKeeperService extends BaseService<StoreKeeper> {
  constructor(http: HttpClient) { 
    super(http)
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

  
}
