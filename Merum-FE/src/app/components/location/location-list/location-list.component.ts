import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { LocationDTO, LocationsService } from '../../../services/locations.service';

import { LocationCardComponent } from '../location-card/location-card.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-location-list',
  imports: [LocationCardComponent, RouterModule],
  templateUrl: './location-list.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './location-list.component.scss'
})
export class LocationListComponent implements OnInit {
  locations: LocationDTO[] = [];

  constructor(
    private locationsService: LocationsService
  ){}

  ngOnInit(): void {
    this.loadLocations();
  }

  loadLocations(): void {
    this.locationsService.getAllLocations().subscribe(
      (locations: LocationDTO[]) => {
        this.locations = locations;
      }
    )
  }
}
