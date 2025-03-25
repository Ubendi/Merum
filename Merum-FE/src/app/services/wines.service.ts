import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'
import { LocationDTO } from './locations.service';
import { GrapeVarietyDTO } from './grape-variety.service';


export interface WineDTO {
  id: number,
  name: string,
  year: number,
  description: string,
  location: LocationDTO,
  grapeVariety: GrapeVarietyDTO,
  relativeDens: number,
  totalAlc: number,
  realAlc: number,
  totalExtract: number,
  totalAcid: number,
  volatileAcid: number,
  totalSDiox: number,
  freeSDiox: number,
  ph: number,
  totalSugar: number,
  sugarFreeExtract: number,
  titratableAcid: number,
  picturePath: string
}

export interface AddWineDTO {
  name: string,
  year: number,
  description: string,
  locationEntityId: number,
  grapeVarietyEntityId: number,
  relativeDens: number,
  totalAlc: number,
  realAlc: number,
  totalExtract: number,
  totalAcid: number,
  volatileAcid: number,
  totalSDiox: number,
  freeSDiox: number,
  ph: number
  totalSugar: number,
  sugarFreeExtract: number,
  titratableAcid: number,
  picturePath: string
}

export interface UpdateWineDTO {
  id: number,
  name: string,
  year: number,
  description: string,
  locationEntityId: number,
  grapeVarietyEntityId: number,
  relativeDens: number,
  totalAlc: number,
  realAlc: number,
  totalExtract: number,
  totalAcid: number,
  volatileAcid: number,
  totalSDiox: number,
  freeSDiox: number,
  ph: number,
  totalSugar: number,
  sugarFreeExtract: number,
  titratableAcid: number,
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

  updateWine(updateWineDTO: UpdateWineDTO): Observable<WineDTO>{
    return this.http.put<WineDTO>(`${this.apiUrl}/updateWineById/${updateWineDTO.id}`, updateWineDTO)
  }



  wineDtoToUpdateWineDto(wineDTO: WineDTO): UpdateWineDTO{
    return {
      id: wineDTO.id,
      name: wineDTO.name,
      year: wineDTO.year,
      description: wineDTO.description,
      locationEntityId: wineDTO.location.id,
      grapeVarietyEntityId: wineDTO.grapeVariety.id,
      relativeDens: wineDTO.relativeDens,
      totalAlc: wineDTO.totalAlc,
      realAlc: wineDTO.realAlc,
      totalExtract: wineDTO.totalExtract,
      totalAcid: wineDTO.totalAcid,
      volatileAcid: wineDTO.volatileAcid,
      totalSDiox: wineDTO.totalSDiox,
      freeSDiox: wineDTO.freeSDiox,
      ph: wineDTO.ph,
      totalSugar: wineDTO.totalSugar,
      sugarFreeExtract: wineDTO.sugarFreeExtract,
      titratableAcid: wineDTO.titratableAcid,
      picturePath: wineDTO.picturePath
    }
  }
}
