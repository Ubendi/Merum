import { Component, OnInit } from '@angular/core';
import { LocationDTO, LocationsService } from '../../../../services/locations.service';
import { WinesService } from '../../../../services/wines.service';
import { UploadService } from '../../../../services/generic/upload.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { GrapeVarietiesService, GrapeVarietyDTO } from '../../../../services/grape-varieties.service';
import { WineFormComponent } from "../wine-form/wine-form.component";
import { WineFormViewModel } from '../../../../models/view-models';
import { mapWineDtoToWineVm, mapWineVmToUpdateWineDto } from '../../../../models/mapper';
import { of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-edit-wine-form',
  standalone: true,
  imports: [FormsModule, RouterModule, WineFormComponent],
  templateUrl: './edit-wine-form.component.html',
  styleUrl: './edit-wine-form.component.scss'
})
export class EditWineFormComponent implements OnInit {
  wineId!: number;
  locations: LocationDTO[] = [];
  grapeVarieties: GrapeVarietyDTO [] = [];
  initialValue!: WineFormViewModel;

  selectedFile: File | null = null;

  constructor(
    private winesService: WinesService,
    private locationsService: LocationsService,
    private grapeVarietiesService: GrapeVarietiesService,
    private uploadService: UploadService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ){}


  ngOnInit(): void {
    this.wineId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.locationsService.getAllLocations().subscribe(data => {this.locations = data});
    this.grapeVarietiesService.getAllGrapeVarieties().subscribe(data => {this.grapeVarieties = data});
    this.winesService.getWineById(this.wineId).subscribe( data => {
      this.initialValue = mapWineDtoToWineVm(data);
    })
  }

  updateWine({ value, file}: { value: WineFormViewModel, file?: File}){
    const dto = mapWineVmToUpdateWineDto(value);
    dto.id = this.wineId;

    const upload$ = file ? this.uploadService.uploadFile(file, 'Pics', 'Wines', value.name) : of(null);
    
    upload$.pipe(
      tap(result => {
        if(result) {
          dto.picturePath = result.path
        }
      }),
      switchMap(() => this.winesService.updateWine(dto))
    ).subscribe({
      next: response => {
        alert(`${response.name} sikeresen szerkesztve`);
        this.router.navigate([`/borok/${response.id}`])
      },
      error: err => {
        alert('Hiba történt');
        console.error('Error updating wine:', err)
      }
    })
  }
  
}
