import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogContent, MatDialogRef } from "@angular/material/dialog";
import { MatLabel, MatFormField } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input'
import { passwordValidator } from '../../../../validators/password.validator';
import { LoginDTO } from '../../../../services/generic/auth.service';
import { AuthService } from '../../../../services/generic/auth.service';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, MatDialogContent, MatLabel, MatFormField, MatInputModule],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private authService = inject(AuthService);
  private dialogRef = inject(MatDialogRef<LoginComponent>);

  errorMessage = '';

  form = new FormGroup({
    identifier: new FormControl ('', Validators.required),
    password: new FormControl ('', [Validators.required, passwordValidator])
  })

  onSubmit(): void {
    if (this.form.valid) {
      this.onLogin();
    } 
  };

  onLogin() {
    const loginData: LoginDTO = {
      identifier: this.form.value.identifier!,
      password: this.form.value.password!
    }
    this.authService.login(loginData).subscribe({
      next: () => {
        this.dialogRef.close();
        console.log("Login successful")
      },
      error: () => {
        this.errorMessage = 'Sikertelen bejelentkezés, ellenőrizze adatait'
      }
    })
    this.authService.getToken();
  }
}
