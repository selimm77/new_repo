export const modelTarget = 
{
    'columns_details': {
        '100% / for Interest': {
            'isMapped': false,
            'name': '100% / for Interest'
        },
        'Accuracy Lvl': {
            'isMapped': false,
            'name': 'Accuracy Lvl'
        },
        'BI (CAD)': {
            'isMapped': false,
            'name': 'BI (CAD)'
        },
        'BI Declaration Period': {
            'isMapped': true,
            'name': 'BI Declaration Period'
        },
        'BI Type': {
            'isMapped': true,
            'name': 'BI Type'
        },
        'Building (CAD)': {
            'isMapped': false,
            'name': 'Building (CAD)'
        },
        'CAT T&C': {
            'isMapped': false,
            'name': 'CAT T&C'
        },
        'City': {
            'isMapped': true,
            'name': 'City'
        },
        'Construction': {
            'isMapped': false,
            'name': 'Construction'
        },
        'Construction Code': {
            'isMapped': true,
            'name': 'Construction Code'
        },
        'Construction Scheme': {
            'isMapped': true,
            'name': 'Construction Scheme'
        },
        'Construction Source': {
            'isMapped': true,
            'name': 'Construction Source'
        },
        'Content (CAD)': {
            'isMapped': false,
            'name': 'Content (CAD)'
        },
        'Country': {
            'isMapped': true,
            'name': 'Country'
        },
        'County': {
            'isMapped': true,
            'name': 'County'
        },
        'Cresta': {
            'isMapped': false,
            'name': 'Cresta'
        },
        'External Reference': {
            'isMapped': true,
            'name': 'External Reference'
        },
        'GC validated': {
            'isMapped': false,
            'name': 'GC validated'
        },
        'Geocode': {
            'isMapped': true,
            'name': 'Geocode'
        },
        'IP (Months)': {
            'isMapped': false,
            'name': 'IP (Months)'
        },
        'Interest': {
            'isMapped': true,
            'name': 'Interest'
        },
        'Is Aggregation': {
            'isMapped': false,
            'name': 'Is Aggregation'
        },
        'LOB': {
            'isMapped': false,
            'name': 'LOB'
        },
        'Latitude': {
            'isMapped': true,
            'name': 'Latitude'
        },
        'Location': {
            'isMapped': false,
            'name': 'Location'
        },
        'Longitude': {
            'isMapped': true,
            'name': 'Longitude'
        },
        'Number of Buildings': {
            'isMapped': true,
            'name': 'Number of Buildings'
        },
        'Number of Stories': {
            'isMapped': true,
            'name': 'Number of Stories'
        },
        'Occupancy Class': {
            'isMapped': false,
            'name': 'Occupancy Class'
        },
        'Occupancy Code': {
            'isMapped': true,
            'name': 'Occupancy Code'
        },
        'Occupancy Scheme': {
            'isMapped': false,
            'name': 'Occupancy Scheme'
        },
        'Occupancy Source': {
            'isMapped': true,
            'name': 'Occupancy Source'
        },
        'Occupancy Sub-Class': {
            'isMapped': false,
            'name': 'Occupancy Sub-Class'
        },
        'Original Full Address': {
            'isMapped': false,
            'name': 'Original Full Address'
        },
        'PD (CAD)': {
            'isMapped': false,
            'name': 'PD (CAD)'
        },
        'PD Split': {
            'isMapped': false,
            'name': 'PD Split'
        },
        'Source': {
            'isMapped': true,
            'name': 'Source'
        },
        'State': {
            'isMapped': true,
            'name': 'State'
        },
        'Street': {
            'isMapped': true,
            'name': 'Street'
        },
        'TIV (CAD)': {
            'isMapped': false,
            'name': 'TIV (CAD)'
        },
        'Year Built': {
            'isMapped': true,
            'name': 'Year Built'
        },
        'ZIP Code': {
            'isMapped': true,
            'name': 'ZIP Code'
        }
    },
    'mappings': {
        'filename': '5e8144241fe16ac1625a6b52',
        'lobId': 1,
        'rules': [
            {
                'dataType': 'string',
                'source': [
                    'Country'
                ],
                'target': 'country'
            },
            {
                'dataType': 'string',
                'source': [
                    'State'
                ],
                'target': 'state'
            },
            {
                'dataType': 'string',
                'source': [
                    'County'
                ],
                'target': 'county'
            },
            {
                'dataType': 'string',
                'source': [
                    'City'
                ],
                'target': 'city'
            },
            {
                'dataType': 'string',
                'source': [
                    'Street'
                ],
                'target': 'street'
            },
            {
                'dataType': 'string',
                'source': [
                    'ZIP Code'
                ],
                'target': 'zip_code'
            },
            {
                'dataType': 'double',
                'source': [
                    'Latitude'
                ],
                'target': 'latitude'
            },
            {
                'dataType': 'string',
                'source': [
                    'Longitude'
                ],
                'target': 'longitude'
            },
            {
                'dataType': 'string',
                'source': [
                    'Source'
                ],
                'target': 'geo_source'
            },
            {
                'dataType': 'string',
                'source': [
                    'External Reference'
                ],
                'target': 'external_reference'
            },
            {
                'dataType': 'string',
                'source': [
                    'Geocode'
                ],
                'target': 'geocode'
            },
            {
                'dataType': 'string',
                'source': [
                    'Occupancy Code'
                ],
                'target': 'occupancy_code'
            },
            {
                'dataType': 'string',
                'source': [
                    'Construction Scheme'
                ],
                'target': 'construction_scheme'
            },
            {
                'dataType': 'string',
                'source': [
                    'Construction Code'
                ],
                'target': 'construction_code'
            },
            {
                'dataType': 'integer',
                'source': [
                    'Year Built'
                ],
                'target': 'year_built'
            },
            {
                'dataType': 'integer',
                'source': [
                    'Number of Stories'
                ],
                'target': 'number_of_stories'
            },
            {
                'dataType': 'integer',
                'source': [
                    'Number of Buildings'
                ],
                'target': 'number_of_buildings'
            },
            {
                'dataType': 'string',
                'source': [
                    'Construction Source'
                ],
                'target': 'construction_source'
            },
            {
                'dataType': 'string',
                'source': [
                    'Occupancy Source'
                ],
                'target': 'occupancy_source'
            },
            {
                'dataType': 'double',
                'source': [
                    'Interest'
                ],
                'target': 'interest'
            },
            {
                'dataType': 'string',
                'source': [
                    'BI Type'
                ],
                'target': 'bi_type'
            },
            {
                'dataType': 'integer',
                'source': [
                    'BI Declaration Period'
                ],
                'target': 'bi_declaration_period'
            }
        ],
        'worksheet': 'Current',
        'worksheetId': 'L100.xlsx_Current'
    },
    'target_fields': [
        {
            'code': 'location_name',
            'dataType': 'string',
            'mappingRules': null,
            'name': 'Location name',
            'necessity': 'optional'
        },
        {
            'code': 'division',
            'dataType': 'string',
            'mappingRules': null,
            'name': 'Division',
            'necessity': 'mandatory'
        },
        {
            'code': 'country',
            'dataType': 'string',
            'mappingRules': null,
            'name': 'Country',
            'necessity': 'mandatory'
        },
        {
            'code': 'tiv',
            'dataType': 'double',
            'mappingRules': null,
            'name': 'TIV',
            'necessity': 'mandatory'
        },
        {
            'code': 'building_value',
            'dataType': 'double',
            'mappingRules': null,
            'name': 'Building value',
            'necessity': 'optional'
        },
        {
            'code': 'content_value',
            'dataType': 'double',
            'mappingRules': null,
            'name': 'Content value',
            'necessity': 'optional'
        },
        {
            'code': 'bi_value',
            'dataType': 'double',
            'mappingRules': null,
            'name': 'BI value',
            'necessity': 'mandatory'
        },
        {
            'code': 'bi_declaration_period',
            'dataType': 'integer',
            'mappingRules': null,
            'name': 'BI Declaration Period',
            'necessity': 'mandatory'
        },
        {
            'code': 'indemnity_period_eip',
            'dataType': 'integer',
            'mappingRules': null,
            'name': 'Indemnity Period / EIP',
            'necessity': 'mandatory'
        },
        {
            'code': 'longitude',
            'dataType': 'string',
            'mappingRules': null,
            'name': 'Longitude',
            'necessity': 'mandatory'
        },
        {
            'code': 'latitude',
            'dataType': 'double',
            'mappingRules': null,
            'name': 'Latitude',
            'necessity': 'mandatory'
        },
        {
            'code': 'occupancy_code',
            'dataType': 'string',
            'mappingRules': null,
            'name': 'Occupancy code',
            'necessity': 'mandatory'
        },
        {
            'code': 'construction_code',
            'dataType': 'string',
            'mappingRules': null,
            'name': 'Construction code',
            'necessity': 'mandatory'
        },
        {
            'code': 'year_built',
            'dataType': 'integer',
            'mappingRules': null,
            'name': 'Year built',
            'necessity': 'optional'
        },
        {
            'code': 'number_of_stories',
            'dataType': 'integer',
            'mappingRules': null,
            'name': 'Number of stories',
            'necessity': 'optional'
        },
        {
            'code': 'site_currency',
            'dataType': 'string',
            'mappingRules': null,
            'name': 'Site Currency',
            'necessity': 'mandatory'
        },
        {
            'code': 'original_address',
            'dataType': 'string',
            'mappingRules': null,
            'name': 'Original address',
            'necessity': 'optional'
        },
        {
            'code': 'street',
            'dataType': 'string',
            'mappingRules': null,
            'name': 'Street',
            'necessity': 'optional'
        },
        {
            'code': 'city',
            'dataType': 'string',
            'mappingRules': null,
            'name': 'City',
            'necessity': 'optional'
        },
        {
            'code': 'state',
            'dataType': 'string',
            'mappingRules': null,
            'name': 'State',
            'necessity': 'optional'
        },
        {
            'code': 'county',
            'dataType': 'string',
            'mappingRules': null,
            'name': 'County',
            'necessity': 'optional'
        },
        {
            'code': 'zip_code',
            'dataType': 'string',
            'mappingRules': null,
            'name': 'Zip code',
            'necessity': 'optional'
        },
        {
            'code': 'external_reference',
            'dataType': 'string',
            'mappingRules': null,
            'name': 'External Reference',
            'necessity': 'optional'
        },
        {
            'code': 'geocode',
            'dataType': 'string',
            'mappingRules': null,
            'name': 'Geocode',
            'necessity': 'mandatory'
        },
        {
            'code': 'accuracy',
            'dataType': 'string',
            'mappingRules': null,
            'name': 'Accuracy',
            'necessity': 'mandatory'
        },
        {
            'code': 'geo_source',
            'dataType': 'string',
            'mappingRules': null,
            'name': 'Source',
            'necessity': 'mandatory'
        },
        {
            'code': 'occupancy_source',
            'dataType': 'string',
            'mappingRules': null,
            'name': 'Occupancy Source',
            'necessity': 'optional'
        },
        {
            'code': 'construction_scheme',
            'dataType': 'string',
            'mappingRules': null,
            'name': 'Construction Scheme',
            'necessity': 'mandatory'
        },
        {
            'code': 'construction_source',
            'dataType': 'string',
            'mappingRules': null,
            'name': 'Construction Source',
            'necessity': 'optional'
        },
        {
            'code': 'number_of_buildings',
            'dataType': 'integer',
            'mappingRules': null,
            'name': 'Number of buildings',
            'necessity': 'optional'
        },
        {
            'code': 'bi_type',
            'dataType': 'string',
            'mappingRules': null,
            'name': 'BI type',
            'necessity': 'mandatory'
        },
        {
            'code': 'machinery_value',
            'dataType': 'double',
            'mappingRules': null,
            'name': 'Machinery value',
            'necessity': 'optional'
        },
        {
            'code': 'stock_value',
            'dataType': 'double',
            'mappingRules': null,
            'name': 'Stock value',
            'necessity': 'optional'
        },
        {
            'code': 'building_value',
            'dataType': 'double',
            'mappingRules': null,
            'name': 'Building value',
            'necessity': 'optional'
        },
        {
            'code': 'pd_value',
            'dataType': 'double',
            'mappingRules': null,
            'name': 'PD value',
            'necessity': 'optional'
        },
        {
            'code': 'interest',
            'dataType': 'double',
            'mappingRules': null,
            'name': 'Interest',
            'necessity': 'mandatory'
        },
        {
            'code': 'for_interest',
            'dataType': 'string',
            'mappingRules': null,
            'name': 'For Interest',
            'necessity': 'mandatory'
        },
        {
            'code': 'geocoding_validated',
            'dataType': 'integer',
            'mappingRules': null,
            'name': 'Geocoding Validated',
            'necessity': 'mandatory'
        },
        {
            'code': 'geosource',
            'dataType': 'string',
            'mappingRules': null,
            'name': 'Geosource',
            'necessity': 'mandatory'
        }
    ]
}