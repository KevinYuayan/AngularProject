import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public username = '';
  public password = '';
  public firstname = '';
  public lastname = '';
  public isNurse = false;

  constructor(private http: HttpClient,
              private snackBar: MatSnackBar,
              private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.router.navigate(['../motivation']);
    }
  }

  validate() {
    if (this.username.trim().length < 5) {
      return false;
    }
    if (this.password.trim().length < 8) {
      return false;
    }
    if (this.firstname.trim().length < 3) {
      return false;
    }
    if (this.lastname.trim().length < 3) {
      return false;
    }
    return true;
  }

  navigate(route: string) {
    this.router.navigate([route]);
  }

  register() {
    this.http
      .post<any>(environment.base_url + 'api/users',
        {isNurse: this.isNurse, fistname: this.firstname, lastname: this.lastname, username: this.username, password: this.password})
      .subscribe(res => {
        if (res.username) {
          this.snackBar.open('Registration success! go to login.', '', {
            duration: 3000,
            panelClass: ['green-snackbar']
          });
        }
      },
        err => {
            this.snackBar.open('Registration failed, please try again!', '', {
              duration: 3000,
              panelClass: ['red-snackbar']
            });
        });
  }
}
