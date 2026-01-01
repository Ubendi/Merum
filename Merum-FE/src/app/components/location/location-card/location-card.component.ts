import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { LocationDTO, LocationsService } from '../../../services/locations.service';
import { GrapeVarietyDTO, GrapeVarietiesService } from '../../../services/grape-variety.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { LocationViewModel } from '../../../models/view-models';
import { P } from '@angular/cdk/portal-directives.d-DbeNrI5D';

@Component({
  selector: 'app-location-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './location-card.component.html',
  styleUrl: './location-card.component.scss'
})

export class LocationCardComponent implements OnInit {
 @Input() location!: LocationViewModel;

    constructor(
      private grapeVarietyService: GrapeVarietiesService,
      private locationService: LocationsService,
      private route: ActivatedRoute,
      private sanitizer: DomSanitizer
    ){}

    ngOnInit(): void {
      this.loadLocationByIdPlain();
    }

    loadLocationByIdPlain(): void {
      this.route.params.subscribe(params => {
        const id = params['id'];
        if (id) {
          this.locationService.getLocationById(id).subscribe(
            data => {this.location = data}
          )
        };
      })
      this.getGrapeVarietyNamesString(this.location.grapeVarietyEntityIds).subscribe(names => {
        this.location.grapeVarietyNames = names;
      })
      this.location.safeUrl=this.getMapSafeUrl(this.location.latitude, this.location.longitude);
    }

    loadLocationByIdExtended(): void {
      this.route.params.subscribe(params => {
        const id = params['id'];
        if (id) {
          this.locationService.getLocationById(id).subscribe(data => {
            this.location = {
              ...data,
              safeUrl: this.getMapSafeUrl(data.latitude, data.longitude)
            };
            this.getGrapeVarietyNamesString(data.grapeVarietyEntityIds).subscribe(names => {
              this.location.grapeVarietyNames = names;
            });
          });
        }
      });
    }


    getMapSafeUrl(lat: string, lng: string): SafeResourceUrl {
      return this.sanitizer.bypassSecurityTrustResourceUrl(
        `https://maps.google.com/maps?q=${lat},${lng}&t=k&z=17&ie=UTF8&iwloc=&output=embed`
      );
    }

    getGrapeVarietyNamesString(ids?: number[]): Observable<string> {
      if (!ids || ids.length === 0) {
        return of('');  
      }
      const requests = ids.map(id => this.grapeVarietyService.getGrapeVarietyById(id));
      return forkJoin(requests).pipe(
        map((varieties: GrapeVarietyDTO[]) => 
          varieties.map(v => v.name).join(', ')
        )
    )}

  }
