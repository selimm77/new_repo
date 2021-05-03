import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
  ChangeDetectorRef, Input
} from '@angular/core';
import {GeoCodingService} from '@app/shared/services/geocoding/geo-coding.service';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '@app/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CleansingService} from '@app/dcm/modules/upload/services/cleansing.service';
import {AddressGeoModel} from '@app/dcm/popups/models/Address-geo.model';
import {LOCATION_REFERENCE_DATA, STATES} from '../models/location-ref-data.const';
import {LOCATION_FIELD_CODES_ENUM} from '@app/shared/popups/general-location-info-popup/models/location-field-codes.const';

declare var L: any;

@Component({
  selector: 'anms-geographical',
  templateUrl: './geographical.component.html',
  styleUrls: ['./geographical.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class GeographicalComponent implements OnInit {
  countries;
  reverseGeoCodeInfo$: Observable<any>;
  newMarker = true;
  latitude = 40.761819;
  longitude = -73.997533;
  map;
  marker;
  addressGeo: AddressGeoModel = new AddressGeoModel();
  location ;
  @ViewChild('responseMapDiv') responseMapDiv: ElementRef;
  @Input() tabModel;
  @Input() locationData;
  currentTabIndex;
  geoGraphicalForm: FormGroup ;
  @Input() mondatories;
  @Input() multiple;
  @Input() isMultipleEdit;

  constructor(private formBuilder: FormBuilder, private cdrf: ChangeDetectorRef,
              private cleansingService: CleansingService,
              private geoCodingService: GeoCodingService, private store$: Store<AppState>) {
  }

  renderRasterMap() {
    const mapOptions = {};
    if (!this.map) {
      this.map = L.map(this.responseMapDiv.nativeElement, mapOptions);
    }
    const zoom = 12;
    this.map.setView([this.latitude, this.longitude], zoom);
    if (this.newMarker) {
      this.marker = L.marker([this.latitude, this.longitude], {draggable: true}).addTo(this.map);
    }

    const apiKey = 'hAFiqsGeyuy1iEKAfbg3yIfoNAipaewo';
    const requestUri = 'https://api.pitneybowes.com/location-intelligence/geomap/v1/tile/osm/{z}/{x}/{y}.png?api_key='
      + apiKey + '&theme=bronze';
    const tileLayer = L.tileLayer(requestUri,
      {attribution: '<a target="_blank" href="http://www.openstreetmap.org/copyright">&copy; OpenStreetMap contributors</a>'});
    this.map.addLayer(tileLayer);
  }

  ngOnInit() {
  }

  geoCode(type, country, address) {
    switch (type) {
      case 'single':
        this.geoCodingService.geoCodeSingleLine(country, address).subscribe(data => {
          this.getCordinates(data);
          /* this.map.removeLayer(this.marker);
           this.renderRasterMap();*/
          this.newMarker = false;
          this.renderRasterMap();
        });
        break;
      case 'multi':
        this.geoCodingService.geoCodeMultiLines().subscribe(data => console.log(data))
    }
    /*
        this.renderRasterMap();
    */
    this.cdrf.detectChanges();
  }

  reverseGeoCode(lat, lng) {
    this.reverseGeoCodeInfo$ = this.geoCodingService.reverseGeoCode(lat, lng);
    this.geoCodingService.reverseGeoCode(lat, lng).subscribe(data => {
      this.addressGeo.fullAddress = this.returnFullAddress(data);
      this.fillAllFieldsReverseGeoCode(data);
      this.cdrf.detectChanges()
    });
  }

  allCountriesList() {
    this.cleansingService.getCountries().subscribe((data: any) => {
      // console.log(data.countries)
      if (data) this.countries = data.countries;
      if (!this.cdrf['destroyed']) {
        this.cdrf.detectChanges();
      }
    });
  }

  returnFullAddress(data: any) {
    if (data.candidates[0].formattedStreetAddress !== undefined && data.candidates[0].formattedLocationAddress !== undefined)
      return data.candidates[0].formattedStreetAddress + ' ' + data.candidates[0].formattedLocationAddress;
    return '';
  }

  getCordinates(data) {
    this.longitude = data.responses[0].candidates[0].geometry.coordinates[0];
    this.latitude = data.responses[0].candidates[0].geometry.coordinates[1];
    const newLatLng = new L.LatLng(this.latitude, this.longitude);
    this.marker.setLatLng(newLatLng);
  }

  fillAllFieldsReverseGeoCode(data) {
    this.addressGeo.state = data.candidates[0].address.areaName3;
    this.addressGeo.city = data.candidates[0].address.areaName3;
    this.addressGeo.country = data.candidates[0].address.country;
    this.addressGeo.country = data.candidates[0].address.country;
    this.addressGeo.county = data.candidates[0].address.areaName2;
    this.addressGeo.street = data.candidates[0].address.streetName;
    this.addressGeo.zipCode = data.candidates[0].address.postCode1;
  }


  validateFormControl(controName: string) {
    const control = this.geoGraphicalForm.get(controName);
    return control.invalid && control.touched;
  }

  onSubmit() {
  }

  getReferenceData(fieldCode: string){
    if (fieldCode === LOCATION_FIELD_CODES_ENUM.cleansed_state) return STATES[this.locationData[LOCATION_FIELD_CODES_ENUM.cleansed_country]] || [];
    return LOCATION_REFERENCE_DATA.get(fieldCode)
  }

  checkMondatory(ev: any, fieldCode) {
      if (this.mondatories[fieldCode] !== undefined ) this.mondatories[fieldCode] = !ev ;
    if (fieldCode === LOCATION_FIELD_CODES_ENUM.cleansed_country) {
      this.cleansingService.getDataByCountry(ev).subscribe((data: any) => {
        this.locationData[LOCATION_FIELD_CODES_ENUM.cleansed_iso2] = data.ISO2 || null;
        this.locationData[LOCATION_FIELD_CODES_ENUM.cleansed_iso3] = data.ISO3 || null;
        // this.locationData[LOCATION_FIELD_CODES_ENUM.cleansed_latitude] = data.Latitude || '';
        // this.locationData[LOCATION_FIELD_CODES_ENUM.cleansed_longitude] = data.Longitude || '';
        this.cdrf.detectChanges();
      })
    }
  }

  getPlaceHolder(item){
    switch(this.multiple[item.field_code]){
      case true : return "Multiple";
      default : return item.label
    }

  }

}
