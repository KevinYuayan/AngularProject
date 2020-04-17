import { Component, OnInit } from '@angular/core';
import {MotivationDialogComponent} from '../motivation/motivation-dialog/motivation-dialog';
import {MatDialog} from '@angular/material/dialog';
import {RecordDialogComponent} from './record-dialog/record-dialog';
import {Record} from '../models/record';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css']
})
export class RecordComponent implements OnInit {
  displayedColumns: string[] = [
    'heartRate',
    'bloodPressure',
    'weight',
    'bodyTemperature',
    'respiratoryRate'
  ];
  dataSource = [];

  constructor(public dialog: MatDialog,
              private http: HttpClient,
              private router: Router) { }

  ngOnInit(): void {
    console.log(localStorage.getItem('token'));
    if (!localStorage.getItem('token')) {
      this.router.navigate(['../']);
    }
    this.loadData();
  }

  loadData() {
    let url = '';
    if (localStorage.getItem('role') === 'Patient') {
      url = environment.base_url + 'api/patient/records';
    } else {
      url = environment.base_url + 'api/records';
    }
    this.http
      .get<any>(url,
        {})
      .subscribe(res => {
        this.dataSource = res;
      });
  }

  openDialogNew() {
    const dialogRef = this.dialog.open(RecordDialogComponent, {
      data: {},
      width: '700px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let url = '';
        if (localStorage.getItem('role') === 'Nurse') {
          url = environment.base_url + 'api/records';
        } else {
          url = environment.base_url + 'api/patient/records';
        }
        this.http
          .post<any>(url, result)
          .subscribe(res => {
            this.loadData();
          });
      }
    });
  }

  isUser() {
    return localStorage.getItem('role');
  }

}
