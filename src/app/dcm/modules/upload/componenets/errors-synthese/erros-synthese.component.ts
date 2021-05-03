import {Component, Input, OnInit, EventEmitter, Output, ChangeDetectorRef} from '@angular/core';
import { selectFilterErrorsByColumn } from '../../store/cleansing/cleansing.selectors';
import { Store } from '@ngrx/store';
import { AppState } from '@app/core';


@Component({
  selector: 'anms-erros-synthese',
  templateUrl: './erros-synthese.component.html',
  styleUrls: ['./erros-synthese.component.scss']
})

export class ErrosSyntheseComponent implements OnInit {
  @Input() res = null;
  @Input() responseModel = null;
  @Input() metadataModel = null;
  @Input() datacheckModel = null;

  @Output() filterErrors = new EventEmitter<any>()
  @Output() stateBoutton = new EventEmitter<boolean>()

  public activateBtn = false;
  public colId = '';

  constructor(private cdrf: ChangeDetectorRef,
    private store$: Store<AppState>) {

    this.selectFiltersData(this.store$)
  }

  private selectFiltersData(store) {
    store.select(selectFilterErrorsByColumn).subscribe((data) => {
      if (data) {
        if (data.active) {
          this.activateBtn = data.active;
          this.colId = data.contents[0]
        }
      }
    },
      () => {
        this.cdrf.detectChanges();
      });
  }

  onSelectionErrors(event) {
    if (this.activateBtn === false || this.colId !== event.target.id) {
      // console.log('= btn activated =')
      this.colId = event.target.id;
      this.activateBtn = true;
    }
    else if (this.colId === event.target.id) {
      // console.log('= btn disable =')
      this.activateBtn = false;
    }
    this.filterErrors.emit({colId: event.target.id, btnState: this.activateBtn})
  }

  ngOnInit() {
  }
}
