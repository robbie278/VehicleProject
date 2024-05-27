import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EndpointFactoryService {
  private readonly baseUrl: string = 'http://localhost:5000/api';

  getEndpoint(endpoint: string): string {
    return `${this.baseUrl}/${endpoint}`;
  }
}
