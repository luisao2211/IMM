import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModulesService<T> {
 
  route: string =  "http://127.0.0.1:8000/api/imm";
  constructor(private http: HttpClient) { 
  }

  data(url:string,useurl=true): Observable<T[]> {
    if (useurl) {
      this.route = "http://127.0.0.1:8000/api/imm";
    } else {
      this.route = url;
      url = '';
    }
    return this.http.get<T[]>(`${this.route}/${url}`);
  }
  Post(url: string, params: any) {
    this.route = "http://127.0.0.1:8000/api/imm";
    return this.http.post(`${this.route}/${url}`, params);
  }
  PostNotParams(url: string) {
    this.route = "http://127.0.0.1:8000/api/imm";
    return this.http.get(`${this.route}/${url}`);
  }
  Put(url: string, params: any) {
    this.route = "http://127.0.0.1:8000/api/imm";
    return this.http.put(`${this.route}/${url}`, params);
  }
  Delete(url:string) {
    this.route = "http://127.0.0.1:8000/api/imm";
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