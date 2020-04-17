import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Motivation} from '../../models/motivation';
import {Alert} from '../../models/alert';


@Component({
  selector: 'app-add-motivation',
  templateUrl: './alert-dialog.html',
  styleUrls: ['./alert-dialog.css']
})
export class AlertDialogComponent {

  alert = new Alert();

  constructor(
    public dialogRef: MatDialogRef<AlertDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {}) {

  }

}
