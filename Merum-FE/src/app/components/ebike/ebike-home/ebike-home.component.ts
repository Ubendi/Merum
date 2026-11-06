import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { EbikeTourDTO, EbikeToursService } from '../../../services/ebike-tours.service';
import { EbikeTourCardComponent } from '../ebike-card/ebike-card.component';


@Component({
  selector: 'app-ebike-home',
  imports: [EbikeTourCardComponent],
  templateUrl: './ebike-home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './ebike-home.component.scss'
})
export class EbikeHomeComponent implements OnInit {
  private ebikeToursService = inject(EbikeToursService);
  ebikeTours: EbikeTourDTO[] = [];

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
