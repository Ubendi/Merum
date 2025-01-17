import { Component } from '@angular/core';
import { AddWineDTO, WinesService } from '../../../../services/wines.service'; 
import { HttpClientModule } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { response } from 'express';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-add-wine-form',
  standalone: true,
  imports: [HttpClientModule, FormsModule],
  templateUrl: './add-wine-form.component.html',
  styleUrl: './add-wine-form.component.scss'
})
export class AddWineFormComponent {
  addWineDTO: AddWineDTO = {
    name: 'Test',
    year: 2023,
    alcohol: 12.3,
    locationEntityId: 1,
    picturePath: ''
  };

  constructor(private wineService: WinesService){}

  onSubmit(){
    this.wineService.addWine(this.addWineDTO).subscribe(response => {
      console.log('Wine added succesfully', response);
    }, error => {
      console.error('Error adding wine', error);
    });
  }
}
