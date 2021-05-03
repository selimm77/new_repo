import { cleansingStage } from './../store/cleansing/cleansing.model';
export default class CleansingUtils{

  public static getNextCleansingStep(current: cleansingStage)
  {
    switch (current)
    {
      case 'STANDBY': return 'MAPPING';
      case 'MAPPING': return 'TRANSFORM';
      case 'TRANSFORM': return 'CLEANSING';
      case 'CLEANSING': return 'SNAPSHOT';
      case 'EDIT': return 'EDIT';
      default: return 'FINISH'
    }
  }
}

export const API_TO_GRID_FIELDS_MAP = {
  locationName : 'locationName',
  division : 'division',
  occupancySource : 'occupancySource',
  occupancyClass : 'occupancyClass',
  occupancySubClass : 'occupancySubClass',
  occupancyCode : 'occupancyCode',
  occupancyScheme : 'occupancyScheme',
  constructionSource : 'constructionSource',
  constructionClass : 'constructionClass',
  constructionCode : 'constructionCode',
  constructionScheme : 'constructionScheme',
  externalReference : 'externalReference',
  scorRiskID : 'scorRiskID',
  country : 'country',
  state : 'state',
  county : 'county',
  city : 'city',
  street : 'street',
  zipCode : 'zipCode',
  originalAddress : 'originalAddress',
  latitude : 'latitude',
  longitude : 'longitude',
  accuracy : 'accuracy',
  geocode : 'geocode',
  geocoder : 'geocoder',
  geocodingValidated : 'geocodingValidated',
  siteCurrency : 'siteCurrency',
  tiv : 'tiv',
  building : 'building',
  stock : 'stock',
  machinery : 'machinery',
  content : 'content',
  pbValue : 'pbValue',
  biType : 'biType',
  eip : 'eip',
  declarationPeriod : 'declarationPeriod',
  biValue : 'biValue',
  forInterest : 'forInterest',
  interest : 'interest',
  yearBuilt : 'yearBuilt',
  numberOfStories : 'numberOfStories',
  largestUnitCapacity : 'largestUnitCapacity',
  isAggregation : 'isAggregation',
  numberOfBuilding : 'numberOfBuilding',
}
