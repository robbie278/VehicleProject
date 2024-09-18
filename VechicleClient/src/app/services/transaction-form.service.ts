import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Issue } from '../Models/Issue';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../Models/item';
import { StoreKeeper } from '../Models/store-keeper';
import { User } from '../Models/User';
import { Store } from '../Models/store';
import { ICategory } from '../models/Category';

@Injectable({
  providedIn: 'root'
})
export class TransactionFormService extends BaseService<Issue> {
  constructor(http: HttpClient) {
    super(http)
  }
  override getData(): Observable<Issue[]> {
    throw new Error('Method not implemented.');
  }
  override get(id: number): Observable<Issue> {
    throw new Error('Method not implemented.');
  }
  override put(item: Issue): Observable<Issue> {
    throw new Error('Method not implemented.');
  }
  override post(issue: Issue): Observable<string> {
    var url = this.getUrl("api/StockTransaction")
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(url, issue, { headers, responseType: 'text' })
  }

  postSingle(issue: Issue): Observable<string> {
    var url = this.getUrl("api/StockTransaction/single")
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(url, issue, { headers, responseType: 'text' })
  }

  override delete(id: number): Observable<Issue> {
    throw new Error('Method not implemented.');
  }
  getItem(): Observable<any> {
    var url = this.getUrl('api/Items')
    return this.http.get<Item[]>(url)
  }
  getStore(): Observable<any> {
    var url = this.getUrl('api/Store')
    return this.http.get<Store[]>(url)
  }
  getStoreKeeper(): Observable<any> {
    var url = this.getUrl('api/StoreKeepers')
    return this.http.get<any>(url)
  }
  getUser(): Observable<User[]> {
    var url = this.getUrl('api/User')
    return this.http.get<User[]>(url)
  }
  getAllCategory(): Observable<any> {
    var url = this.getUrl('api/Categories/')
    return this.http.get<ICategory[]>(url)
  }
  getItemsByCategory(id: number): Observable<Item[]> {
    var url = this.getUrl("api/Items/Category/" + id)
    return this.http.get<Item[]>(url)
  }

  getStoreKeeperByStore(id: number): Observable<StoreKeeper[]> {
    var url = this.getUrl("api/StoreKeepers/Store/" + id)
    return this.http.get<StoreKeeper[]>(url)
  }
}

