import { Component, OnInit } from '@angular/core';
import { WineCardComponent } from '../card/wine-card.component';
import { WinesService } from '../../../services/wines.service';
import { WineDTO } from '../../../services/wines.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSelectModule, MatOption } from '@angular/material/select'
import { FormsModule, NgModel } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-wine-list',
  standalone: true,
  imports: [CommonModule, WineCardComponent, RouterModule, MatSelectModule, FormsModule],
  templateUrl: './wine-list.component.html',
  styleUrl: './wine-list.component.scss',
  animations: [
    trigger('fadeWineList', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.1s ease-in-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('0.0s ease-in-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class WineListComponent implements OnInit {
  wines: WineDTO[] = [];
  allWines: WineDTO[] = [];
  grapeVarieties: string[] = [];
  locations: string [] = [];
  years: number [] = [];
  yearsWithAllSelector: (number|string) [] = [];
  selectedGrapeVariety?: string;
  selectedYear?: (number|string);
  selectedLocation?: string;

  constructor(
    private winesService: WinesService,
    public authService: AuthService
  ){}

  ngOnInit(): void {
    this.loadWines();
  }
  
  loadWines(): void {
    this.winesService.getAllWines().subscribe(
      (wines: WineDTO[]) => {
        this.wines = wines;
        this.mapArrays();
        this.allWines = this.wines;
      }
    )
  }

  mapArrays(): void {
    this.years = [...new Set(this.wines.map(wine => wine.year))]
    this.locations = ['Összes',...new Set(this.wines.map(wine => wine.location.name))]
    this.selectedLocation = 'Összes';
    this.grapeVarieties = ['Összes',...new Set(this.wines.map(wine => wine.grapeVariety.name))]
    this.selectedGrapeVariety = 'Összes';
    this.years.sort((a, b) => b - a);
    this.yearsWithAllSelector = ['Összes',...this.years]
    this.selectedYear = 'Összes';
  }

  trackWine(index: number, wine: WineDTO){
    return wine.id;
  }
  
  //TO FIX: all wines flash before correct list is displayed
  onFilterChanged() {
    this.wines = this.allWines.filter((wine) =>
      (this.selectedLocation === 'Összes' || wine.location.name === this.selectedLocation) &&
      (this.selectedGrapeVariety === 'Összes' || wine.grapeVariety.name === this.selectedGrapeVariety) &&
      (this.selectedYear === 'Összes' || wine.year === Number(this.selectedYear))
    );
  }
}
