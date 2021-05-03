import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'anms-advanced-list',
  templateUrl: './advanced-list.component.html',
  styleUrls: ['./advanced-list.component.css']
})
export class AdvancedListComponent implements OnInit {
@Input()fields
  @Output() getoperation = new EventEmitter()
  constructor() { }

  ngOnInit() {
  }
selectTarget(target){
  this.getoperation.emit(target)
}
}
