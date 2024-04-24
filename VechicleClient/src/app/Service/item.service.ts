import { Injectable} from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../Model/item';
import { ApiResult, BaseService } from './base.service';
@Injectable({
 providedIn: 'root',
})
export class ItemService
extends BaseService<Item> {
 constructor(
 http: HttpClient) {
 super(http);
 }
 getData(
 pageIndex: number,
 pageSize: number,
 sortColumn: string,
 sortOrder: string,
 filterColumn: string | null,
 filterQuery: string | null
 ): Observable<ApiResult<Item>> {
 var url = this.getUrl("api/Items");
 var params = new HttpParams()
 .set("pageIndex", pageIndex.toString())
 .set("pageSize", pageSize.toString())
 .set("sortColumn", sortColumn)
 .set("sortOrder", sortOrder);
 if (filterColumn && filterQuery) {
 params = params
 .set("filterColumn", filterColumn)
 .set("filterQuery", filterQuery);
 }
 return this.http.get<ApiResult<Item>>(url, { params });
 }
 get(id: number): Observable<Item> {
 var url = this.getUrl("api/Items/" + id);
 return this.http.get<Item>(url);
 }
 put(item: Item): Observable<Item> {
 var url = this.getUrl("api/Items/" + item.id);
 return this.http.put<Item>(url, item);
 }
 post(item: Item): Observable<Item> {
 var url = this.getUrl("api/Items");
 return this.http.post<Item>(url, item);
 }
}
