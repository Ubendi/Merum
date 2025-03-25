import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { LocationDTO, LocationsService } from '../../services/locations.service';

@Component({
  selector: 'app-location-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './location-card.component.html',
  styleUrl: './location-card.component.scss'
})

export class LocationCardComponent implements OnInit {
  @Input() location!: LocationDTO;

  constructor(
    private locationService: LocationsService,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id){
        this.locationService.getLocationById(id).subscribe(data => {
          this.location = data;
        })
      }
    })
  }
}
