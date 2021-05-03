import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'anms-deductible-checkbox',
  templateUrl: './deductible-checkbox.component.html',
  styleUrls: ['./deductible-checkbox.component.css']
})
export class DeductibleCheckboxComponent implements OnInit {
  @Input() model: any;

  constructor() { }

  ngOnInit() {
  }

}
