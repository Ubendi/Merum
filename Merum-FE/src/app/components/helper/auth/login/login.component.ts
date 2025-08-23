import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogContent } from "@angular/material/dialog";
import { MatLabel, MatFormField } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input'
import { passwordValidator } from '../../../../validators/password.validator';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, MatDialogContent, MatLabel, MatFormField, MatInputModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  form = new FormGroup({
    identifier: new FormControl ('', Validators.required),
    password: new FormControl ('', [Validators.required, passwordValidator])
  })

  onSubmit(): void {
    if (this.form.valid) {
      console.log("Form submitted", this.form.value)
    } else {
      console.log("Form not submitted")
    }
  };
}
