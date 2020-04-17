import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Record} from '../../models/record';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-add-motivation',
  templateUrl: './record-dialog.html',
  styleUrls: ['./record-dialog.css']
})
export class RecordDialogComponent {

  record = new Record();
  patients: any;

  constructor(
    public dialogRef: MatDialogRef<RecordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {},
    private http: HttpClient) {

    this.http
      .get<any>(environment.base_url + 'api/patients',
        {})
      .subscribe(res => {
        this.patients = res;
      });

  }

  isNurse() {
    return localStorage.getItem('role') === 'Nurse';
  }

}
