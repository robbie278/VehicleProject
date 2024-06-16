import { Injectable } from '@angular/core';
import { ApiResult, BaseService } from './base.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ICategory } from '../Models/Category';
import { Item } from '../Models/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService extends BaseService<Item> {
  constructor(http: HttpClient) { 
    super(http)
  }

  getData2(pageIndex: number, pageSize: number, sortColumn: string, sortOrder: string,
    filterColumn: string | null, filterQuery: string | null): Observable<ApiResult<Item>> {
    var url = this.getUrl("api/Items")
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
    return this.http.get<ApiResult<Item>>(url, { params })
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
  isDupeItem(item:Item): Observable<boolean>{
    var url = this.getUrl("api/Items/isDupeItem")
    return this.http.post<boolean>(url, item)
  }
}