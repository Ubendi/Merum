import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from '../auth/login/login.component';
import { AuthService } from '../../../services/generic/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [MatDialogModule, RouterModule],
  templateUrl: './footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  private dialog = inject(MatDialog);
  private router = inject(Router);
  public authService = inject(AuthService);

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
