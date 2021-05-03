import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@app/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {LocationModel} from '@app/shared/popups/general-location-info-popup/models/location.model';
import {LOCATION_REFERENCE_DATA} from '@app/shared/popups/general-location-info-popup/models/location-ref-data.const';

@Component({
  selector: 'anms-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PricingComponent implements OnInit {

  moreInfoForm = new FormGroup({});
  location: LocationModel = new LocationModel();
  @Input() tabModel;
  marks = { 0 : 'Poor', 20: 'Below average', 35: 'Average Minus', 50: 'Average', 65: 'Average Plus', 80: 'Above Average', 100: 'Good'};
  @Input() locationData;
  @Input() mondatories;
  @Input() multiple;
  @Input() isMultipleEdit;

  constructor(private store: Store<AppState>, private formBuilder: FormBuilder) {
    // this.store.select(selectPopUp).subscribe(
    //   data => this.location = Object.assign({}, data.location)
    // )
  }

  ngOnInit() {
    this.initializeData()
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

  checkMondatory(ev: any, fieldCode) {
      if (this.mondatories[fieldCode] !== undefined ) this.mondatories[fieldCode] = !ev ;
  }

  getReferenceData(fieldCode: string){
    return LOCATION_REFERENCE_DATA.get(fieldCode)
  }

  initializeData(){
    this.tabModel.header.content[0].value = this.locationData['asset_quality'] ? this.getMarkValue(this.locationData['asset_quality']) : 0
    this.tabModel.header.content[1].value = this.locationData['bi_mitigation'] ? this.getMarkValue(this.locationData['bi_mitigation']) : 0
    this.tabModel.header.content[2].value = this.locationData['mb_quality'] ? this.getMarkValue(this.locationData['mb_quality']) : 0

  }

  getMarkValue(value){
    switch(value){
      case 'Poor' : return 0;
      case 'Below average' : return 20;
      case 'Average Minus' : return 35;
      case 'Average' : return 50;
      case 'Average Plus' : return 65;
      case 'Above Average' : return 80;
      case 'Good' : return 100;

    }
  }

  onChangeValue(item){
    this.locationData[item.field_code] = this.marks[item.value]
  }

  getPlaceHolder(item){
    switch(this.multiple[item.field_code]){
      case true : return "Multiple";
      default : return item.label
    }
    
  }
}
