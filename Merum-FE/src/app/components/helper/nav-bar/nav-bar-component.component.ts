import { Component, ChangeDetectionStrategy } from '@angular/core';

import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './nav-bar-component.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './nav-bar-component.component.scss'
})
export class NavBarComponent {
  
}
