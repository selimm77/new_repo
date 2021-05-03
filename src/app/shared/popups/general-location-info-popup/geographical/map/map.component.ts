// import {Component, Input, ViewChild, NgZone, OnInit} from '@angular/core';
// import {MapsAPILoader, AgmMap} from '@agm/core';
// import {GoogleMapsAPIWrapper} from '@agm/core/services';
//
// declare var google: any;
//
// interface Marker {
//   lat: number;
//   lng: number;
//   label?: string;
//   draggable: boolean;
// }
//
// interface Location {
//   lat: number;
//   lng: number;
//   viewport?: Object;
//   zoom: number;
//   address_level_1?: string;
//   address_level_2?: string;
//   address_country?: string;
//   address_zip?: string;
//   address_state?: string;
//   marker?: Marker;
// }
//
// @Component({
//   selector: 'anms-map',
//   templateUrl: './map.component.html',
//   styleUrls: ['./map.component.scss']
// })
// export class MapComponent implements OnInit {
//   geocoder: any;
//   public location: Location = {
//     lat: 51.678418,
//     lng: 7.809007,
//     marker: {
//       lat: 51.678418,
//       lng: 7.809007,
//       draggable: true
//     },
//     zoom: 5
//   };
//
//   @ViewChild(AgmMap) map: AgmMap;
//
//   constructor(public mapsApiLoader: MapsAPILoader,
//               private zone: NgZone,
//               private wrapper: GoogleMapsAPIWrapper) {
//     this.mapsApiLoader = mapsApiLoader;
//     this.zone = zone;
//     this.wrapper = wrapper;
//     this.mapsApiLoader.load().then(() => {
//       this.geocoder = new google.maps.Geocoder();
//     });
//   }
//
//   ngOnInit() {
//     this.location.marker.draggable = true;
//   }
//
//   findLocation(address) {
//     if (!this.geocoder) this.geocoder = new google.maps.Geocoder()
//     this.geocoder.geocode({
//       'address': address
//     }, (results, status) => {
//       if (status === google.maps.GeocoderStatus.OK) {
//         // decompose the result
//       } else {
//         alert('Sorry, this search produced no results.');
//       }
//     })
//   }
//
//   decomposeAddressComponents(addressArray) {
//     if (addressArray.length === 0) return false;
//     const address = addressArray[0].address_components;
//
//     for (const element of address) {
//       if (element.length === 0 && !element['types']) continue
//
//       if (element['types'].indexOf('street_number') > -1) {
//         this.location.address_level_1 = element['long_name'];
//         continue;
//       }
//       if (element['types'].indexOf('route') > -1) {
//         this.location.address_level_1 += ', ' + element['long_name'];
//         continue;
//       }
//       if (element['types'].indexOf('locality') > -1) {
//         this.location.address_level_2 = element['long_name'];
//         continue;
//       }
//       if (element['types'].indexOf('administrative_area_level_1') > -1) {
//         this.location.address_state = element['long_name'];
//         continue;
//       }
//       if (element['types'].indexOf('country') > -1) {
//         this.location.address_country = element['long_name'];
//         continue;
//       }
//       if (element['types'].indexOf('postal_code') > -1) {
//         this.location.address_zip = element['long_name'];
//         continue;
//       }
//     }
//   }
// }
