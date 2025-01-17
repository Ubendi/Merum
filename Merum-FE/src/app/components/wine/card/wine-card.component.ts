import { Component, Input, OnInit } from '@angular/core';
import { WineDTO, WinesService } from '../../../services/wines.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wine-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wine-card.component.html',
  styleUrl: './wine-card.component.scss'
})


export class WineCardComponent implements OnInit {
  wine!: WineDTO;

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
