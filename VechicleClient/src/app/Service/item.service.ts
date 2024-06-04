import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ICategory } from '../Models/Category';
import { Item } from '../Models/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService extends BaseService<Item> {
  constructor(http: HttpClient) { 
    super(http)
  }

  override getData(): Observable<Item[]> {
    var url = this.getUrl("api/Items")
    return this.http.get<Item[]>(url)
  }

  override get(id: number): Observable<Item> {
    var url = this.getUrl("api/Items/" + id)
    return this.http.get<Item>(url)
  }

  override put(item: Item): Observable<Item> {
     var url = this.getUrl("api/Items/" + item.itemId)
     return this.http.put<Item>(url, item)

  }

  override post(item: Item): Observable<Item> {
    var url = this.getUrl("api/Items")
     return this.http.post<Item>(url, item)
  }

  override delete(id: number): Observable<Item> {
    var url = this.getUrl("api/Items/" + id)
    return this.http.delete<Item>(url)
  }
  
  getCategories(): Observable<ICategory[]>{
    var url = this.getUrl('api/Categories')
    return this.http.get<ICategory[]>(url)
  }
}