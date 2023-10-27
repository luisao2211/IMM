import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { WorkPlaces } from './workplaces.interface';

@Injectable({
  providedIn: 'root'
})
export class WorkPlacesService {
  route: string =  "http://127.0.0.1:8000/api/imm";

  constructor(private http: HttpClient) {}

  NeWorkPlace(WorkPlaces: WorkPlaces) {
    return this.http.post(`${this.route}/workplace`, WorkPlaces)
  }

  dataWorkPlace(): Observable<WorkPlaces[]> {
    return this.http.get<WorkPlaces[]>(`${this.route}/workplace`)
  }
  deleteWorkPlace(id:number) {
    return this.http.delete(`${this.route}/workplace/${id}`)
  }
  updateWorkPlace(WorkPlaces: WorkPlaces) {
    return this.http.put(`${this.route}/workplace/`,WorkPlaces)
  }
}
