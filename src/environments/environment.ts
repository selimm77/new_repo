// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

const packageJson = require('../../package.json');
/* const reference = {
  construction_classes: 'http://localhost:5002/references/constructions/classes',
  construction_codes: 'http://localhost:5002/references/constructions/codes', // with params classe (facultatif)
  counties: 'http://localhost:5002/references/counties', // with params state
  countries: 'http://localhost:5002/references/countries',
  currencies: 'http://localhost:5002/references/currencies',
  occupancies_classes: 'http://localhost:5002/references/occupancies/classes',
  occupancies_codes: 'http://localhost:5002/references/occupancies/codes',
  occupancies_subclasses: 'http://localhost:5002/references/occupancies/subclasses',
  states: 'http://localhost:5002/references/states', // with params country
}; */
const reference = {
  construction_classes: 'http://localhost:5002/references/constructions/classes',
  construction_codes: 'http://localhost:5002/references/constructions/codes', // with params classe (facultatif)
  counties: 'http://localhost:5002/references/counties', // with params state
  countries: 'http://localhost:5002/references/countries',
  currencies: 'http://localhost:5002/references/currencies',
  occupancies_classes: 'http://localhost:5002/references/occupancies/classes',
  occupancies_codes: 'http://localhost:5002/references/occupancies/codes',
  occupancies_subclasses: 'http://localhost:5002/references/occupancies/subclasses',
  states: 'http://localhost:5002/references/states', // with params country
};

export const environment = {
  appName: 'DCM',
  envName: 'DEV',
  production: false,
  test: false,
  i18nPrefix: '',
  versions: {
    app: packageJson.version,
    angular: packageJson.dependencies['@angular/core'],
    ngrx: packageJson.dependencies['@ngrx/store'],
    material: packageJson.dependencies['@angular/material'],
    bootstrap: packageJson.dependencies.bootstrap,
    rxjs: packageJson.dependencies.rxjs,
    ngxtranslate: packageJson.dependencies['@ngx-translate/core'],
    fontAwesome: packageJson.dependencies['@fortawesome/fontawesome-free'],
    angularCli: packageJson.devDependencies['@angular/cli'],
    typescript: packageJson.devDependencies['typescript']
  },

  /* endPoints: {

    upload1: 'http://localhost:5000/import/',
    mapping1: 'http://localhost:5001/mapping',
    template: 'http://localhost:5001/mapping/template',
    check: 'http://localhost:5002/check',
    check_delete: 'http://localhost:5002/check/delete',
    apply_mapping: 'http://localhost:5002/check/apply_mapping',

    exposures: 'http://localhost:5002/check/exposures',
    map: 'http://localhost:5002/check/map',
    dashboard: 'http://localhost:5002/check/dashboard',
    cols: 'http://localhost:5002/check/read-column',
    headers: 'http://localhost:5002/check/headers',
    csmetadata: 'http://localhost:5002/check/metadata',
    check_result: 'http://localhost:5002/check/results',
    check_export: 'http://localhost:5002/check/export',
    adjust_tiv: 'http://localhost:5002/check/adjust_tiv',
    apply_modifications: ''http://localhost:5002/check/apply_modifications',
    locations: ''http://localhost:5002/check/locations',
    references: reference,
    search: 'http://localhost:5002/check/read-search',

    setting: 'http://localhost:5003/settings',
    validate: 'http://localhost:5003/validate',

    // upload1: 'http://167.99.96.85:5000/import/',
    upload: 'http://62.210.188.81:42426/dcm/files/',
    mapping: 'http://62.210.188.81:42426/dcm/mappings/',
    fields: 'http://62.210.188.81:42426/dcm/fields/',
    transform: 'http://62.210.188.81:42426/dcm/transform/',
    flow: 'http://62.210.188.81:42426/dcm/flow/',
  }*/

  endPoints: {

    upload1: 'http://localhost:5000/import/',
    mapping1: 'http://localhost:5001/mapping',
    template: 'http://localhost:5001/mapping/template',
    check: 'http://localhost:5002/check',
    check_delete: 'http://localhost:5002/check/delete',
    apply_mapping: 'http://localhost:5002/check/apply_mapping',
    add_location: 'http://localhost:5002/check/add_location',
    edit_location: 'http://localhost:5002/check/edit_location',
    exposures: 'http://localhost:5002/check/exposures',
    map: 'http://localhost:5002/check/map',
    dashboard: 'http://localhost:5002/check/dashboard',
    cols: 'http://localhost:5002/check/read-column',
    headers: 'http://localhost:5002/check/headers',
    csmetadata: 'http://localhost:5002/check/metadata',
    check_result: 'http://localhost:5002/check/results',
    check_export: 'http://localhost:5002/check/export',
    adjust_tiv: 'http://localhost:5002/check/adjust_tiv',
    apply_modifications: 'http://localhost:5002/check/apply_modifications/',
    
    // locations
    exposures_counts: 'http://localhost:5002/check/exposures_counts',
    add_locations: 'http://localhost:5002/check/add_locations',

    references: reference,
    search: 'http://localhost:5002/check/read-search',
    setting: 'http://localhost:5003/settings',
    validate: 'http://localhost:5003/validate',

    // upload1: 'http://167.99.96.85:5000/import/',
    upload: 'http://62.210.188.81:42426/dcm/files/',
    mapping: 'http://62.210.188.81:42426/dcm/mappings/',
    fields: 'http://62.210.188.81:42426/dcm/fields/',
    transform: 'http://62.210.188.81:42426/dcm/transform/',
    flow: 'http://62.210.188.81:42426/dcm/flow/',
  }
};
