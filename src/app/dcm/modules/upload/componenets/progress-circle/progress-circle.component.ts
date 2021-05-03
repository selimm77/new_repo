import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'anms-progress-circle',
  templateUrl: './progress-circle.component.html',
  styleUrls: ['./progress-circle.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressCircleComponent implements OnInit {

  @Input() label: string = "Label"
  @Input() value: number = 100

  @Input() color = 'accent';
  mode = 'determinate';
  diameter : number = 18
  strokeWidth : number = 2

  constructor() { }

  ngOnInit() {
  }

}
