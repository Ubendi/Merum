import { Component, Input, OnInit } from '@angular/core';
import { WineDTO, WinesService } from '../../../services/wines.service';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../../../services/generic/auth.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-wine-details',
  standalone: true,
  imports: [],
  templateUrl: './wine-details.component.html',
  styleUrl: './wine-details.component.scss'
})


export class WineDetailsComponent implements OnInit {
  wine!: WineDTO;
  public fileBaseUrl = environment.fileUrl;

  constructor(
    private winesService: WinesService,
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthService
  ){}

  ngOnInit(): void {
    this.loadWine();
  }

  loadWine(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id){
        this.winesService.getWineById(id).subscribe(data => {
          this.wine = data;
        })
      }
    })
  }

  deleteWine(): void{
    if(this.wine){
      const confirmed = window.confirm(`Valóban törölni szeretné: ${this.wine.name} (${this.wine.year})`)
      if(confirmed){
        this.winesService.deleteWine(this.wine.id).subscribe(() => {
          alert('Bor sikeresen törölve');
          this.router.navigate(['/borok']);
        }, error => {
          console.log('Error deleting wine:', error);
          alert('Hiba történt');
        });        
      }
    }
  }

  archiveWine(): void{
    if(this.wine){
      const confirmed = window.confirm(`Valóban archiválni szeretné: ${this.wine.name} (${this.wine.year})`)
      if(confirmed){
        this.winesService.archiveWine(this.wine.id).subscribe({
          next: response => {
            alert(`${response.name} sikeresen archiválva`);
            this.router.navigate([`/borok/${response.id}`])
            this.wine.archivedFlag = true;
          },
          error: err => {
            alert('Hiba történt');
            console.error('Error archiving wine:', err)
          }
        })
      }
    }
  }

  unarchiveWine(): void{
    if(this.wine){
      this.winesService.unarchiveWine(this.wine.id).subscribe({
        next: response => {
          alert(`${response.name} sikeresen visszaállítva`);
          this.router.navigate([`/borok/${response.id}`])
          this.wine.archivedFlag = false;
        },
        error: err => {
          alert('Hiba történt');
          console.error('Error unarchiving wine:', err)
        }
      })
    }
  }

  navigateToEditWine(wineId: number): void {
    this.router.navigate(['/borok/szerkesztes', wineId])
  }

  navigateToWines(): void {
    this.router.navigate(['/borok']);
  }
}
