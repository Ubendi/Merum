import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from '../auth/login/login.component';

@Component({
  selector: 'app-footer',
  imports: [MatDialogModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  constructor(private dialog: MatDialog) {};

  openLoginDialog(event: Event): void {
    event.preventDefault();
    this.dialog.open(LoginComponent, {
      width: 'auto',
      disableClose: false
    })
  }
}
