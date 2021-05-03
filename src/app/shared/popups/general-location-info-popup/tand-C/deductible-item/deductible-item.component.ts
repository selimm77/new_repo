import {Component, Input, OnInit} from '@angular/core';
import {LOCATION_REFERENCE_DATA} from '@app/shared/popups/general-location-info-popup/models/location-ref-data.const';

@Component({
  selector: 'anms-deductible-item',
  templateUrl: './deductible-item.component.html',
  styleUrls: ['./deductible-item.component.css']
})
export class DeductibleItemComponent implements OnInit {
  @Input() model: any;
  @Input() locationData;

  constructor() { }

  ngOnInit() {
  }

  getReferenceData(fieldCode: string){
    return LOCATION_REFERENCE_DATA.get(fieldCode)
  }

}
