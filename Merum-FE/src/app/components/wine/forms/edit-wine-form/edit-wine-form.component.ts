import { Component, OnInit } from '@angular/core';
import { LocationDTO, LocationsService } from '../../../../services/locations.service';
import { UpdateWineDTO, WineDTO, WinesService } from '../../../../services/wines.service';
import { UploadService } from '../../../../services/generic/upload.service';
import { ActivatedRoute, Route, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
  updateWineDTO!: UpdateWineDTO;

  constructor(
    private winesService: WinesService,
    private locationsService: LocationsService,
    private uploadService: UploadService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ){}


  ngOnInit(): void {
    this.wineId = +this.activatedRoute.snapshot.paramMap.get('id')!;
    this.locationsService.getAllLocations().subscribe(data => {this.locations = data});
    this.winesService.getWineById(this.wineId).subscribe( data => {
      this.updateWineDTO = this.winesService.wineDtoToUpdateWineDto(data)
    })
  }

  onSubmit() {
    this.winesService.updateWine(this.updateWineDTO).subscribe(response => {
      alert(`${response.name} sikeresen szerkesztve`)
      this.router.navigate([`/borok/${response.id}`])
    }, error => {
      alert('Hiba történt');
      console.error('Error updating wine:', error)
    })
  }
  
}
