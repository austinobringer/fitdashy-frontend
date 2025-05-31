import { Injectable } from '@angular/core';
import { User } from '../models/auth.model';

const USER_KEY = 'authUser';

@Injectable({
  providedIn: 'root'
})
export class AuthStorageService {

  constructor() { }

  logout(): void {
    window.sessionStorage.clear();
  }

  public saveUser(user: User): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    return JSON.parse(sessionStorage.getItem(USER_KEY) || '{}');
  }
}
