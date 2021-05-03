import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'anms-progress-list',
  templateUrl: './progress-list.component.html',
  styleUrls: ['./progress-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
