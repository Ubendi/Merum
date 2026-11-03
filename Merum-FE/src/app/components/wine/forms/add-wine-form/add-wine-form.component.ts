import { Component } from '@angular/core';
import { WinesService } from '../../../../services/wines.service'; 
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LocationDTO } from '../../../../services/locations.service';

import { UploadService } from '../../../../services/generic/upload.service';
import { GrapeVarietyDTO } from '../../../../services/grape-varieties.service';
import { WineFormComponent } from "../wine-form/wine-form.component";
import { WineFormViewModel } from '../../../../models/view-models';
import { mapWineVmToAddWineDto } from '../../../../models/mapper';
import { of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-add-wine-form',
  standalone: true,
  imports: [FormsModule, RouterModule, WineFormComponent],
  templateUrl: './add-wine-form.component.html',
  styleUrl: './add-wine-form.component.scss'
})
export class AddWineFormComponent {

  locations: LocationDTO[] = [];
  grapeVarieties: GrapeVarietyDTO[] = [];
    
  selectedFile: File | null = null;

  constructor(
    private winesService: WinesService,
    private uploadService: UploadService,
    private router: Router
  ){}

  addWine({ value, file}: {value: WineFormViewModel, file?: File}){
    const dto = mapWineVmToAddWineDto(value);

    const add$ = file ? this.uploadService.uploadFile(file, 'Pics', 'Wines', value.name) : of(null);
    
    add$.pipe(
      tap(result => {
        if(result) dto.picturePath = result.path;
      }),
      switchMap(() => this.winesService.addWine(dto))
    ).subscribe({
      next: response => {
        alert(`Bor sikeresen hozzáadva: ${response.name} (${response.year})`);
        console.log(response)
        this.router.navigate([`/borok/${response.id}`])
      }, error: err => {
        alert('Hiba történt');
        console.error('Error adding wine ', err);
      }
    })
  }
}
