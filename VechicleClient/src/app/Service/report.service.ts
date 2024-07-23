import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Report } from '../Models/Report';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private apiUrl = 'https://localhost:40443/api/Report'; // Adjust the URL as necessary

  constructor(private http: HttpClient) { }

  getTotalQuantityByItem(): Observable<Report[]> {
    return this.http.get<Report[]>(`${this.apiUrl}/total-quantity-by-item`);
  }
}
