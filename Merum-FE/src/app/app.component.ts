import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from "./components/helper/nav-bar/nav-bar-component.component";
import { trigger, transition, style, animate } from '@angular/animations';
import { FooterComponent } from "./components/helper/footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        style({opacity: 0}),
        animate('0.2s ease-in-out', style({opacity: 1}))
      ])
    ])
  ]
})
export class AppComponent {
  title = 'merum-fe';
}
