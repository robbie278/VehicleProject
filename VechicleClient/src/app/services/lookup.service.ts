// lookup.service.ts
import { Injectable, InjectionToken, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


export const LOOKUP_TYPES = new InjectionToken<string[]>('LookupTypes');

@Injectable({
  providedIn: 'root'
})

export class LookupService {
  private readonly accountUrl: string = 'http://localhost:60330/';
  private readonly accountBaseUrl: string = this.accountUrl + 'api/';


  private params: { [key: string]: any } = {};
  constructor(
    private http: HttpClient,
  ) {}

  setParams(params: { [key: string]: any }): void {
    this.params={};
    this.params = { ...this.params, ...params };
  }

  getLookupData<T>(lookupType: string, paramsType: 'query' | 'route' = 'query'): Observable<T[]|T> {
   
    let url = this.constructUrl(lookupType, paramsType);
    let params = this.constructParams(paramsType);
    return this.http.get<T[]|T>(url, { params }).pipe(
      catchError(error => this.handleError(lookupType, error))
    );
  }

  private constructUrl(lookupType: string, paramsType: 'query' | 'route'): string {
    let url = `${this.accountBaseUrl}${lookupType}`;

    if (paramsType === 'route' && this.params) {

      for (const key in this.params) {
        if (this.params.hasOwnProperty(key)) {
          url += `/${this.params[key]}`;
        }
      }
    } else if (paramsType === 'query' && this.params) {

      let queryParams = new HttpParams();
      for (const key in this.params) {
        if (this.params.hasOwnProperty(key)) {
          queryParams = queryParams.append(key, this.params[key]);
        }
      }
      url += `?${queryParams.toString()}`;
    }

    return url;
}


  private constructParams(paramsType: 'query' | 'route'): HttpParams {
    if (paramsType === 'query') {
      let queryParams = new HttpParams();
      for (const key in this.params) {
        if (this.params.hasOwnProperty(key)) {
          queryParams = queryParams.append(key, this.params[key]);
        }
      }
      return queryParams;
    } else {

      return new HttpParams();
    }
  }


  private handleError(lookupType: string, error: any): Observable<never> {
    console.error(`Error fetching ${lookupType} lookup data:`, error);
    return throwError('Something went wrong; please try again later.');
  }
}
