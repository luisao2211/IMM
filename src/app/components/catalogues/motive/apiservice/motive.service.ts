import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {Motive} from './motive.interface'
@Injectable({
  providedIn: 'root'
})
export class MotiveService {
  route: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  NewMotive(Motive: Motive) {
    return this.http.post(`${this.route}/motive`, Motive)
  }

  dataMotive(): Observable<Motive[]> {
    return this.http.get<Motive[]>(`${this.route}/motive`)
  }
  deleteMotive(id:number) {
    return this.http.delete(`${this.route}/motive/${id}`)
  }
  updateMotive(Motive: Motive) {
    return this.http.put(`${this.route}/motive/`,Motive)
  }
}
