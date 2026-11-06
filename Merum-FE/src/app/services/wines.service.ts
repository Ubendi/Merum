import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'
import { LocationDTO } from './locations.service';
import { GrapeVarietyDTO } from './grape-varieties.service';

interface WineBase {
  name: string,
  year: number,
  description: string | null,
  relativeDens: number | null,
  totalAlc: number | null,
  realAlc: number | null,
  totalExtract: number | null,
  totalAcid: number | null,
  volatileAcid: number | null,
  totalSDiox: number | null,
  freeSDiox: number | null,
  ph: number | null,
  totalSugar: number | null,
  sugarFreeExtract: number | null,
  titratableAcid: number | null,
  picturePath: string | null,
  quantity: number | null,
  archivedFlag: boolean
} 

export interface WineDTO extends WineBase {
  id: number,
  location: LocationDTO,
  grapeVariety: GrapeVarietyDTO
}

export interface AddWineDTO extends WineBase {
  locationEntityId: number | null,
  grapeVarietyEntityId: number | null
}

export interface UpdateWineDTO extends WineBase {
  id: number,
  locationEntityId: number | null,
  grapeVarietyEntityId: number | null
}

@Injectable({
  providedIn: 'root'
})
export class WinesService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/wines`;

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

  updateWine(updateWineDTO: UpdateWineDTO): Observable<WineDTO>{
    return this.http.put<WineDTO>(`${this.apiUrl}/updateWineById/${updateWineDTO.id}`, updateWineDTO)
  }

  archiveWine(id: number): Observable<WineDTO>{
    return this.http.patch<WineDTO>(`${this.apiUrl}/${id}/archive`, {})
  }

  unarchiveWine(id: number): Observable<WineDTO>{
    return this.http.patch<WineDTO>(`${this.apiUrl}/${id}/unarchive`, {})
  }

  wineDtoToUpdateWineDto({location, grapeVariety, ...rest}: WineDTO): UpdateWineDTO{
      return {
        ...rest,
        locationEntityId: location.id,
        grapeVarietyEntityId: grapeVariety.id
      };
  }
}
