import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})

export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  errorMessage: string = '';
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private route: Router
    ) {}

  submitForm(): void {
    for (const i in this.loginForm.controls) {
      if (this.loginForm.controls.hasOwnProperty(i)) {
        this.loginForm.controls[i].markAsDirty();
        this.loginForm.controls[i].updateValueAndValidity();
      }
    }
    this.loading = true;
    this.login(this.loginForm.value.email, this.loginForm.value.password);
  }

  login(email: string, password: string) {
    this.auth.login(email, password).subscribe(
      response => {
        this.errorMessage = '';
        this.loading = false;
        this.route.navigate([this.auth.getRoleUrl()]);
      },
      error => {
        console.warn(error);
        this.loading = false;
        this.errorMessage = Object.values(error.error.errors).toString();
      },

    );
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['soporte@estoes.me', [Validators.required]],
      password: ['password', [Validators.required]],
      remember: [true]
    });
  }
}
