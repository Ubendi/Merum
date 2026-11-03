import { Component, ChangeDetectionStrategy } from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private authService: AuthService, private dialogRef: MatDialogRef<LoginComponent>) {}

  errorMessage: string = '';

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
      next: (res => {
        this.dialogRef.close();
        console.log("Login successful")
      }),
      error: (err => {
        this.errorMessage = 'Sikertelen bejelentkezés, ellenőrizze adatait'
      })
    })
    this.authService.getToken();
  }
}
