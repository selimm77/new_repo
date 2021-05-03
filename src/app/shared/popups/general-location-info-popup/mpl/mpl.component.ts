import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@app/core';
import {selectPopUp} from '@app/dcm/store/dcm.selectors';
import {FormBuilder, FormGroup} from '@angular/forms';
import {LocationModel} from '@app/shared/popups/general-location-info-popup/models/location.model';
import {LOCATION_REFERENCE_DATA} from '@app/shared/popups/general-location-info-popup/models/location-ref-data.const';
import {LOCATION_FIELD_CODES_ENUM} from '@app/shared/popups/general-location-info-popup/models/location-field-codes.const';

@Component({
  selector: 'anms-mpl',
  templateUrl: './mpl.component.html',
  styleUrls: ['./mpl.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MplComponent implements OnInit {

  moreInfoForm = new FormGroup({});
  location: LocationModel = new LocationModel();
  @Input() tabModel;
  @Input() locationData;
  @Input() mondatories;
  @Input() multiple;
  @Input() isMultipleEdit;

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


  checkMondatory(ev: any, fieldCode) {
    if (fieldCode === LOCATION_FIELD_CODES_ENUM.mpl_pd_value) {
      this.locationData['mpl_pd_percentage'] = (this.locationData['pd_value'] && this.locationData['pd_value'] !== 0) ? ev / this.locationData['pd_value']  * 100 : 0 ;
      this.applyMandatoryCheck('mpl_pd_percentage')
    }
    if (fieldCode === LOCATION_FIELD_CODES_ENUM.mpl_bi_value) {
      this.locationData['mpl_bi_percentage'] = (this.locationData['pd_value'] && this.locationData['pd_value'] !== 0) ? ev / this.locationData['pd_value']  * 100 : 0 ;
      this.applyMandatoryCheck('mpl_bi_percentage')
    }
    if (fieldCode === LOCATION_FIELD_CODES_ENUM.mpl_pd_percentage) {
      this.locationData['mpl_pd_value'] = this.locationData['pd_value'] ? (this.locationData['pd_value'] * ev / 100) : 0 ;
      this.applyMandatoryCheck('mpl_pd_value')
    }
    if (fieldCode === LOCATION_FIELD_CODES_ENUM.mpl_bi_percentage) {
      this.locationData['mpl_bi_value'] = this.locationData['bi_value'] ? (this.locationData['bi_value'] * ev / 100) : 0 ;
      this.applyMandatoryCheck('mpl_bi_value');
    }
  
      if (this.mondatories[fieldCode] !== undefined ) this.mondatories[fieldCode] = !ev ;
   
  }

  applyMandatoryCheck(field_code){
    (this.isMultipleEdit) ? (( this.mondatories[field_code] !== undefined ) ?  this.mondatories[field_code] = false : '' ) : this.mondatories[field_code] = false;
  }

  getPlaceHolder(item){
    switch(this.multiple[item.field_code]){
      case true : return "Multiple";
      default : return item.label
    }
    
  }


}
