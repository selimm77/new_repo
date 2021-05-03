import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@app/core';
import {selectPopUp} from '@app/dcm/store/dcm.selectors';
import {FormBuilder, FormGroup} from '@angular/forms';
import {LocationModel} from '@app/shared/popups/general-location-info-popup/models/location.model';
import {LOCATION_REFERENCE_DATA} from '@app/shared/popups/general-location-info-popup/models/location-ref-data.const';

@Component({
  selector: 'anms-tand-C',
  templateUrl: './tand-C-C.component.html',
  styleUrls: ['./tand-C-C.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TandCComponent implements OnInit {

  moreInfoForm = new FormGroup({});
  location: LocationModel = new LocationModel();
  @Input() tabModel;
  @Input() locationData;
  @Input() multiple;

  constructor(private store: Store<AppState>, private formBuilder: FormBuilder) {
    this.store.select(selectPopUp).subscribe(
      data => this.location = Object.assign({}, data.location)
    )
  }


  ngOnInit() {
    this.moreInfoForm = this.formBuilder.group({
      'yearBuilt': [this.location.yearBuilt],
      'isAggregation': [this.location.isAggregation, ],
      'numberOfStories': [this.location.numberOfStories, ],
      'numberOfBuilding': [this.location.numberOfBuilding, ],
      'largerUnitCapacity': [this.location.largestUnitCapacity, ],
    });
  }

  validateFormControl(controName: string) {
    const control = this.moreInfoForm.get(controName);
    return control.invalid && control.touched;
  }

  onSubmit() {
  }

  getReferenceData(fieldCode: string){
    return LOCATION_REFERENCE_DATA.get(fieldCode)
  }

  getPlaceHolder(item){
    switch(this.multiple[item.field_code]){
      case true : return "Multiple";
      default : return item.label
    }
    
  }


}
