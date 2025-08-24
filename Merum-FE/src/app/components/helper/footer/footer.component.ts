import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from '../auth/login/login.component';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-footer',
  imports: [MatDialogModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  constructor(
    private dialog: MatDialog,
    public authService: AuthService
  ) {};

  openLoginDialog(event: Event): void {
    event.preventDefault();
    this.dialog.open(LoginComponent, {
      width: 'auto',
      disableClose: false
    })
  }

  logOut(event: Event): void {
    event.preventDefault();
    localStorage.removeItem('token');
    console.log("Logout successful");
    alert("Sikeres kijelentkezés");
  }
}
