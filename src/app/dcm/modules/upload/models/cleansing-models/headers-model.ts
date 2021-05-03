/*
    // metadata header form
    {
  headers: [{
    categoryName,
    fieldName,
    fieldCode,
    fieldOrder,
    fieldType,
  }]
}
*/

export const headersModel = [{
    categoryName: 'Site',
    fieldName: 'Location',
    // mei4
    // fieldName: 'Location Name',
    fieldCode: 'fieldCodeLocationName',
    fieldOrder: 1,
    fieldType: 'fieldTypeName'
  },
  {
    categoryName: 'Site',
    fieldName: 'Division',
    fieldCode: 'fieldCodeDivision',
    fieldOrder: 2,
    fieldType: 'fieldTypeDivision'
  },
  // Geographical
  {
    categoryName: 'Geographical',
    fieldName: 'Country',
    fieldCode: 'fieldCodeCountry',
    fieldOrder: 3,
    fieldType: 'fieldTypeCountry'
  },
  {
    categoryName: 'Geographical',
    fieldName: 'State',
    fieldCode: 'fieldCodeState',
    fieldOrder: 4,
    fieldType: 'fieldTypeState'
  },

  {
    categoryName: 'Geographical',
    fieldName: 'County',
    fieldCode: 'fieldCodeCounty',
    fieldOrder: 5,
    fieldType: 'fieldTypeCounty'
  },

  {
    categoryName: 'Geographical',
    fieldName: 'City',
    fieldCode: 'fieldCodeCity',
    fieldOrder: 6,
    fieldType: 'fieldTypeCity'
  },

  {
    categoryName: 'Geographical',
    fieldName: 'Street',
    fieldCode: 'fieldCodeStreet',
    fieldOrder: 7,
    fieldType: 'fieldTypeStreet'
  },

  {
    categoryName: 'Geographical',
    fieldName: 'ZipCode',
    fieldCode: 'fieldCodeZipCode',
    fieldOrder: 8,
    fieldType: 'fieldTypeZipCode',

  },

  {
    categoryName: 'Geographical',
    fieldName: 'OriginalAddress',
    fieldCode: 'fieldCodeOriginalAddress',
    fieldOrder: 9,
    fieldType: 'fieldTypeOriginalAddress',

  },

  {
    categoryName: 'Geographical',
    fieldName: 'Latitude',
    fieldCode: 'fieldCodeLatitude',
    fieldOrder: 10,
    fieldType: 'fieldTypeLatitude',

  },

  {
    categoryName: 'Geographical',
    fieldName: 'Longitude',
    fieldCode: 'fieldCodeLongitude',
    fieldOrder: 11,
    fieldType: 'fieldTypeLongitude',

  },

  {
    categoryName: 'Geographical',
    fieldName: 'Accuracy',
    fieldCode: 'fieldCodeAccuracy',
    fieldOrder: 12,
    fieldType: 'fieldTypeAccuracy',

  },

  {
    categoryName: 'Geographical',
    fieldName: 'Geocode',
    fieldCode: 'fieldCodeGeocode',
    fieldOrder: 13,
    fieldType: 'fieldTypeGeocode',

  },

  {
    categoryName: 'Geographical',
    fieldName: 'Geocoder',
    fieldCode: 'fieldCodeGeocoder',
    fieldOrder: 14,
    fieldType: 'fieldTypeGeocoder',

  },

  {
    categoryName: 'Geographical',
    fieldName: 'GeocodingValidated',
    fieldCode: 'fieldCodeGeocodingValidated',
    fieldOrder: 15,
    fieldType: 'fieldTypeGeocodingValidated',


  },
  // Insured Values
  {
    categoryName: 'Insured Values',
    fieldName: 'Tiv',
    fieldCode: 'fieldCodeSiteCurrency',
    fieldOrder: 16,
    fieldType: 'fieldTypeSiteCurrency'
  },
  {
    categoryName: 'Insured Values',
    fieldName: 'Tiv',
    fieldCode: 'fieldCodeTiv',
    fieldOrder: 17,
    fieldType: 'fieldTypeTiv'
  },
  {
    categoryName: 'Insured Values',
    fieldName: 'Building',
    fieldCode: 'fieldCodeBuilding',
    fieldOrder: 18,
    fieldType: 'fieldTypeBuilding'
  },
  {
    categoryName: 'Insured Values',
    fieldName: 'Stock',
    fieldCode: 'fieldCodeStock',
    fieldOrder: 19,
    fieldType: 'fieldTypeStock'
  },
  {
    categoryName: 'Insured Values',
    fieldName: 'Machinery',
    fieldCode: 'fieldCodeMachinery',
    fieldOrder: 20,
    fieldType: 'fieldTypeMachinery'
  },
  {
    categoryName: 'Insured Values',
    fieldName: 'Content',
    fieldCode: 'fieldCodeContent',
    fieldOrder: 21,
    fieldType: 'fieldTypeContent'
  },
  {
    categoryName: 'Insured Values',
    fieldName: 'PbValue',
    fieldCode: 'fieldCodePbValue',
    fieldOrder: 22,
    fieldType: 'fieldTypePbValue'
  },
  {
    categoryName: 'Insured Values',
    fieldName: 'BiType',
    fieldCode: 'fieldCodeBiType',
    fieldOrder: 23,
    fieldType: 'fieldTypeBiType'
  },
  {
    categoryName: 'Insured Values',
    fieldName: 'Eip',
    fieldCode: 'fieldCodeEip',
    fieldOrder: 23,
    fieldType: 'fieldTypeEip'
  },
  {
    categoryName: 'Insured Values',
    fieldName: 'DeclarationPeriod',
    fieldCode: 'fieldCodeDeclarationPeriod',
    fieldOrder: 24,
    fieldType: 'fieldTypeDeclarationPeriod'
  },
  {
    categoryName: 'Insured Values',
    fieldName: 'BiValue',
    fieldCode: 'fieldCodeBiValue',
    fieldOrder: 25,
    fieldType: 'fieldTypeBiValue'
  },
  {
    categoryName: 'Insured Values',
    fieldName: 'ForInterest',
    fieldCode: 'fieldCodeForInterest',
    fieldOrder: 26,
    fieldType: 'fieldTypeForInterest'
  },
  {
    categoryName: 'Insured Values',
    fieldName: 'Interest',
    fieldCode: 'fieldCodeInterest',
    fieldOrder: 27,
    fieldType: 'fieldTypeInterest'
  },
  // Insured Values
  {
    categoryName: 'Primary Characteristics',
    fieldName: 'OccupancySource',
    fieldCode: 'fieldCodeOccupancySource',
    fieldOrder: 28,
    fieldType: 'fieldTypeOccupancySource'
  },
  {
    categoryName: 'Primary Characteristics',
    fieldName: 'OccupancyClass',
    fieldCode: 'fieldCodeOccupancyClass',
    fieldOrder: 28,
    fieldType: 'fieldTypeOccupancyClass'
  },
  {
    categoryName: 'Primary Characteristics',
    fieldName: 'OccupancySubClass',
    fieldCode: 'fieldCodeOccupancySubClass',
    fieldOrder: 28,
    fieldType: 'fieldTypeOccupancySubClass'
  },
  {
    categoryName: 'Primary Characteristics',
    fieldName: 'OccupancyCode',
    fieldCode: 'fieldCodeOccupancyCode',
    fieldOrder: 28,
    fieldType: 'fieldTypeOccupancyCode'
  },
  {
    categoryName: 'Primary Characteristics',
    fieldName: 'OccupancyScheme',
    fieldCode: 'fieldCodeOccupancyScheme',
    fieldOrder: 28,
    fieldType: 'fieldTypeOccupancyScheme'

  },
  {
    categoryName: 'Primary Characteristics',
    fieldName: 'ConstructionSource',
    fieldCode: 'fieldCodeConstructionSource',
    fieldOrder: 28,
    fieldType: 'fieldTypeConstructionSource'

  },
  {
    categoryName: 'Primary Characteristics',
    fieldName: 'ConstructionClass',
    fieldCode: 'fieldCodeConstructionClass',
    fieldOrder: 28,
    fieldType: 'fieldTypeConstructionClass'

  },
  {
    categoryName: 'Primary Characteristics',
    fieldName: 'ConstructionCode',
    fieldCode: 'fieldCodeConstructionCode',
    fieldOrder: 28,
    fieldType: 'fieldTypeConstructionCode'

  },
  {
    categoryName: 'Primary Characteristics',
    fieldName: 'ConstructionScheme',
    fieldCode: 'fieldCodeConstructionScheme',
    fieldOrder: 28,
    fieldType: 'fieldTypeConstructionScheme'

  },

  // Insured Values
  {
    categoryName: 'Secondary Characteristics',
    fieldName: 'YearBuilt',
    fieldCode: 'fieldCodeYearBuilt',
    fieldOrder: 29,
    fieldType: 'fieldTypeYearBuilt'
  },
  {
    categoryName: 'Secondary Characteristics',
    fieldName: 'NumberOfStories',
    fieldCode: 'fieldCodeNumberOfStories',
    fieldOrder: 29,
    fieldType: 'fieldTypeNumberOfStories'
  },
  {
    categoryName: 'Secondary Characteristics',
    fieldName: 'LargestUnitCapacity',
    fieldCode: 'fieldCodeLargestUnitCapacity',
    fieldOrder: 29,
    fieldType: 'fieldTypeLargestUnitCapacity'
  },
  {
    categoryName: 'Secondary Characteristics',
    fieldName: 'IsAggregation',
    fieldCode: 'fieldCodeIsAggregation',
    fieldOrder: 29,
    fieldType: 'fieldTypeIsAggregation'
  },
  {
    categoryName: 'Secondary Characteristics',
    fieldName: 'NumberOfBuilding',
    fieldCode: 'fieldCodeNumberOfBuilding',
    fieldOrder: 29,
    fieldType: 'fieldTypeNumberOfBuilding'
  },
]
