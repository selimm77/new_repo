import {ChangeDetectorRef, Component, OnInit, Output, EventEmitter} from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import { AppState } from '@app/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FileModel } from '../../../models/import/file-model';
import { ActionSelectedSheets, ActionUpdateWorkFiles } from '../../../store/import/import.actions';
import { SheetModel } from '../../../store/import/import.model';
import { selectedSheets, selectImportObjectState, selectWorkFiles } from '../../../store/import/import.selectors';

@Component({
  selector: 'anms-navbar-import',
  templateUrl: './import-navbar.component.html',
  styleUrls: ['./import-navbar.component.scss']
})

export class ImportNavbarComponent  implements OnInit{
  @Output() selectionSheet = new EventEmitter<any>()

  public task: FileModel[];
  private workFiles$: Observable<FileModel[]>

  constructor(private store: Store<AppState>, private cdrf: ChangeDetectorRef) {
    this.workFiles$ = this.store.select(selectWorkFiles);
  }

  ngOnInit() {
  this.workFiles$.subscribe((data: FileModel[]) => {
    if (data !== undefined) {
      const newTask = this.setWorkFiles(data);
      this.task = newTask;
    }
  })
  }

  allComplete: boolean = true;

  updateAllComplete() {
    for (let t = 0; t < this.task.length; t++) {
      const element = this.task[t];
      this.allComplete = this.task[t].sheet != null && this.task[t].sheet.every(t => t.checked);
    }
    this.valide(this.task);
  }

  someComplete(): boolean {
    for (let tsk = 0; tsk < this.task.length; tsk++) {
      if (this.task[tsk].sheet == null) {
        return this.task[tsk].checked && !this.allComplete;
        // return false;
      }
      return this.task[tsk].sheet.filter(t => t.checked).length > 0 && !this.allComplete;
    }
  }

  setAll(checked: boolean, checkedIndex: number) {
    if (this.task[checkedIndex].checked) {
      this.task[checkedIndex].checked = false;
      checked = false;
    }
    else {
      this.task[checkedIndex].checked = true;
      checked = true;
    }
      if (this.task[checkedIndex].sheet == null) {
            return;
          }
          if (this.task[checkedIndex].sheet.length > 0) {
            this.task[checkedIndex].sheet.forEach(t => t.checked = checked);
          }
          this.valide(this.task);
    // this.valide();
  }

  setAllTree(checked: boolean) {
    for (let tsk = 0; tsk < this.task.length; tsk++) {
      this.allComplete = checked;
      this.task[tsk].checked = checked
          if (this.task[tsk].sheet == null) {
            return;
          }
          this.task[tsk].sheet.forEach(t => t.checked = checked);
    }
    this.valide(this.task);
  }

  valide(files) {
    // const files = this.task;
    const checkedNameSheet = [];
    const checkedIdSheet = [];
    const listOfFiles = [];
    const objectFiles = {};
    for (const [key1, value1] of Object.entries(files)) {
      const listOfSheets = [];
      if (value1['sheet'].length > 0){
        listOfFiles.push(value1['name']);
        for (const [key2, value2] of Object.entries(value1['sheet'])) {
          if (value2['checked']) {
            listOfSheets.push(value2['name']);
            checkedIdSheet.push(value2['id']);
            checkedNameSheet.push(value2['name']);
          }
        }
        objectFiles[value1['name']] = listOfSheets;
      }
      else {
        if (value1['checked']) {
          checkedIdSheet.push(value1['id']);
          checkedNameSheet.push(value1['name']);
        }
      }
    }
    const checkedFile : SheetModel = {
      checkedIds: checkedIdSheet,
      checkedNames: checkedNameSheet,
      allfiles: objectFiles
    }
    this.store.dispatch(new ActionUpdateWorkFiles({workFiles: this.task, sheetsModel: checkedFile}))
  }

  public getCheckedFile(files) {
    const fileM : FileModel[] = [];
    for (const [key1, value1] of Object.entries(files)) {
      const fileModel = new FileModel(key1, value1['file_id'], 'accent', true);
      if (value1['excel']){
        const subFileModelTemp : FileModel[] = [];
        for (const [key2, value2] of Object.entries(value1['worksheets_map'])) {
          const subFileModel : FileModel = new FileModel(key2, value2.toString(), 'primary', true);
          fileModel.addSheet(subFileModel);
        }
      }
      else {
        const subFileModelTemp : FileModel[] = [];
          const subFileModel : FileModel = new FileModel(key1, value1.toString(), 'primary', true);
          fileModel.addSheet(subFileModel);
      }
      fileM.push(fileModel);
    }
    return fileM;
  }

  setWorkFiles(workfiles) {
    const fileM : FileModel[] = [];
    for (let i = 0; i < workfiles.length; i++) {
      const value1 = workfiles[i];
      const fileModel = new FileModel(value1['name'], value1['id'], value1['color'], value1['checked']);
      for (let j = 0; j < value1['sheet'].length; j++) {
        const value2 = value1['sheet'][j];
        const subFileModel : FileModel = new FileModel(value2['name'], value2['id'], value2['color'], value2['checked']);
        fileModel.addSheet(subFileModel);
      }
      fileM.push(fileModel);
    }
   return fileM
  }

  onClickFile(event: MouseEvent, fileName) {
    event.preventDefault();

  }

  onClickSheet(event: MouseEvent, taskName: string, subtaskName: string) {
    event.preventDefault();
    this.selectionSheet.emit({file: taskName, sheet: subtaskName});
  }
}
