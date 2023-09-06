import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Colonies } from './colonies.interface';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ColoniesService {
  route: string = "http://127.0.0.1:8000/api/imm";
  private reloadSubject = new Subject<void>();

  constructor(private http: HttpClient) {}

  NewColonie(colonie: Colonies) {
    return this.http.post(`${this.route}/colony`, colonie)
  }

  dataColonie(): Observable<Colonies[]> {
    return this.http.get<Colonies[]>(`${this.route}/colony`)
  }
  deleteColonie(id:number) {
    return this.http.delete(`${this.route}/colony/${id}`)
  }
  updateColonie(colonie: Colonies) {
    return this.http.put(`${this.route}/colony/`,colonie)
  }
  get reload$() {
    return this.reloadSubject.asObservable();
  }

  triggerReload() {
    this.reloadSubject.next();
  }
}

