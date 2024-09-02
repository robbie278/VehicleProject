import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  private apiUrl = 'https://localhost:40443/api/Reports';

  constructor(private http: HttpClient) { }

  getStockSummary(): Observable<any> {
    return this.http.get(`${this.apiUrl}/stock-summary`);
  }

  getStockTransactions(): Observable<any> {
    return this.http.get(`${this.apiUrl}/stock-transactions`);
  }

  getStorePerformance(): Observable<any> {
    return this.http.get(`${this.apiUrl}/store-performance`);
  }

  getItemTransactionHistory(): Observable<any> {
    return this.http.get(`${this.apiUrl}/item-transaction-history`);
  }
}
