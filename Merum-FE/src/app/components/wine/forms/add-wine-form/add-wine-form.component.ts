import { Component, OnInit } from '@angular/core';
import { AddWineDTO, WinesService } from '../../../../services/wines.service'; 
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LocationDTO, LocationsService } from '../../../../services/locations.service';
import { CommonModule } from '@angular/common';
import { UploadService } from '../../../../services/generic/upload.service';

@Component({
  selector: 'app-add-wine-form',
  standalone: true,
  imports: [HttpClientModule, FormsModule, RouterModule, CommonModule],
  templateUrl: './add-wine-form.component.html',
  styleUrl: './add-wine-form.component.scss'
})
export class AddWineFormComponent implements OnInit {

  locations: LocationDTO[] = [];

  addWineDTO: AddWineDTO = {
    name: 'Test',
    year: 2023,
    description: '',
    locationEntityId: 1,
    relativeDens: 1,
    totalAlc: 1,
    realAlc: 1,
    totalExtract: 1,
    totalAcid: 1,
    volatileAcid: 1,
    totalSDiox: 1,
    freeSDiox: 1,
    ph: 1,
    totalSugar: 1,
    sugarFreeExtract:1 ,
    titratableAcid: 1,
    picturePath: ''
  };

  selectedFile: File | null = null;

  constructor(
    private winesService: WinesService,
    private locationsService: LocationsService,
    private uploadService: UploadService,
    private router: Router
  ){}

  ngOnInit(){
    this.loadLocations();
  }

  onSubmit(){
    if (this.selectedFile){
      this.uploadService.uploadFile(this.selectedFile, 'Pics', 'Wines').subscribe(response => {
        const picturePath = response.path;
        this.addWineDTO.picturePath = picturePath;
        this.addWine();
      })
    } else {
      this.addWine();
    }
  }

  onPictureSelected(event: any): void{
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile?.name)
  }

  addWine(){
    console.log(this.addWineDTO)
    this.winesService.addWine(this.addWineDTO).subscribe(response => {
      alert(`Bor sikeresen hozzáadva: ${response.name} (${response.year})`);
      this.router.navigate(['/borok']);
    }, error => {
      alert('Hiba történt');
      console.error('Error adding wine ', error);
  })
  }

  loadLocations(){
    this.locationsService.getAllLocations().subscribe(data => {
      this.locations = data;
    })
  }
}
