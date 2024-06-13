import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Issue } from '../Models/Issue';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../Models/item';
import { StoreKeeper } from '../Models/Store-keeper';
import { User } from '../Models/User';
import { Store } from '../Models/Store';

@Injectable({
  providedIn: 'root'
})
  export class IssueService extends BaseService<Issue> {
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
      return this.http.post(url, issue, { headers, responseType: 'text' })    }

    override delete(id: number): Observable<Issue> {
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

