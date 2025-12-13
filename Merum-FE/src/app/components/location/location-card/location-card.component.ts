import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { LocationDTO, LocationsService } from '../../../services/locations.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-location-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './location-card.component.html',
  styleUrl: './location-card.component.scss'
})

export class LocationCardComponent implements OnInit {
 @Input() location!: LocationDTO & {safeUrl?: SafeResourceUrl};
  safeMapUrl!: SafeResourceUrl;

  constructor(
    private locationService: LocationsService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ){}

  ngOnInit(): void {
    this.loadLocationById();
  }

  loadLocationById(): void {
     this.route.params.subscribe(params => {
      const id = params['id'];
      if (id){
        this.locationService.getLocationById(id).subscribe(
          (location: LocationDTO) => {
            this.location = {
              ...location,
              safeUrl: this.sanitizer.bypassSecurityTrustHtml(
            `https://maps.google.com/maps?q=${location.latitude}%20${location.longitude}&t=k&z=17&ie=UTF8&iwloc=&output=embed`
            )
            }
          }
        )
      }
    })
    }
  }
