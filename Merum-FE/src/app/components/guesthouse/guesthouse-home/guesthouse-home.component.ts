import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, inject } from '@angular/core';
import { register } from 'swiper/element/bundle'
import { environment } from '../../../../environments/environment';
import { GuesthouseService } from '../../../services/guesthouse.service';

register();

@Component({
  selector: 'app-guesthouse-home',
  imports: [],
  templateUrl: './guesthouse-home.component.html',
  styleUrl: './guesthouse-home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GuesthouseHomeComponent implements OnInit {
  private guesthouseService = inject(GuesthouseService);
  guesthouseImages: string[]=[];
  public picturePath: string = environment.fileUrl+'/Pics/Guesthouse/'

  ngOnInit(): void {
    this.loadGuesthouseImages();
  }

  loadGuesthouseImages(): void {
    this.guesthouseService.getAllGuesthouseImages().subscribe(data => {
      this.guesthouseImages = data;
      console.log(this.guesthouseImages);
    })
  }
}
