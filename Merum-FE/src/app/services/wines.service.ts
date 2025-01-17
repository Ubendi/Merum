import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'
import { LocationDTO } from './locations.service';


export interface WineDTO {
  id: number,
  name: string,
  year: number,
  alcohol: number,
  location: LocationDTO,
  picturePath: string
}

export interface AddWineDTO {
  name: string,
  year: number,
  alcohol: number,
  locationEntityId: number,
  picturePath: string
}

@Injectable({
  providedIn: 'root'
})
export class WinesService {

  private apiUrl = `${environment.apiUrl}/wines`;

  constructor(private http: HttpClient) { }

  getAllWines(): Observable<WineDTO[]>{
    return this.http.get<WineDTO[]>(`${this.apiUrl}/getAllWines`);
  }

  getWineById(id: number): Observable<WineDTO>{
    return this.http.get<WineDTO>(`${this.apiUrl}/getWineById/${id}`);
  }

  addWine(addWineDTO: AddWineDTO): Observable<WineDTO>{
    return this.http.post<WineDTO>(`${this.apiUrl}/addWine`, addWineDTO);
  }

  deleteWine(id: number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/deleteWineById/${id}`);
  }
}
