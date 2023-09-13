import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Module1Service<T> {
  route: string = environment.apiUrl;

  constructor(private http: HttpClient) { 
  }

  data(url:string): Observable<T[]> {
    return this.http.get<T[]>(`${this.route}/${url}`);
  }
}