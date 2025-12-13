import { Component, OnInit } from '@angular/core';
import { LocationDTO, LocationsService } from '../../../services/locations.service';
import { CommonModule } from '@angular/common';
import { LocationCardComponent } from '../location-card/location-card.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-location-list',
  imports: [CommonModule, LocationCardComponent, RouterModule],
  templateUrl: './location-list.component.html',
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
