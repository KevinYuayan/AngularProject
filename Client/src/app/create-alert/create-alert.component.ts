import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {MotivationDialogComponent} from '../motivation/motivation-dialog/motivation-dialog';
import {environment} from '../../environments/environment';
import {Alert} from '../models/alert';
import {AlertDialogComponent} from './alert-dialog/alert-dialog';

@Component({
  selector: 'app-create-alert',
  templateUrl: './create-alert.component.html',
  styleUrls: ['./create-alert.component.css']
})
export class CreateAlertComponent implements OnInit {

  displayedColumns: string[] = ['title', 'description'];
  dataSource = [];

  constructor(
    public dialog: MatDialog,
    private http: HttpClient,
    private router: Router) { }

  ngOnInit(): void {
    console.log(localStorage.getItem('role'));
    if (!localStorage.getItem('token')) {
      this.router.navigate(['../']);
    }

    this.loadData();
  }

  openDialogNew() {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      data: {},
      width: '700px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.http
          .post<any>(environment.base_url + 'api/alerts',
            result)
          .subscribe(res => {
            this.loadData();
          });
      }
    });
  }

  loadData() {
    if (this.isNurse()) {
      this.http
        .get<any>(environment.base_url + 'api/alerts',
          {})
        .subscribe(res => {
          console.log(res);
          this.dataSource = res;
        });
    } else {
      this.http
        .get<any>(environment.base_url + 'api/patient/alerts',
          {})
        .subscribe(res => {
          console.log(res);
          this.dataSource = res;
        });
    }
  }

  isNurse() {
    return localStorage.getItem('role') === 'Nurse';
  }

}
