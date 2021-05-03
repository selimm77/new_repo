import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef
} from '@angular/core';
import {MappingSourceItem} from '../../../models/mapping/mapping-source.model';
import {MatDialogRef, MatDialog} from '@angular/material';
import {MappingLibraryPopupComponent} from '../mapping-library-popup/mapping-library-popup.component';
import {AppState} from '@app/core';
import {Store} from '@ngrx/store';
import {selectImportState} from '@app/dcm/modules/upload/store/import/import.selectors';
// import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'anms-mapping-source',
  templateUrl: './mapping-source.component.html',
  styleUrls: ['./mapping-source.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MappingSourceComponent implements OnInit {
  data: any = [];
  data$: any = [];
  headers: string[];
  constructor(private dialog: MatDialog, private cdrf: ChangeDetectorRef, private store: Store<AppState>) {
    this.store.select(selectImportState).subscribe(
      data => {
        if (data.import.fileData.document) {
if (data.import.fileData.document['headers'] !== undefined) {
          this.headers = data.import.fileData.document['headers']
        }
        }
        
          this.data$ = data.import['data']
        
      }
    )
  }

  @Input() items: MappingSourceItem[] = [];
  @Input() mapped: {};

  @Output() dragItemChanged = new EventEmitter<MappingSourceItem>();
  showBooksArray: any[] = [];

  ngOnInit() {
    if (this.items !== undefined) {
      this.items.forEach(elem => {
      const show = false;
      this.showBooksArray.push(show);
    })
    }
    
  }

  onLibraryClick(source: MappingSourceItem) {
    const dialogRef: MatDialogRef<MappingLibraryPopupComponent> = this.dialog.open(MappingLibraryPopupComponent, {
      data: source,
      width: '70%'
    })
  }

  showBook(i) {
    this.showBooksArray[i] = true;
  }

  hideBook(i) {
    this.showBooksArray[i] = false;
  }

  sortBy(items) {
    const itemsSorted = items.slice().sort(( a , b ) => a.viewValue > b.viewValue ? 1 : -1)
    return itemsSorted;
  }
  
  getData(item) {
    const j = this.headers.indexOf(item)
    const elements = [];
    let str = '';
    if (this.data$) {
      this.data$.slice(0, 10).forEach((ele, ind) => {
        str += ele[j] + '\n';
      })
    }
    // console.log(str)
    return str;
  }
  /* drop(event: CdkDragDrop<{title: string, poster: string}[]>) {
    moveItemInArray(this.sortBy(this.items), event.previousIndex, event.currentIndex);
  } */
}
