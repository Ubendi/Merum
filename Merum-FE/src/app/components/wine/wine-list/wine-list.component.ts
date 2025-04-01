import { Component, OnInit } from '@angular/core';
import { WineCardComponent } from '../card/wine-card.component';
import { WinesService } from '../../../services/wines.service';
import { WineDTO } from '../../../services/wines.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSelectModule, MatOption } from '@angular/material/select'

@Component({
  selector: 'app-wine-list',
  standalone: true,
  imports: [CommonModule, WineCardComponent, RouterModule, MatSelectModule, MatOption],
  templateUrl: './wine-list.component.html',
  styleUrl: './wine-list.component.scss'
})
export class WineListComponent implements OnInit {
  wines: WineDTO[] = [];
  grapeVarieties: string[] = [];
  locations: string [] = [];
  years: number[] = [];

  constructor(
    private winesService: WinesService
  ){}

  ngOnInit(): void {
    this.loadWines();
  }
  
  loadWines(): void {
    this.winesService.getAllWines().subscribe(
      (wines: WineDTO[]) => {
        this.wines = wines;
        this.mapArrays();
      }
    )
  }

  mapArrays(): void {
    this.years = [...new Set(this.wines.map(wine => wine.year))]
    this.locations = [...new Set(this.wines.map(wine => wine.location.name))]
    this.grapeVarieties = [...new Set(this.wines.map(wine => wine.grapeVariety.name))]
    this.years.sort((a, b) => b - a);
  }

  onFilterChanged(){
    
  }

}
