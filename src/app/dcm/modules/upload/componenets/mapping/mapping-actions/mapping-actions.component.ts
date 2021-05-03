import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {MappingSavePopupComponent} from '../mapping-save-popup/mapping-save-popup.component';
import {MatDialog, MatDialogRef} from '@angular/material';
import {NotificationService} from '@app/core/notifications/notification.service';
import {MappingTemplateListPopupComponent} from '../mapping-template-list-popup/mapping-template-list-popup.component';
import {ActionGetMappingData} from '@app/dcm/modules/upload/store/mapping/mapping.actions';
import {AppState} from '@app/core';
import {Store} from '@ngrx/store';

@Component({
  selector: 'anms-mapping-actions',
  templateUrl: './mapping-actions.component.html',
  styleUrls: ['./mapping-actions.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MappingActionsComponent implements OnInit {

  constructor(public dialog: MatDialog, public notif: NotificationService, private  store: Store<AppState>) {
  }

  ngOnInit() {
  }

  onSaveClick() {
    const dialogRef: MatDialogRef<MappingSavePopupComponent> = this.dialog.open(MappingSavePopupComponent, {width: '40%'})
    dialogRef.afterClosed().subscribe(this.onTemplateSaved())
  }

  onArrowDownClick() {
    const dialogRef: MatDialogRef<MappingTemplateListPopupComponent> = this.dialog.open(MappingTemplateListPopupComponent,
      {
        height: '400px', width: '60%'});
    dialogRef.afterClosed().subscribe(this.onTemplateSelected())
  }

  onRestoreClick() {
    this.store.dispatch(new ActionGetMappingData());
    this.notif.success('Mapping updated successfully')
  }

  private onTemplateSaved(): (value: any) => void {
    return result => {
      if (result)
        this.notif.success('Template saved');
    };
  }

  private onTemplateSelected(): (value: any) => void {
    return result => {
      if (result)
        this.notif.success('Template selected');
    };
  }
}
