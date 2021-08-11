import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  headers = new HttpHeaders().set(
    'Authorization',
    `Bearer ${localStorage.getItem('token')}` || ''
  );

  get<T>(endpoint: string, params = {}): Observable<T>{
    return this.httpClient.get<T>(environment.apiUri + endpoint, {
      headers: this.headers,
      params,
    });
  }

  post<T>(endpoint: string, data: any): Observable<T>{
    return this.httpClient.post<T>(environment.apiUri + endpoint, data, {
      headers: this.headers,
    });
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    }
  }
}
