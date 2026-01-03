import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface GrapeVarietyDTO {
  id: number,
  name: string
}

@Injectable({
  providedIn: 'root'
})

export class GrapeVarietiesService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllGrapeVarieties(): Observable<GrapeVarietyDTO[]>{
    return this.http.get<GrapeVarietyDTO[]>(`${this.apiUrl}/grapeVarieties/getAllGrapeVarieties`);
  }

  getGrapeVarietyById(id: number): Observable<GrapeVarietyDTO>{
    return this.http.get<GrapeVarietyDTO>(`${this.apiUrl}/grapeVarieties/getGrapeVarietyById/${id}`)
  }
}
