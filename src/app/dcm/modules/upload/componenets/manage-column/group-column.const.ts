export const CATEGORIES = [
    'General',
    'Geographical',
    'Insured Value',
    'MPL',
    'T&C',
    'Pricing',
    'CAT Analysis & CAT information',
    'More information',
]

export const DEFAULT_COLUMN = [
    'location_name', // General
    'company_name', // General
    'property_db_id', // General
    'accord_occupancy_code', // General
    'accord_construction_code', // General

    'final_country', // Geographical
    'final_city', // Geographical
    'final_latitude', // Geographical
    'final_longitude', // Geographical

    'site_currency', // Insured Value
    'tiv_amount', // Insured Value
    'pd_value', // Insured Value
    'indemnity_period_eip', // Insured Value
    'bi_value', // Insured Value
    
    'mpl_pd_value', // Insured Value
    'mpl_pd_percentage', // Insured Value
    'mpl_bi_value', // Insured Value
    'mpl_bi_percentage', // Insured Value

    /* // T & C
    'earthquake_cover_limit',
    // More Infos
    'gross_written_premium_value',
    // Pricing
    'bi_mitigation' */
  ];

  export const DEFAULT_COLUMN_COLLAPSE = [
    // T & C
    'windstorm_cover',
    'earthquake_cover_deductible',
    'windstorm_cover_deductible',
    'earthquake_cover_limit',
    // More Infos
    'windstorm_basement',
    'windstorm_flood_protection',
    'earthquake_soft_story',
    'gross_written_premium_value',
    // Pricing
    'mb_quality',
    'asset_quality',
    'operational_status',
    'bi_mitigation'
  ]