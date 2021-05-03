import {LOCATION_FIELD_CODES_ENUM} from './location-field-codes.const'

export class LocationModel {
  public  id: number;
  public locationName: string;
  public division: string;
  occupancySource: string;
  occupancyClass: string;
  occupancySubClass: string;
  occupancyCode: string;
  occupancyScheme: string;
  constructionSource: string;
  constructionClass: string;
  constructionCode: string;
  constructionScheme: string;
  country: string;
  state: string;
  county: string;
  city: string;
  street: string;
  zipCode: string;
  originalAddress: string;
  latitude: number;
  longitude: number;
  accuracy: string;
  geocode: string;
  geocoder: string;
  geocodingValidated: string;
  siteCurrency: string;
  tiv: number;
  building: number;
  stock: number;
  machinery: number;
  content: number;
  pbValue: number;
  biType: string;
  eip: string;
  declarationPeriod: string;
  biValue: string;
  forInterest: string;
  interest: string;
  yearBuilt: number;
  numberOfStories: number;
  largestUnitCapacity: number;
  isAggregation: boolean;
  numberOfBuilding: number;

  constructor() {
  }
}

export const locationGlobalModel = [
  {
    label: 'General',
    value: {
      header: [
        {label: 'Location Name', value: '', icon: '/assets/images/popup-location.png' , field_code : LOCATION_FIELD_CODES_ENUM.location_name},
        {label: 'Company Name', value: '', icon: '/assets/images/popup-company.png' , field_code : LOCATION_FIELD_CODES_ENUM.company_name},
        {label: 'Property ID', value: '', type: 'inputNumber', icon: '/assets/images/popup-property.png', field_code : LOCATION_FIELD_CODES_ENUM.property_db_id},
        {label: 'Scor database Id', value: '', icon: '/assets/images/popup-database.png', field_code : LOCATION_FIELD_CODES_ENUM.scor_database_id},
        {label: 'Division', value: '', icon: '/assets/images/popup-division.png' , field_code : LOCATION_FIELD_CODES_ENUM.division},
      ],
      body: [
        {
          label: 'Original / Cleansed Data',
          value: [
            {
              label: 'Original Data',
              items: [
                {label: 'Occupancy Source', value: '' , field_code : 'TBD_1', disabled: true},
                {label: 'Occupancy Scheme', value: '' , type : 'list', disabled: true},
                {label: 'Construction Source', value: '' , disabled: true},
                {label: 'Construction Scheme', value: '' , type : 'list', disabled: true},
              ],
            },
            {
              label: 'Cleansed Data',
              items: [
                {label: 'Occupancy Scheme', value: '' , type : 'list', field_code : LOCATION_FIELD_CODES_ENUM.occupancy_scheme},
                {label: 'Occupancy Code', value: '' , type : 'list', field_code : LOCATION_FIELD_CODES_ENUM.occupancy_code},
                {label: 'Accord Occupancy Code', value: '', type : 'list', field_code : LOCATION_FIELD_CODES_ENUM.accord_occupancy_code},
                {label: 'Accord Occupancy Class', value: '', type : 'list', conditional: true,  field_code : LOCATION_FIELD_CODES_ENUM.accord_occupancy_class},
                {label: 'Accord Occupancy Sub-Class', value: '', type : 'list', conditional: true, field_code : LOCATION_FIELD_CODES_ENUM.accord_occupancy_subclass},
                {label: 'Construction Scheme', value: '', type : 'list' , field_code : LOCATION_FIELD_CODES_ENUM.construction_scheme},
                {label: 'Construction Code', value: '', type : 'list', field_code : LOCATION_FIELD_CODES_ENUM.construction_code},
                {label: 'Accord Construction Code', value: '' , type : 'list', field_code : LOCATION_FIELD_CODES_ENUM.accord_construction_code},
                {label: 'Accord Construction Class', value: '' , type : 'list', field_code : LOCATION_FIELD_CODES_ENUM.accord_construction_class},
              ]
            }
          ],
          active: true,
        },
        {
          label: 'Locations specifications',
          value: [
            {
              label: 'Location specifications',
              items: [
                {label: 'Number of stories', type: 'inputNumber', value: '' , field_code : LOCATION_FIELD_CODES_ENUM.number_of_stories_unit},
                {label: 'Basement', value: '', type: 'inputNumber' , field_code : LOCATION_FIELD_CODES_ENUM.basement},
                {label: 'Basement stories', value: '', type: 'inputNumber' , field_code : LOCATION_FIELD_CODES_ENUM.basement_stories_unit},
                {label: 'Basement finished', value: '' , field_code : LOCATION_FIELD_CODES_ENUM.basement_finished},
                {label: 'Number of Building', type: 'inputNumber', value: '' , field_code : LOCATION_FIELD_CODES_ENUM.number_of_buildings},
                {label: 'Year Built', value: '' , field_code : LOCATION_FIELD_CODES_ENUM.year_built},
              ]
            },
            {
              label: 'Year Upgrade',
              items: [
                {label: 'Building', value: '' , field_code : LOCATION_FIELD_CODES_ENUM.building_value},
                {label: 'Roof', value: '' , field_code : LOCATION_FIELD_CODES_ENUM.roof_year_upgrade},
                {label: 'Wiring', value: '' , field_code : LOCATION_FIELD_CODES_ENUM.wiring_year_upgrade},
                {label: 'Plumbing', value: '' , field_code : LOCATION_FIELD_CODES_ENUM.plumbing_year_upgrade},
              ]
            }
          ],
          active: false,
        }
      ]
    }
  },
  { label: 'Geographical',
    tabs: [
      {
        title: 'Original Address',
        content: {
          header: [
            {label: 'Original Address', value: '', icon: '/assets/images/popup-location.png', field_code : LOCATION_FIELD_CODES_ENUM.original_full_address, disabled : true},
          ],
          body: [
            {
              label: 'Address Details',
              colSpan: 12,
              offset: 0,
              items: [
                {label: 'Original Country', value: '' , type : 'list', field_code : LOCATION_FIELD_CODES_ENUM.original_country, disabled : true},
                {label: 'Original State', value: '', type : 'list', field_code : LOCATION_FIELD_CODES_ENUM.original_state, disabled : true},
                {label: 'Original County', value: '', field_code : LOCATION_FIELD_CODES_ENUM.original_county, disabled : true},
                {label: 'Original City', value: '' , field_code : LOCATION_FIELD_CODES_ENUM.original_city, disabled : true},
                {label: 'Original Street', value: '' , field_code : LOCATION_FIELD_CODES_ENUM.original_street, disabled : true},
                {label: 'Original Zip Code', type: 'inputNumber', value: '' , field_code : LOCATION_FIELD_CODES_ENUM.original_zip_code, disabled : true},
              ],
            },
            {
              label: 'Coordinates',
              colSpan: 11,
              offset: 1,
              items: [
                {label: 'Latitude', type: 'inputNumber', value: '', field_code : LOCATION_FIELD_CODES_ENUM.original_latitude, disabled : true},
                {label: 'Longitude', type: 'inputNumber', value: '', field_code : LOCATION_FIELD_CODES_ENUM.original_longitude, disabled : true}
              ],
            },
          ]
        }
      },
      {
        title: 'Cleansed Address',
        content: {
          header: [
            {label: 'Cleansed Address', value: '', icon: '/assets/images/popup-location.png'}
          ],
          body: [
            {
              label: 'Address Details',
              colSpan: 10,
              offset: 0,
              items: [
                {label: 'Cleansed Country', value: '' , type : 'list', field_code : LOCATION_FIELD_CODES_ENUM.cleansed_country},
                {label: 'IS02', value: '', type : 'list', field_code : LOCATION_FIELD_CODES_ENUM.cleansed_iso2},
                {label: 'IS03', value: '', type : 'list', field_code : LOCATION_FIELD_CODES_ENUM.cleansed_iso3},
                {label: 'Cleansed State', value: '', type : 'list', field_code : LOCATION_FIELD_CODES_ENUM.cleansed_state},
                {label: 'Cleansed County', value: '', field_code : LOCATION_FIELD_CODES_ENUM.cleansed_county},
                {label: 'Cleansed City', value: '', field_code : LOCATION_FIELD_CODES_ENUM.cleansed_city},
                {label: 'Cleansed Street', value: '', field_code : LOCATION_FIELD_CODES_ENUM.cleansed_street},
                {label: 'Cleansed Zip Code', type: 'inputNumber', value: '', field_code : LOCATION_FIELD_CODES_ENUM.cleansed_zip_code},
              ],
            },
            {
              label: 'Geocoding',
              colSpan: 3,
              offset: 1,
              items: [{label: 'Geocoding', icon: '/assets/images/geocoding.png' }, {label: 'Reverse Geocoding', icon: '/assets/images/reverse-geocoding.png'}]
            },
            {
              label: 'Coordinates',
              colSpan: 9,
              offset: 1,
              items: [
                {label: 'Latitude', type: 'inputNumber', value: '', field_code : LOCATION_FIELD_CODES_ENUM.cleansed_latitude},
                {label: 'Longitude', type: 'inputNumber', value: '', field_code : LOCATION_FIELD_CODES_ENUM.cleansed_longitude}
              ],
            },
          ]
        }
      },
      {
        title: 'Final Address',
        content: {
          header: [
            {label: 'Final Address', value: '', icon: '/assets/images/popup-location.png', disabled : true},
          ],
          body: [
            {
              label: 'Address Details',
              colSpan: 12,
              offset: 0,
              items: [
                {label: 'Final Country', value: '' , type : 'list', field_code : LOCATION_FIELD_CODES_ENUM.final_country},
                {label: 'IS02', type : 'list', value: '', field_code : LOCATION_FIELD_CODES_ENUM.final_iso2},
                {label: 'IS03', type : 'list', value: '', field_code : LOCATION_FIELD_CODES_ENUM.final_iso3},
                {label: 'Final State', value: '' , type : 'list', field_code : LOCATION_FIELD_CODES_ENUM.final_state},
                {label: 'Final County', value: '' , type : 'list', field_code : LOCATION_FIELD_CODES_ENUM.final_county},
                {label: 'Final City', value: '', field_code : LOCATION_FIELD_CODES_ENUM.final_city},
                {label: 'Final Street', value: '', field_code : LOCATION_FIELD_CODES_ENUM.final_street},
                {label: 'Final Zip Code', type: 'inputNumber', value: '', field_code : LOCATION_FIELD_CODES_ENUM.final_zip_code},
              ],
            },
            {
              label: 'Coordinates',
              colSpan: 11,
              offset: 1,
              items: [
                {label: 'Latitude', type: 'inputNumber', value: '', field_code : LOCATION_FIELD_CODES_ENUM.final_latitude},
                {label: 'Longitude', type: 'inputNumber', value: '', field_code : LOCATION_FIELD_CODES_ENUM.final_longitude},
                {label: 'Accuracy', value: '', type : 'list', field_code : LOCATION_FIELD_CODES_ENUM.accuracy_level},
                {label: 'Geocoder', value: '', type : 'list', field_code : LOCATION_FIELD_CODES_ENUM.geocoder},
                {label: 'Accuracy validated', value: '', type : 'list', field_code : LOCATION_FIELD_CODES_ENUM.accuracy_validated},
              ],
            },
          ]
        }
      }
    ]
    },
  { label: 'Insured Value', value: {
      header: {
        icon: '/assets/images/tiv.png',
        items: [
            {label: 'TIV', type: 'inputNumber', value: '', field_code : LOCATION_FIELD_CODES_ENUM.tiv_amount, child_field: LOCATION_FIELD_CODES_ENUM.tiv_unit},
            {label: 'Unit', value: '', type : 'list', field_code : LOCATION_FIELD_CODES_ENUM.tiv_unit, parent_field: LOCATION_FIELD_CODES_ENUM.tiv_amount},
            {label: 'Currency', value: '', type : 'list', field_code : LOCATION_FIELD_CODES_ENUM.tiv_currency}
        ]
      },
      body: [
        {
          label: 'PD value',
          items: [
            [{label: 'Building', type: 'inputNumber', value: '', field_code : LOCATION_FIELD_CODES_ENUM.building_value, child_field: LOCATION_FIELD_CODES_ENUM.building_unit}, {label: 'Unit', value: '', type : 'list' , field_code : LOCATION_FIELD_CODES_ENUM.building_unit, parent_field: LOCATION_FIELD_CODES_ENUM.building_value}, {label: 'Currency', value: '', type : 'list', field_code : LOCATION_FIELD_CODES_ENUM.building_currency}],
            [{label: 'Stock', type: 'inputNumber', value: '', field_code : LOCATION_FIELD_CODES_ENUM.stock_value, child_field: LOCATION_FIELD_CODES_ENUM.stock_unit}, {label: 'Unit', value: '', type : 'list', field_code : LOCATION_FIELD_CODES_ENUM.stock_unit, parent_field: LOCATION_FIELD_CODES_ENUM.stock_value}, {label: 'Currency', value: '', type : 'list', field_code : LOCATION_FIELD_CODES_ENUM.stock_currency}],
            [{label: 'Machinary', type: 'inputNumber', value: '', field_code : LOCATION_FIELD_CODES_ENUM.machinery_value, child_field: LOCATION_FIELD_CODES_ENUM.machinery_unit}, {label: 'Unit', value: '', type : 'list', field_code : LOCATION_FIELD_CODES_ENUM.machinery_unit, parent_field: LOCATION_FIELD_CODES_ENUM.machinery_value}, {label: 'Currency', value: '', type : 'list', field_code : LOCATION_FIELD_CODES_ENUM.machinery_currency}],
            [{label: 'Other Structure', type: 'inputNumber', value: '', field_code : LOCATION_FIELD_CODES_ENUM.other_structure, child_field: LOCATION_FIELD_CODES_ENUM.other_structure_unit}, {label: 'Unit', value: '', type : 'list', field_code : LOCATION_FIELD_CODES_ENUM.other_structure_unit, parent_field: LOCATION_FIELD_CODES_ENUM.other_structure}, {label: 'Currency', value: '', type : 'list', field_code : LOCATION_FIELD_CODES_ENUM.other_structure_currency}],
            [{label: 'Content', type: 'inputNumber', value: '', field_code : LOCATION_FIELD_CODES_ENUM.content_value, child_field: LOCATION_FIELD_CODES_ENUM.content_unit}, {label: 'Unit', value: '', type : 'list', field_code : LOCATION_FIELD_CODES_ENUM.content_unit, parent_field: LOCATION_FIELD_CODES_ENUM.content_value}, {label: 'Currency', value: '', type : 'list', field_code : LOCATION_FIELD_CODES_ENUM.content_currency}],
            [{label: 'PD VALUE', type: 'inputNumber', value: '', field_code : LOCATION_FIELD_CODES_ENUM.pd_value, child_field: LOCATION_FIELD_CODES_ENUM.pd_value_unit}, {label: 'Unit', value: '', type : 'list', field_code : LOCATION_FIELD_CODES_ENUM.pd_value_unit, parent_field: LOCATION_FIELD_CODES_ENUM.pd_value}, {label: 'Currency', type : 'list', value: '', field_code : LOCATION_FIELD_CODES_ENUM.pd_value_currency}],
            [{label: 'PD Split', type: 'split', value: false, visibility: false , field_code : 'pd_split'}],
          ],
        },
        {
          label: 'BI value',
          items: [
            [{label: 'BI Type', value: '', type : 'list', field_code : LOCATION_FIELD_CODES_ENUM.bi_type}],
            [{label: 'Indemenity period / EIP', type: 'inputNumber', value: '', field_code : LOCATION_FIELD_CODES_ENUM.indemnity_period_eip}],
            [{label: 'Declararion Period', type: 'inputNumber', value: '', field_code : LOCATION_FIELD_CODES_ENUM.bi_declaration_period}],
            [{label: 'BI VALUE', type: 'inputNumber', value: '', field_code : LOCATION_FIELD_CODES_ENUM.bi_value, child_field: LOCATION_FIELD_CODES_ENUM.bi_value_unit}, {label: 'Unit', value: '', type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.bi_value_unit, parent_field: LOCATION_FIELD_CODES_ENUM.bi_value}, {label: 'Currency', value: '', type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.bi_value_currency}]
          ],
        },
      ],
      footer: {
        title: '',
        content: [
          {label: '100% for interest', value: '', colSpan: 12, offset: 0, type : 'list', field_code : LOCATION_FIELD_CODES_ENUM.for_interest},
          {label: 'Interest', type: 'inputNumber', value: '', colSpan: 11, offset: 1, field_code : LOCATION_FIELD_CODES_ENUM.interest},
          // {label: 'Site currency', type: 'list', value: '', colSpan: 7, offset: 1, field_code : LOCATION_FIELD_CODES_ENUM.site_currency}
        ]
      }
    }},
  { label: 'MPL', value: {
      header: {label: 'Currency', value: '', type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.mpl_currency},
      body: [
        {
          label: 'MPL',
          items: [
            {label: 'MPL PD', type: 'inputNumber', value: '', field_code : LOCATION_FIELD_CODES_ENUM.mpl_pd_value},
            {label: 'MPL PD %', type: 'inputNumber', value: '', field_code : LOCATION_FIELD_CODES_ENUM.mpl_pd_percentage},
            {label: 'MPL BI', type: 'inputNumber', value: '', field_code : LOCATION_FIELD_CODES_ENUM.mpl_bi_value},
            {label: 'MPL BI %', type: 'inputNumber', value: '', field_code : LOCATION_FIELD_CODES_ENUM.mpl_bi_percentage},
          ],
        },
        {
          label: 'FMLS',
          items: [
            {label: 'FMLS PD', type: 'inputNumber', value: '', field_code : LOCATION_FIELD_CODES_ENUM.fmls_pd_value},
            {label: 'FMLS PD %', type: 'inputNumber', value: '', field_code : LOCATION_FIELD_CODES_ENUM.fmls_pd_percentage},
            {label: 'FMLS BI', type: 'inputNumber', value: '', field_code : LOCATION_FIELD_CODES_ENUM.fmls_bi_value},
            {label: 'FMLS BI %', type: 'inputNumber', value: '', field_code : LOCATION_FIELD_CODES_ENUM.fmls_bi_percentage},
          ],
        }
      ]
    }
  },
  { label: 'T&C', value: [
      {
        supHeader: {label: 'Natural Perils', icon: '/assets/images/naturalPerils.png'},
        content: [
          {
            header: { checked: false, label: 'Earthquake', childs: [
                {checked: true, label: 'Tsunami'}, {checked: false, label: 'Shock'}, {checked: false, label: 'Fire Following'}
              ]},
            body: [
              {
              label: 'Limit',
              items: [
                {label: 'Basis', value: '', colSpan: 24},
                {label: 'Coverage', value: '', colSpan: 24},
                {label: 'Value', type: 'inputNumber', value: '', colSpan: 19},
                {label: 'Unit', value: '', colSpan: 4, offset: 1, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.earthquake_limit_unit},
                {label: 'FI / 100%', value: '', colSpan: 24},
                {label: 'Term aggregate', value: '', colSpan: 24},
              ],
            },
              {
                label: 'Deductible',
                subContent: {
                  header: {
                    items: [
                      {label: 'Basis', value: '', colSpan: 12},
                      {label: 'FI / 100%', value: '', colSpan: 11, offset: 1}
                    ]
                  },
                  body: {
                    colSpan: 24,
                    itemsLabel: {label: 'Conbined PD BI', value: '', colSpan: 24, checkbox: true, checked: true},
                    items: [
                      {label: 'Type', value: '', colSpan: 24},
                      {label: 'Value', type: 'inputNumber', value: '', colSpan: 12},
                      {label: 'Unit', value: '', colSpan: 11, offset: 1, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.earthquake_combined_unit},
                      {label: 'Currency', value: '', colSpan: 24, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.earthquake_combined_currency},
                      {label: 'Min Amount', type: 'inputNumber', value: '', colSpan: 12},
                      {label: 'Max Amount', type: 'inputNumber', value: '', colSpan: 11, offset: 1}
                    ],
                    childs: [
                      {
                        colSpan: 16,
                        itemsLabel: {label: 'PD', value: '', colSpan: 24, checkbox: true, checked: true},
                        items: [
                          {label: 'Type', value: '', colSpan: 24},
                          {label: 'Value', type: 'inputNumber', value: '', colSpan: 12},
                          {label: 'Unit', value: '', colSpan: 11, offset: 1, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.earthquake_pd_unit},
                          {label: 'Currency', value: '', colSpan: 24, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.earthquake_pd_currency},
                          {label: 'Min Amount', type: 'inputNumber', value: '', colSpan: 12},
                          {label: 'Max Amount', type: 'inputNumber', value: '', colSpan: 11, offset: 1}
                        ],
                        childs: [
                          {
                            colSpan: 6,
                            itemsLabel: {label: 'Building', value: '', colSpan: 24, checkbox: false},
                            items: [
                              {label: 'Type', value: '', colSpan: 24},
                              {label: 'Value', type: 'inputNumber', value: '', colSpan: 12},
                              {label: 'Unit', value: '', colSpan: 11, offset: 1, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.earthquake_building_unit},
                              {label: 'Currency', value: '', colSpan: 24, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.earthquake_building_currency},
                              {label: 'Min Amount', type: 'inputNumber', value: '', colSpan: 12},
                              {label: 'Max Amount', type: 'inputNumber', value: '', colSpan: 11, offset: 1}
                            ]
                          }, {
                            colSpan: 6,
                            itemsLabel: {label: 'Other Structure', value: '', colSpan: 24, checkbox: false},
                            items: [
                              {label: 'Type', value: '', colSpan: 24},
                              {label: 'Value', type: 'inputNumber', value: '', colSpan: 12},
                              {label: 'Unit', value: '', colSpan: 11, offset: 1, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.earthquake_structure_unit},
                              {label: 'Currency', value: '', colSpan: 24, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.earthquake_structure_currency},
                              {label: 'Min Amount', type: 'inputNumber', value: '', colSpan: 12},
                              {label: 'Max Amount', type: 'inputNumber', value: '', colSpan: 11, offset: 1}
                            ]
                          }, {
                            colSpan: 12,
                            itemsLabel: {label: 'Content', value: '', colSpan: 24, checkbox: true, checked: true},
                            items: [
                              {label: 'Type', value: '', colSpan: 24},
                              {label: 'Value', type: 'inputNumber', value: '', colSpan: 12},
                              {label: 'Unit', value: '', colSpan: 11, offset: 1, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.earthquake_content_unit},
                              {label: 'Currency', value: '', colSpan: 24, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.earthquake_content_currency},
                              {label: 'Min Amount', type: 'inputNumber', value: '', colSpan: 12},
                              {label: 'Max Amount', type: 'inputNumber', value: '', colSpan: 11, offset: 1}
                            ],
                            childs: [
                              {
                                colSpan: 12,
                                itemsLabel: {label: 'Machinery', value: '', colSpan: 24, checkbox: false},
                                items: [
                                  {label: 'Type', value: '', colSpan: 24},
                                  {label: 'Value', type: 'inputNumber', value: '', colSpan: 12},
                                  {label: 'Unit', value: '', colSpan: 11, offset: 1, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.earthquake_machinary_unit},
                                  {label: 'Currency', value: '', colSpan: 24, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.earthquake_machinary_currency},
                                  {label: 'Min Amount', type: 'inputNumber', value: '', colSpan: 12},
                                  {label: 'Max Amount', type: 'inputNumber', value: '', colSpan: 11, offset: 1}
                                ]
                              }, {
                                colSpan: 12,
                                itemsLabel: {label: 'Stock', value: '', colSpan: 24, checkbox: false},
                                items: [
                                  {label: 'Type', value: '', colSpan: 24},
                                  {label: 'Value', type: 'inputNumber', value: '', colSpan: 12},
                                  {label: 'Unit', value: '', colSpan: 11, offset: 1, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.earthquake_stock_unit},
                                  {label: 'Currency', value: '', colSpan: 24, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.earthquake_stock_currency},
                                  {label: 'Min Amount', type: 'inputNumber', value: '', colSpan: 12},
                                  {label: 'Max Amount', type: 'inputNumber', value: '', colSpan: 11, offset: 1}
                                ]
                              }
                            ]
                          }
                        ]
                      }, {
                        colSpan: 8,
                        itemsLabel: {label: 'BI', value: '', colSpan: 24, checkbox: false},
                        items: [
                          {label: 'Type', value: '', colSpan: 24},
                          {label: 'Value', type: 'inputNumber', value: '', colSpan: 10},
                          {label: 'Unit', value: '', colSpan: 10, offset: 1, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.earthquake_bi_unit},
                          {label: 'Currency', value: '', colSpan: 24, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.earthquake_bi_currency},
                          {label: 'Min Amount', type: 'inputNumber', value: '', colSpan: 10},
                          {label: 'Max Amount', type: 'inputNumber', value: '', colSpan: 10, offset: 1}
                        ]
                      }
                    ]
                  }
                },
              }
              ]
          }, {
            header: { checked: false, label: 'Windstorm', childs: [
                {checked: false, label: 'Tsunami'}, {checked: false, label: 'Shock'}, {checked: false, label: 'Fire Following'}
              ]},
            body: [
              {
                label: 'Limit',
                items: [
                  {label: 'Basis', value: '', colSpan: 24},
                  {label: 'Coverage', value: '', colSpan: 24},
                  {label: 'Value', type: 'inputNumber', value: '', colSpan: 19},
                  {label: 'Unit', value: '', colSpan: 4, offset: 1, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.windstorm_limit_unit},
                  {label: 'FI / 100%', value: '', colSpan: 24},
                  {label: 'Term aggregate', value: '', colSpan: 24},
                ],
              },
              {
                label: 'Deductible',
                subContent: {
                  header: {
                    items: [
                      {label: 'Basis', value: '', colSpan: 12},
                      {label: 'FI / 100%', value: '', colSpan: 11, offset: 1}
                    ]
                  },
                  body: {
                    colSpan: 24,
                    itemsLabel: {label: 'Conbined PD BI', value: '', colSpan: 24, checkbox: true, checked: true},
                    items: [
                      {label: 'Type', value: '', colSpan: 24},
                      {label: 'Value', type: 'inputNumber', value: '', colSpan: 12},
                      {label: 'Unit', value: '', colSpan: 11, offset: 1, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.windstorm_combined_unit},
                      {label: 'Currency', value: '', colSpan: 24, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.windstorm_combined_currency},
                      {label: 'Min Amount', type: 'inputNumber', value: '', colSpan: 12},
                      {label: 'Max Amount', type: 'inputNumber', value: '', colSpan: 11, offset: 1}
                    ],
                    childs: [
                      {
                        colSpan: 16,
                        itemsLabel: {label: 'PD', value: '', colSpan: 24, checkbox: true, checked: true},
                        items: [
                          {label: 'Type', value: '', colSpan: 24},
                          {label: 'Value', type: 'inputNumber', value: '', colSpan: 12},
                          {label: 'Unit', value: '', colSpan: 11, offset: 1, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.windstorm_pd_unit},
                          {label: 'Currency', value: '', colSpan: 24, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.windstorm_pd_currency},
                          {label: 'Min Amount', type: 'inputNumber', value: '', colSpan: 12},
                          {label: 'Max Amount', type: 'inputNumber', value: '', colSpan: 11, offset: 1}
                        ],
                        childs: [
                          {
                            colSpan: 6,
                            itemsLabel: {label: 'Building', value: '', colSpan: 24, checkbox: false},
                            items: [
                              {label: 'Type', value: '', colSpan: 24},
                              {label: 'Value', type: 'inputNumber', value: '', colSpan: 12},
                              {label: 'Unit', value: '', colSpan: 11, offset: 1, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.windstorm_building_unit},
                              {label: 'Currency', value: '', colSpan: 24, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.windstorm_building_currency},
                              {label: 'Min Amount', type: 'inputNumber', value: '', colSpan: 12},
                              {label: 'Max Amount', type: 'inputNumber', value: '', colSpan: 11, offset: 1}
                            ]
                          }, {
                            colSpan: 6,
                            itemsLabel: {label: 'Other Structure', value: '', colSpan: 24, checkbox: false},
                            items: [
                              {label: 'Type', value: '', colSpan: 24},
                              {label: 'Value', type: 'inputNumber', value: '', colSpan: 12},
                              {label: 'Unit', value: '', colSpan: 11, offset: 1, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.windstorm_structure_unit},
                              {label: 'Currency', value: '', colSpan: 24, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.windstorm_structure_currency},
                              {label: 'Min Amount', type: 'inputNumber', value: '', colSpan: 12},
                              {label: 'Max Amount', type: 'inputNumber', value: '', colSpan: 11, offset: 1}
                            ]
                          }, {
                            colSpan: 12,
                            itemsLabel: {label: 'Content', value: '', colSpan: 24, checkbox: true, checked: true},
                            items: [
                              {label: 'Type', value: '', colSpan: 24},
                              {label: 'Value', type: 'inputNumber', value: '', colSpan: 12},
                              {label: 'Unit', value: '', colSpan: 11, offset: 1, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.windstorm_content_unit},
                              {label: 'Currency', value: '', colSpan: 24, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.windstorm_content_currency},
                              {label: 'Min Amount', type: 'inputNumber', value: '', colSpan: 12},
                              {label: 'Max Amount', type: 'inputNumber', value: '', colSpan: 11, offset: 1}
                            ],
                            childs: [
                              {
                                colSpan: 12,
                                itemsLabel: {label: 'Machinery', value: '', colSpan: 24, checkbox: false},
                                items: [
                                  {label: 'Type', value: '', colSpan: 24},
                                  {label: 'Value', type: 'inputNumber', value: '', colSpan: 12},
                                  {label: 'Unit', value: '', colSpan: 11, offset: 1, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.windstorm_machinary_unit},
                                  {label: 'Currency', value: '', colSpan: 24, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.windstorm_machinary_currency},
                                  {label: 'Min Amount', type: 'inputNumber', value: '', colSpan: 12},
                                  {label: 'Max Amount', type: 'inputNumber', value: '', colSpan: 11, offset: 1}
                                ]
                              }, {
                                colSpan: 12,
                                itemsLabel: {label: 'Stock', value: '', colSpan: 24, checkbox: false},
                                items: [
                                  {label: 'Type', value: '', colSpan: 24},
                                  {label: 'Value', type: 'inputNumber', value: '', colSpan: 12},
                                  {label: 'Unit', value: '', colSpan: 11, offset: 1, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.windstorm_stock_unit},
                                  {label: 'Currency', value: '', colSpan: 24, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.windstorm_stock_currency},
                                  {label: 'Min Amount', type: 'inputNumber', value: '', colSpan: 12},
                                  {label: 'Max Amount', type: 'inputNumber', value: '', colSpan: 11, offset: 1}
                                ]
                              }
                            ]
                          }
                        ]
                      }, {
                        colSpan: 8,
                        itemsLabel: {label: 'BI', value: '', colSpan: 24, checkbox: false},
                        items: [
                          {label: 'Type', value: '', colSpan: 24},
                          {label: 'Value', type: 'inputNumber', value: '', colSpan: 10},
                          {label: 'Unit', value: '', colSpan: 10, offset: 1, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.windstorm_bi_unit},
                          {label: 'Currency', value: '', colSpan: 24, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.windstorm_bi_currency},
                          {label: 'Min Amount', type: 'inputNumber', value: '', colSpan: 10},
                          {label: 'Max Amount', type: 'inputNumber', value: '', colSpan: 10, offset: 1}
                        ]
                      }
                    ]
                  }
                },
              }
              ]
          }, {
            header: { checked: false, label: 'Flood', childs: [
                {checked: true, label: 'Flood'}, {checked: false, label: 'Stormsurge'}
              ]},
            body: [
              {
                label: 'Limit',
                items: [
                  {label: 'Basis', value: '', colSpan: 24},
                  {label: 'Coverage', value: '', colSpan: 24},
                  {label: 'Value', type: 'inputNumber', value: '', colSpan: 19},
                  {label: 'Unit', value: '', colSpan: 4, offset: 1, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.flood_limit_unit},
                  {label: 'FI / 100%', value: '', colSpan: 24},
                  {label: 'Term aggregate', value: '', colSpan: 24},
                ],
              },
              {
                label: 'Deductible',
                subContent: {
                  header: {
                    items: [
                      {label: 'Basis', value: '', colSpan: 12},
                      {label: 'FI / 100%', value: '', colSpan: 11, offset: 1}
                    ]
                  },
                  body: {
                    colSpan: 24,
                    itemsLabel: {label: 'Conbined PD BI', value: '', colSpan: 24, checkbox: true, checked: true},
                    items: [
                      {label: 'Type', value: '', colSpan: 24},
                      {label: 'Value', type: 'inputNumber', value: '', colSpan: 12},
                      {label: 'Unit', value: '', colSpan: 11, offset: 1, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.flood_combined_unit},
                      {label: 'Currency', value: '', colSpan: 24, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.flood_combined_currency},
                      {label: 'Min Amount', type: 'inputNumber', value: '', colSpan: 12},
                      {label: 'Max Amount', type: 'inputNumber', value: '', colSpan: 11, offset: 1}
                    ],
                    childs: [
                      {
                        colSpan: 16,
                        itemsLabel: {label: 'PD', value: '', colSpan: 24, checkbox: true, checked: true},
                        items: [
                          {label: 'Type', value: '', colSpan: 24},
                          {label: 'Value', type: 'inputNumber', value: '', colSpan: 12},
                          {label: 'Unit', value: '', colSpan: 11, offset: 1, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.flood_pd_unit},
                          {label: 'Currency', value: '', colSpan: 24, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.flood_pd_currency},
                          {label: 'Min Amount', type: 'inputNumber', value: '', colSpan: 12},
                          {label: 'Max Amount', type: 'inputNumber', value: '', colSpan: 11, offset: 1}
                        ],
                        childs: [
                          {
                            colSpan: 6,
                            itemsLabel: {label: 'Building', value: '', colSpan: 24, checkbox: false},
                            items: [
                              {label: 'Type', value: '', colSpan: 24},
                              {label: 'Value', type: 'inputNumber', value: '', colSpan: 12},
                              {label: 'Unit', value: '', colSpan: 11, offset: 1, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.flood_building_unit},
                              {label: 'Currency', value: '', colSpan: 24, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.flood_building_currency},
                              {label: 'Min Amount', type: 'inputNumber', value: '', colSpan: 12},
                              {label: 'Max Amount', type: 'inputNumber', value: '', colSpan: 11, offset: 1}
                            ]
                          }, {
                            colSpan: 6,
                            itemsLabel: {label: 'Other Structure', value: '', colSpan: 24, checkbox: false},
                            items: [
                              {label: 'Type', value: '', colSpan: 24},
                              {label: 'Value', type: 'inputNumber', value: '', colSpan: 12},
                              {label: 'Unit', value: '', colSpan: 11, offset: 1, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.flood_structure_unit},
                              {label: 'Currency', value: '', colSpan: 24, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.flood_structure_currency},
                              {label: 'Min Amount', type: 'inputNumber', value: '', colSpan: 12},
                              {label: 'Max Amount', type: 'inputNumber', value: '', colSpan: 11, offset: 1}
                            ]
                          }, {
                            colSpan: 12,
                            itemsLabel: {label: 'Content', value: '', colSpan: 24, checkbox: true, checked: true},
                            items: [
                              {label: 'Type', value: '', colSpan: 24},
                              {label: 'Value', type: 'inputNumber', value: '', colSpan: 12},
                              {label: 'Unit', value: '', colSpan: 11, offset: 1, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.flood_content_unit},
                              {label: 'Currency', value: '', colSpan: 24, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.flood_content_currency},
                              {label: 'Min Amount', type: 'inputNumber', value: '', colSpan: 12},
                              {label: 'Max Amount', type: 'inputNumber', value: '', colSpan: 11, offset: 1}
                            ],
                            childs: [
                              {
                                colSpan: 12,
                                itemsLabel: {label: 'Machinery', value: '', colSpan: 24, checkbox: false},
                                items: [
                                  {label: 'Type', value: '', colSpan: 24},
                                  {label: 'Value', type: 'inputNumber', value: '', colSpan: 12},
                                  {label: 'Unit', value: '', colSpan: 11, offset: 1, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.flood_machinary_unit},
                                  {label: 'Currency', value: '', colSpan: 24, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.flood_machinary_currency},
                                  {label: 'Min Amount', type: 'inputNumber', value: '', colSpan: 12},
                                  {label: 'Max Amount', type: 'inputNumber', value: '', colSpan: 11, offset: 1}
                                ]
                              }, {
                                colSpan: 12,
                                itemsLabel: {label: 'Stock', value: '', colSpan: 24, checkbox: false},
                                items: [
                                  {label: 'Type', value: '', colSpan: 24},
                                  {label: 'Value', type: 'inputNumber', value: '', colSpan: 12},
                                  {label: 'Unit', value: '', colSpan: 11, offset: 1, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.flood_stock_unit},
                                  {label: 'Currency', value: '', colSpan: 24, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.flood_stock_currency},
                                  {label: 'Min Amount', type: 'inputNumber', value: '', colSpan: 12},
                                  {label: 'Max Amount', type: 'inputNumber', value: '', colSpan: 11, offset: 1}
                                ]
                              }
                            ]
                          }
                        ]
                      }, {
                        colSpan: 8,
                        itemsLabel: {label: 'BI', value: '', colSpan: 24, checkbox: false},
                        items: [
                          {label: 'Type', value: '', colSpan: 24},
                          {label: 'Value', type: 'inputNumber', value: '', colSpan: 10},
                          {label: 'Unit', value: '', colSpan: 10, offset: 1, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.flood_bi_unit},
                          {label: 'Currency', value: '', colSpan: 24, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.flood_bi_currency},
                          {label: 'Min Amount', type: 'inputNumber', value: '', colSpan: 10},
                          {label: 'Max Amount', type: 'inputNumber', value: '', colSpan: 10, offset: 1}
                        ]
                      }
                    ]
                  }
                }
              }
              ]
          }
        ]
      },
      {
        supHeader: {label: 'Man Made Perils', icon: '/assets/images/manPerils.png'},
        content: [
          {
            header: { checked: false, label: 'Terrorism', childs: [
                {checked: true, label: 'Tsunami'}, {checked: false, label: 'Shock'}, {checked: false, label: 'Fire Following'}
              ]},
            body: [{
              label: 'Limit',
              items: [
                {label: 'Basis', value: '', colSpan: 24},
                {label: 'Coverage', value: '', colSpan: 24},
                {label: 'Value', type: 'inputNumber', value: '', colSpan: 19},
                {label: 'Unit', value: '', colSpan: 4, offset: 1, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.terrorism_limit_unit},
                {label: 'FI / 100%', value: '', colSpan: 24},
                {label: 'Term aggregate', value: '', colSpan: 24},
              ],
            },
              {
                label: 'Deductible',
                subContent: {
                  header: {
                    items: [
                      {label: 'Basis', value: '', colSpan: 12},
                      {label: 'FI / 100%', value: '', colSpan: 11, offset: 1}
                    ]
                  },
                  body: {
                    colSpan: 24,
                    itemsLabel: {label: 'Conbined PD BI', value: '', colSpan: 24, checkbox: true, checked: true},
                    items: [
                      {label: 'Type', value: '', colSpan: 24},
                      {label: 'Value', type: 'inputNumber', value: '', colSpan: 12},
                      {label: 'Unit', value: '', colSpan: 11, offset: 1, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.terrorism_combined_unit},
                      {label: 'Currency', value: '', colSpan: 24, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.terrorism_combined_currency},
                      {label: 'Min Amount', type: 'inputNumber', value: '', colSpan: 12},
                      {label: 'Max Amount', type: 'inputNumber', value: '', colSpan: 11, offset: 1}
                    ],
                    childs: [
                      {
                        colSpan: 16,
                        itemsLabel: {label: 'PD', value: '', colSpan: 24, checkbox: true, checked: true},
                        items: [
                          {label: 'Type', value: '', colSpan: 24},
                          {label: 'Value', type: 'inputNumber', value: '', colSpan: 12},
                          {label: 'Unit', value: '', colSpan: 11, offset: 1, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.terrorism_pd_unit},
                          {label: 'Currency', value: '', colSpan: 24, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.terrorism_pd_currency},
                          {label: 'Min Amount', type: 'inputNumber', value: '', colSpan: 12},
                          {label: 'Max Amount', type: 'inputNumber', value: '', colSpan: 11, offset: 1}
                        ],
                        childs: [
                          {
                            colSpan: 6,
                            itemsLabel: {label: 'Building', value: '', colSpan: 24, checkbox: false},
                            items: [
                              {label: 'Type', value: '', colSpan: 24},
                              {label: 'Value', type: 'inputNumber', value: '', colSpan: 12},
                              {label: 'Unit', value: '', colSpan: 11, offset: 1, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.terrorism_building_unit},
                              {label: 'Currency', value: '', colSpan: 24, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.terrorism_building_currency},
                              {label: 'Min Amount', type: 'inputNumber', value: '', colSpan: 12},
                              {label: 'Max Amount', type: 'inputNumber', value: '', colSpan: 11, offset: 1}
                            ]
                          }, {
                            colSpan: 6,
                            itemsLabel: {label: 'Other Structure', value: '', colSpan: 24, checkbox: false},
                            items: [
                              {label: 'Type', value: '', colSpan: 24},
                              {label: 'Value', type: 'inputNumber', value: '', colSpan: 12},
                              {label: 'Unit', value: '', colSpan: 11, offset: 1, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.terrorism_structure_unit},
                              {label: 'Currency', value: '', colSpan: 24, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.terrorism_structure_currency},
                              {label: 'Min Amount', type: 'inputNumber', value: '', colSpan: 12},
                              {label: 'Max Amount', type: 'inputNumber', value: '', colSpan: 11, offset: 1}
                            ]
                          }, {
                            colSpan: 12,
                            itemsLabel: {label: 'Content', value: '', colSpan: 24, checkbox: true, checked: true},
                            items: [
                              {label: 'Type', value: '', colSpan: 24},
                              {label: 'Value', type: 'inputNumber', value: '', colSpan: 12},
                              {label: 'Unit', value: '', colSpan: 11, offset: 1, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.terrorism_content_unit},
                              {label: 'Currency', value: '', colSpan: 24, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.terrorism_content_currency},
                              {label: 'Min Amount', type: 'inputNumber', value: '', colSpan: 12},
                              {label: 'Max Amount', type: 'inputNumber', value: '', colSpan: 11, offset: 1}
                            ],
                            childs: [
                              {
                                colSpan: 12,
                                itemsLabel: {label: 'Machinery', value: '', colSpan: 24, checkbox: false},
                                items: [
                                  {label: 'Type', value: '', colSpan: 24},
                                  {label: 'Value', type: 'inputNumber', value: '', colSpan: 12},
                                  {label: 'Unit', value: '', colSpan: 11, offset: 1, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.terrorism_machinary_unit},
                                  {label: 'Currency', value: '', colSpan: 24, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.terrorism_machinary_currency},
                                  {label: 'Min Amount', type: 'inputNumber', value: '', colSpan: 12},
                                  {label: 'Max Amount', type: 'inputNumber', value: '', colSpan: 11, offset: 1}
                                ]
                              }, {
                                colSpan: 12,
                                itemsLabel: {label: 'Stock', value: '', colSpan: 24, checkbox: false},
                                items: [
                                  {label: 'Type', value: '', colSpan: 24},
                                  {label: 'Value', type: 'inputNumber', value: '', colSpan: 12},
                                  {label: 'Unit', value: '', colSpan: 11, offset: 1, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.terrorism_stock_unit},
                                  {label: 'Currency', value: '', colSpan: 24, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.terrorism_stock_currency},
                                  {label: 'Min Amount', type: 'inputNumber', value: '', colSpan: 12},
                                  {label: 'Max Amount', type: 'inputNumber', value: '', colSpan: 11, offset: 1}
                                ]
                              }
                            ]
                          }
                        ]
                      }, {
                        colSpan: 8,
                        itemsLabel: {label: 'BI', value: '', colSpan: 24, checkbox: false},
                        items: [
                          {label: 'Type', value: '', colSpan: 24},
                          {label: 'Value', type: 'inputNumber', value: '', colSpan: 10},
                          {label: 'Unit', value: '', colSpan: 10, offset: 1, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.terrorism_bi_unit},
                          {label: 'Currency', value: '', colSpan: 24, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.terrorism_bi_currency},
                          {label: 'Min Amount', type: 'inputNumber', value: '', colSpan: 10},
                          {label: 'Max Amount', type: 'inputNumber', value: '', colSpan: 10, offset: 1}
                        ]
                      }
                    ]
                  }
                }
              }
              ]
          },
          {
            header: { checked: false, label: 'Strike Riot Commotion', childs: [
                {checked: true, label: 'Tsunami'}, {checked: false, label: 'Shock'}, {checked: false, label: 'Fire Following'}
              ]},
            body: [{
              label: 'Limit',
              items: [
                {label: 'Basis', value: '', colSpan: 24},
                {label: 'Coverage', value: '', colSpan: 24},
                {label: 'Value', type: 'inputNumber', value: '', colSpan: 19},
                {label: 'Unit', value: '', colSpan: 4, offset: 1, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.strike_limit_unit},
                {label: 'FI / 100%', value: '', colSpan: 24},
                {label: 'Term aggregate', value: '', colSpan: 24},
              ],
            },
              {
                label: 'Deductible',
                subContent: {
                  header: {
                    items: [
                      {label: 'Basis', value: '', colSpan: 12},
                      {label: 'FI / 100%', value: '', colSpan: 11, offset: 1}
                    ]
                  },
                  body: {
                    colSpan: 24,
                    itemsLabel: {label: 'Conbined PD BI', value: '', colSpan: 24, checkbox: true, checked: true},
                    items: [
                      {label: 'Type', value: '', colSpan: 24},
                      {label: 'Value', type: 'inputNumber', value: '', colSpan: 12},
                      {label: 'Unit', value: '', colSpan: 11, offset: 1, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.strike_combined_unit},
                      {label: 'Currency', value: '', colSpan: 24, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.strike_combined_currency},
                      {label: 'Min Amount', type: 'inputNumber', value: '', colSpan: 12},
                      {label: 'Max Amount', type: 'inputNumber', value: '', colSpan: 11, offset: 1}
                    ],
                    childs: [
                      {
                        colSpan: 16,
                        itemsLabel: {label: 'PD', value: '', colSpan: 24, checkbox: true, checked: true},
                        items: [
                          {label: 'Type', value: '', colSpan: 24},
                          {label: 'Value', type: 'inputNumber', value: '', colSpan: 12},
                          {label: 'Unit', value: '', colSpan: 11, offset: 1, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.strike_pd_unit},
                          {label: 'Currency', value: '', colSpan: 24, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.strike_pd_currency},
                          {label: 'Min Amount', type: 'inputNumber', value: '', colSpan: 12},
                          {label: 'Max Amount', type: 'inputNumber', value: '', colSpan: 11, offset: 1}
                        ],
                        childs: [
                          {
                            colSpan: 6,
                            itemsLabel: {label: 'Building', value: '', colSpan: 24, checkbox: false},
                            items: [
                              {label: 'Type', value: '', colSpan: 24},
                              {label: 'Value', type: 'inputNumber', value: '', colSpan: 12},
                              {label: 'Unit', value: '', colSpan: 11, offset: 1, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.strike_building_unit},
                              {label: 'Currency', value: '', colSpan: 24, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.strike_building_currency},
                              {label: 'Min Amount', type: 'inputNumber', value: '', colSpan: 12},
                              {label: 'Max Amount', type: 'inputNumber', value: '', colSpan: 11, offset: 1}
                            ]
                          }, {
                            colSpan: 6,
                            itemsLabel: {label: 'Other Structure', value: '', colSpan: 24, checkbox: false},
                            items: [
                              {label: 'Type', value: '', colSpan: 24},
                              {label: 'Value', type: 'inputNumber', value: '', colSpan: 12},
                              {label: 'Unit', value: '', colSpan: 11, offset: 1, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.strike_structure_unit},
                              {label: 'Currency', value: '', colSpan: 24, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.strike_structure_currency},
                              {label: 'Min Amount', type: 'inputNumber', value: '', colSpan: 12},
                              {label: 'Max Amount', type: 'inputNumber', value: '', colSpan: 11, offset: 1}
                            ]
                          }, {
                            colSpan: 12,
                            itemsLabel: {label: 'Content', value: '', colSpan: 24, checkbox: true, checked: true},
                            items: [
                              {label: 'Type', value: '', colSpan: 24},
                              {label: 'Value', type: 'inputNumber', value: '', colSpan: 12},
                              {label: 'Unit', value: '', colSpan: 11, offset: 1, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.strike_content_unit},
                              {label: 'Currency', value: '', colSpan: 24, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.strike_content_currency},
                              {label: 'Min Amount', type: 'inputNumber', value: '', colSpan: 12},
                              {label: 'Max Amount', type: 'inputNumber', value: '', colSpan: 11, offset: 1}
                            ],
                            childs: [
                              {
                                colSpan: 12,
                                itemsLabel: {label: 'Machinery', value: '', colSpan: 24, checkbox: false},
                                items: [
                                  {label: 'Type', value: '', colSpan: 24},
                                  {label: 'Value', type: 'inputNumber', value: '', colSpan: 12},
                                  {label: 'Unit', value: '', colSpan: 11, offset: 1, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.strike_machinary_unit},
                                  {label: 'Currency', value: '', colSpan: 24, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.strike_machinary_currency},
                                  {label: 'Min Amount', type: 'inputNumber', value: '', colSpan: 12},
                                  {label: 'Max Amount', type: 'inputNumber', value: '', colSpan: 11, offset: 1}
                                ]
                              }, {
                                colSpan: 12,
                                itemsLabel: {label: 'Stock', value: '', colSpan: 24, checkbox: false},
                                items: [
                                  {label: 'Type', value: '', colSpan: 24},
                                  {label: 'Value', type: 'inputNumber', value: '', colSpan: 12},
                                  {label: 'Unit', value: '', colSpan: 11, offset: 1, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.strike_stock_unit},
                                  {label: 'Currency', value: '', colSpan: 24, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.strike_stock_currency},
                                  {label: 'Min Amount', type: 'inputNumber', value: '', colSpan: 12},
                                  {label: 'Max Amount', type: 'inputNumber', value: '', colSpan: 11, offset: 1}
                                ]
                              }
                            ]
                          }
                        ]
                      }, {
                        colSpan: 8,
                        itemsLabel: {label: 'BI', value: '', colSpan: 24, checkbox: false},
                        items: [
                          {label: 'Type', value: '', colSpan: 24},
                          {label: 'Value', type: 'inputNumber', value: '', colSpan: 10},
                          {label: 'Unit', value: '', colSpan: 10, offset: 1, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.strike_bi_unit},
                          {label: 'Currency', value: '', colSpan: 24, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.strike_bi_currency},
                          {label: 'Min Amount', type: 'inputNumber', value: '', colSpan: 10},
                          {label: 'Max Amount', type: 'inputNumber', value: '', colSpan: 10, offset: 1}
                        ]
                      }
                    ]
                  }
                }
              }
              ]
          },
          {
            header: { checked: false, label: 'Machinery Breakdown', childs: [
                {checked: true, label: 'Tsunami'}, {checked: false, label: 'Shock'}, {checked: false, label: 'Fire Following'}
              ]},
            body: [{
              label: 'Limit',
              items: [
                {label: 'Basis', value: '', colSpan: 24},
                {label: 'Coverage', value: '', colSpan: 24},
                {label: 'Value', type: 'inputNumber', value: '', colSpan: 19},
                {label: 'Unit', value: '', colSpan: 4, offset: 1, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.machinery_limit_unit},
                {label: 'FI / 100%', value: '', colSpan: 24},
                {label: 'Term aggregate', value: '', colSpan: 24},
              ],
            },
              {
                label: 'Deductible',
                subContent: {
                  header: {
                    items: [
                      {label: 'Basis', value: '', colSpan: 12},
                      {label: 'FI / 100%', value: '', colSpan: 11, offset: 1}
                    ]
                  },
                  body: {
                    colSpan: 24,
                    itemsLabel: {label: 'Conbined PD BI', value: '', colSpan: 24, checkbox: true, checked: true},
                    items: [
                      {label: 'Type', value: '', colSpan: 24},
                      {label: 'Value', type: 'inputNumber', value: '', colSpan: 12},
                      {label: 'Unit', value: '', colSpan: 11, offset: 1, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.machinery_combined_unit},
                      {label: 'Currency', value: '', colSpan: 24, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.machinery_combined_currency},
                      {label: 'Min Amount', type: 'inputNumber', value: '', colSpan: 12},
                      {label: 'Max Amount', type: 'inputNumber', value: '', colSpan: 11, offset: 1}
                    ],
                    childs: [
                      {
                        colSpan: 16,
                        itemsLabel: {label: 'PD', value: '', colSpan: 24, checkbox: true, checked: true},
                        items: [
                          {label: 'Type', value: '', colSpan: 24},
                          {label: 'Value', type: 'inputNumber', value: '', colSpan: 12},
                          {label: 'Unit', value: '', colSpan: 11, offset: 1, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.machinery_pd_unit},
                          {label: 'Currency', value: '', colSpan: 24, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.machinery_pd_currency},
                          {label: 'Min Amount', type: 'inputNumber', value: '', colSpan: 12},
                          {label: 'Max Amount', type: 'inputNumber', value: '', colSpan: 11, offset: 1}
                        ],
                        childs: [
                          {
                            colSpan: 6,
                            itemsLabel: {label: 'Building', value: '', colSpan: 24, checkbox: false},
                            items: [
                              {label: 'Type', value: '', colSpan: 24},
                              {label: 'Value', type: 'inputNumber', value: '', colSpan: 12},
                              {label: 'Unit', value: '', colSpan: 11, offset: 1, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.machinery_building_unit},
                              {label: 'Currency', value: '', colSpan: 24, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.machinery_building_currency},
                              {label: 'Min Amount', type: 'inputNumber', value: '', colSpan: 12},
                              {label: 'Max Amount', type: 'inputNumber', value: '', colSpan: 11, offset: 1}
                            ]
                          }, {
                            colSpan: 6,
                            itemsLabel: {label: 'Other Structure', value: '', colSpan: 24, checkbox: false},
                            items: [
                              {label: 'Type', value: '', colSpan: 24},
                              {label: 'Value', type: 'inputNumber', value: '', colSpan: 12},
                              {label: 'Unit', value: '', colSpan: 11, offset: 1, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.machinery_structure_unit},
                              {label: 'Currency', value: '', colSpan: 24, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.machinery_structure_currency},
                              {label: 'Min Amount', type: 'inputNumber', value: '', colSpan: 12},
                              {label: 'Max Amount', type: 'inputNumber', value: '', colSpan: 11, offset: 1}
                            ]
                          }, {
                            colSpan: 12,
                            itemsLabel: {label: 'Content', value: '', colSpan: 24, checkbox: true, checked: true},
                            items: [
                              {label: 'Type', value: '', colSpan: 24},
                              {label: 'Value', type: 'inputNumber', value: '', colSpan: 12},
                              {label: 'Unit', value: '', colSpan: 11, offset: 1, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.machinery_content_unit},
                              {label: 'Currency', value: '', colSpan: 24, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.machinery_content_currency},
                              {label: 'Min Amount', type: 'inputNumber', value: '', colSpan: 12},
                              {label: 'Max Amount', type: 'inputNumber', value: '', colSpan: 11, offset: 1}
                            ],
                            childs: [
                              {
                                colSpan: 12,
                                itemsLabel: {label: 'Machinery', value: '', colSpan: 24, checkbox: false},
                                items: [
                                  {label: 'Type', value: '', colSpan: 24},
                                  {label: 'Value', type: 'inputNumber', value: '', colSpan: 12},
                                  {label: 'Unit', value: '', colSpan: 11, offset: 1, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.machinery_machinary_unit},
                                  {label: 'Currency', value: '', colSpan: 24, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.machinery_machinary_currency},
                                  {label: 'Min Amount', type: 'inputNumber', value: '', colSpan: 12},
                                  {label: 'Max Amount', type: 'inputNumber', value: '', colSpan: 11, offset: 1}
                                ]
                              }, {
                                colSpan: 12,
                                itemsLabel: {label: 'Stock', value: '', colSpan: 24, checkbox: false},
                                items: [
                                  {label: 'Type', value: '', colSpan: 24},
                                  {label: 'Value', type: 'inputNumber', value: '', colSpan: 12},
                                  {label: 'Unit', value: '', colSpan: 11, offset: 1, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.machinery_stock_unit},
                                  {label: 'Currency', value: '', colSpan: 24, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.machinery_stock_currency},
                                  {label: 'Min Amount', type: 'inputNumber', value: '', colSpan: 12},
                                  {label: 'Max Amount', type: 'inputNumber', value: '', colSpan: 11, offset: 1}
                                ]
                              }
                            ]
                          }
                        ]
                      }, {
                        colSpan: 8,
                        itemsLabel: {label: 'BI', value: '', colSpan: 24, checkbox: false},
                        items: [
                          {label: 'Type', value: '', colSpan: 24},
                          {label: 'Value', type: 'inputNumber', value: '', colSpan: 10},
                          {label: 'Unit', value: '', colSpan: 10, offset: 1, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.machinery_bi_unit},
                          {label: 'Currency', value: '', colSpan: 24, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.machinery_bi_currency},
                          {label: 'Min Amount', type: 'inputNumber', value: '', colSpan: 10},
                          {label: 'Max Amount', type: 'inputNumber', value: '', colSpan: 10, offset: 1}
                        ]
                      }
                    ]
                  }
                }
              }
              ]
          },
          {
            header: { checked: false, label: 'Cyber', childs: [
                {checked: true, label: 'Tsunami'}, {checked: false, label: 'Shock'}, {checked: false, label: 'Fire Following'}
              ]},
            body: [{
              label: 'Limit',
              items: [
                {label: 'Basis', value: '', colSpan: 24},
                {label: 'Coverage', value: '', colSpan: 24},
                {label: 'Value', type: 'inputNumber', value: '', colSpan: 19},
                {label: 'Unit', value: '', colSpan: 4, offset: 1, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.cyber_limit_unit},
                {label: 'FI / 100%', value: '', colSpan: 24},
                {label: 'Term aggregate', value: '', colSpan: 24},
              ],
            },
              {
                label: 'Deductible',
                subContent: {
                  header: {
                    items: [
                      {label: 'Basis', value: '', colSpan: 12},
                      {label: 'FI / 100%', value: '', colSpan: 11, offset: 1}
                    ]
                  },
                  body: {
                    colSpan: 24,
                    itemsLabel: {label: 'Conbined PD BI', value: '', colSpan: 24, checkbox: true, checked: true},
                    items: [
                      {label: 'Type', value: '', colSpan: 24},
                      {label: 'Value', type: 'inputNumber', value: '', colSpan: 12},
                      {label: 'Unit', value: '', colSpan: 11, offset: 1, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.cyber_combined_unit},
                      {label: 'Currency', value: '', colSpan: 24, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.cyber_combined_currency},
                      {label: 'Min Amount', type: 'inputNumber', value: '', colSpan: 12},
                      {label: 'Max Amount', type: 'inputNumber', value: '', colSpan: 11, offset: 1}
                    ],
                    childs: [
                      {
                        colSpan: 16,
                        itemsLabel: {label: 'PD', value: '', colSpan: 24, checkbox: true, checked: true},
                        items: [
                          {label: 'Type', value: '', colSpan: 24},
                          {label: 'Value', type: 'inputNumber', value: '', colSpan: 12},
                          {label: 'Unit', value: '', colSpan: 11, offset: 1, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.cyber_pd_unit},
                          {label: 'Currency', value: '', colSpan: 24, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.cyber_pd_currency},
                          {label: 'Min Amount', type: 'inputNumber', value: '', colSpan: 12},
                          {label: 'Max Amount', type: 'inputNumber', value: '', colSpan: 11, offset: 1}
                        ],
                        childs: [
                          {
                            colSpan: 6,
                            itemsLabel: {label: 'Building', value: '', colSpan: 24, checkbox: false},
                            items: [
                              {label: 'Type', value: '', colSpan: 24},
                              {label: 'Value', type: 'inputNumber', value: '', colSpan: 12},
                              {label: 'Unit', value: '', colSpan: 11, offset: 1, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.cyber_building_unit},
                              {label: 'Currency', value: '', colSpan: 24, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.cyber_building_currency},
                              {label: 'Min Amount', type: 'inputNumber', value: '', colSpan: 12},
                              {label: 'Max Amount', type: 'inputNumber', value: '', colSpan: 11, offset: 1}
                            ]
                          }, {
                            colSpan: 6,
                            itemsLabel: {label: 'Other Structure', value: '', colSpan: 24, checkbox: false},
                            items: [
                              {label: 'Type', value: '', colSpan: 24},
                              {label: 'Value', type: 'inputNumber', value: '', colSpan: 12},
                              {label: 'Unit', value: '', colSpan: 11, offset: 1, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.cyber_structure_unit},
                              {label: 'Currency', value: '', colSpan: 24, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.cyber_structure_currency},
                              {label: 'Min Amount', type: 'inputNumber', value: '', colSpan: 12},
                              {label: 'Max Amount', type: 'inputNumber', value: '', colSpan: 11, offset: 1}
                            ]
                          }, {
                            colSpan: 12,
                            itemsLabel: {label: 'Content', value: '', colSpan: 24, checkbox: true, checked: true},
                            items: [
                              {label: 'Type', value: '', colSpan: 24},
                              {label: 'Value', type: 'inputNumber', value: '', colSpan: 12},
                              {label: 'Unit', value: '', colSpan: 11, offset: 1, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.cyber_content_unit},
                              {label: 'Currency', value: '', colSpan: 24, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.cyber_content_currency},
                              {label: 'Min Amount', type: 'inputNumber', value: '', colSpan: 12},
                              {label: 'Max Amount', type: 'inputNumber', value: '', colSpan: 11, offset: 1}
                            ],
                            childs: [
                              {
                                colSpan: 12,
                                itemsLabel: {label: 'Machinery', value: '', colSpan: 24, checkbox: false},
                                items: [
                                  {label: 'Type', value: '', colSpan: 24},
                                  {label: 'Value', type: 'inputNumber', value: '', colSpan: 12},
                                  {label: 'Unit', value: '', colSpan: 11, offset: 1, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.cyber_machinary_unit},
                                  {label: 'Currency', value: '', colSpan: 24, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.cyber_machinary_currency},
                                  {label: 'Min Amount', type: 'inputNumber', value: '', colSpan: 12},
                                  {label: 'Max Amount', type: 'inputNumber', value: '', colSpan: 11, offset: 1}
                                ]
                              }, {
                                colSpan: 12,
                                itemsLabel: {label: 'Stock', value: '', colSpan: 24, checkbox: false},
                                items: [
                                  {label: 'Type', value: '', colSpan: 24},
                                  {label: 'Value', type: 'inputNumber', value: '', colSpan: 12},
                                  {label: 'Unit', value: '', colSpan: 11, offset: 1, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.cyber_stock_unit},
                                  {label: 'Currency', value: '', colSpan: 24, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.cyber_stock_currency},
                                  {label: 'Min Amount', type: 'inputNumber', value: '', colSpan: 12},
                                  {label: 'Max Amount', type: 'inputNumber', value: '', colSpan: 11, offset: 1}
                                ]
                              }
                            ]
                          }
                        ]
                      }, {
                        colSpan: 8,
                        itemsLabel: {label: 'BI', value: '', colSpan: 24, checkbox: false},
                        items: [
                          {label: 'Type', value: '', colSpan: 24},
                          {label: 'Value', type: 'inputNumber', value: '', colSpan: 10},
                          {label: 'Unit', value: '', colSpan: 10, offset: 1, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.cyber_bi_unit},
                          {label: 'Currency', value: '', colSpan: 24, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.cyber_bi_currency},
                          {label: 'Min Amount', type: 'inputNumber', value: '', colSpan: 10},
                          {label: 'Max Amount', type: 'inputNumber', value: '', colSpan: 10, offset: 1}
                        ]
                      }
                    ]
                  }
                }
              }
              ]
          },
          {
            header: { checked: false, label: 'Fire', childs: [
                {checked: true, label: 'Tsunami'}, {checked: false, label: 'Shock'}, {checked: false, label: 'Fire Following'}
              ]},
            body: [{
              label: 'Limit',
              items: [
                {label: 'Basis', value: '', colSpan: 24},
                {label: 'Coverage', value: '', colSpan: 24},
                {label: 'Value', type: 'inputNumber', value: '', colSpan: 19},
                {label: 'Unit', value: '', colSpan: 4, offset: 1, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.fire_limit_unit},
                {label: 'FI / 100%', value: '', colSpan: 24},
                {label: 'Term aggregate', value: '', colSpan: 24},
              ],
            },
              {
                label: 'Deductible',
                subContent: {
                  header: {
                    items: [
                      {label: 'Basis', value: '', colSpan: 12},
                      {label: 'FI / 100%', value: '', colSpan: 11, offset: 1}
                    ]
                  },
                  body: {
                    colSpan: 24,
                    itemsLabel: {label: 'Conbined PD BI', value: '', colSpan: 24, checkbox: true, checked: true},
                    items: [
                      {label: 'Type', value: '', colSpan: 24},
                      {label: 'Value', type: 'inputNumber', value: '', colSpan: 12},
                      {label: 'Unit', value: '', colSpan: 11, offset: 1, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.fire_combined_unit},
                      {label: 'Currency', value: '', colSpan: 24, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.fire_combined_currency},
                      {label: 'Min Amount', type: 'inputNumber', value: '', colSpan: 12},
                      {label: 'Max Amount', type: 'inputNumber', value: '', colSpan: 11, offset: 1}
                    ],
                    childs: [
                      {
                        colSpan: 16,
                        itemsLabel: {label: 'PD', value: '', colSpan: 24, checkbox: true, checked: true},
                        items: [
                          {label: 'Type', value: '', colSpan: 24},
                          {label: 'Value', type: 'inputNumber', value: '', colSpan: 12},
                          {label: 'Unit', value: '', colSpan: 11, offset: 1, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.fire_pd_unit},
                          {label: 'Currency', value: '', colSpan: 24, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.fire_pd_currency},
                          {label: 'Min Amount', type: 'inputNumber', value: '', colSpan: 12},
                          {label: 'Max Amount', type: 'inputNumber', value: '', colSpan: 11, offset: 1}
                        ],
                        childs: [
                          {
                            colSpan: 6,
                            itemsLabel: {label: 'Building', value: '', colSpan: 24, checkbox: false},
                            items: [
                              {label: 'Type', value: '', colSpan: 24},
                              {label: 'Value', type: 'inputNumber', value: '', colSpan: 12},
                              {label: 'Unit', value: '', colSpan: 11, offset: 1, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.fire_building_unit},
                              {label: 'Currency', value: '', colSpan: 24, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.fire_building_currency},
                              {label: 'Min Amount', type: 'inputNumber', value: '', colSpan: 12},
                              {label: 'Max Amount', type: 'inputNumber', value: '', colSpan: 11, offset: 1}
                            ]
                          }, {
                            colSpan: 6,
                            itemsLabel: {label: 'Other Structure', value: '', colSpan: 24, checkbox: false},
                            items: [
                              {label: 'Type', value: '', colSpan: 24},
                              {label: 'Value', type: 'inputNumber', value: '', colSpan: 12},
                              {label: 'Unit', value: '', colSpan: 11, offset: 1, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.fire_structure_unit},
                              {label: 'Currency', value: '', colSpan: 24, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.fire_structure_currency},
                              {label: 'Min Amount', type: 'inputNumber', value: '', colSpan: 12},
                              {label: 'Max Amount', type: 'inputNumber', value: '', colSpan: 11, offset: 1}
                            ]
                          }, {
                            colSpan: 12,
                            itemsLabel: {label: 'Content', value: '', colSpan: 24, checkbox: true, checked: true},
                            items: [
                              {label: 'Type', value: '', colSpan: 24},
                              {label: 'Value', type: 'inputNumber', value: '', colSpan: 12},
                              {label: 'Unit', value: '', colSpan: 11, offset: 1, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.fire_content_unit},
                              {label: 'Currency', value: '', colSpan: 24, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.fire_content_currency},
                              {label: 'Min Amount', type: 'inputNumber', value: '', colSpan: 12},
                              {label: 'Max Amount', type: 'inputNumber', value: '', colSpan: 11, offset: 1}
                            ],
                            childs: [
                              {
                                colSpan: 12,
                                itemsLabel: {label: 'Machinery', value: '', colSpan: 24, checkbox: false},
                                items: [
                                  {label: 'Type', value: '', colSpan: 24},
                                  {label: 'Value', type: 'inputNumber', value: '', colSpan: 12},
                                  {label: 'Unit', value: '', colSpan: 11, offset: 1, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.fire_machinary_unit},
                                  {label: 'Currency', value: '', colSpan: 24, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.fire_machinary_currency},
                                  {label: 'Min Amount', type: 'inputNumber', value: '', colSpan: 12},
                                  {label: 'Max Amount', type: 'inputNumber', value: '', colSpan: 11, offset: 1}
                                ]
                              }, {
                                colSpan: 12,
                                itemsLabel: {label: 'Stock', value: '', colSpan: 24, checkbox: false},
                                items: [
                                  {label: 'Type', value: '', colSpan: 24},
                                  {label: 'Value', type: 'inputNumber', value: '', colSpan: 12},
                                  {label: 'Unit', value: '', colSpan: 11, offset: 1, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.fire_stock_unit},
                                  {label: 'Currency', value: '', colSpan: 24, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.fire_stock_currency},
                                  {label: 'Min Amount', type: 'inputNumber', value: '', colSpan: 12},
                                  {label: 'Max Amount', type: 'inputNumber', value: '', colSpan: 11, offset: 1}
                                ]
                              }
                            ]
                          }
                        ]
                      }, {
                        colSpan: 8,
                        itemsLabel: {label: 'BI', value: '', colSpan: 24, checkbox: false},
                        items: [
                          {label: 'Type', value: '', colSpan: 24},
                          {label: 'Value', type: 'inputNumber', value: '', colSpan: 10},
                          {label: 'Unit', value: '', colSpan: 10, offset: 1, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.fire_bi_unit},
                          {label: 'Currency', value: '', colSpan: 24, type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.fire_bi_currency},
                          {label: 'Min Amount', type: 'inputNumber', value: '', colSpan: 10},
                          {label: 'Max Amount', value: '', colSpan: 10, offset: 1}
                        ]
                      }
                    ]
                  }
                }
              }
              ]
          }
        ]
      }
    ]},
  { label: 'Pricing', value: {
      supHeader: {

        title: 'Codification',
        content: [
          {label: 'Pricing Category', value: '', type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.pricing_category},
          {label: 'Pricing Sub-Category', value: '', type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.pricing_sub_category}
        ]
      },
      header: {
        title: 'Risk factor',
        content: [
          {label: 'Asset quality', value: 0, field_code : LOCATION_FIELD_CODES_ENUM.asset_quality},
          {label: 'BI Mitigation', value: 0, field_code : LOCATION_FIELD_CODES_ENUM.bi_mitigation},
          {label: 'Machinery Breakdown Quality', value: 0, field_code : LOCATION_FIELD_CODES_ENUM.mb_quality},
          {label: 'Operational Status', value: '', type: 'list', field_code : LOCATION_FIELD_CODES_ENUM.operational_status},
        ]
      },
      body: [{
        label: 'Results',
        value: [
          {
            label: 'Standard deductible',
            items: [
              {label: 'Type', value: ''},
              {label: 'Value', type: 'inputNumber', value: ''}
            ],
          },
          {
            label: 'Local deductible',
            items: [
              {label: 'Type', value: ''},
              {label: 'Value', type: 'inputNumber', value: ''}
            ],
          }
        ]
      },
        {
          label: 'Deductible',
          items: [
            {label: 'Base Rate (@standard deductible)', value: '', type: 'inputNumber'},
            {label: 'Risk Adjusted Rate', value: '', type: 'inputNumber'},
            {label: 'Rate (@local deductible)', value: '', type: 'inputNumber'},
          ],
        }],
      footer: {
        title: '',
        content: [
          {label: 'Expected Losses', type: 'inputNumber', value: ''},
        ]
      }
    }},
  { label: 'CAT Analysis & CAT Information', value: {
      leftPanel: {
        header: {label: 'Country', value: ''},
        body: {
          leftSide: [
            {label: 'Earthquake', type: 'level',  subLabel: '(Marshal Modified Intensity)',  value: '',
              colors: [
                {color: '#FFFFFF', checked: true, value: 'NO'},
                {color: '#faf781', checked: false, value: ''},
                {color: '#e9d9a0', checked: false, value: ''},
                {color: '#d4b48c', checked: false, value: ''},
                {color: '#bd8f7a', checked: false, value: ''},
                {color: '#a76b67', checked: false, value: ''}
                ]
            },
            {label: 'Windstorm', type: 'level', subLabel: '(Saphir Simpson Scale)',  value: '',
              colors: [
                {color: '#FFFFFF', checked: true, value: 'NO'},
                {color: '#d3f4f7', checked: false, value: ''},
                {color: '#b2d9f3', checked: false, value: ''},
                {color: '#4498e5', checked: false, value: ''},
                {color: '#79a8e3', checked: false, value: ''},
                {color: '#7489ce', checked: false, value: ''},
                {color: '#6b6fbc', checked: false, value: ''}
                ]
              },
            {label: 'Tsunami', type: 'level', value: '',
              colors: [
                {color: '#FFFFFF', checked: true, value: 'NO'},
                {color: '#fa6b65', checked: false, value: ''},
              ]
            },
            {label: 'Stormsurge', type: 'level', value: '',
              colors: [
                {color: '#FFFFFF', checked: true, value: 'NO'},
                {color: '#7ac096', checked: false, value: ''},
                {color: '#bde2a0', checked: false, value: ''},
                {color: '#e7f5ba', checked: false, value: ''},
                {color: '#feeebc', checked: false, value: ''},
                {color: '#faba9b', checked: false, value: ''},
                {color: '#e5827f', checked: false, value: ''}
              ]
            },
            {label: 'High hazard international', type: 'input', value: ''},
            {label: 'CRESTA zone', type: 'input', value: ''},
            {label: 'Unisco patrimoine in Danger', type: 'input', value: ''},
            {label: 'Altitude', type: 'input', value: '432m'},
          ],
          rightSide: [
            {label: 'Windstorm Tier Zone', type: 'level', value: '',
              colors: [
                {color: '#FFFFFF', checked: true, value: 'NO'},
                {color: '#fa6b65', checked: false, value: ''},
                {color: '#ffae64', checked: false, value: ''},
              ]
            },
            {label: 'Tornado', type: 'level',  value: '',
              colors: [
                {color: '#FFFFFF', checked: true, value: 'NO'},
                {color: '#c5d4d8', checked: false, value: ''},
                {color: '#d4b48c', checked: false, value: ''},
                {color: '#bd8f7a', checked: false, value: ''},
                {color: '#a76b67', checked: false, value: ''},
              ]
            },
            {label: 'Hail Zone', type: 'level', value: '',
              colors: [
                {color: '#FFFFFF', checked: true, value: 'NO'},
                {color: '#c5d4d8', checked: false, value: ''},
                {color: '#d4b48c', checked: false, value: ''},
                {color: '#bd8f7a', checked: false, value: ''},
                {color: '#a76b67', checked: false, value: ''},
              ]
            },
            {label: 'Earthquake', type: 'input', value: 'New Madrid'},
            {label: 'FEMA Flood Zone', type: 'input', value: 'X'},
            {label: 'FEMA Neighboring Flood Zone', type: 'input', value: 'A'},
          ]
        }
      },
      rightPanel: {

      }
    }},
  { label: 'More Information',
    tabs: [
      {
        title: 'Secondary Modifiers',
        content: {
          header: [
            {label: 'First floor height', type: 'inputNumber', value: '', colSpan: 16, offset: 0, field_code: LOCATION_FIELD_CODES_ENUM.first_floor_height},
            {label: 'Unit', value: '', type: 'list', colSpan: 7, offset: 1, field_code: LOCATION_FIELD_CODES_ENUM.first_floor_height_unit},
            {label: 'Certified elevation height', type: 'inputNumber', value: '', colSpan: 16, offset: 0, field_code: LOCATION_FIELD_CODES_ENUM.certified_elevation_height},
            {label: 'Unit', value: '', type: 'list', colSpan: 7, offset: 1, field_code: LOCATION_FIELD_CODES_ENUM.certified_elevation_height_unit},
          ],
          body: [
             {
              label: 'Windstorm',
              value: [
                {
                label: 'Design code',
                checked: false,
                items: [
                  {label: 'Wind and Storm Surge', value: '', checked: false},
                  {label: 'Wind Only', value: '', checked: false},
                  {label: 'Surge Only', value: '', checked: false},
                  {label: 'Default RMS', value: '', checked: true},
                ]
              },
                {
                label: 'Flashing',
                checked: false,
                items: [
                  {label: 'Unknown', value: '', checked: false},
                  {label: 'Flashing and copying quality', value: '', checked: false},
                  {label: 'Does not comply with  ES-1', value: '', checked: false},
                  {label: 'Default RMS', value: '', checked: true},
                ]
              },
                {
                label: 'IFM Vertical exposure distribution',
                checked: false,
                items: [
                  {label: 'Unknown', value: '', checked: false},
                  {label: 'Basement level ', value: '', checked: false},
                  {label: 'Grade level', value: '', checked: false},
                  {label: 'Elevated contents <50%', value: '', checked: false},
                  {label: 'Elevated contents <10%', value: '', checked: false},
                  {label: 'Default RMS', value: '', checked: true},
                ]
              },
                {
                label: 'IFM Structure condition',
                checked: false,
                items: [
                  {label: 'Unknown', value: '', checked: false},
                  {label: 'Poor', value: '', checked: false},
                  {label: 'Average', value: '', checked: false},
                  {label: 'Good', value: '', checked: false},
                  {label: 'Excellent', value: '', checked: false},
                  {label: 'Default RMS', value: '', checked: true},
                ]
              },
                {
                label: 'IFM Outdoor machinery/Equipment bracingn',
                checked: false,
                items: [
                  {label: 'Unknown', value: '', checked: false},
                  {label: 'No/Poor Bracing', value: '', checked: false},
                  {label: 'Superior Bracing', value: '', checked: false},
                  {label: 'Default RMS', value: '', checked: true},
                ]
              },
                {
                label: 'IFM Site Hazard',
                checked: false,
                items: [
                  {label: 'Unknown', value: '', checked: false},
                  {label: 'Severe Missile Exposure', value: '', checked: false},
                  {label: 'Default RMS', value: '', checked: true},
                ]
              },
                {
                label: 'Construction quality',
                checked: false,
                items: [
                  {label: 'NAHU Unknown', value: '', checked: false},
                  {label: 'NAHU Obvious signs of deteriroration or distress', value: '', checked: false},
                  {label: 'NAHU Certified design & constructionn', value: '', checked: false},
                  {label: 'TAIWANT/ CHINA Unknown', value: '', checked: false},
                  {label: 'TAIWAN/ CHINA Obvious signs of deteriroration or distress', value: '', checked: false},
                  {label: 'TAIWAN/ CHINA Certified design & construction', value: '', checked: false},
                  {label: 'OTHER Unknown', value: '', checked: false},
                  {label: 'OTHER Certified design and construction', value: '', checked: false},
                  {label: 'OTHER Certificate of occupacy', value: '', checked: false},
                  {label: 'OTHER No design revie or inspection', value: '', checked: false},
                  {label: 'OTHER Obvious signs of duress/distress', value: '', checked: false},
                  {label: 'OTHER Certified design and construction', value: '', checked: false},
                  {label: 'OTHER IBHS Fortified program', value: '', checked: false},
                  {label: 'Default RMS', value: '', checked: true},
                ]
              },
                {
                label: 'Roof covering',
                checked: false,
                items: [
                  {label: 'NAHU/ CHINA/ TAIWAN/ JAPAN Unknown', value: '', checked: false},
                  {label: 'NAHU/ CHINA/ TAIWAN/ JAPAN Metal sheating with exposed fasteners', value: '', checked: false},
                  {label: 'NAHU/ CHINA/ TAIWAN/ JAPAN Metal sheating with concealed fasteners', value: '', checked: false},
                  {label: 'NAHU/ CHINA/ TAIWAN/ JAPAN Built-up roof or single-ply membrane roof with the presence of gutters ', value: '', checked: false},
                  {label: 'NAHU/ CHINA/ TAIWAN/ JAPAN Built-up roof or single-ply membrane roof without the presence of gutters', value: '', checked: false},
                  {label: 'NAHU/ CHINA/ TAIWAN/ JAPAN Concrete/clay tiles', value: '', checked: false},
                  {label: 'NAHU/ CHINA/ TAIWAN/ JAPAN Wood shakes', value: '', checked: false},
                  {label: 'NAHU/ CHINA/ TAIWAN/ JAPAN Normal shingle (55 mph)', value: '', checked: false},
                  {label: 'NAHU/ CHINA/ TAIWAN/ JAPAN Normal shingle (55 mph) with Secondary Water Resistance (SWR)', value: '', checked: false},
                  {label: 'NAHU/ CHINA/ TAIWAN/ JAPAN Shingle rated for high wind speeds (110 mph)', value: '', checked: false},
                  {label: 'NAHU Concrete Roof', value: '', checked: false},
                  {label: 'NAHU Bermuda-style Roof', value: '', checked: false},
                  {label: 'EUROPE Unknown', value: '', checked: false},
                  {label: 'EUROPE Concrete Fill', value: '', checked: false},
                  {label: 'EUROPE Metal Sheathing', value: '', checked: false},
                  {label: 'EUROPE Single ply membrane', value: '', checked: false},
                  {label: 'EUROPE Concrete/clay tiles', value: '', checked: false},
                  {label: 'EUROPE Thatch', value: '', checked: false},
                  {label: 'OTHER  Unknown', value: '', checked: false},
                  {label: 'OTHER  Concrete Fill', value: '', checked: false},
                  {label: 'OTHER  Metal Sheathing', value: '', checked: false},
                  {label: 'OTHER  Single ply membrane', value: '', checked: false},
                  {label: 'OTHER  Bulit-up', value: '', checked: false},
                  {label: 'OTHER  Normal shingle (55 mph)', value: '', checked: false},
                  {label: 'OTHER  Concrete/clay tiles', value: '', checked: false},
                  {label: 'OTHER  Wood shingles', value: '', checked: false},
                  {label: 'OTHER  Rated shingle (110 mph)', value: '', checked: false},
                  {label: 'OTHER  Rated shingle (110 mph) with SWR', value: '', checked: false},
                  {label: 'Default RMS', value: '', checked: true},
                ]
              },
                {
                label: 'Roof geometry',
                checked: false,
                items: [
                  {label: 'NAHU/ CHINA/ TAUWAN Unknown', value: '', checked: false},
                  {label: 'NAHU/ CHINA/ TAIWAN Flat roof with parapets', value: '', checked: false},
                  {label: 'NAHU/ CHINA/ TAIWAN Flat roof without parapets', value: '', checked: false},
                  {label: 'NAHU/ CHINA/ TAIWAN  Hip roof with slope less than or equal to 6:12 (26.5 degress)', value: '', checked: false},
                  {label: 'NAHU/ CHINA/ TAIWAN Hip roof with slope greater than 6:12 (26.5 degress)', value: '', checked: false},
                  {label: 'NAHU/ CHINA/ TAIWAN Gable roof with slope less than or equal to 6:12 (26.5 degress)', value: '', checked: false},
                  {label: 'NAHU/ CHINA/ TAIWAN Gable roof with slope greater than 6:12 (26.5 degress)', value: '', checked: false},
                  {label: 'NAHU/ CHINA/ TAIWAN Braced gable roof with slope less than or equal to 6:12 (26.5 degress)', value: '', checked: false},
                  {label: 'NAHU/ CHINA/ TAIWAN Braced gable roof with slope greater than 6:12 (26.5 degress)', value: '', checked: false},
                  {label: 'EUROPE Unknown', value: '', checked: false},
                  {label: 'EUROPE Gable roof high pitch', value: '', checked: false},
                  {label: 'EUROPE Hip roof', value: '', checked: false},
                  {label: 'EUROPE Gable roof unknown pitch', value: '', checked: false},
                  {label: 'EUROPE Flat rood (angle of inclination is less than 10 degress)', value: '', checked: false},
                  {label: 'EUROPE Gable roof medium ptich (Inclination between 10 and 30 degrees)', value: '', checked: false},
                  {label: 'EUROPE Monoslope roof', value: '', checked: false},
                  {label: 'EUROPE Braced Gable (medium or unknown pitch)', value: '', checked: false},
                  {label: 'EUROPE Braced Gable (High pitch)', value: '', checked: false},
                  {label: 'OTHER Unknown', value: '', checked: false},
                  {label: 'OTHER High-pitched Roof (Inclination greater than 45 degress)', value: '', checked: false},
                  {label: 'OTHER Hipped Roof (Inclination between 15 and 45 degrees)', value: '', checked: false},
                  {label: 'OTHER Gable Roof (Inclination between 15 and 45 degrees and shape is gabled)', value: '', checked: false},
                  {label: 'OTHER Flat Roof (Inclination less than 15 degrees)', value: '', checked: false},
                  {label: 'Default RMS', value: '', checked: true},
                ]
              },
                {
                label: 'Roof anchor',
                checked: false,
                items: [
                  {label: 'NAHU/ TAIWAN/ CHINA Unknown', value: '', checked: false},
                  {label: 'NAHU/ TAIWAN/ CHINA Toe nailing/No achorage', value: '', checked: false},
                  {label: 'NAHU/ TAIWAN/ CHINA Clips ', value: '', checked: false},
                  {label: 'NAHU/ TAIWAN/ CHINA Single wraps', value: '', checked: false},
                  {label: 'NAHU/ TAIWAN/ CHINA Double wraps', value: '', checked: false},
                  {label: 'OTHER Unknown', value: '', checked: false},
                  {label: 'OTHER Metal or bolt anchors', value: '', checked: false},
                  {label: 'OTHER Toe nailing', value: '', checked: false},
                  {label: 'OTHER No anchorage', value: '', checked: false},
                  {label: 'Default RMS', value: '', checked: true},
                ]
              },
                {
                label: 'Roof age',
                checked: false,
                items: [
                  {label: 'NAHU/ TAIWAN/ CHINA Unknown', value: '', checked: false},
                  {label: 'NAHU/ TAIWAN/ CHINA 0-5 YEARS', value: '', checked: false},
                  {label: 'NAHU/ TAIWAN/ CHINA 6-10 years', value: '', checked: false},
                  {label: 'NAHU/ TAIWAN/ CHINA Obvious sIgns of deterioratioan and distress', value: '', checked: false},
                  {label: 'OTHER Unknown', value: '', checked: false},
                  {label: 'OTHER 0-5 YEARS', value: '', checked: false},
                  {label: 'OTHER 5-10 YEARS', value: '', checked: false},
                  {label: 'OTHER 10 YEAR OR MORE', value: '', checked: false},
                  {label: 'Default RMS', value: '', checked: true},
                ]
              },
                {
                label: 'Roof framing type',
                checked: false,
                items: [
                  {label: 'Unknown', value: '', checked: false},
                  {label: 'Poured/Cast-in-place concrete', value: '', checked: false},
                  {label: 'Precast Concrete', value: '', checked: false},
                  {label: 'heavy steel frames', value: '', checked: false},
                  {label: 'Ligh gauge stell purlins', value: '', checked: false},
                  {label: 'Wood purlins', value: '', checked: false},
                  {label: 'Default RMS', value: '', checked: true},
                ]
              },
                {
                label: 'Roof maintenance',
                checked: false,
                items: [
                  {label: 'Unknown', value: '', checked: false},
                  {label: 'Building maintenance enforced', value: '', checked: false},
                  {label: 'No building maintenance', value: '', checked: false},
                  {label: 'Good', value: '', checked: false},
                  {label: 'Default RMS', value: '', checked: true},
                ]
              },
                {
                label: 'Roof parapets/chimneys',
                checked: false,
                items: [
                  {label: 'Unknown', value: '', checked: false},
                  {label: 'No chimney', value: '', checked: false},
                  {label: 'Presence of chimney', value: '', checked: false},
                  {label: 'Default RMS', value: '', checked: true},
                ]
              },
                {
                label: 'Roof equipment hurricane bracing',
                checked: false,
                items: [
                  {label: 'Unknown', value: '', checked: false},
                  {label: 'NAHU/ TAIWAN/ CHINA Unknown', value: '', checked: false},
                  {label: 'NAHU/ TAIWAN/ CHINA Properly installed with adequate anchorage', value: '', checked: false},
                  {label: 'NAHU/ TAIWAN/ CHINA Obvious signs of deficiencies in the installation', value: '', checked: false},
                  {label: 'OTHER Unknown', value: '', checked: false},
                  {label: 'OTHER No equipment and/or no skylights', value: '', checked: false},
                  {label: 'OTHER Equipment securely anchored to roof', value: '', checked: false},
                  {label: 'OTHER Small roof area with poorly anchored equipment (less than 20% of roof area)', value: '', checked: false},
                  {label: 'Default RMS', value: '', checked: true},
                ]
              },
                {
                label: 'Commercial appurtentant structures',
                checked: false,
                items: [
                  {label: 'NAHU  Unknown', value: '', checked: false},
                  {label: 'NAHU Large signs', value: '', checked: false},
                  {label: 'NAHU Extensive ornamentation', value: '', checked: false},
                  {label: 'NAHU None', value: '', checked: false},
                  {label: 'NAHU Roof-mounted ballasted PV array', value: '', checked: false},
                  {label: 'NAHU Roof-mounted mechanically attached PV array', value: '', checked: false},
                  {label: 'NAHU Large-signs and Roof-mounted ballasted PV array', value: '', checked: false},
                  {label: 'NAHU Large-signs and Roof-mounted mechanically attached PV array', value: '', checked: false},
                  {label: 'NAHU Extensive ornamentation and roof-mounted', value: '', checked: false},
                  {label: 'mechanically attached PV array', value: '', checked: false},
                  {label: 'OTHER Unknown', value: '', checked: false},
                  {label: 'OTHER Little ornamentation (no or few ornaments)', value: '', checked: false},
                  {label: 'OTHER Average amount of ornamentation (post-1950)', value: '', checked: false},
                  {label: 'OTHER Heavy ornamentation ( pre-1950) 0 – Unknown', value: '', checked: false},
                  {label: 'Default RMS', value: '', checked: true},
                ]
              },
                {
                label: 'Cladding type/Wind missiles',
                checked: false,
                items: [
                  {label: 'NAHU/ TAIWAN/ CHINA Unknown', value: '', checked: false},
                  {label: 'NAHU/ TAIWAN/ CHINA Brick veneer', value: '', checked: false},
                  {label: 'NAHU/ TAIWAN/ CHINA Metal sheating 3 - Wood', value: '', checked: false},
                  {label: 'NAHU/ TAIWAN/ CHINA  EIFS / Stucco', value: '', checked: false},
                  {label: 'NAHU/ TAIWAN/ CHINA Impact rated glazing', value: '', checked: false},
                  {label: 'NAHU/ TAIWAN/ CHINA Glazing not designed for impact with gravel rooftop within 1000 ft', value: '', checked: false},
                  {label: 'NAHU/ TAIWAN/ CHINA Glazing not designed for impact without gravel rooftop within 1000 ft', value: '', checked: false},
                  {label: 'EUROPE Unknown', value: '', checked: false},
                  {label: 'EUROPE Concrete or reinforced masonry', value: '', checked: false},
                  {label: 'EUROPE Unreinforced masonary', value: '', checked: false},
                  {label: 'EUROPE Brick veneer', value: '', checked: false},
                  {label: 'EUROPE Metal Sheathing', value: '', checked: false},
                  {label: 'EUROPE Wood', value: '', checked: false},
                  {label: 'EUROPE Laminated glass', value: '', checked: false},
                  {label: 'EUROPE Non-protected glass', value: '', checked: false},
                  {label: 'OTHER Unknown', value: '', checked: false},
                  {label: 'OTHER  Concrete or reinfored masonry (steel reinforcements)', value: '', checked: false},
                  {label: 'OTHER Unreinforced masonry', value: '', checked: false},
                  {label: 'OTHER Brick veneer', value: '', checked: false},
                  {label: 'OTHER Metal sheating', value: '', checked: false},
                  {label: 'OTHER Wood', value: '', checked: false},
                  {label: 'OTHER EIFS', value: '', checked: false},
                  {label: 'OTHER Laminated glass (glass with plastic laminate covering)', value: '', checked: false},
                  {label: 'OTHER Non-protected glass', value: '', checked: false},
                  {label: 'OTHER Vinyl', value: '', checked: false},
                  {label: 'Default RMS', value: '', checked: true},
                ]
              },
                {
                label: 'Roof sheathing attachment',
                checked: false,
                items: [
                  {label: 'NAHU/ CHINA/ TAIWAN Unknown', value: '', checked: false},
                  {label: 'NAHU/ CHINA/ TAIWAN Batten decking/Skipped sheathing', value: '', checked: false},
                  {label: 'NAHU/ CHINA/ TAIWAN 6d Nails - Any nail schedule', value: '', checked: false},
                  {label: 'NAHU/ CHINA/ TAIWAN  8d Nails - Minimum nail schedule (12" panel supports and 6" panel edges)', value: '', checked: false},
                  {label: 'NAHU/ CHINA/ TAIWAN 8d Nails - High Wind nail schedule (6" panel supports and 4" panel edges)', value: '', checked: false},
                  {label: 'NAHU/ CHINA/ TAIWAN 10d Nails- High wind nail schedule (6" panel supports and 4" panel edges)', value: '', checked: false},
                  {label: 'OTHER Unknown', value: '', checked: false},
                  {label: 'OTHER Designed for extreme wind loading', value: '', checked: false},
                  {label: 'OTHER Product evaluation report', value: '', checked: false},
                  {label: 'OTHER Not designed for extreme wind loading (no engineering review of the cladding)', value: '', checked: false},
                  {label: 'Default RMS', value: '', checked: true},
                ]
              },
                {
                label: 'Frame foundation connection',
                checked: false,
                items: [
                  {label: 'NAHU/ TAIWAN/ CHINA Unknown', value: '', checked: false},
                  {label: 'NAHU/ TAIWAN/ CHINA Bolted', value: '', checked: false},
                  {label: 'NAHU/ TAIWAN/ CHINA Unbolted', value: '', checked: false},
                  {label: 'OTHER Engineered (Foundation has been specifically designed and certified)', value: '', checked: false},
                  {label: 'OTHER Non-engineered (Foundation has not be specifically designed or certified)', value: '', checked: false},
                  {label: 'OTHER Poor wall-to-foundation anchorage', value: '', checked: false},
                  {label: 'OTHER No foundation', value: '', checked: false},
                  {label: 'OTHER  Pier and beam, stacked block, CMU wall', value: '', checked: false},
                  {label: 'OTHER  Slab-on-grade, poured-in-place', value: '', checked: false},
                  {label: 'Default RMS', value: '', checked: true},
                ]
              },
                {
                label: 'Residential appurtenant structures',
                checked: false,
                items: [
                  {label: 'NAHU Unknown', value: '', checked: false},
                  {label: 'NAHU  None', value: '', checked: false},
                  {label: 'NAHU Fences / Caport', value: '', checked: false},
                  {label: 'NAHU  Attached Screen enclosure / Lanai', value: '', checked: false},
                  {label: 'NAHU Detached Screen enclosure / Lanai', value: '', checked: false},
                  {label: 'TAIWAN/ CHINA Unknown', value: '', checked: false},
                  {label: 'TAIWAN/ CHINA None', value: '', checked: false},
                  {label: 'TAIWAN/ CHINA Fences / Caport', value: '', checked: false},
                  {label: 'TAIWAN/ CHINA Screen enclosure / Lanai (more than 15% of Bldg. value)', value: '', checked: false},
                  {label: 'TAIWAN/ CHINA Screen enclosure / Lanai (less than 15% of Bldg. value)', value: '', checked: false},
                  {label: 'Default RMS', value: '', checked: true},
                ]
              },
                {
                label: 'Mechanical electrical equipment side of build',
                checked: false,
                items: [
                  {label: 'Unknown', value: '', checked: false},
                  {label: 'None', value: '', checked: false},
                  {label: 'Generally braced (metal braces or straps have been used to fasten the systems to walls', value: '', checked: false},
                  {label: 'Generally non-braced (no braces or straps secure the systems)', value: '', checked: false},
                  {label: 'Default RMS', value: '', checked: true},
                ]
              },
                {
                label: 'Ground level equipment',
                checked: false,
                items: [
                  {label: 'Unknown', value: '', checked: false},
                  {label: 'None', value: '', checked: false},
                  {label: 'Generally protected (the systems are located 5 ft above grounf and/or have waterprood coverings)', value: '', checked: false},
                  {label: 'Generally unprotected (the systems are not elevated or do not have covering)', value: '', checked: false},
                  {label: 'Default RMS', value: '', checked: true},
                ]
              },
                {
                label: 'Resistance doors',
                checked: false,
                items: [
                  {label: 'Unknown', value: '', checked: false},
                  {label: 'Designed for wind pressure and impact resistance', value: '', checked: false},
                  {label: 'Designed for wind pressure only', value: '', checked: false},
                  {label: 'Not designed for wind protection (e.g, flexible doors, thin doors, doors poorly attahced to frame)', value: '', checked: false},
                  {label: 'No door', value: '', checked: false},
                  {label: 'Default RMS', value: '', checked: true},
                ]
              },
                {
                label: 'Opening protection',
                checked: false,
                items: [
                  {label: 'NAHU/ TAIWAN/ CHINA Unknown', value: '', checked: false},
                  {label: 'NAHU/ TAIWAN/ CHINA All openings designed for large missiles', value: '', checked: false},
                  {label: 'NAHU/ TAIWAN/ CHINA All openings designed for medium missiles', value: '', checked: false},
                  {label: 'NAHU/ TAIWAN/ CHINA All openings designed for small missiles', value: '', checked: false},
                  {label: 'NAHU/ TAIWAN/ CHINA All glazed openings designed for large missiles', value: '', checked: false},
                  {label: 'NAHU/ TAIWAN/ CHINA All glazed openings designed for medium missiles', value: '', checked: false},
                  {label: 'NAHU/ TAIWAN/ CHINA All glazed openings designed for small missiles', value: '', checked: false},
                  {label: 'NAHU/ TAIWAN/ CHINA All glazed openings covered with plywood/oriented strand board (OSB)', value: '', checked: false},
                  {label: 'NAHU/ TAIWAN/ CHINA At least one glazed exterior opening does not have wind-borne debris protection', value: '', checked: false},
                  {label: 'NAHU/ TAIWAN/ CHINA No glazed exterior openings have wind-borne debris protection', value: '', checked: false},
                  {label: 'JAPAN Unknown', value: '', checked: false},
                  {label: 'JAPAN Well protected', value: '', checked: false},
                  {label: 'JAPAN Generally Protected', value: '', checked: false},
                  {label: 'OTHER Unknown', value: '', checked: false},
                  {label: 'OTHER Designed for extreme wind (e.g. metal shutters)', value: '', checked: false},
                  {label: 'OTHER Not designed for extreme wind', value: '', checked: false},
                  {label: 'OTHER Jalousie or awning windows', value: '', checked: false},
                  {label: 'OTHER Casement windows', value: '', checked: false},
                  {label: 'OTHER Sliding windows', value: '', checked: false},
                  {label: 'Default RMS', value: '', checked: true},
                ]
              },
                {
                label: 'Wind missiles',
                checked: false,
                items: [
                  {label: 'NAHU/ CHINA/ TAIWAN Unknown', value: '', checked: false},
                  {label: 'NAHU/ CHINA/ TAIWAN None', value: '', checked: false},
                  {label: 'NAHU/ CHINA/ TAIWAN Small airborne missles, e.g. gravel, foliage (structure is within 100ft of missles)', value: '', checked: false},
                  {label: 'NAHU/ CHINA/ TAIWAN Protective Foliage', value: '', checked: false},
                  {label: 'NAHU/ CHINA/ TAIWAN Gravel ballas present', value: '', checked: false},
                  {label: 'NAHU/ CHINA/ TAIWAN Potential severe missile exposure (Trees within striking distance)', value: '', checked: false},
                  {label: 'NAHU/ CHINA/ TAIWAN Isloated large trees', value: '', checked: false},
                  {label: 'Default RMS', value: '', checked: true},
                ]
              },
                {
                label: 'Content vulnerability due to Wind',
                checked: false,
                items: [
                  {label: 'Unknown', value: '', checked: false},
                  {label: 'Low (the structure contains few contents damageable by wind e.g., sturdy, heavy or bolted components)', value: '', checked: false},
                  {label: 'Average (the structure contains a typical amount of contents damageable by wind e.g., residential units)', value: '', checked: false},
                  {label: 'High (the structure contains an inordinate amount of contents susceptible to be spoiled by high winds e.g., retail china/crystal shops)', value: '', checked: false},
                  {label: 'Very High (the structure contents will almost always be damaged by wind', value: '', checked: false},
                  {label: 'Default RMS', value: '', checked: true},
                ]
              },
                {
                label: 'Content vulnerability due to Water',
                checked: false,
                items: [
                  {label: 'Unknown', value: '', checked: false},
                  {label: 'Low (the structure contains few contents damageable by water)', value: '', checked: false},
                  {label: 'Average (the structure contains a typical amount of contents damageable by water e.g., residential units)', value: '', checked: false},
                  {label: 'High (the structure contains an inordinate amount of contents susceptible to be spoiled by water e.r., perishable foodstuffs, grocery stores)', value: '', checked: false},
                  {label: 'Very High (the structure contents will almost always be damaged by water)', value: '', checked: false},
                  {label: 'Default RMS', value: '', checked: true},
                ]
              },
                {
                label: 'Flood protection',
                checked: false,
                items: [
                  {label: 'UK Unknown', value: '', checked: false},
                  {label: 'UK  Yes (such as sandbags and flood doors)', value: '', checked: false},
                  {label: 'UK None', value: '', checked: false},
                  {label: 'UK Raised ground floor (ca. 2m above ground level)', value: '', checked: false},
                  {label: 'UK Raised ground floor (ca. 1m above ground level)', value: '', checked: false},
                  {label: 'UK Raised ground floor (ca. 6m above ground level)', value: '', checked: false},
                  {label: 'UK 0.5m flood wall', value: '', checked: false},
                  {label: 'UK Dry/wet flood proofing', value: '', checked: false},
                  {label: 'Default RMS', value: '', checked: true},
                ]
              },
                {
                label: 'Flood missile exposure',
                checked: false,
                items: [
                  {label: 'Unknown', value: '', checked: false},
                  {label: 'None', value: '', checked: false},
                  {label: 'Flood-carried missiles, unknown size', value: '', checked: false},
                  {label: 'Default RMS', value: '', checked: true},
                ]
              },
                {
                label: 'Basement',
                checked: false,
                items: [
                  {label: 'Unknown', value: '', checked: false},
                  {label: 'No basement', value: '', checked: false},
                  {label: 'Basement with flood protection', value: '', checked: false},
                  {label: 'Basement without flood protection', value: '', checked: false},
                  {label: 'Basement with unknown flood protection', value: '', checked: false},
                  {label: 'Default RMS', value: '', checked: true},
                ]
              }
              ],
              active: true,
              color: '#7bbe31'
            },
            {
              label: 'Earthquake',
              value: [
                {
                  label: 'Plan irregularity',
                  checked: false,
                  items: [
                    {label: 'Unknown', value: '', checked: false},
                    {label: 'Regular', value: '', checked: false},
                    {label: 'Irregular', value: '', checked: false},
                    {label: 'Default RMS', value: '', checked: true},
                  ]
                }, {
                  label: 'Soft story',
                  checked: false,
                  items: [
                    {label: 'Unknown', value: '', checked: false},
                    {label: 'No', value: '', checked: false},
                    {label: 'Yes', value: '', checked: false},
                    {label: 'Default RMS', value: '', checked: true},
                  ]
                }, {
                  label: 'Vertical irregularity',
                  checked: false,
                  items: [
                    {label: 'Unknown', value: '', checked: false},
                    {label: 'No', value: '', checked: false},
                    {label: 'Yes', value: '', checked: false},
                    {label: 'Default RMS', value: '', checked: true},
                  ]
                }, {
                  label: 'Redundancy',
                  checked: false,
                  items: [
                    {label: 'Unknown', value: '', checked: false},
                    {label: 'Some redundancy', value: '', checked: false},
                    {label: 'Little or no redundancy', value: '', checked: false},
                    {label: 'Default RMS', value: '', checked: true},
                  ]
                }, {
                  label: 'Asymmetry and torsion',
                  checked: false,
                  items: [
                    {label: 'Unknown', value: '', checked: false},
                    {label: 'No', value: '', checked: false},
                    {label: 'Yes', value: '', checked: false},
                    {label: 'Default RMS', value: '', checked: true},
                  ]
                }, {
                  label: 'Exterior walls/Cladding',
                  checked: false,
                  items: [
                    {label: 'NAM Unknown', value: '', checked: false},
                    {label: 'NAM Glass', value: '', checked: false},
                    {label: 'NAM Precast Concrete', value: '', checked: false},
                    {label: 'NAM URM - Full Thickness', value: '', checked: false},
                    {label: 'NAM URM - Partial Thickness', value: '', checked: false},
                    {label: 'SE ASIA Unknown', value: '', checked: false},
                    {label: 'SE ASIA Glass', value: '', checked: false},
                    {label: 'SE ASIA Precast Concrete', value: '', checked: false},
                    {label: 'SE ASIA Unreinforced masonry', value: '', checked: false},
                    {label: 'OTHER Unknown', value: '', checked: false},
                    {label: 'OTHER No cladding', value: '', checked: false},
                    {label: 'OTHER Glass or precast concrete', value: '', checked: false},
                    {label: 'OTHER Unreinforced masonry', value: '', checked: false},
                    {label: 'Default RMS', value: '', checked: true},
                  ]
                }, {
                  label: 'Building exterior - 50% rule',
                  checked: false,
                  items: [
                    {label: 'Unknown', value: '', checked: false},
                    {label: 'Less than 50% of wall open', value: '', checked: false},
                    {label: 'More than 50% of wall open', value: '', checked: false},
                    {label: 'Default RMS', value: '', checked: true},
                  ]
                }, {
                  label: 'Short column condition',
                  checked: false,
                  items: [
                    {label: 'Unknown', value: '', checked: false},
                    {label: 'No', value: '', checked: false},
                    {label: 'Yes', value: '', checked: false},
                    {label: 'Default RMS', value: '', checked: true},
                  ]
                }, {
                  label: 'Interior walls/Partitions',
                  checked: false,
                  items: [
                    {label: 'Unknown', value: '', checked: false},
                    {label: 'No', value: '', checked: false},
                    {label: 'Yes', value: '', checked: false},
                    {label: 'Default RMS', value: '', checked: true},
                  ]
                }, {
                  label: 'Appendages and Ornamentation',
                  checked: false,
                  items: [
                    {label: 'Unknown', value: '', checked: false},
                    {label: 'Generally well-braced', value: '', checked: false},
                    {label: 'Somewhat braced', value: '', checked: false},
                    {label: 'Generally unbraced', value: '', checked: false},
                    {label: 'Default RMS', value: '', checked: true},
                  ]
                }, {
                  label: 'Quality of Construction',
                  checked: false,
                  items: [
                    {label: 'Unknown', value: '', checked: false},
                    {label: 'No', value: '', checked: false},
                    {label: 'Yes', value: '', checked: false},
                    {label: 'Default RMS', value: '', checked: true},
                  ]
                }, {
                  label: 'Equipment Support Maintenance',
                  checked: false,
                  items: [
                    {label: 'Unknown', value: '', checked: false},
                    {label: 'No signs', value: '', checked: false},
                    {label: 'Few signs', value: '', checked: false},
                    {label: 'Obvious signs', value: '', checked: false},
                    {label: 'Default RMS', value: '', checked: true},
                  ]
                }, {
                  label: 'Pounding and Impact',
                  checked: false,
                  items: [
                    {label: 'Unknown', value: '', checked: false},
                    {label: 'No: Building is 3" or further away for each story', value: '', checked: false},
                    {label: 'Yes: the adjacent building is less than 3" form your building for each story in the building', value: '', checked: false},
                    {label: 'Default RMS', value: '', checked: true},
                  ]
                }, {
                  label: 'Tank',
                  checked: false,
                  items: [
                    {label: 'Unknown', value: '', checked: false},
                    {label: 'No', value: '', checked: false},
                    {label: 'Yes', value: '', checked: false},
                    {label: 'Default RMS', value: '', checked: true},
                  ]
                }, {
                  label: 'Hazardous Exposures',
                  checked: false,
                  items: [
                    {label: 'Unknown', value: '', checked: false},
                    {label: 'No', value: '', checked: false},
                    {label: 'Yes', value: '', checked: false},
                    {label: 'Default RMS', value: '', checked: true},
                  ]
                }, {
                  label: 'Engineered Foundations',
                  checked: false,
                  items: [
                    {label: 'Unknown', value: '', checked: false},
                    {label: 'No', value: '', checked: false},
                    {label: 'Yes', value: '', checked: false},
                    {label: 'Default RMS', value: '', checked: true},
                  ]
                }, {
                  label: 'Cripple Walls',
                  checked: false,
                  items: [
                    {label: 'JAPAN Unknown', value: '', checked: false},
                    {label: 'JAPAN Grade 0', value: '', checked: false},
                    {label: 'JAPAN Grade 1', value: '', checked: false},
                    {label: 'JAPAN Grade 2', value: '', checked: false},
                    {label: 'JAPAN Grade 3', value: '', checked: false},
                    {label: 'OTHER Unknown', value: '', checked: false},
                    {label: 'OTHER No cripple walls', value: '', checked: false},
                    {label: 'OTHER Braced cripple walls', value: '', checked: false},
                    {label: 'OTHER Unbraced cripple walls', value: '', checked: false},
                    {label: 'Default RMS', value: '', checked: true},
                  ]
                }, {
                  label: 'Frame Bolted to Foundation',
                  checked: false,
                  items: [
                    {label: 'Unknown', value: '', checked: false},
                    {label: 'Bolted', value: '', checked: false},
                    {label: 'Unbolted', value: '', checked: false},
                    {label: 'Earthquake-resistant bracing system (mobile homes only)', value: '', checked: false},
                    {label: 'Default RMS', value: '', checked: true},
                  ]
                }, {
                  label: 'Tilt-Up Retrofit (Anchoring)',
                  checked: false,
                  items: [
                    {label: 'Unknown', value: '', checked: false},
                    {label: 'Properly anchored (Tilt-up)', value: '', checked: false},
                    {label: 'Not properly anchored (Tilt-up)', value: '', checked: false},
                    {label: 'Default RMS', value: '', checked: true},
                  ]
                }, {
                  label: 'URM Retrofit',
                  checked: false,
                  items: [
                    {label: 'Unknown', value: '', checked: false},
                    {label: 'No', value: '', checked: false},
                    {label: 'Yes', value: '', checked: false},
                    {label: 'Default RMS', value: '', checked: false},
                  ]
                }, {
                  label: 'Earthquake Sprinkler Leakage Coverage Flag',
                  checked: false,
                  items: [
                    {label: 'Unknown', value: '', checked: false},
                    {label: 'No', value: '', checked: false},
                    {label: 'Yes', value: '', checked: false},
                    {label: 'Default RMS', value: '', checked: true},
                  ]
                }, {
                  label: 'EQSL Susceptibility',
                  checked: false,
                  items: [
                    {label: 'Unknown', value: '', checked: false},
                    {label: 'Low', value: '', checked: false},
                    {label: 'High', value: '', checked: false},
                    {label: 'Default RMS', value: '', checked: true},
                  ]
                }, {
                  label: 'Sprinkler Type',
                  checked: false,
                  items: [
                    {label: 'Unknown', value: '', checked: false},
                    {label: 'Wet', value: '', checked: false},
                    {label: 'Dry', value: '', checked: false},
                    {label: 'Default RMS', value: '', checked: true},
                  ]
                }, {
                  label: 'Sprinkler Installed Year',
                  checked: false,
                  items: [
                    {label: 'Not Used Legacy', value: '', checked: false},
                    {label: 'Default RMS', value: '', checked: true},
                  ]
                }
              ],
              active: false,
              color: '#e70010'
            },
            {
              label: 'Marine',
              value: [
                {
                  label: 'Salvage potential',
                  checked: false,
                  items: [
                    {label: 'Unknown', value: '', checked: false},
                    {label: 'Lowest', value: '', checked: false},
                    {label: 'Low', value: '', checked: false},
                    {label: 'Average', value: '', checked: false},
                    {label: 'High', value: '', checked: false},
                    {label: 'Very high', value: '', checked: false},
                    {label: 'Default RMS', value: '', checked: true},
                  ]
                }, {
                  label: 'Cargo and specie packaging',
                  checked: false,
                  items: [
                    {label: 'Unknown', value: '', checked: false},
                    {label: 'Deficient', value: '', checked: false},
                    {label: 'Standard', value: '', checked: false},
                    {label: 'Superior', value: '', checked: false},
                    {label: 'Default RMS', value: '', checked: true},
                  ]
                }, {
                  label: 'Cargo and specie protection',
                  checked: false,
                  items: [
                    {label: 'Unknown', value: '', checked: false},
                    {label: 'None', value: '', checked: false},
                    {label: 'Typical', value: '', checked: false},
                    {label: 'Well-protected', value: '', checked: false},
                    {label: 'Default RMS', value: '', checked: true},
                  ]
                }, {
                  label: 'Specie storage',
                  checked: false,
                  items: [
                    {label: 'Unknown', value: '', checked: false},
                    {label: 'Window', value: '', checked: false},
                    {label: 'Outside vault', value: '', checked: false},
                    {label: 'Inside vault', value: '', checked: false},
                    {label: 'Default RMS', value: '', checked: true},
                  ]
                }, {
                  label: 'Sprinkler type',
                  checked: false,
                  items: [
                    {label: 'Unknown', value: '', checked: false},
                    {label: 'Wet', value: '', checked: false},
                    {label: 'Dry', value: '', checked: false},
                    {label: 'Default RMS', value: '', checked: true},
                  ]
                }
              ],
              active: false,
              color: '#008694'
            },
            {
              label: 'Cargo',
              value: [
                {
                  label: 'Wind',
                  checked: false,
                  items: [
                    {label: 'Highly damageable', value: '', checked: false},
                    {label: 'Moderately damageable', value: '', checked: false},
                    {label: 'Damageable', value: '', checked: false},
                    {label: 'Slightly damageable', value: '', checked: false},
                    {label: 'Default RMS', value: '', checked: true},
                  ]
                }, {
                  label: 'Surge',
                  checked: false,
                  items: [
                    {label: 'Highly damageable', value: '', checked: false},
                    {label: 'Moderately damageableent', value: '', checked: false},
                    {label: 'Damageable', value: ''},
                    {label: 'Slightly damageable', value: '', checked: false},
                    {label: 'Default RMS', value: '', checked: true},
                  ]
                }, {
                  label: 'Earthquake',
                  checked: false,
                  items: [
                    {label: 'Highly damageable', value: '', checked: false},
                    {label: 'Moderately damageableent', value: '', checked: false},
                    {label: 'Damageable', value: '', checked: false},
                    {label: 'Slightly damageable', value: '', checked: false},
                    {label: 'Default RMS', value: '', checked: true},
                  ]
                },
              ],
              active: false,
              color: '#795e55'
            }
          ]
        }
      },
      {
        title: 'Binders',
        content: {
          header: [
            {label: 'Policy number', value: '', icon: '/assets/images/policyNumber.png', colSpan: 24, offset: 0, field_code : LOCATION_FIELD_CODES_ENUM.policy_number, disabled: false},
            {label: 'Inception', type: 'date', headerLabel: 'From', value: '', colSpan: 12, offset: 0, field_code : LOCATION_FIELD_CODES_ENUM.inception, disabled: true},
            {label: 'Expiry', type: 'date', headerLabel: 'To', value: '', colSpan: 11, offset: 1, field_code : LOCATION_FIELD_CODES_ENUM.expiry, disabled: true},
            {label: 'Participation', type: 'inputNumber', value: '', colSpan: 12, offset: 0, field_code : LOCATION_FIELD_CODES_ENUM.participation, disabled: true},
            {label: 'Order', type: 'inputNumber', value: '', colSpan: 11, offset: 1, field_code : LOCATION_FIELD_CODES_ENUM.order, disabled: true},
            {label: 'Policy Limit', type: 'inputNumber', value: '', colSpan: 18, offset: 0, field_code : LOCATION_FIELD_CODES_ENUM.policy_limit_value, disabled: true},
            {label: 'Currency', type: 'list', value: '', colSpan: 5, offset: 1, field_code : LOCATION_FIELD_CODES_ENUM.policy_limit_currency, disabled: true},
            {label: 'Policy Excess', type: 'inputNumber', value: '', colSpan: 18, offset: 0, field_code : LOCATION_FIELD_CODES_ENUM.policy_excess_value, disabled: true},
            {label: 'Currency', type: 'list', value: '', colSpan: 5, offset: 1, field_code : LOCATION_FIELD_CODES_ENUM.policy_excess_currency, disabled: true},
          ],
          body: [
            {
              label: 'Location',
              items: [
                {label: 'Inception date', type: 'date', headerLabel: 'From', value: '', colSpan: 12, offset: 0, field_code : LOCATION_FIELD_CODES_ENUM.inception_location_level, disabled: true},
                {label: 'Expiry date', type: 'date', headerLabel: 'To', value: '', colSpan: 11, offset: 1, field_code : LOCATION_FIELD_CODES_ENUM.expiry_location_level, disabled: true},
                {label: 'Gross written premium', type: 'input', value: '', colSpan: 16, offset: 0, field_code : LOCATION_FIELD_CODES_ENUM.gross_written_premium_value, disabled: false},
                {label: 'Currency', type: 'list', value: '', colSpan: 7, offset: 1, field_code : LOCATION_FIELD_CODES_ENUM.location_currency, disabled: true},
              ],
            },
            {
              label: 'Covered Perils',
              items: [
                {label: 'Binder\'s Earthquake Cover', checked: true,  headerLabel: 'From', body: [
                    {
                      label: 'Limit',
                      colSpan: 12,
                      items: [
                        {label: 'Value', type: 'inputNumber', value: '', colSpan: 16, field_code: 'binders_earthquake_limit_value'},
                        {label: 'Currency', value: '', type: 'list', colSpan: 7, offset: 1, field_code : LOCATION_FIELD_CODES_ENUM.binders_earthquake_limit_currency},
                      ],
                    },
                    {
                      label: 'Deductible',
                      colSpan: 11,
                      offset: 1,
                      items: [
                        {label: 'Value', type: 'inputNumber', value: '', colSpan: 16, field_code: 'binders_earthquake_deductible_value'},
                        {label: 'Currency', value: '', type: 'list', colSpan: 7, offset: 1, field_code : LOCATION_FIELD_CODES_ENUM.binders_earthquake_deductible_currency}
                      ],
                    }
                  ]},
                {label: 'Binder\'s Windstorm Cover', checked: true, headerLabel: 'To', body: [
                    {
                      label: 'Limit',
                      colSpan: 12,
                      items: [
                        {label: 'Value', type: 'inputNumber', value: '', colSpan: 16, field_code: 'binders_windstorm_limit_value'},
                        {label: 'Currency', value: '', type: 'list', colSpan: 7, offset: 1, field_code : LOCATION_FIELD_CODES_ENUM.binders_windstorm_limit_currency},
                      ],
                    },
                    {
                      label: 'Deductible',
                      colSpan: 11,
                      offset: 1,
                      items: [
                        {label: 'Value', type: 'inputNumber', value: '', colSpan: 16, field_code: 'binders_windstorm_deductible_value'},
                        {label: 'Currency', value: '', type: 'list', colSpan: 7, offset: 1, field_code : LOCATION_FIELD_CODES_ENUM.binders_windstorm_deductible_currency}
                      ],
                    }
                  ]},
                {label: 'Binder\'s Flood Cover', checked: true, body: [
                    {
                      label: 'Limit',
                      colSpan: 12,
                      items: [
                        {label: 'Value', type: 'inputNumber', value: '', colSpan: 16, field_code: 'binders_flood_limit_value'},
                        {label: 'Currency', value: '', type: 'list', colSpan: 7, offset: 1, field_code : LOCATION_FIELD_CODES_ENUM.binders_flood_limit_currency},
                      ],
                    },
                    {
                      label: 'Deductible',
                      colSpan: 11,
                      offset: 1,
                      items: [
                        {label: 'Value', type: 'inputNumber', value: '', colSpan: 16, field_code: 'binders_flood_deductible_value'},
                        {label: 'Currency', value: '', type: 'list', colSpan: 7, offset: 1, field_code : LOCATION_FIELD_CODES_ENUM.binders_flood_deductible_currency}
                      ],
                    }
                  ]},
                {label: 'Binder\'s Terrorism Cover', checked: true, body: [
                    {
                      label: 'Limit',
                      colSpan: 12,
                      items: [
                        {label: 'Value', type: 'inputNumber', value: '', colSpan: 16, field_code: 'binders_terrorism_limit_value'},
                        {label: 'Currency', value: '', type: 'list', colSpan: 7, offset: 1, field_code : LOCATION_FIELD_CODES_ENUM.binders_terrorism_limit_currency},
                      ],
                    },
                    {
                      label: 'Deductible',
                      colSpan: 11,
                      offset: 1,
                      items: [
                        {label: 'Value', type: 'inputNumber', value: '', colSpan: 16, field_code: 'binders_terrorism_deductible_value'},
                        {label: 'Currency', value: '', type: 'list', colSpan: 7, offset: 1, field_code : LOCATION_FIELD_CODES_ENUM.binders_terrorism_deductible_currency}
                      ],
                    }
                  ]},
                {label: 'Binder\'s Machinery Breakdown  Cover', checked: true, body: [
                    {
                      label: 'Limit',
                      colSpan: 12,
                      items: [
                        {label: 'Value', type: 'inputNumber', value: '', colSpan: 16, field_code: 'binders_machinery_limit_value'},
                        {label: 'Currency', value: '', type: 'list', colSpan: 7, offset: 1, field_code : LOCATION_FIELD_CODES_ENUM.binders_machinary_limit_currency},
                      ],
                    },
                    {
                      label: 'Deductible',
                      colSpan: 11,
                      offset: 1,
                      items: [
                        {label: 'Value', type: 'inputNumber', value: '', colSpan: 16, field_code: 'binders_machinery_deductible_value'},
                        {label: 'Currency', value: '', type: 'list', colSpan: 7, offset: 1, field_code : LOCATION_FIELD_CODES_ENUM.binders_machinary_deductible_currency}
                      ],
                    }
                  ]},
                {label: 'Binder\'s Strike Riot Commotion Cover', checked: true, body: [
                    {
                      label: 'Limit',
                      colSpan: 12,
                      items: [
                        {label: 'Value', type: 'inputNumber', value: '', colSpan: 16, field_code: 'binders_strike_limit_value'},
                        {label: 'Currency', value: '', type: 'list', colSpan: 7, offset: 1, field_code : LOCATION_FIELD_CODES_ENUM.binders_strike_limit_currency},
                      ],
                    },
                    {
                      label: 'Deductible',
                      colSpan: 11,
                      offset: 1,
                      items: [
                        {label: 'Value', type: 'inputNumber', value: '', colSpan: 16, field_code: 'binders_strike_deductible_value'},
                        {label: 'Currency', value: '', type: 'list', colSpan: 7, offset: 1, field_code : LOCATION_FIELD_CODES_ENUM.binders_strike_deductible_currency}
                      ],
                    }
                  ]},
                {label: 'Binder\'s Cyber Cover', checked: true, body: [
                    {
                      label: 'Limit',
                      colSpan: 12,
                      items: [
                        {label: 'Value', type: 'inputNumber', value: '', colSpan: 16, field_code: 'binders_cyber_limit_value'},
                        {label: 'Currency', value: '', type: 'list', colSpan: 7, offset: 1, field_code : LOCATION_FIELD_CODES_ENUM.binders_cyber_limit_currency},
                      ],
                    },
                    {
                      label: 'Deductible',
                      colSpan: 11,
                      offset: 1,
                      items: [
                        {label: 'Value', type: 'inputNumber', value: '', colSpan: 16, field_code: 'binders_cyber_deductible_value'},
                        {label: 'Currency', value: '', type: 'list', colSpan: 7, offset: 1, field_code : LOCATION_FIELD_CODES_ENUM.binders_cyber_deductible_currency}
                      ],
                    }
                  ]},
                {label: 'Binder\'s Fire Cover', checked: true, body: [
                    {
                      label: 'Limit',
                      colSpan: 12,
                      items: [
                        {label: 'Value', type: 'inputNumber', value: '', colSpan: 16, field_code: 'binders_fire_limit_value'},
                        {label: 'Currency', value: '', type: 'list', colSpan: 7, offset: 1, field_code : LOCATION_FIELD_CODES_ENUM.binders_fire_limit_currency},
                      ],
                    },
                    {
                      label: 'Deductible',
                      colSpan: 11,
                      offset: 1,
                      items: [
                        {label: 'Value', type: 'inputNumber', value: '', colSpan: 16, field_code: 'binders_fire_deductible_value'},
                        {label: 'Currency', value: '', type: 'list', colSpan: 7, offset: 1, field_code : LOCATION_FIELD_CODES_ENUM.binders_fire_deductible_currency}
                      ],
                    }
                  ]},
              ],
            },
          ]
        }
      },
      {
        title: 'Miscellaneous',
        content:  [
          {label: 'Aggregation', value: '', height: '50px'},
          {label: 'External Reference', value: '', height: '50px'},
          {label: 'Comment', value: '', height: '150px'}
        ]
      }
    ]},
];

export const mondatoryFields = {
  'General' : {
    division: true,
    location_name: true,
    company_name: true,
    occupancy_code : true,
    occupancy_scheme : true,
    construction_code : true,
    construction_scheme : true,
    accord_occupancy_code : true,
    accord_occupancy_class : true,
    accord_occupancy_subclass : true,
    accord_construction_code : true,
    accord_construction_class : true,
    year_built : true,
    property_db_id : undefined,
    scor_database_id : undefined,
    number_of_stories_unit: undefined,
    basement: undefined,
    basement_stories_unit: undefined,
    basement_finished: undefined,
    number_of_buildings: undefined,
    building_value: undefined,
    roof_year_upgrade: undefined,
    wiring_year_upgrade: undefined,
    plumbing_year_upgrade: undefined

  },
  'Geographical' : {
    cleansed_country : undefined,
    cleansed_iso2: undefined ,
    cleansed_iso3: undefined ,
    cleansed_state: undefined ,
    cleansed_county: undefined ,
    cleansed_city: undefined ,
    cleansed_street: undefined ,
    cleansed_zip_code: undefined ,
    cleansed_latitude: undefined ,
    cleansed_longitude: undefined ,
    final_country: undefined ,
    final_iso2: undefined ,
    final_iso3: undefined ,
    final_state: undefined ,
    // final county: undefined ,
    final_city: undefined ,
    final_street: undefined ,
    final_zip_code: undefined ,
    final_latitude: undefined ,
    final_longitude: undefined ,
    accuracy_level: undefined ,
    geocoder: undefined ,
    accuracy_validated: undefined ,
  },
  'Insured Value' : {
    tiv_amount : true,
    tiv_unit : true,
    tiv_currency : false,
    bi_value : true,
    bi_value_unit : true,
    bi_value_currency : undefined,
    pd_value : true,
    pd_value_unit : true,
    pd_value_currency : undefined,
    // site_currency : true,
    bi_type : true,
    indemnity_period_eip : true,
    bi_declaration_period : true,
    building_value: undefined ,
    building_unit: undefined ,
    building_currency: undefined ,
    stock_value: undefined ,
    stock_unit: undefined ,
    stock_currency: undefined ,
    machinery_value: undefined ,
    machinery_unit: undefined ,
    machinery_currency: undefined ,
    other_structure: undefined ,
    other_structure_unit: undefined ,
    other_structure_currency: undefined ,
    content_value: undefined ,
    content_currency: undefined ,
    content_unit: undefined ,
    pd_split: undefined ,
    for_interest: undefined ,
    interest: undefined ,

  },
  'MPL' : {
    mpl_pd_value : true,
    mpl_pd_percentage : true,
    mpl_bi_value : true,
    mpl_bi_percentage : true,
    fmls_pd_value: undefined ,
    fmls_pd_percentage: undefined ,
    fmls_bi_value: undefined ,
    fmls_bi_percentage: undefined
  },
  'Pricing' : {
    pricing_category : true,
    pricing_sub_category : true,
    asset_quality : true,
    bi_mitigation : true,
    mb_quality : true,
    operational_status : true,
  },
  'More Information' : {
    // policy_number : true,
    // inception_location_level : true,
    // expiry_location_level : true,
    // gross_written_premium_value : true,
    // location_currency : true,
    first_floor_height: undefined ,
    first_floor_height_unit: undefined ,
    certified_elevation_height: undefined ,
    certified_elevation_height_unit: undefined ,
    policy_number: undefined ,
    binders_earthquake_limit_currency: undefined ,
    binders_earthquake_deductible_currency: undefined ,
    binders_windstorm_limit_currency: undefined ,
    binders_windstorm_deductible_currency: undefined ,
    binders_flood_limit_currency: undefined ,
    binders_flood_deductible_currency: undefined ,
    binders_terrorism_limit_currency: undefined ,
    binders_terrorism_deductible_currency: undefined ,
    binders_machinary_limit_currency: undefined ,
    binders_machinary_deductible_currency: undefined ,
    binders_strike_limit_currency: undefined ,
    binders_strike_deductible_currency: undefined ,
    binders_cyber_limit_currency: undefined ,
    binders_cyber_deductible_currency: undefined ,
    binders_fire_limit_currency: undefined ,
    binders_fire_deductible_currency: undefined ,
  }
};
