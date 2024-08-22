import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly tokenKey = 'authToken';
  private readonly expiresAtKey = 'expires_at';
  private readonly apiUrl = 'http://localhost:60331/connect/token';
  private loggedIn = new BehaviorSubject<boolean>(this.isLoggedIn());

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<boolean> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    const body = new URLSearchParams({
      grant_type: 'password',
      client_id: 'otrls_spa', 
      client_secret: 'your-client-secret', 
      username: username,
      password: password,
      scope: 'openid email phone profile offline_access roles otrls_api',
    });

    return this.http.post<any>(this.apiUrl, body.toString(), { headers }).pipe(
      tap(response => this.handleLoginSuccess(response)),
      map(() => true),
      catchError(() => of(false))
    );
  }

  logout(): void {
    this.clearSession();
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    const expiration = this.getExpiration();
    const isLoggedIn = expiration > new Date().getTime();
    if (!isLoggedIn) {
      this.clearSession();
    }
    return isLoggedIn;
  }

  getLoginStatus(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  getToken(): string | null {
    return this.isLocalStorageAvailable() ? localStorage.getItem(this.tokenKey) : null;
  }

  private handleLoginSuccess(authResult: any): void {
    const expiresAt = this.calculateExpiration(authResult.expires_in);

    if (this.isLocalStorageAvailable()) {
      localStorage.setItem(this.tokenKey, authResult.access_token);
      localStorage.setItem(this.expiresAtKey, expiresAt.toString());
    }

    this.loggedIn.next(true);
  }

  private calculateExpiration(expiresIn: number): number {
    return expiresIn * 1000 + new Date().getTime();
  }

  private getExpiration(): number {
    if (this.isLocalStorageAvailable()) {
      const expiration = localStorage.getItem(this.expiresAtKey);
      return expiration ? Number(expiration) : 0;
    }
    return 0;
  }

  private clearSession(): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem(this.tokenKey);
      localStorage.removeItem(this.expiresAtKey);
    }
  }

  private isLocalStorageAvailable(): boolean {
    try {
      const testKey = 'test';
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch {
      return false;
    }
  }
}
