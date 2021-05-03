import {selectHeaderState, selectSidenavState} from './../../../settings/settings.selectors';
import {Store, select} from '@ngrx/store';
import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {AppState, routeAnimations, selectAuth, selectRouterState} from '@app/core';
import {State as BaseSettingsState} from '@app/settings';
import {GeoCodingService} from '@app/shared/services/geocoding/geo-coding.service';
import {selectImported} from '@app/dcm/modules/upload/store/import/import.selectors';
import { selectCleansingCsMetadata } from '@app/dcm/modules/upload/store/cleansing/cleansing.selectors';

interface State extends BaseSettingsState {
}

@Component({
  selector: 'dcm-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [routeAnimations],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit {

  isAuthenticated$: Observable<boolean>;
  isheaderOpen$: Observable<boolean>;
  isSidenavOpen$: Observable<boolean>;
  currentRoute$: Observable<any>;
  csMetadata$: Observable<any>;
  uploaded$: Observable<boolean>
  files = ['10G00180P','2G374688J'];
  routes = [
    {link: 'upload', label: 'To Upload'},
    {link: 'locations', label: 'Current Locations'},
    {link: 'matching', label: 'Matching'},
  ];

  constructor(private store: Store<AppState>) {
    this.currentRoute$ = this.store.pipe(select(selectRouterState));
    this.uploaded$ = this.store.pipe(select(selectImported));

  }
  isMapping(currentRoute ){
return (/*currentRoute.state.url === '/dcm/upload' || currentRoute.state.url === '/dcm/upload/import' || currentRoute.state.url === '/dcm/upload/mapping'|| */
  currentRoute.state.url === '/dcm/upload/locations'||  currentRoute.state.url === '/dcm/upload/dashboard' )
  }
  showStepper(currentRoute) {
    return (currentRoute.state.url === '/dcm/upload/import' || currentRoute.state.url === '/dcm/upload/mapping' ||  currentRoute.state.url === '/dcm/upload/cleansing' )
  }
  showSidenav(currentRoute ){
return (currentRoute.state.url === '/dcm/upload/import' || currentRoute.state.url === '/dcm/upload/mapping' || currentRoute.state.url === '/dcm/upload/cleansing' )
  }
  ngOnInit(): void {
    this.isAuthenticated$ = this.store.pipe(
      select(selectAuth),
      map(auth => auth.isAuthenticated)
    );

    this.isheaderOpen$ = this.store.pipe(select(selectHeaderState));
    this.csMetadata$ = this.store.pipe(select(selectCleansingCsMetadata));
    this.isSidenavOpen$ = this.store.pipe(select(selectSidenavState));
  }
}
