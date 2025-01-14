import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AddWineFormComponent } from './components/wine/add-wine-form/add-wine-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AddWineFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'merum-fe';
}
