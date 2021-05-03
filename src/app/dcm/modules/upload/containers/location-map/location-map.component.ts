import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AppState} from '../../../../../core/index';
import {Store} from '@ngrx/store';
import {selectLocationMap} from '../../../../store/dcm.selectors';
import {Observable} from 'rxjs';
import {selectDcm} from '../../../../store/dcm.state';
import {LoadLocationMaps} from '@app/dcm/modules/upload/containers/location-map/store-part/location-map.actions';
import {LocationMapState} from '@app/dcm/modules/upload/containers/location-map/store-part/location-map.reducer';

declare var L: any;

@Component({
  selector: 'location-map-component',
  template: `
    <!-- The first Modal -->
    <button nz-button [nzType]="'primary'" (click)="showModal()"><span>Show Modal</span></button>
    <nz-modal [(nzVisible)]="locationMap.loaded" nzTitle="Modal Location" (nzOnCancel)="handleCancel()"
              (nzOnOk)="handleOk()">
      <div>
        <div style="position: relative; width: 500px; height: 400px;">
          <div #responseMapDiv style="position: absolute; width:100%; height:100%;"></div>
          <div style="position: absolute; bottom: 0px; z-index: 4;"><img
            src="https://developer2.pitneybowes.com/en/pitneyboweslogo.png"/></div>
        </div>
      </div>
    </nz-modal>
  `,
  styles: [`
    ::ng-deep .ant-modal-content {
      width: 548px !important;
    }
  `]
})
export class LocationMapComponent implements OnInit {
  @ViewChild('responseMapDiv') responseMapDiv: ElementRef;
  newMarker = true;
  latitude = 40.761819;
  longitude = -73.997533;
  map;
  marker;
  locationMap = new LocationMapState();
  locationMapState$: Observable<any>;

  constructor(private store: Store<AppState>, private cdrf: ChangeDetectorRef) {
    this.locationMap.loaded = false;
    this.locationMapState$ = this.store.select(selectLocationMap);
    this.locationMapState$.subscribe(data => {
      this.locationMap = Object.assign({}, data)
    }, () => {
    }, () => {

    })
  }

  ngOnInit() {/*
    const markerChangeHandler: any = (e) => {

      this.latitude = e.target._latlng.lat;
      this.longitude = e.target._latlng.lng;
      this.cdrf.detectChanges();
    };*/
    this.renderRasterMap();
    // this.marker.on('dragend', markerChangeHandler);
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

  showModal(): void {
  }

  handleOk(): void {
    this.locationMap.loaded = false;
    this.store.dispatch(new LoadLocationMaps(this.locationMap))
  }

  handleCancel(): void {
    this.locationMap.loaded = false;
    this.store.dispatch(new LoadLocationMaps(this.locationMap))
  }
}
