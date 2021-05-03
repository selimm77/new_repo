import {MatDialog, MatDialogRef} from '@angular/material';
import {MappingTargetItem} from './../../../models/mapping/mapping-target.model';
import {selectMappingTemplate, selectMappingTarget, selectMappingId, selectMappingParameters} from './../../../store/mapping/mapping.selectors';
import {MappingTemplate} from './../../../models/mapping/mapping-template.model';
import {selectToken, selectImportObjectState} from './../../../store/import/import.selectors';
import {AppState, NotificationService} from '@app/core';
import {MappingService} from './../../../services/mapping.service';
import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable, forkJoin} from 'rxjs';
import {take} from 'rxjs/operators';
import {
  ActionMappingUpdateOneTarget,
  ActionMappingUpdateTemplate,
  ActionMappingUpdateTarget
} from '@app/dcm/modules/upload/store/mapping/mapping.actions';
import { Import } from '../../../store/import/import.model';
import { MappingParamaters } from '../../../models/mapping/mapping-paramaters.model';

@Component({
  selector: 'anms-mapping-save-popup',
  templateUrl: './mapping-save-popup.component.html',
  styleUrls: ['./mapping-save-popup.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MappingSavePopupComponent implements OnInit {

  token$: Observable<string>
  currentTemplate$: Observable<MappingTemplate[]>
  targets$: Observable<MappingTargetItem[]>
  import$: Observable<Import>
  mappingId$: Observable<string>
  parameters$: Observable<MappingParamaters>

  constructor(
    private store: Store<AppState>,
    private mappingService: MappingService,
    private notifService: NotificationService,
    private ref: MatDialogRef<any>
  ) {
    this.token$ = this.store.select(selectToken);

    this.import$ = this.store.select(selectImportObjectState);
    this.mappingId$ = this.store.select(selectMappingId);
    this.parameters$ = this.store.select(selectMappingParameters);
    this.currentTemplate$ = this.store.select(selectMappingTemplate);
    this.targets$ = this.store.select(selectMappingTarget);
  }

  loading = false

  name: string = null

  ngOnInit() {
  }

  canSave() {
    return (this.name && this.name.trim() !== '')
  }

  onSaveClick() {
    this.save()
  }

  createId(name) {
    const dt = new Date();
    return name.split(' ').join('_') + dt.getFullYear() + dt.getMonth() + dt.getDay() + dt.getTime();
  }

  save() {
    const template = new MappingTemplate(this.createId(this.name), this.name, 'demo user', new Date(), true, true);
    let data: MappingTemplate[] = [];
    this.currentTemplate$.subscribe(table => {
      table.forEach(e => {
        data = [...data, e];
      })
    });

    data.push(template);
    this.store.dispatch(new ActionMappingUpdateTemplate({template: data}));


    this.currentTemplate$ = this.store.select(selectMappingTemplate);
    forkJoin(
      this.mappingId$.pipe(take(1)),
      this.parameters$.pipe(take(1)),
      this.targets$.pipe(take(1))
    ).subscribe(([mappingId, params, targets]) => {
      this.loading = true;
      // to update here
      this.mappingService.saveMappingTemplate(template, mappingId, params, targets)
        .subscribe(res => {
          // ###== save tamplateId in store here
          this.notifService.success('Successfully Saved');
          this.ref.close();
          this.loading = false;
          this.store.dispatch(new ActionMappingUpdateTarget({ target: targets }));
        }, err => {
          this.notifService.error('Error when save');
          this.loading = false
        })
    });

  }
}
