import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModulesService<T> {
 
  route: string = environment.apiUrl;
  constructor(private http: HttpClient) { 
  }

  data(url:string,useurl=true): Observable<T[]> {
    if (useurl) {
      this.route = environment.apiUrl;
    } else {
      this.route = url;
      url = '';
    }
    return this.http.get<T[]>(`${this.route}/${url}`);
  }
  Post(url: string, params: any) {
    this.route = environment.apiUrl;
    return this.http.post(`${this.route}/${url}`, params);
  }
  PostNotParams(url: string) {
    this.route = environment.apiUrl;
    return this.http.get(`${this.route}/${url}`);
  }
  Put(url: string, params: any) {
    this.route = environment.apiUrl;
    return this.http.put(`${this.route}/${url}`, params);
  }
  Delete(url:string) {
    this.route = environment.apiUrl;
    return this.http.delete(`${this.route}/${url}`);
  }
  OtherRoute(url:string){
    return this.http.get<T[]>(`${url}`);

  }
  private dataSubject = new BehaviorSubject<any>(null);
  data$ = this.dataSubject.asObservable();

  setData(data: any) {
    this.dataSubject.next(data);
  }
}