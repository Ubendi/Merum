import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { LocationDTO, LocationsService } from '../../../../services/locations.service';
import { WinesService } from '../../../../services/wines.service';
import { UploadService, UploadResponse } from '../../../../services/generic/upload.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { GrapeVarietiesService, GrapeVarietyDTO } from '../../../../services/grape-varieties.service';
import { WineFormComponent } from "../wine-form/wine-form.component";
import { WineFormViewModel } from '../../../../models/view-models';
import { mapWineDtoToWineVm, mapWineVmToUpdateWineDto } from '../../../../models/mapper';
import { switchMap } from 'rxjs';
import { WineDTO } from '../../../../services/wines.service';

@Component({
  selector: 'app-edit-wine-form',
  standalone: true,
  imports: [FormsModule, RouterModule, WineFormComponent],
  templateUrl: './edit-wine-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './edit-wine-form.component.scss'
})
export class EditWineFormComponent implements OnInit {
  private winesService = inject(WinesService);
  private locationsService = inject(LocationsService);
  private grapeVarietiesService = inject(GrapeVarietiesService);
  private uploadService = inject(UploadService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  wineId!: number;
  locations: LocationDTO[] = [];
  grapeVarieties: GrapeVarietyDTO [] = [];
  initialValue!: WineFormViewModel;

  selectedFile: File | null = null;


  ngOnInit(): void {
    this.wineId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.locationsService.getAllLocations().subscribe(data => {this.locations = data});
    this.grapeVarietiesService.getAllGrapeVarieties().subscribe(data => {this.grapeVarieties = data});
    this.winesService.getWineById(this.wineId).subscribe( data => {
      this.initialValue = mapWineDtoToWineVm(data);
    })
  }

  updateWine({ value, file}: { value: WineFormViewModel, file?: File}): void {
    const dto = mapWineVmToUpdateWineDto(value);
    dto.id = this.wineId;

    if (file) {
      this.uploadService.uploadFile(file, 'Pics', 'Wines', value.name).pipe(
        switchMap((result: UploadResponse) => {
          dto.picturePath = result.path;
          return this.winesService.updateWine(dto);
        })
      ).subscribe({
        next: (response: WineDTO) => {
          alert(`${response.name} sikeresen szerkesztve`);
          this.router.navigate([`/borok/${response.id}`]);
        },
        error: (err: unknown) => {
          alert('Hiba történt');
          console.error('Error updating wine:', err);
        }
      });
    } else {
      this.winesService.updateWine(dto).subscribe({
        next: (response: WineDTO) => {
          alert(`${response.name} sikeresen szerkesztve`);
          this.router.navigate([`/borok/${response.id}`]);
        },
        error: (err: unknown) => {
          alert('Hiba történt');
          console.error('Error updating wine:', err);
        }
      });
    }
  }
  
}
