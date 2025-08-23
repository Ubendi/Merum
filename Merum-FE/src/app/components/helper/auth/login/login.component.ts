import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogContent } from "@angular/material/dialog";
import { MatLabel, MatFormField } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input'
import { passwordValidator } from '../../../../validators/password.validator';
import { LoginDTO } from '../../../../services/auth.service';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, MatDialogContent, MatLabel, MatFormField, MatInputModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private authService: AuthService) {}

  form = new FormGroup({
    identifier: new FormControl ('', Validators.required),
    password: new FormControl ('', [Validators.required, passwordValidator])
  })

  onSubmit(): void {
    if (this.form.valid) {
      console.log("Form submitted", this.form.value)
      this.onLogin();
    } else {
      console.log("Form not submitted")
    }
  };

  onLogin() {
    const loginData: LoginDTO = {
      identifier: this.form.value.identifier!,
      password: this.form.value.password!
    }
    this.authService.login(loginData).subscribe({
      next: (res => {
        console.log("Login successful", res)
      }),
      error: (err => {
        console.error("Login failed", err)
      })
    })
    this.authService.getToken();
  }
}
