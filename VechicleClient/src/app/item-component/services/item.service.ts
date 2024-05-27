import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../../Models/item';
import { EndpointFactoryService } from '../../endpoint-factory/endpoint-factory.service';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private readonly itemsEndpoint: string;

  constructor(private http: HttpClient, private endpointFactory: EndpointFactoryService) {
    this.itemsEndpoint = this.endpointFactory.getEndpoint('items');
  }

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.itemsEndpoint);
  }

  getItemById(id: number): Observable<Item> {
    return this.http.get<Item>(`${this.itemsEndpoint}/${id}`);
  }

  createItem(item: Item): Observable<Item> {
    return this.http.post<Item>(this.itemsEndpoint, item);
  }

  updateItem(item: Item): Observable<Item> {
    return this.http.put<Item>(`${this.itemsEndpoint}/${item.itemId}`, item);
  }

  deleteItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.itemsEndpoint}/${id}`);
  }
}
