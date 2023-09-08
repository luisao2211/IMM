import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Authentication,Login,Emails } from './authentication.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  route: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  NeUser(Authentication: Authentication) {
    return this.http.post(`${this.route}/auth/register`, Authentication)
  }

  dataEmails(): Observable<Emails[]> {
    return this.http.get<Emails[]>(`${this.route}/auth/emails`)
  }
  Login(Authentication: Authentication) {
    return this.http.post(`${this.route}/auth/login`, Authentication)
  }
  Logout(id:number){
    return this.http.delete(`${this.route}/auth/logout/${id}`)

  }
 
}