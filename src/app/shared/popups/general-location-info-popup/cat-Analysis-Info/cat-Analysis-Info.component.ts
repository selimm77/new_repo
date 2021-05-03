import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@app/core';
import {selectPopUp} from '@app/dcm/store/dcm.selectors';
import {FormBuilder, FormGroup} from '@angular/forms';
import {LocationModel} from '@app/shared/popups/general-location-info-popup/models/location.model';

@Component({
  selector: 'anms-cat-Analysis-Info',
  templateUrl: './cat-Analysis-Info.component.html',
  styleUrls: ['./cat-Analysis-Info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatAnalysisInfoComponent implements OnInit {

  moreInfoForm = new FormGroup({});
  location: LocationModel = new LocationModel();
  @Input() tabModel;
  @Input() locationData;
  @Input() multiple;

  constructor(private store: Store<AppState>, private formBuilder: FormBuilder) {
    // this.store.select(selectPopUp).subscribe(
    //   data => this.location = Object.assign({}, data.location)
    // )
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

  chooseColor(colors: any[], choice) {
    colors.forEach(el => el.checked = el.color === choice);
  }
  getPlaceHolder(item){
    switch(this.multiple[item.field_code]){
      case true : return "Multiple";
      default : return item.label
    }

  }

}
