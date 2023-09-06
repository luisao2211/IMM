import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { WorkPlaces } from './workplaces.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WorkPlacesService {
  route: string = environment.apiUrl;

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
