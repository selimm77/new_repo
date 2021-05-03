import {ActionImportReset} from './../../modules/upload/store/import/import.actions';
import {ActionSettingsToggleSidenav} from './../../../settings/settings.actions';
import {IMPORT_NAVIGATION} from './../../utils/enums/navigation.enum';
import {Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, BehaviorSubject, ReplaySubject} from 'rxjs';
import {Store, select} from '@ngrx/store';
import {selectRouterState, AppState} from '@app/core/core.state';
import {StepperSelectionEvent} from '@angular/cdk/stepper';
import {take, filter} from 'rxjs/operators';
import {selectSidenavState} from '../../../settings/settings.selectors';
import {ActionMappingReset, ActionMappingUpdateTemplate} from '@app/dcm/modules/upload/store/mapping/mapping.actions';
import {ActionCleansingReset} from '@app/dcm/modules/upload/store/cleansing/cleansing.actions';
import {selectUpload} from '@app/dcm/store/dcm.selectors';
import {UploadState} from '@app/dcm/modules/upload/store/upload/upload.state';
import {element} from 'protractor';
import {MappingService} from '@app/dcm/modules/upload/services/mapping.service';
import {MappingTemplate, MappingTemplateViewModel} from '@app/dcm/modules/upload/models/mapping/mapping-template.model';
import {selectImported, selectToken} from '@app/dcm/modules/upload/store/import/import.selectors';

@Component({
  selector: 'anms-header-stepper',
  templateUrl: './header-stepper.component.html',
  styleUrls: ['./header-stepper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderStepperComponent implements OnInit {
  uploadState$;
  canNavigate$: BehaviorSubject<IMPORT_NAVIGATION> = new BehaviorSubject(-1);
  imported$: ReplaySubject<any> = new ReplaySubject(1);
  checkedFileImported: ReplaySubject<number> = new ReplaySubject(1);

  constructor(public store: Store<AppState>, private router: Router, private servicemapping: MappingService) {

    this.store.select(selectUpload).subscribe(
      data => {
        if (data.import.import.selectedSheets !== undefined && data.import.import.selectedSheets.checkedIds !== undefined ) {
          this.checkedFileImported.next(data.import.import.selectedSheets.checkedIds.length)
        }
        else {
          this.checkedFileImported.next(1)
        }
        this.canNavigate$.next(data.mapping.mandataryItems);
        this.imported$.next(data.import.import.imported)
      }
    );

  }

  @Output() toggleDrawerClick = new EventEmitter<any>()

  isSidenavOpen$: Observable<boolean>;

  currentRoute$: Observable<any> = this.store.pipe(select(selectRouterState));
  step$: BehaviorSubject<IMPORT_NAVIGATION> = new BehaviorSubject(-1);
  stepValue = 0

  showRoute() {

  }

  ngOnInit() {
    this.step$.pipe().subscribe(step => {
      this.stepValue = step;
      console.log(step);
    })
    this.isSidenavOpen$ = this.store.pipe(select(selectSidenavState))
    this.currentRoute$.pipe(filter(route => route)).subscribe((route) => {
      const phase = route.state.url.split('/').pop()
      switch (phase) {
        case 'import':
          this.step$.next(IMPORT_NAVIGATION.IMPORT);
          break;
        case 'mapping':
          this.step$.next(IMPORT_NAVIGATION.MAPPING);
          break;
        case 'cleansing':
          this.step$.next(IMPORT_NAVIGATION.CLEANSING);
          break;
        default :
          this.step$.next(-1)
      }
    })
  }

  onSelectionChange(event: StepperSelectionEvent) {
    this.navigateToStep(event.selectedIndex)
  }

  navigateToStep(step: number) {
    if (step < 0) this.navigateToExit()
    if (this.stepValue >= step) {
      switch (step) {
        case IMPORT_NAVIGATION.IMPORT:
          // this.cancelUpload()
          this.router.navigate(['dcm/upload/import']);
          break;
        case IMPORT_NAVIGATION.MAPPING:
          this.router.navigate(['dcm/upload/mapping']);
          break;
        case IMPORT_NAVIGATION.CLEANSING:
          this.router.navigate(['dcm/upload/cleansing']);
          break;
      }
    }
  }

  navigateToExit() {
    this.router.navigate(['dcm/upload']);
  }
}
