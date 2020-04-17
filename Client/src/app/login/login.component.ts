import { Component, OnInit } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public username = '';
  public password = '';

  constructor(private http: HttpClient,
              private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.router.navigate(['../motivation']);
    }
  }

  navigate(route: string) {
    this.router.navigate([route]);
  }

  validate() {
    if (this.username.trim().length < 5) {
      return false;
    }
    if (this.password.trim().length < 8) {
      return false;
    }
    return true;
  }

  login() {
    // call service
    // save token in session
    // http://localhost:5000/api/signin
    this.http
      .post<any>(environment.base_url + 'api/signin',
        {username: this.username, password: this.password})
      .subscribe(res => {
        if (res.token) {
          this.snackBar.open('Login success!', '', {
            duration: 3000,
            panelClass: ['green-snackbar']
          });
          localStorage.setItem('token', res.token);
          localStorage.setItem('role', res.role);
          this.navigate('../motivation');
        } else {
          this.snackBar.open('Incorrect credentials, please try again!', '', {
            duration: 3000,
            panelClass: ['red-snackbar']
          });
        }
      });
  }
}
