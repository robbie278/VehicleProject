import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Item } from '../Models/item';
import { Receipt } from '../Models/Receipt';
import { Store } from '../Models/Store';
import { StoreKeeper } from '../Models/Store-keeper';
import { User } from '../Models/User';

@Injectable({
  providedIn: 'root'
})
export class ReceiptService extends BaseService<Receipt> {
  constructor(http: HttpClient) { 
    super(http)
  }

  override getData(): Observable<Receipt[]> {
    throw new Error('Method not implemented.');

  }

  override get(id: number): Observable<Receipt> {
    throw new Error('Method not implemented.');
  }

  override put(item: Receipt): Observable<Receipt> {
    throw new Error('Method not implemented.');
  }
  
  override post(receipt: Receipt): Observable<string> {
    var url = this.getUrl("api/StockTransaction")
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(url, receipt, { headers, responseType: 'text' })    }

  
    override delete(id: number): Observable<Receipt> {
        throw new Error('Method not implemented.');
      }
      getItem(): Observable<Item[]>{
        var url = this.getUrl('api/Items')
        return this.http.get<Item[]>(url)
      }
      getStore(): Observable<Store[]>{
        var url = this.getUrl('api/Store')
        return this.http.get<Store[]>(url)
      }
      getStoreKeeper(): Observable<StoreKeeper[]>{
        var url = this.getUrl('api/StoreKeepers')
        return this.http.get<StoreKeeper[]>(url)
      }
      getUser(): Observable<User[]>{
        var url = this.getUrl('api/User')
        return this.http.get<User[]>(url)
      }
  
      
}