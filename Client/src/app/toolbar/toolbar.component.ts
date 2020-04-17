import { Component, OnInit } from '@angular/core';
import {Route, Router} from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigate(route: string) {
    this.router.navigate([route]);
  }

  logout() {
    localStorage.setItem('token', '');
    localStorage.setItem('role', '');
    this.navigate('../');
  }

  getRole() {
    return localStorage.getItem('role');
  }

  isPatient() {
    return localStorage.getItem('role') === 'Patient';
  }
}
