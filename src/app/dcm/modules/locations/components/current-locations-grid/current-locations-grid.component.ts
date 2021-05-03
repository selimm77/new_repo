import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'anms-current-locations-grid',
  templateUrl: './current-locations-grid.component.html',
  styleUrls: ['./current-locations-grid.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrentLocationsGridComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
