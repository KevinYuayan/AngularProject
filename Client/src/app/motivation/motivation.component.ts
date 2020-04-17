import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MotivationDialogComponent} from './motivation-dialog/motivation-dialog';
import {Motivation} from '../models/motivation';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-motivation',
  templateUrl: './motivation.component.html',
  styleUrls: ['./motivation.component.css']
})
export class MotivationComponent implements OnInit {

  displayedColumns: string[] = ['title', 'description', 'mediaLink'];
  dataSource = [];

  constructor(
    public dialog: MatDialog,
    private http: HttpClient,
    private router: Router) { }

  ngOnInit(): void {
    console.log(localStorage.getItem('token'));
    if (!localStorage.getItem('token')) {
      this.router.navigate(['../']);
    }

    this.loadData();
  }

  openDialogNew() {
    const dialogRef = this.dialog.open(MotivationDialogComponent, {
      data: {},
      width: '700px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.http
          .post<any>(environment.base_url + 'api/motivations',
            result)
          .subscribe(res => {
            this.loadData();
          });
      }
    });
  }

  loadData() {
    this.http
      .get<any>(environment.base_url + 'api/motivations',
        {})
      .subscribe(res => {
          this.dataSource = res;
        });
  }

  isNurse() {
    return localStorage.getItem('role') === 'Nurse';
  }
}
