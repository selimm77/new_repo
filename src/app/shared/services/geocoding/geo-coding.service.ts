import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class GeoCodingService {
  constructor(private http: HttpClient) {
  }

  reverseGeoCode(lat, lng) {

    return this.secondReverseGeo(lat, lng);
  }

  secondReverseGeo(lat, lng) {
    return this.http.get('https://api.pitneybowes.com/location-intelligence/geocode-service/v1/transient/advanced/reverseGeocode?x='
      + lng + '&y=' + lat + '&coordSysName=EPSG%3A4326&distance=150&distanceUnits=METERS',
      {headers: {Authorization: 'Bearer OExaOIJoFueJ1pXVYxJxc5O3z5TP'}})
  }

  getAllCountriesList() {
    return this.http.get('https://restcountries.eu/rest/v2/all');
  }

  geoCodeSingleLine(country: string, fullAddress: string) {
    return this.http.post('https://api.pitneybowes.com/location-intelligence/geocode-service/v1/transient/advanced/geocode', {
        'type': 'ADDRESS',
        'preferences': {
          'maxReturnedCandidates': 1,
          'returnAllCandidateInfo': 'false',
          'preferredDictionaryOrders': [],
          'fallbackToGeographic': 'true',
          'fallbackToPostal': 'true',
          'streetOffset': 7,
          'streetOffsetUnits': 'METERS',
          'cornerOffset': 7,
          'cornerOffsetUnits': 'METERS',
          'clientLocale': 'en_US',
          'clientCoordSysName': 'EPSG:4326',
          'matchMode': 'STANDARD',
          'mustMatchFields': {
            'matchOnAddressNumber': 'false',
            'matchOnPostCode1': 'false',
            'matchOnPostCode2': 'false',
            'matchOnAreaName1': 'false',
            'matchOnAreaName2': 'false',
            'matchOnAreaName3': 'false',
            'matchOnAreaName4': 'false',
            'matchOnAllStreetFields': 'false',
            'matchOnStreetName': 'false',
            'matchOnStreetType': 'false',
            'matchOnStreetDirectional': 'false',
            'matchOnPlaceName': 'false',
            'matchOnInputFields': 'false'
          },
          'customPreferences': {
            'FALLBACK_TO_WORLD': 'true'
          },
          'returnFieldsDescriptor': {
            'returnAllCustomFields': 'false',
            'returnMatchDescriptor': 'false',
            'returnStreetAddressFields': 'false',
            'returnUnitInformation': 'false',
            'returnedCustomFieldKeys': ['']
          }
        },
        'addresses': [
          {
            'mainAddressLine': fullAddress, /*'1 Global View, Troy, NY, 12180',*/
            'country': country /* 'USA'*/
          }
        ]
      },
      {headers: {Authorization: 'Bearer OExaOIJoFueJ1pXVYxJxc5O3z5TP'}})
  }

  geoCodeMultiLines() {
    return this.http.post('https://api.pitneybowes.com/location-intelligence/geocode-service/v1/transient/advanced/geocode', {
        'type': 'ADDRESS',
        'preferences': {
          'maxReturnedCandidates': 1,
          'returnAllCandidateInfo': 'false',
          'preferredDictionaryOrders': [],
          'fallbackToGeographic': 'true',
          'fallbackToPostal': 'true',
          'streetOffset': 7,
          'streetOffsetUnits': 'METERS',
          'cornerOffset': 7,
          'cornerOffsetUnits': 'METERS',
          'clientLocale': 'en_US',
          'clientCoordSysName': 'EPSG:4326',
          'matchMode': 'STANDARD',
          'mustMatchFields': {
            'matchOnAddressNumber': 'false',
            'matchOnPostCode1': 'false',
            'matchOnPostCode2': 'false',
            'matchOnAreaName1': 'false',
            'matchOnAreaName2': 'false',
            'matchOnAreaName3': 'false',
            'matchOnAreaName4': 'false',
            'matchOnAllStreetFields': 'false',
            'matchOnStreetName': 'false',
            'matchOnStreetType': 'false',
            'matchOnStreetDirectional': 'false',
            'matchOnPlaceName': 'false',
            'matchOnInputFields': 'false'
          },
          'customPreferences': {
            'FALLBACK_TO_WORLD': 'true'
          },
          'returnFieldsDescriptor': {
            'returnAllCustomFields': 'false',
            'returnMatchDescriptor': 'false',
            'returnStreetAddressFields': 'false',
            'returnUnitInformation': 'false',
            'returnedCustomFieldKeys': [
              ''
            ]
          }
        },
        'addresses': [
          {
            'mainAddressLine': '1 Global View',
            'country': 'USA',
            'addressLastLine': '',
            'placeName': 'Pitney Bowes',
            'areaName1': 'NY',
            'areaName2': '',
            'areaName3': 'Troy',
            'areaName4': '',
            'postCode1': '12180',
            'postCode2': '',
            'addressNumber': '',
            'streetName': '',
            'unitType': '',
            'unitValue': ''
          }
        ]
      },
      {headers: {Authorization: 'Bearer OExaOIJoFueJ1pXVYxJxc5O3z5TP'}})
  }
}
