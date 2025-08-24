import { Component, OnInit } from '@angular/core';
import { LocationDTO, LocationsService } from '../../../../services/locations.service';
import { UpdateWineDTO, WineDTO, WinesService } from '../../../../services/wines.service';
import { UploadService } from '../../../../services/generic/upload.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GrapeVarietiesService, GrapeVarietyDTO } from '../../../../services/grape-variety.service';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-edit-wine-form',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './edit-wine-form.component.html',
  styleUrl: './edit-wine-form.component.scss'
})
export class EditWineFormComponent implements OnInit {
  wineId!: number;
  locations: LocationDTO[] = [];
  grapeVarieties: GrapeVarietyDTO [] = [];
  wine!: WineDTO;

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
    this.wineId = +this.activatedRoute.snapshot.paramMap.get('id')!;
    this.locationsService.getAllLocations().subscribe(data => {this.locations = data});
    this.grapeVarietiesService.getAllGrapeVarieties().subscribe(data => {this.grapeVarieties = data});
    this.winesService.getWineById(this.wineId).subscribe( data => {
      this.wine = data
    })
  }

  onSubmit() {
    console.log(this.wine)
    let updateWine = this.winesService.wineDtoToUpdateWineDto(this.wine);
    if (this.selectedFile){
      this.uploadService.uploadFile(this.selectedFile, 'Pics', 'Wines').subscribe(response => {
        const picturePath = response.path;
        updateWine.picturePath = picturePath;
        this.updateWine(updateWine);
      })
    } else {
      this.updateWine(updateWine);
    }
  }

  onPictureSelected(event: any): void{
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile?.name)
  }

  updateWine(updateWine: UpdateWineDTO){
    this.winesService.updateWine(updateWine).subscribe(response => {
      alert(`${response.name} sikeresen szerkesztve`)
      this.router.navigate([`/borok/${response.id}`])
    }, error => {
      alert('Hiba történt');
      console.error('Error updating wine:', error)
    })
  }
  
}
