import { Component, OnInit } from '@angular/core';
import { LocationDTO, LocationsService } from '../../../../services/locations.service';
import { WinesService } from '../../../../services/wines.service';
import { UploadService } from '../../../../services/generic/upload.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GrapeVarietiesService, GrapeVarietyDTO } from '../../../../services/grape-variety.service';
import { WineFormComponent } from "../wine-form/wine-form.component";
import { WineFormViewModel } from '../../../../models/view-models';
import { mapWineDtoToWineVm, mapWineVmToUpdateWineDto } from '../../../../models/mapper';

@Component({
  selector: 'app-edit-wine-form',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, WineFormComponent],
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

  updateWine({ value, file}: { value: WineFormViewModel; file?: File}){
    const updateWineDTO = mapWineVmToUpdateWineDto(value);
    updateWineDTO.id = this.wineId;
    if(file){
      this.uploadService.uploadFile(file, 'Pics', 'Wines', value.name).subscribe(result => {
        value.picturePath = result.path;
        updateWineDTO.picturePath = value.picturePath;
      })
    }
    this.winesService.updateWine(updateWineDTO).subscribe(response => {
        alert(`${response.name} sikeresen szerkesztve`)
        this.router.navigate([`/borok/${response.id}`])
      }, error => {
        alert('Hiba történt');
        console.error('Error updating wine:', error)
      })
  }
  
}
