import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Report } from '../Models/Report';
import { Stock } from '../Models/Stock';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private apiUrl = 'https://localhost:40443/api/Report'; // Adjust the URL as necessary

  constructor(private http: HttpClient) { }

  getTotalQuantityByItem(): Observable<Report[]> {
    return this.http.get<Report[]>(`${this.apiUrl}/total-quantity-by-item`);
  }

  getTotalQuantityByStore(): Observable<Report[]> {
    return this.http.get<Report[]>(`${this.apiUrl}/total-quantity-by-store`);
  }

  getBalanceByStore(): Observable<Stock[]>{
    return this.http.get<Stock[]>(`${this.apiUrl}/total-balance-by-store`)
  }

  getBalanceByItem(): Observable<Stock[]>{
    return this.http.get<Stock[]>(`${this.apiUrl}/total-balance-by-item`)
  }
}
