import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User, Credentials } from '../models/auth.model';

const AUTH_URL = environment.BACKEND_URL + '/auth';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  login(credentials: Credentials): Observable<any> {
    return this.http.post(AUTH_URL + '/login', {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
  }

  register(user: User): Observable<any> {
    return this.http.post(AUTH_URL + '/register', {
      username: user.username,
      email: user.email,
      fullname: user.fullname,
      password: user.password
    }, httpOptions);
  }

  validate(): Observable<any> {
    return this.http.get(AUTH_URL + '/validate');
  }

  logout(): Observable<any> {
    return this.http.post(AUTH_URL + '/logout', {}, httpOptions);
  }
}