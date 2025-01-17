import { Component, OnInit } from '@angular/core';
import { WineCardComponent } from '../../card/wine-card.component';
import { WinesService } from '../../../../services/wines.service';
import { WineDTO } from '../../../../services/wines.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from 'express';

@Component({
  selector: 'app-wine-list',
  standalone: true,
  imports: [CommonModule, WineCardComponent,RouterModule],
  templateUrl: './wine-list.component.html',
  styleUrl: './wine-list.component.scss'
})
export class WineListComponent implements OnInit {
  wines: WineDTO[] = [];

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
      }
    )
  }
}
