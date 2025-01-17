import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AddWineFormComponent } from './components/wine/forms/add-wine-form/add-wine-form.component';
import { NavBarComponent } from "./components/helper/nav-bar/nav-bar-component.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'merum-fe';
}
