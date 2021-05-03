import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'anms-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainContainerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
