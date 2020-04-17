import { Component, OnInit } from '@angular/core';
import {Symptom} from '../models/symptom';
import {MedicalCondition} from '../models/medicalCondition';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';

@Component({
  selector: 'app-medical-condition',
  templateUrl: './medical-condition.component.html',
  styleUrls: ['./medical-condition.component.css']
})
export class MedicalConditionComponent implements OnInit {

  public symptomsFull: Symptom[] = [
    {id: '12', title: 'Cold', description: 'desc 1'},
    {id: '14', title: 'Fever', description: 'desc 2'},
    {id: '16', title: 'Throat pain', description: 'desc 3'},
    {id: '17', title: 'Hot', description: 'desc 5'},
    ];

  public symptomsSelected: Symptom[];

  public medicalConditionsFromApi: MedicalCondition[] = [
    {id: '43', title: 'Corona', description: 'desc 1'},
    {id: '1342', title: 'Gas', description: 'desc 2'},
    {id: '15346', title: 'Constipation', description: 'desc 3'},
    {id: '13247', title: 'Diharea', description: 'desc 5'},
  ];

  displayedColumns: string[] = ['title', 'description'];
  dataSource = this.medicalConditionsFromApi;

  constructor(public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    console.log(localStorage.getItem('token'));
    if (!localStorage.getItem('token')) {
      this.router.navigate(['../']);
    }
  }

}
