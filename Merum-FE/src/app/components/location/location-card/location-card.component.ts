
import { Component, Input, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { LocationsService } from '../../../services/locations.service';
import { GrapeVarietyDTO, GrapeVarietiesService } from '../../../services/grape-varieties.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { forkJoin, map, Observable, of } from 'rxjs';
import { LocationViewModel } from '../../../models/view-models';

@Component({
  selector: 'app-location-card',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './location-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './location-card.component.scss'
})

export class LocationCardComponent implements OnInit {
  private grapeVarietyService = inject(GrapeVarietiesService);
  private locationService = inject(LocationsService);
  private route = inject(ActivatedRoute);
  private sanitizer = inject(DomSanitizer);
 @Input() location!: LocationViewModel;

    ngOnInit(): void {
      this.loadLocationById();
    }

    loadLocationById(): void {
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
