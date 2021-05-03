import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'anms-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridComponent implements OnInit {

  constructor() { }

  dataSource = new MatTableDataSource<any>(data);

  displayedColumns = ['username','age','tile']

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.paginator._changePageSize(20)
    this.dataSource.paginator = this.paginator;
  }
}

let data=[
  {username:"user",age:Math.random(),tile:'title'},
  {username:"user",age:Math.random(),tile:'title'},
  {username:"user",age:Math.random(),tile:'title'},
  {username:"user",age:Math.random(),tile:'title'},
  {username:"user",age:Math.random(),tile:'title'},
  {username:"user",age:Math.random(),tile:'title'},
  {username:"user",age:Math.random(),tile:'title'},
  {username:"user",age:Math.random(),tile:'title'},
  {username:"user",age:Math.random(),tile:'title'},
  {username:"user",age:Math.random(),tile:'title'},
  {username:"user",age:Math.random(),tile:'title'},
  {username:"user",age:Math.random(),tile:'title'},
  {username:"user",age:Math.random(),tile:'title'},
  {username:"user",age:Math.random(),tile:'title'},
  {username:"user",age:Math.random(),tile:'title'},
  {username:"user",age:Math.random(),tile:'title'},
  {username:"user",age:Math.random(),tile:'title'},
  {username:"user",age:Math.random(),tile:'title'},
  {username:"user",age:Math.random(),tile:'title'},
  {username:"user",age:Math.random(),tile:'title'},
  {username:"user",age:Math.random(),tile:'title'},
  {username:"user",age:Math.random(),tile:'title'},
  {username:"user",age:Math.random(),tile:'title'},
  {username:"user",age:Math.random(),tile:'title'},
  {username:"user",age:Math.random(),tile:'title'},
  {username:"user",age:Math.random(),tile:'title'},
  {username:"user",age:Math.random(),tile:'title'},
  {username:"user",age:Math.random(),tile:'title'},
  {username:"user",age:Math.random(),tile:'title'},
  {username:"user",age:Math.random(),tile:'title'},
  {username:"user",age:Math.random(),tile:'title'},
  {username:"user",age:Math.random(),tile:'title'}
]