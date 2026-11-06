import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { WinesService } from '../../../../services/wines.service'; 
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LocationDTO } from '../../../../services/locations.service';

import { UploadService, UploadResponse } from '../../../../services/generic/upload.service';
import { GrapeVarietyDTO } from '../../../../services/grape-varieties.service';
import { WineFormComponent } from "../wine-form/wine-form.component";
import { WineFormViewModel } from '../../../../models/view-models';
import { mapWineVmToAddWineDto } from '../../../../models/mapper';
import { switchMap } from 'rxjs';
import { WineDTO } from '../../../../services/wines.service';

@Component({
  selector: 'app-add-wine-form',
  standalone: true,
  imports: [FormsModule, RouterModule, WineFormComponent],
  templateUrl: './add-wine-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './add-wine-form.component.scss'
})
export class AddWineFormComponent {
  private winesService = inject(WinesService);
  private uploadService = inject(UploadService);
  private router = inject(Router);

  locations: LocationDTO[] = [];
  grapeVarieties: GrapeVarietyDTO[] = [];
    
  selectedFile: File | null = null;

  addWine({ value, file}: {value: WineFormViewModel, file?: File}): void {
    const dto = mapWineVmToAddWineDto(value);

    if (file) {
      this.uploadService.uploadFile(file, 'Pics', 'Wines', value.name).pipe(
        switchMap((result: UploadResponse) => {
          dto.picturePath = result.path;
          return this.winesService.addWine(dto);
        })
      ).subscribe({
        next: (response: WineDTO) => {
          alert(`Bor sikeresen hozzáadva: ${response.name} (${response.year})`);
          console.log(response);
          this.router.navigate([`/borok/${response.id}`]);
        }, error: (err: unknown) => {
          alert('Hiba történt');
          console.error('Error adding wine ', err);
        }
      });
    } else {
      this.winesService.addWine(dto).subscribe({
        next: (response: WineDTO) => {
          alert(`Bor sikeresen hozzáadva: ${response.name} (${response.year})`);
          console.log(response);
          this.router.navigate([`/borok/${response.id}`]);
        }, error: (err: unknown) => {
          alert('Hiba történt');
          console.error('Error adding wine ', err);
        }
      });
    }
  }
}
