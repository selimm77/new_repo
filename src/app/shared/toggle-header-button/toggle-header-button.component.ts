import { ActionSettingsToggleHeader, ActionSettingsToggleSidenav } from './../../settings/settings.actions';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { selectHeaderState } from '@app/settings';
import { take } from 'rxjs/operators';
import { AppState } from '@app/core';

@Component({
  selector: 'anms-toggle-header-button',
  templateUrl: './toggle-header-button.component.html',
  styleUrls: ['./toggle-header-button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToggleHeaderButtonComponent implements OnInit {

  isheaderOpen$: Observable<boolean>;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.isheaderOpen$ = this.store.pipe( select( selectHeaderState ) )
  }

  toggleFocusMode()
  {
    this.isheaderOpen$.pipe(take(1)).subscribe(state => {
        this.store.dispatch( new ActionSettingsToggleHeader({ open: !state }) )
        this.store.dispatch( new ActionSettingsToggleSidenav({ open: !state}) )
    })
  }
}
