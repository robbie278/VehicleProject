import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { ICategory } from '../Models/Category';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CategoryService extends BaseService<ICategory> {
  constructor(http: HttpClient) {
    super(http);
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
}
