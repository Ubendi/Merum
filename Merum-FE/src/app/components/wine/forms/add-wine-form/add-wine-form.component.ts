import { Component } from '@angular/core';
import { WinesService } from '../../../../services/wines.service'; 
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LocationDTO } from '../../../../services/locations.service';
import { CommonModule } from '@angular/common';
import { UploadService } from '../../../../services/generic/upload.service';
import { GrapeVarietyDTO } from '../../../../services/grape-variety.service';
import { WineFormComponent } from "../wine-form/wine-form.component";
import { WineFormViewModel } from '../../../../models/view-models';
import { mapWineVmToAddWineDto } from '../../../../models/mapper';

@Component({
  selector: 'app-add-wine-form',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule, WineFormComponent],
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

  addWine({ value, file}: {value: WineFormViewModel; file?: File}){
    const addWineDTO = mapWineVmToAddWineDto(value);
    if(file){
      this.uploadService.uploadFile(file, 'Pics', 'Wines',value.name).subscribe(result => {
        value.picturePath = result.path;
        addWineDTO.picturePath = value.picturePath;
      })
    }
    this.winesService.addWine(addWineDTO).subscribe(response => {
        alert(`Bor sikeresen hozzáadva: ${response.name} (${response.year})`);
        this.router.navigate(['/borok']);
      }, error => {
        alert('Hiba történt');
        console.error('Error adding wine ', error);
      });
  }
}
