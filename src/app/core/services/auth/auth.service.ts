import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { switchMap, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private options: any;

  constructor(
    private http: HttpClient,
    private api: ApiService
    ) {}

  login(email: any, password: any): Observable<any> {
    console.log(email);
    console.log(password);
    return this.api.post<any>('login', {
      email: email.toString(),
      password: password.toString(),
    }).pipe(
      tap(
        response => {
          this.setToken(response)
        }
      ),
      switchMap(
        () => this.setRole()
      )
    )
  }

  setToken(token: any) {
    localStorage.setItem('token', token.access_token);
  }

  setRole(){
    console.log('fetch role')
    return this.api.get<any>('auth/user', {}).pipe(
      tap((response: any) => {
        for(let role of response.roles){
          localStorage.setItem('role', role.name);
        }
      })
    )
  }

  logout(){
    this.http.post(environment.apiUri + 'logout', this.options);
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }

  getToken(): string {
    return localStorage.getItem('token') || '';
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('token') != null;
  }

  getRole(): string {
    return localStorage.getItem('role') || '';
  }

  getRoleUrl(): string {
    const role = localStorage.getItem('role') || '';

    if (role == 'Administrator')
      return 'administration'
    else if (role == 'Client')
      return 'client'
    else
      return 'auth/login'
  }
  

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
