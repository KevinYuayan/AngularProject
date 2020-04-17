import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Motivation} from '../../models/motivation';


@Component({
  selector: 'app-add-motivation',
  templateUrl: './motivation-dialog.html',
  styleUrls: ['./motivation-dialog.css']
})
export class MotivationDialogComponent {

  motivation = new Motivation();

  constructor(
    public dialogRef: MatDialogRef<MotivationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {}) {

  }

}
