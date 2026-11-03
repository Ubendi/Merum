import { Component, OnInit } from '@angular/core';
import { EbikeTourDTO, EbikeToursService } from '../../../services/ebike-tours.service';
import { EbikeTourCardComponent } from '../ebike-card/ebike-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ebike-home',
  imports: [CommonModule,EbikeTourCardComponent],
  templateUrl: './ebike-home.component.html',
  styleUrl: './ebike-home.component.scss'
})
export class EbikeHomeComponent implements OnInit {
  ebikeTours: EbikeTourDTO[] = [];

  constructor(
    private ebikeToursService: EbikeToursService
  ) {}

  ngOnInit(): void {
    this.loadEbikeTours();
  }

  loadEbikeTours(): void {
    this.ebikeToursService.getAllEbikeTours().subscribe(
      (ebikeTours: EbikeTourDTO[]) => {
        this.ebikeTours = ebikeTours;
      }
    )
  }
}
