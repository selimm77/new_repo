import { Injectable, Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';


@Injectable({
  providedIn: 'root'
})

export class PopupService {

  config: MatSnackBarConfig = {
    duration: 2000,
    horizontalPosition: 'right',
    verticalPosition: 'top'
  }

  constructor(public dialog: MatDialog , public snackbar: MatSnackBar) {}

  openDialog(component: any, options: any, callback: any): MatDialogRef<any> {
    const dialogRef = this.dialog.open(component, options);

    dialogRef.afterClosed().subscribe(callback);

    return dialogRef;
  }

  
  warn(msg){
    this.config['panelClass'] = ['notification', 'warn'];
    this.snackbar.open(msg, '', this.config);

  }

 success(msg){
    this.config['panelClass'] = ['notification', 'success'];
    this.snackbar.open(msg, '', this.config);

  }

}
