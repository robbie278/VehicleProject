import { Injectable } from '@angular/core';
import { ApiResult, BaseService } from './base.service';
import { ICategory } from '../models/Category';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CategoryService extends BaseService<ICategory> {
  constructor(http: HttpClient) {
    super(http);
  }
  getData2(pageIndex: number, pageSize: number, sortColumn: string, sortOrder: string,
    filterColumn: string | null, filterQuery: string | null): Observable<ApiResult<ICategory>> {
    var url = this.getUrl("api/Categories")
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
    return this.http.get<ApiResult<ICategory>>(url, { params })
  }
  
  override getData(): Observable<ICategory[]> {
    var url = this.getUrl('api/Categories/');
    return this.http.get<ICategory[]>(url);
  }

  override get(id?: number): Observable<ICategory> {
    var url = this.getUrl('api/Categories/' + id);
    return this.http.get<ICategory>(url);
  }

  override put(item: ICategory): Observable<ICategory> {
    console.log('service',item.categoryId);
    var url = this.getUrl('api/Categories/' + item.categoryId);
    return this.http.put<ICategory>(url, item);
  }

  override post(item: ICategory): Observable<ICategory> {
    var url = this.getUrl('api/Categories/');
    return this.http.post<ICategory>(url, item);
  }

  override delete(id?: number): Observable<ICategory> {
    var url = this.getUrl('api/Categories/' + id);
    return this.http.delete<ICategory>(url);
  }

  isDupeCategory(item:ICategory): Observable<boolean>{
    var url = this.getUrl("api/Categories/isDupeCategory")
    return this.http.post<boolean>(url, item)
  }

}
