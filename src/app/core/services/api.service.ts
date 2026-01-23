import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class ApiService {
  private readonly baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  get<T>(
    url: string,
    params?: Record<string, any>,
    headers?: HttpHeaders,
    withCredentials: boolean = true,
  ): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}${url}`, {
      params: this.buildParams(params),
      headers,
      withCredentials,
    });
  }

  post<T>(
    url: string,
    body: any,
    headers?: HttpHeaders,
    withCredentials: boolean = true,
  ): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${url}`, body, { headers, withCredentials });
  }

  put<T>(
    url: string,
    body: any,
    headers?: HttpHeaders,
    withCredentials: boolean = true,
  ): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}${url}`, body, { headers, withCredentials });
  }

  delete<T>(
    url: string,
    params?: Record<string, any>,
    headers?: HttpHeaders,
    withCredentials: boolean = true,
  ): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}${url}`, {
      params: this.buildParams(params),
      headers,
      withCredentials,
    });
  }

  private buildParams(params?: Record<string, any>): HttpParams {
    let httpParams = new HttpParams();

    if (!params) {
      return httpParams;
    }

    Object.keys(params).forEach((key) => {
      const value = params[key];
      if (value !== null && value !== undefined) {
        httpParams = httpParams.set(key, value);
      }
    });

    return httpParams;
  }
}
