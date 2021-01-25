import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { LoaderService } from '../../shared/loader/loader.service';
import { catchError } from 'rxjs/operators';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private loaderService: LoaderService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loaderService.hide();
    this.createFormLogin();
    window.localStorage.removeItem('token_api');
  }

  private createFormLogin() {
    this.loginForm = this.fb.group({
      user: this.fb.group({
        email: ['', Validators.compose([Validators.email])],
        password: ['', Validators.compose([Validators.required])]
      }),
    });
  }

  public getFieldError(field: string): boolean {
    const ctrl = this.loginForm.get(field);
    return !ctrl.pristine && !ctrl.valid;
  }

  public login(): void {
    this.loginForm.updateValueAndValidity();
    if (this.loginForm.invalid) {
      return;
    }
    this.loaderService.show();
    const user = this.loginForm.get('user').value as User;
    this.loginService.login(user)
      .pipe(catchError(e => {
        this.loaderService.hide();
        return [];
      }))
      .subscribe(userFull => {
        this.loaderService.hide();
        this.userService.emmitUser(userFull);
        this.router.navigate(['rentals']);
      });
  }

}
