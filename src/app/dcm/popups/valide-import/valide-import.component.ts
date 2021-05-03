import {ChangeDetectionStrategy, Inject, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppState} from '@app/core';
import {Store} from '@ngrx/store';
import {selectPopUp} from '@app/dcm/store/dcm.selectors';
import {CleansingService} from "@app/dcm/modules/upload/services/cleansing.service";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
    selector: 'valide-import',
  templateUrl: './valide-import.component.html',
  styleUrls: ['./valide-import.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
  })
  export class ValideImport {
    message: string = ""
    cancelButtonText = "Cancel"
    constructor(
      @Inject(MAT_DIALOG_DATA) private data: any,
      private dialogRef: MatDialogRef<ValideImport>) {
      if (data) {
        this.message = data.message || this.message;
        if (data.buttonText) {
          this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
        }
      }
      this.dialogRef.updateSize('300vw','300vw')
    }
  
    onConfirmClick(): void {
      this.dialogRef.close(true);
    }
  }