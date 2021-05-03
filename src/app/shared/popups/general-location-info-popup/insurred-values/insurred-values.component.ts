import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppState} from '@app/core';
import {Store} from '@ngrx/store';
import {selectPopUp} from '@app/dcm/store/dcm.selectors';
import {CleansingService} from '@app/dcm/modules/upload/services/cleansing.service';
import {
  LOCATION_REFERENCE_DATA,
  UNITVALUES
} from '@app/shared/popups/general-location-info-popup/models/location-ref-data.const';
import {LOCATION_FIELD_CODES_ENUM} from '@app/shared/popups/general-location-info-popup/models/location-field-codes.const';
import {UnitPipePipe} from '@app/shared/popups/general-location-info-popup/pipes/unit-pipe.pipe';

@Component({
  selector: 'anms-insurred-values',
  templateUrl: './insurred-values.component.html',
  styleUrls: ['./insurred-values.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InsurredValuesComponent implements OnInit {
  curr: any;
  insuredValueForm = new FormGroup({});
  location;
  currencies;
  @Input() tabModel;
  @Input() locationData;
  @Input() mondatories;
  @Input() percentages;
  @Input() multiple;
  @Input() isMultipleEdit;
  pdSplitVisibility = false;
  pdSplitValue = false;

  constructor(private formBuilder: FormBuilder, private store: Store<AppState>, private unitPipe: UnitPipePipe,
              private cleansingService: CleansingService,
              private cdrf: ChangeDetectorRef) {
  }

  ngOnInit() {
    console.log('tabModel => ')
    console.log(this.tabModel)
    this.store.select(selectPopUp).subscribe(
      data => {
        this.location = Object.assign({}, data.location)
        if (this.location) {
          this.insuredValueForm.reset({
            'site_currency': this.location.site_currency,
            'tiv_amount': this.location.tiv_amount,
            'building_value': this.location.building_value,
            'stock_value': this.location.stock_value,
            'machinery_value': this.location.machinery_value,
            'content_value': this.location.content_value,
            'pd_value': this.location.pd_value,
            'indemnity_period_eip': this.location.indemnity_period_eip,
            'bi_declaration_period': this.location.bi_declaration_period,
            'bi_value': this.location.bi_value,
            'bi_type': this.location.bi_type,
            'for_interest': this.location.for_interest,
            'interest': this.location.interest,
          })
          if (!this.cdrf['destroyed']) {
            this.cdrf.detectChanges();
          }

        }

      }
    );

  }

  onSubmit() {
  }

  sumTiv() {
    this.insuredValueForm.controls['tiv_amount'].setValue(+this.insuredValueForm.value.bi_value + (+this.insuredValueForm.value.pd_value))
  }

  contentSum() {
    this.insuredValueForm.controls['content_value'].setValue(+this.insuredValueForm.value.machinery_value + (+this.insuredValueForm.value.stock_value))
  }

  getReferenceData(fieldCode: string){
    return LOCATION_REFERENCE_DATA.get(fieldCode)
  }

  getPlaceHolder(item){
    switch (this.multiple[item.field_code]){
      case true : return 'Multiple';
      default : return item.label
    }

  }

  checkMondatory(ev: any, fieldCode, parentField?) {
    
      if (this.mondatories[fieldCode] !== undefined ) this.mondatories[fieldCode] = !ev ;
    if (fieldCode === LOCATION_FIELD_CODES_ENUM.tiv_unit) {
      this.applyValuesChanges('unit', ev);
      this.applyUnit(this.locationData[fieldCode] || 'One', ev || 'One');
    }
    if (fieldCode === LOCATION_FIELD_CODES_ENUM.tiv_currency) this.applyValuesChanges('currency', ev);
    if (fieldCode === LOCATION_FIELD_CODES_ENUM.pd_value) {
      this.setPdSplitValue(true, true);
      this.setPercentages(ev);
    }
    if (fieldCode === LOCATION_FIELD_CODES_ENUM.bi_value || fieldCode === LOCATION_FIELD_CODES_ENUM.pd_value) {
      this.setTivAmount();
    }
    if (fieldCode === LOCATION_FIELD_CODES_ENUM.stock_value || fieldCode === LOCATION_FIELD_CODES_ENUM.machinery_value) {
      this.setContentValue();
    }
    if (fieldCode === LOCATION_FIELD_CODES_ENUM.content_value || fieldCode === LOCATION_FIELD_CODES_ENUM.building_value || fieldCode === LOCATION_FIELD_CODES_ENUM.other_structure) {
      this.setPdValue();
    }
    if (fieldCode.includes('unit') && fieldCode !== LOCATION_FIELD_CODES_ENUM.tiv_unit) {
      this.applySpecificUnit(this.locationData[fieldCode] || 'One', ev || 'One', parentField)
    }
    this.cdrf.detectChanges();
  }

  applyValuesChanges(type, value) {
    this.locationData[LOCATION_FIELD_CODES_ENUM['building_' + type]] = value;
    this.locationData[LOCATION_FIELD_CODES_ENUM['stock_' + type]] = value;
    this.locationData[LOCATION_FIELD_CODES_ENUM['machinery_' + type]] = value;
    this.locationData[LOCATION_FIELD_CODES_ENUM['other_structure_' + type]] = value;
    this.locationData[LOCATION_FIELD_CODES_ENUM['content_' + type]] = value;
    this.locationData[LOCATION_FIELD_CODES_ENUM['pd_value_' + type]] = value;
    this.locationData[LOCATION_FIELD_CODES_ENUM['bi_value_' + type]] = value;
    this.applyMandatoryCheck('bi_value_' + type,!value);
    this.applyMandatoryCheck('pd_value_'+ type,!value);
  }

  private setTivAmount() {
    const biValue = this.locationData['bi_value'] ? this.locationData['bi_value'] : 0;
    const pdValue = this.locationData['pd_value'] ? this.locationData['pd_value'] : 0;
    this.locationData['tiv_amount'] = Number.parseFloat(biValue) + Number.parseFloat(pdValue);
    this.applyMandatoryCheck('tiv_amount',false);
  }

  private setContentValue() {
    const stockValue = this.locationData['stock_value'] ? this.locationData['stock_value'] : 0;
    const machineryValue = this.locationData['machinery_value'] ? this.locationData['machinery_value'] : 0;
    this.locationData['content_value'] = Number.parseFloat(stockValue) + Number.parseFloat(machineryValue);
    this.setPdValue();
  }

  private setPdValue() {
    const contentValue = this.locationData['content_value'] ? this.locationData['content_value'] : 0;
    const buildingValue = this.locationData['building_value'] ? this.locationData['building_value'] : 0;
    const otherStructureValue = this.locationData['other_structure'] ? this.locationData['other_structure'] : 0;
    this.locationData['pd_value'] = Number.parseFloat(contentValue) + Number.parseFloat(buildingValue) + Number.parseFloat(otherStructureValue);
    this.setPdSplitValue(true, false);
    this.applyMandatoryCheck('pd_value',false);
    this.setTivAmount();
  }

  private setPdSplitValue(visibility: boolean, value: boolean) {
    this.pdSplitVisibility = visibility;
    this.pdSplitValue = value;
  }

  private setPercentages(value) {
    this.locationData['content_value'] = this.percentages['content_percentage'] ? value * Number.parseFloat(this.percentages['content_percentage']) : 0;
    this.locationData['building_value'] = this.percentages['building_percentage'] ? value * Number.parseFloat(this.percentages['building_percentage']) : 0;
  }

  private applyUnit(oldVal, newVal) {
    if (this.locationData['content_value']) this.locationData['content_value'] = this.locationData['content_value'] / UNITVALUES[oldVal] * UNITVALUES[newVal];
    if (this.locationData['content_value']) this.locationData['content_value'] = this.locationData['content_value'] / UNITVALUES[oldVal] * UNITVALUES[newVal];
    if (this.locationData['building_value']) this.locationData['building_value'] = this.locationData['building_value'] / UNITVALUES[oldVal] * UNITVALUES[newVal];
    if (this.locationData['pd_value']) this.locationData['pd_value'] = this.locationData['pd_value'] / UNITVALUES[oldVal] * UNITVALUES[newVal];
    if (this.locationData['bi_value']) this.locationData['bi_value'] = this.locationData['bi_value'] / UNITVALUES[oldVal] * UNITVALUES[newVal];
    if (this.locationData['other_structure']) this.locationData['other_structure'] = this.locationData['other_structure'] / UNITVALUES[oldVal] * UNITVALUES[newVal];
    if (this.locationData['machinery_value']) this.locationData['machinery_value'] = this.locationData['machinery_value'] / UNITVALUES[oldVal] * UNITVALUES[newVal];
    if (this.locationData['stock_value']) this.locationData['stock_value'] = this.locationData['stock_value'] / UNITVALUES[oldVal] * UNITVALUES[newVal];
    if (this.locationData['tiv_amount']) this.locationData['tiv_amount'] = this.locationData['tiv_amount'] / UNITVALUES[oldVal] * UNITVALUES[newVal];
  }

  private applySpecificUnit(oldVal, newVal, type) {
    if (this.locationData[type]) this.locationData[type] = this.locationData[type] / UNITVALUES[oldVal] * UNITVALUES[newVal];
    if (type === LOCATION_FIELD_CODES_ENUM.pd_value) {
      this.setPdSplitValue(true, true);
      this.setPercentages(this.locationData[type]);
    }
    if (type === LOCATION_FIELD_CODES_ENUM.bi_value || type === LOCATION_FIELD_CODES_ENUM.pd_value) {
      this.setTivAmount();
    }
    if (type === LOCATION_FIELD_CODES_ENUM.stock_value || type === LOCATION_FIELD_CODES_ENUM.machinery_value) {
      this.setContentValue();
    }
    if (type === LOCATION_FIELD_CODES_ENUM.content_value || type === LOCATION_FIELD_CODES_ENUM.building_value || type === LOCATION_FIELD_CODES_ENUM.other_structure) {
      this.setPdValue();
    }
  }
  applyMandatoryCheck(field_code,value){
    (this.isMultipleEdit) ? (( this.mondatories[field_code] !== undefined ) ?  this.mondatories[field_code] = value : '' ) : this.mondatories[field_code] = value;
  }
}
