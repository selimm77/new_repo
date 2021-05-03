import {AppState} from '@app/core/core.state';
import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {Store} from '@ngrx/store';
import {ActionSettingsToggleSidenav} from '../../../settings/settings.actions';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'anms-sidenav',
  templateUrl: './sidenav-upload.component.html',
  styleUrls: ['./sidenav-upload.component.scss'],
  // templateUrl: './sidenav.component.html',
  // styleUrls: ['./sidenav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidenavComponent implements OnInit {

  constructor(public store: Store<AppState>, private cdrf: ChangeDetectorRef) {
  }
  isExpanded = false;
  element: HTMLElement;

  activated = 'upload';
  routes = [
    {link: 'upload', path: 'assets/icons/upload.png', icon: 'book', label: 'To Upload'},
    {link: 'locations', path: 'assets/icons/locations.png', icon: 'calculator', label: 'Current Locations'},
    {link: 'matching', path: 'assets/icons/matching.png', icon: 'magic', label: 'Matching'},
  ];

  ngOnInit() {
  }

  toggleActive(event:any){
    event.preventDefault();
    if(this.element !== undefined){
      this.element.style.backgroundColor = "white";
    } 
    var target = event.currentTarget;
    target.style.backgroundColor = "#e51282";
    this.element = target;
  }
  
  onCloseDrawerClick() {
    this.store.dispatch(new ActionSettingsToggleSidenav({open: false}))
  }

  changeActivated(tab) {
    this.activated = tab;
  }
}
