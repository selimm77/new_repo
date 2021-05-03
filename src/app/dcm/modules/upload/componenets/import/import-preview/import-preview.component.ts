import { FileData } from './../../../store/import/import.model';
import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { AppState } from '@app/core';
import { select, Store } from '@ngrx/store';
import { selectFileData } from '../../../store/import/import.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'anms-import-preview',
  templateUrl: './import-preview.component.html',
  styleUrls: ['./import-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ImportPreviewComponent implements OnInit {

  @Input() disable = false
  @Input() selectedSheet = 1
  @Input() fileData : FileData
  @Input() files = [];
  @Input() headers = [];
  @Input() data = []
  @Input() totalRecords = 0
  @Input() loading = false
  @Input() nrows = 0
  @Input() selectedFile

  selectFilename = 'defaultFile'
  @Output() sheetChanged = new EventEmitter<any>()
  @Output() fileChanged = new EventEmitter<any>()
  @Output() lazyload = new EventEmitter<any>()
  @Output() sizePageChanged = new EventEmitter<any>()
  @Output() goToLastPage = new EventEmitter<any>()
  @Output() selectSheet = new EventEmitter<any>()

  fileMetaData$: Observable<FileData>;

  public gridApi;
  fileList: File[] = [];
  listOfFiles: any[] = [];
  isFirstImport = true;

  constructor(private store: Store<AppState>) { 
    this.fileMetaData$ = this.store.pipe(select(selectFileData));

    this.fileMetaData$.subscribe((fileData: FileData) => {
      
      if (fileData) {
      if (fileData['worksheet'].length === 1) {
        this.isFirstImport = false;
        }
      }
    })
  }

  ngOnInit() {
  }

  onSelectionChanged(change)
  {
    this.sheetChanged.emit(change)
  }

  tabChanged(tabChangeEvent): void {
    // console.log('index => ', tabChangeEvent.index);
    if (tabChangeEvent.tab.textLabel && tabChangeEvent.tab.textLabel !== undefined && tabChangeEvent.tab.textLabel !== null) {
      this.fileChanged.emit(tabChangeEvent.tab.textLabel)
    }
  }

  onSelectionFileChanged($event) {
    const value = this.files[$event.value];
    if (value) {
      for (let i = 0; i < this.files.length; i++) {
        const element = this.files[i];
        if (this.files[i] === value) {
          console.log(this.files[i])
          this.fileChanged.emit(this.files[i])
        }
      }
    }
  }

  onSelectionSheet(checkedSheet) {
    this.isFirstImport = false;
    this.selectSheet.emit(checkedSheet)
  }
  
  onPageSizeChanged(newPageSize) {
    this.sizePageChanged.emit(newPageSize);
  }

  onBtLast(lastPageChanged) {
    this.goToLastPage.emit(lastPageChanged);
  }
}
