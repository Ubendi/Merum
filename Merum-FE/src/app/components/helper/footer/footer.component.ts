import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from '../auth/login/login.component';
import { AuthService } from '../../../services/generic/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [MatDialogModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  constructor(
    private dialog: MatDialog,
    private router: Router,
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
    this.router.navigate(['/']);
  }
}
