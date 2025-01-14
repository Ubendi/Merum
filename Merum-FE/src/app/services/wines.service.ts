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
  location: LocationDTO
}

export interface AddWineDTO {
  name: string,
  year: number,
  alcohol: number,
  locationEntityId: number
}

@Injectable({
  providedIn: 'root'
})
export class WinesService {

  private apiUrl = `${environment.apiUrl}/wines`;

  constructor(private http: HttpClient) { }

  addWine(addWineDTO: AddWineDTO): Observable<WineDTO>{
    return this.http.post<WineDTO>(`${this.apiUrl}/addWine`, addWineDTO);
  }
}
