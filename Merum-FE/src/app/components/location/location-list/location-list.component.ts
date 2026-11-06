import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { LocationDTO, LocationsService } from '../../../services/locations.service';

import { LocationCardComponent } from '../location-card/location-card.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-location-list',
  imports: [LocationCardComponent, RouterModule],
  templateUrl: './location-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './location-list.component.scss'
})
export class LocationListComponent implements OnInit {
  private locationsService = inject(LocationsService);
  locations: LocationDTO[] = [];

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
