import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { EbikeTourDTO, EbikeToursService } from '../../../services/ebike-tours.service';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-ebike-tour-card',
  imports: [RouterModule],
  templateUrl: './ebike-card.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './ebike-card.component.scss',
})
export class EbikeTourCardComponent implements OnInit {
  @Input() ebikeTour!: EbikeTourDTO;

  public fileBaseUrl = environment.fileUrl;

  constructor(
    private ebikeToursService: EbikeToursService,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.loadEbikeTourById();
    console.log(this.ebikeTour)
  }

  loadEbikeTourById() {
    this.route.params.subscribe(params => {
      const id = params["id"];
      if(id){
        this.ebikeToursService.getEbikeTourById(id).subscribe(
          data => {this.ebikeTour = data}
        )
      }
    })
  }
}
