import { Store, select } from '@ngrx/store';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { State as BaseSettingsState } from '@app/settings';

interface State extends BaseSettingsState{}

@Component({
  selector: 'uplaod-main',
  template: '<h1>Locations</h1>',
  //styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocationsComponent implements OnInit {

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    
  }
}
