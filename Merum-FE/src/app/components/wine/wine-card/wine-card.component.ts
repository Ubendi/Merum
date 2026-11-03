import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { WineDTO, WinesService } from '../../../services/wines.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-wine-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './wine-card.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './wine-card.component.scss'
})


export class WineCardComponent implements OnInit {
  @Input() wine!: WineDTO;

  public fileBaseUrl = environment.fileUrl;

  constructor(
    private winesService: WinesService,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id){
        this.winesService.getWineById(id).subscribe(data => {
          this.wine = data;
        })
      }
    })
  }
}
