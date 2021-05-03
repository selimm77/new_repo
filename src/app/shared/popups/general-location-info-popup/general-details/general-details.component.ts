import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {AppState} from '@app/core';
import {selectPopUp} from '@app/dcm/store/dcm.selectors';
import {CleansingService} from '@app/dcm/modules/upload/services/cleansing.service';
import {forkJoin} from 'rxjs';
import {LoadLoadPopUps} from '@app/shared/popups/general-location-info-popup/store-part/load-pop-up.actions';
import { LOCATION_REFERENCE_DATA } from '../models/location-ref-data.const';
import {LOCATION_FIELD_CODES_ENUM} from '@app/shared/popups/general-location-info-popup/models/location-field-codes.const';

@Component({
  selector: 'anms-general-details',
  templateUrl: './general-details.component.html',
  styleUrls: ['./general-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeneralDetailsComponent implements OnInit {
  location;
  constructionClass: any [];
  @Input() tabModel;
  @Input() locationData;
  @Input() mondatories;
  @Input() percentages;
  @Input() multiple;
  @Input() isMultipleEdit ;
  private filteredOccupancyCode: any = [];
  private filteredConstructionCode: any = [];

  constructor(private formBuilder: FormBuilder, private store$: Store<AppState>,
              private cleansingService: CleansingService,
              private cdrf: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.applyMandatoryCheck('General','accord_occupancy_class', this.locationData[LOCATION_FIELD_CODES_ENUM.occupancy_scheme] === 'ACCORD' || this.locationData[LOCATION_FIELD_CODES_ENUM.occupancy_scheme] === null);
    this.applyMandatoryCheck('General','accord_occupancy_subclass', this.locationData[LOCATION_FIELD_CODES_ENUM.occupancy_scheme] === 'ACCORD' || this.locationData[LOCATION_FIELD_CODES_ENUM.occupancy_scheme] === null);
    this.applyAutoFill(this.locationData[LOCATION_FIELD_CODES_ENUM.construction_code], LOCATION_FIELD_CODES_ENUM.construction_code);
    this.applyAutoFill(this.locationData[LOCATION_FIELD_CODES_ENUM.occupancy_code], LOCATION_FIELD_CODES_ENUM.occupancy_code);
    this.getOccupancyCodeOptions();
    if (this.locationData[LOCATION_FIELD_CODES_ENUM.accord_construction_class]) this.setConstructionCode(this.locationData[LOCATION_FIELD_CODES_ENUM.accord_construction_class]);
    this.cdrf.detectChanges();
  }

  applyMandatoryCheck(category,field_code,value){
    (this.isMultipleEdit) ? (( this.mondatories[category][field_code] !== undefined ) ?  this.mondatories[category][field_code] = value : '' ) : this.mondatories[category][field_code] = value;
  }

  onSubmit() {
  }

  activeBodyItem(label) {
    this.tabModel.body.forEach(item => item.active = item.label === label);
  }

  getReferenceData(fieldCode: any){
    let returnedData = LOCATION_REFERENCE_DATA.get(fieldCode);
    if ([LOCATION_FIELD_CODES_ENUM.occupancy_code, LOCATION_FIELD_CODES_ENUM.accord_occupancy_code].includes(fieldCode)) {
      if (this.locationData[LOCATION_FIELD_CODES_ENUM.accord_occupancy_class] || this.locationData[LOCATION_FIELD_CODES_ENUM.accord_occupancy_subclass]) {
        returnedData = this.filteredOccupancyCode;
      }
    }
    if ([LOCATION_FIELD_CODES_ENUM.construction_code, LOCATION_FIELD_CODES_ENUM.accord_construction_code].includes(fieldCode)) {
      if (this.locationData[LOCATION_FIELD_CODES_ENUM.accord_construction_class]) {
        returnedData = this.filteredConstructionCode;
      }
    }
    return returnedData;
  }

  checkMondatory(ev: any, fieldCode) {
    this.applyAutoFill(ev, fieldCode);
    if (this.mondatories['General'][fieldCode] !== undefined ) this.mondatories['General'][fieldCode] = !ev ;

   }

   applyAutoFill(ev: any, fieldCode){
     if (fieldCode === LOCATION_FIELD_CODES_ENUM.occupancy_scheme) {
       this.applyMandatoryCheck('General','accord_occupancy_class',ev === 'ACCORD' || ev === null)
       this.applyMandatoryCheck('General','accord_occupancy_subclass',ev === 'ACCORD' || ev === null)
     }
    if (fieldCode === LOCATION_FIELD_CODES_ENUM.occupancy_code) {
      this.setOccupancyCode(ev);
    }
    if (fieldCode === LOCATION_FIELD_CODES_ENUM.accord_construction_class) {
      this.setConstructionCode(ev);
    }
    if (fieldCode === LOCATION_FIELD_CODES_ENUM.construction_code && ev) {
      this.cleansingService.getCleansedDataByConstructionCode(ev).subscribe(cleansedData => {
        this.locationData['accord_construction_code'] = ev;
        this.locationData['accord_construction_class'] = cleansedData['accord_construction_class'] ? cleansedData['accord_construction_class'] : null;
        this.applyMandatoryCheck('General','accord_construction_code',false)
        this.applyMandatoryCheck('General','accord_construction_class',false)
        this.mondatories['General'] = {...this.mondatories['General']};
        if (cleansedData['accord_construction_class']) this.filteredConstructionCode = [ev];
        this.cdrf.detectChanges();
      });
    }
    if (fieldCode === LOCATION_FIELD_CODES_ENUM.accord_occupancy_class || fieldCode === LOCATION_FIELD_CODES_ENUM.accord_occupancy_subclass) {
      this.getOccupancyCodeOptions();
    }
   }

   getPlaceHolder(item){
    switch (this.multiple[item.field_code]) {
      case true : return 'Multiple';
      default : return item.label
    }

  }

  private getOccupancyCodeOptions() {
    const request = {
      oc: this.locationData['accord_occupancy_class'] || 'None',
      osc: this.locationData['accord_occupancy_subclass'] || 'None'
    };
    this.cleansingService.getOccupancyCodeByOccupancyClass(request).subscribe((data: any) => {
      if (data && data.codes && data.codes.length) {
        if (data.codes.length === 1) {
          this.setOccupancyCode(data.codes[0]);
        }
        this.filteredOccupancyCode = data.codes;
      }
      this.cdrf.detectChanges();
    });
  }

  private setOccupancyCode(value) {
    this.cleansingService.getCleansedDataByOccupancyCode(value).subscribe(cleansedData => {
      Object.keys(cleansedData).forEach(key => {
        if (key !== 'PD_Split') {
          Object.keys(cleansedData[key]).forEach(subkey => {
            if (subkey === LOCATION_FIELD_CODES_ENUM.accord_occupancy_code) {
              this.locationData['occupancy_code'] = cleansedData[key][subkey];
              this.applyMandatoryCheck('General','occupancy_code',false)
              //this.mondatories['General']['occupancy_code'] = false;
            }
            this.locationData[subkey] = cleansedData[key][subkey];
            if (this.mondatories[key][subkey] !== undefined) this.mondatories[key][subkey] = false;
          });
          this.mondatories[key] = {...this.mondatories[key]};
        } else {
          this.percentages['building_percentage'] = cleansedData[key]['building_percentage'];
          this.percentages['content_percentage'] = cleansedData[key]['content_percentage'];
        }
        this.cdrf.detectChanges();
      });
    });
  }

  private setConstructionCode(value) {
    this.cleansingService.getConstructionCodeByConstructionClass(value).subscribe((data: any) => {
      if (data && data.codes && data.codes.length) {
        if (data.codes.length === 1) {
          this.locationData[LOCATION_FIELD_CODES_ENUM.construction_code] = data.codes[0];
          this.locationData[LOCATION_FIELD_CODES_ENUM.accord_construction_code] = data.codes[0];
          this.applyMandatoryCheck('General','construction_code',false)
          this.applyMandatoryCheck('General','accord_construction_code',false)

          //this.mondatories['General']['construction_code'] = false;
          //this.mondatories['General']['accord_construction_code'] = false;
        }
        this.filteredConstructionCode = data.codes;
      }
      this.cdrf.detectChanges();
    });
  }
}
