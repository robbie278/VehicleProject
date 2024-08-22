import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Stock } from '../models/Stock';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StockService extends BaseService<Stock> {

  constructor(http: HttpClient) { 
    super(http)
  }

  override getData(): Observable<Stock[]> {
    var url = this.getUrl("api/Stock")
    return this.http.get<Stock[]>(url)
  }
  
  override get(id: number): Observable<Stock> {
    throw new Error('Method not implemented.');
  }
  override put(item: Stock): Observable<Stock> {
    throw new Error('Method not implemented.');
  }
  override post(item: Stock): Observable<Stock> {
    throw new Error('Method not implemented.');
  }
  override delete(id: number): Observable<Stock> {
    throw new Error('Method not implemented.');
  }

}
