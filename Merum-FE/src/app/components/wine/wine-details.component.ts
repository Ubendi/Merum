import { Component, Input, OnInit } from '@angular/core';
import { WineDTO, WinesService } from '../../services/wines.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-wine-details',
  standalone: true,
  imports: [],
  templateUrl: './wine-details.component.html',
  styleUrl: './wine-details.component.scss'
})


export class WineDetailsComponent implements OnInit {
  wine!: WineDTO;

  constructor(
    private winesService: WinesService,
    private route: ActivatedRoute,
    private router: Router
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
          this.router.navigate(['/wines']);
        }, error => {
          console.log('Error deleting wine:', error);
          alert('Hiba történt');
        });        
      }
    }
  }
}
