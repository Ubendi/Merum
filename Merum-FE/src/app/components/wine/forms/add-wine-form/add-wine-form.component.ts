import { Component } from '@angular/core';
import { AddWineDTO, WinesService } from '../../../../services/wines.service'; 
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-add-wine-form',
  standalone: true,
  imports: [HttpClientModule, FormsModule, RouterModule],
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

  constructor(
    private wineService: WinesService,
    private router: Router
  ){}

  onSubmit(){
    this.wineService.addWine(this.addWineDTO).subscribe(response => {
      alert(`Bor sikeresen hozzáadva: ${response.name} (${response.year})`);
      this.router.navigate(['/wines']);
    }, error => {
      alert('Hiba történt');
      console.error('Error adding wine', error);
    });
  }
}
