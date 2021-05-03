import {MappingTargetItem} from './../models/mapping/mapping-target.model';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '@env/environment';
import {map, tap} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {FileData} from '../store/import/import.model';
import {MappingParamaters} from '@app/dcm/modules/upload/models/mapping/mapping-paramaters.model';

@Injectable({
  providedIn: 'root'
})
export class CleansingService {
  private cleansingData$: Subject<any>
  private cleansingHeaders$: Subject<any>
  private cleansingExposures$: Subject<any>
  private cleansingDataCheck$: Subject<any>
  private cleansingCsMetadata$: Subject<any>
  private updatedExposures$: Subject<any>
  lob_id_static = '1';
  nrows_static = 7;
  flowId = 1;
  private firstPage = 1;
  public exposures;
  public datacheck;
  public columnWithNumber = ['tiv_amount', 'machinery_value', 'content_value', 'pd_value', 'bi_value', 'building_value', 'stock_value'];
  public columnDisplayByDefault = [
    'location_name', // General
    'company_name', // General
    'property_db_id', // General
    'accord_occupancy_code', // General
    'accord_construction_code', // General

    /* 'original_country', // Geographical
    'original_city', // Geographical
    'original_latitude', // Geographical
    'original_longitude', // Geographical */

    'site_currency', // Insured Value
    'tiv_amount', // Insured Value
    'pd_value', // Insured Value
    'indemnity_period_eip', // Insured Value
    'bi_value', // Insured Value

    'mpl_pd_value', // Insured Value
    'mpl_pd_percentage', // Insured Value
    'mpl_bi_value', // Insured Value
    'mpl_bi_percentage' // Insured Value
  ];

  public columnDisplayByDefaultFinal = [
    'final_country', // Geographical
    'final_city', // Geographical
    'final_latitude', // Geographical
    'final_longitude', // Geographical
  ];

  public columnDisplayByDefaultUpload = this.columnDisplayByDefault.concat(this.columnDisplayByDefaultFinal)

  constructor(private http: HttpClient) {
    this.cleansingHeaders$ = new Subject<any>()
    this.cleansingExposures$ = new Subject<any>()
    this.cleansingDataCheck$ = new Subject<any>()
    this.cleansingData$ = new Subject<any>()
    this.cleansingCsMetadata$ = new Subject<any>()
    this.updatedExposures$ = new Subject<any>()
  }

  public saveMapping(mappingIds: string[], fileIds: string[], targets: MappingTargetItem[][]) {
    const mappings = this.getMappingBody(mappingIds, fileIds, targets);
    return this.http.post(environment.endPoints.mapping1, mappings);
  }

  public applyTopPanelMapping(params: MappingParamaters, mappingId: string) {
    const params1 = this.getParams(params, mappingId);
    return this.http.post(environment.endPoints.mapping1 + '/top-panel' , params1);
  }

  public applyMapping(mappingIds: string[], fileIds: string[], lobId: number) {

    const params = {
      files_ids: fileIds,
      mapping_ids: mappingIds,
      lob_id: lobId
    }
    return this.http.post(environment.endPoints.apply_mapping, params);
  }

  public transform(fileId: string, mappingIds: string[], lobId: number) {
      const params = {
        file_id: fileId,
        mapping_ids: mappingIds,
        lob_id: lobId
      }
    return this.http.post(environment.endPoints.check, params)

  }

// get metadata
  public validate(jobId: any) {
    const params = new HttpParams()
      .set('job_id', jobId);
    return this.http.get(environment.endPoints.csmetadata, { params: params })
  }

// add exposure to cleansingData
  public snapshot(fileData: FileData, selectedSheet: number) {

    const params = new HttpParams()
      .set('page', fileData.page + '')
      .set('nrows', fileData.nrows + '');

    return this.http.get(environment.endPoints.exposures + '/' + fileData.fileId, { params: params }).
      pipe(tap((res) => {
        this.cleansingData$.next(res)
      }));
  }

  // get explosure
  public getCleansingData() {
    return this.cleansingData$.pipe(map(res => {
      const data = res;
      const errors = res;
      return [data, errors, res];
    }))
  }

  public getCsMetadata(jobId: any) {
    return this.http.get(environment.endPoints.csmetadata + '/' + jobId).
      pipe(tap((res) => {
        this.cleansingCsMetadata$.next(res)
      }));
  }
  public getCleansingCsMetadata() {
    return this.cleansingCsMetadata$.
      pipe(map(res => {
        return res;
      }))
  }

  public updateColumn(column: string, value: string, flowId: string) {
    return this.http.put(environment.endPoints.flow + `edit-columns?flowId=${flowId}`, {
      column: column,
      value: value
    })
  }
  public deleteRow(fileData: any, selectedSheet: number, jobId: any, body: any) {
     body['file_id'] = fileData.fileId;
    body['job_id'] = jobId;

    return this.http.post(environment.endPoints.check_delete, body)
  }
  getParams(params, mappingId){
    const p = {}
    Object.keys(params).forEach(key => {
      if (params[key] && key !== 'declaration'){
        p[key] = params[key]
      }
    })
    return {
          mapping_id: mappingId,
          content: p
        }
  }
  private getMappingBody(mappingIds: string[], fileIds: string[], targets: MappingTargetItem[][]): any {
    const mappings = [];

    for (let i = 0; i < targets.length; i++) {
      const mapping = [];
      const mappingTemp = targets[i].map(t => {
      if (t.mappedItems.map(s => s.viewValue).length !== 0) {
        return {
          source: t.mappedItems.map(s => s.viewValue),
          target: t.value
        }
      }
    });
    mappingTemp.forEach(element => {
      if (element) {
          mapping.push(element)
        }
    }
      )
      mappings.push(mapping)
    }

    // console.log('====> apply mapping : ')
    // console.log(mappings)

    return {
      mapping_ids: mappingIds,
      files_ids: fileIds,
      lob: this.lob_id_static,
      mappings: mappings
    }
  };

  // get headers
  public getHeaders(lobId) {
    /* let columnDisplayByDefault;
    const isCleansing = true;
    if (isCleansing) {
      columnDisplayByDefault = this.columnDisplayByDefault;
    }
    else {
      columnDisplayByDefault = this.columnDisplayByDefaultUpload;
    } */
    return this.http.get(environment.endPoints.headers + '/' + lobId).
      pipe(tap((res) => {
        const columnStates = this.getStructureTransformColomn(res, this.columnDisplayByDefault);
        // { headers: res, columnState: columnStates.columnState, columnStructure: columnStates.columnStructure }
        this.cleansingHeaders$.next({headers: res, columnState: columnStates.columnState, columnStructure: columnStates.columnStructure})
      }));
  }

  // get headers empty tab
  public getHeadersEmptyTab(lobId) {
    return this.http.get(environment.endPoints.headers + '/' + lobId).
    pipe(map((res) => {
        const headersSorted = this.sortHeaders(res);
        const columnStates = this.getStructureTransformColomn(headersSorted, this.columnDisplayByDefaultUpload);
        // { headers: res, columnState: columnStates.columnState, columnStructure: columnStates.columnStructure }
        return {headers: headersSorted, columnState: columnStates.columnState, columnStructure: columnStates.columnStructure};
      }));
  }

  public getExposuresUpload(fileId: string) {
    const params = new HttpParams()
      .set('page', this.firstPage + '')
      .set('nrows', 50 + '');
    return this.http.get(environment.endPoints.exposures + '/' + fileId, {params: params});
  }

  public getMetadataUpload(jobId: string) {
    return this.http.get(environment.endPoints.csmetadata + '/' + jobId)
  }
  
  public transformHeaders(headers) {
    const ivTivAmount = 25;
    const ivTivAmountOld = 15;

    const ivSiteCurrency = 26;
    const ivSiteCurrencyOld = 16;

    const occupancyClass = 32;
    const occupancyClassOld = 29;

    const constructionClass = 37;
    const constructionClassOld = 30;

    headers = swapArrayElements(headers, ivTivAmountOld, ivTivAmount);
    headers = swapArrayElements(headers, ivSiteCurrencyOld, ivSiteCurrency);

    headers = swapArrayElements(headers, occupancyClassOld, occupancyClass);
    headers = swapArrayElements(headers, constructionClassOld, constructionClass);

    return headers;
  }

    public getExposures(fileData: FileData, selectedSheet: number) {
    const params = new HttpParams()
      .set('page', this.firstPage + '')
      .set('nrows', fileData.nrows + '');
    return this.http.get(environment.endPoints.exposures + '/' + fileData.fileId, {params: params}).
      pipe(tap((res) => {
        this.cleansingExposures$.next(res);
      }));
  }

  public getExposuresByPage(fileData: FileData, selectedSheet: number) {
    const params = new HttpParams()
      .set('page', fileData.page + '')
      .set('nrows', fileData.nrows + '');
    return this.http.get(environment.endPoints.exposures + '/' + fileData.fileId, {params: params}).
      pipe(tap((res) => {
        this.cleansingExposures$.next(res);
      }));
  }

  public getExposuresAddLocation(fileData : FileData, fileId: string, selectedSheet: number) {
    const params = new HttpParams()
      .set('page', this.firstPage + '')
      .set('nrows', fileData.nrows + '');

    return this.http.get(environment.endPoints.exposures + '/' +fileId, {params: params}).
      pipe(tap((res) => {
        this.cleansingExposures$.next(res);
      }));
  }

  transformExposure(allExposures) {
    const exposures = allExposures.exposures;
    const columnWithNumber = this.columnWithNumber;
    for (let i = 0; i < exposures.length; i++) {
      for (let j = 0; j < columnWithNumber.length; j++) {
        const element = this.columnWithNumber[j];
        const valueTemp = allExposures.exposures[i][element];
        allExposures.exposures[i][element] = numberWithCommas(valueTemp);
      }
    }
    return allExposures;
  }

  // get datacheck
  public getDatacheck(fileData: FileData, selectedSheet: number) {
    const params = new HttpParams()
      .set('page', fileData.page + '')
      .set('nrows', fileData.nrows + '');
    return this.http.get(environment.endPoints.check_result + '/' + fileData.fileId, {params: params}).
      pipe(tap((res) => {
        this.cleansingDataCheck$.next(res)
      }));
  }

  public getExposuresChangedPage(link) {
    link = link.replace('operator=None&', '');
    return this.http.get(link).pipe(map(res => {
        return res;
    }));
  }

 public getDatacheksChangedPage(link) {
    return this.http.get(link).pipe(map(res => {

      return res;
    }));
  }
   public getMetadataChangedPage(link) {
    return this.http.get(link).pipe(map(res => {
      return res;
    }));
  }

  public getUpdateExposures(self) {

    self = self.replace('operator=None&', '');
    return this.http.get(self).pipe(map(res => {
      return res;
    }));
  }

  public getUpdateExposuresAfterCalculTiv(newFileId: string, fileData: FileData) {
    const params = new HttpParams()
    .set('page', this.firstPage + '')
    .set('nrows', fileData.nrows + '');

    return this.http.get(environment.endPoints.exposures + '/' + newFileId, {params: params}).pipe(map(res => {
      return res;
    }));
  }

  public getUpdateExposuresAfterAdd(newFileId: string, fileData: FileData, oldFileId: string) {
    const params = new HttpParams()
    .set('page', this.firstPage + '')
    .set('nrows', fileData.nrows + '')
    // .set('new_file_id', newFileId + '')
    .set('old_file_id', oldFileId + '')
    .set('lob_id', this.lob_id_static);
    // .set('is_add', isAdd + '')

    return this.http.get(environment.endPoints.exposures + '/' + newFileId, {params: params}).pipe(map(res => {

      return res;
    }));
  }

  /* public getUpdateMetadataAfterCalculTiv(newFileId: string, fileData: FileData) {
    const params = new HttpParams()
    .set('page', this.firstPage + '')
    .set('nrows', fileData.nrows + '');

    return this.http.get(environment.endPoints.exposures + '/' + newFileId, {params: params}).pipe(map(res => {
      return res;
    }));
  } */

  public getUpdateCheckAfterCalculTiv(newFileId: string, fileData: FileData) {
    const params = new HttpParams()
    .set('page', this.firstPage + '')
    .set('nrows', fileData.nrows + '');

    return this.http.get(environment.endPoints.check_result + '/' + newFileId, { params: params })
  }

  public doUpdateData(jobId: string, fileData: any, selectedSheet: number, mappingId: string, body: any) {
    body['file_id'] = fileData.fileId
    body['job_id'] = jobId
    body['mapping_ids'] = mappingId
    body['lob_id'] = this.lob_id_static

    return this.http.post(environment.endPoints.check, body)
  }

  public getUpdateCsMetadata(jobId) {
    return this.http.get(environment.endPoints.csmetadata + '/' + jobId)
  }

  public getUpdateCheck(fileData: FileData, selectedSheet: number, currentPage: number) {
    const params = new HttpParams()
      .set('page', currentPage + '')
      .set('nrows', fileData.nrows + '');
    return this.http.get(environment.endPoints.check_result + '/' + fileData.fileId, { params: params })
  }

  public getUpdateCheckFilter(fileData: FileData, currentPage: number, includedIndices: any[], fieldCode: string) {
    const params = new HttpParams()
      .set('page', currentPage + '')
      .set('nrows', fileData.nrows + '')
      .set('included_indices', includedIndices + '')
      .set('field_code', fieldCode);
    return this.http.get(environment.endPoints.check_result + '/' + fileData.fileId, { params: params })
  }

  public getDataChangingPage(link) {
    return this.http.get(link).
      pipe(tap((res) => {
        this.updatedExposures$.next(res)
      }));
  }

  public getCleansingHeaders() {
    return this.cleansingHeaders$.pipe(map(res => {
      return res;
    }))
  }

  public getCleansingExposures() {
    return this.cleansingExposures$.pipe(map(res => {
      return res;
    }))
  }

  public getCleansingDatacheck() {
    return this.cleansingDataCheck$.pipe(map(res => {
      return res;
    }))
  }

  getCleansedDataByOccupancyCode(oc: any) {
    return this.http.get(environment.endPoints.add_location + '/ref_value/'  + oc);
  }

  getCleansedDataByConstructionCode(cc: any) {
    return this.http.get(environment.endPoints.add_location + '/construction_ref_value/'  + cc);
  }

  getOccupancyCodeByOccupancyClass(request: any) {
    return this.http.get(environment.endPoints.add_location + '/occ_value?occupancy_class='  + request.oc + '&occupancy_subclass=' + request.osc);
  }

  getConstructionCodeByConstructionClass(request: any) {
    return this.http.get(environment.endPoints.add_location + '/construction_code?construction_class='  + request);
  }

  //
  public getDataCleansingChangingPage() {
    return this.updatedExposures$.pipe(map(res => {
      return res;
    }))
  }
  // ******************* refs ********************
  // http://localhost:5002/references/constructions/classes
  public getConstructionsClasses() {
    return this.http.get(environment.endPoints.references.construction_classes);
  }

  // http://localhost:5002/references/constructions/codes
  // http://localhost:5002/references/constructions/codes?class=Adobe
  public getConstructionsCodes(classes?: any) {

    if (classes) {
      const params = new HttpParams()
        .set('class', classes)
      return this.http.get(environment.endPoints.references.construction_codes, { params: params });
    }
    else
      return this.http.get(environment.endPoints.references.construction_codes);

  }

  // http://localhost:5002/references/counties/USA-GA
  public getCountiesByState(state: any) {
    return this.http.get(environment.endPoints.references.counties + '/' + state);
  }

  // http://localhost:5002/references/countries
  public getCountries() {
    return this.http.get(environment.endPoints.references.countries);
  }

  // http://localhost:5002/references/currencies
  public getCurrencies() {
    return this.http.get(environment.endPoints.references.currencies);
  }

  // http://localhost:5002/references/occupancies/classes
  public getOccupanciesClasses() {
    return this.http.get(environment.endPoints.references.occupancies_classes);
  }

  // http://localhost:5002/references/occupancies/codes
  // http://localhost:5002/references/occupancies/codes?class=General
  // http://localhost:5002/references/occupancies/codes?class=General&subclass=Chemicals
  public getOccupanciesCodes() {
    return this.http.get(environment.endPoints.references.occupancies_codes);
  }

  // http://localhost:5002/references/occupancies/subclasses?class=Agriculture%20infrastructure
  public getOccupanciesSubclasses() {
    return this.http.get(environment.endPoints.references.occupancies_subclasses);
  }

  // http://localhost:5002/references/counties/US
  public getStatesByCountry(countryCode) {
    return this.http.get(environment.endPoints.references.states + '/' + countryCode);
  }

  // http://localhost:5002/check/edit_location/counties/<country>
  public getDataByCountry(country) {
    return this.http.get(environment.endPoints.edit_location + '/countries/' + country);
  }

  public getConstructionsCode() {
    return this.http.get(environment.endPoints.references.construction_codes);
  }
  // http://localhost:5002/references/constructions/codes?class=Greenhouses
  public getConstructionsCodeByClasses(classesName) {
    const params = new HttpParams()
      .set('class', classesName)
    return this.http.get(environment.endPoints.references.construction_codes, {params: params});
  }

  //
  public getOccupanciesSubclassesByClasses(classesName) {
    const params = new HttpParams()
      .set('class', classesName)
    return this.http.get(environment.endPoints.references.occupancies_subclasses, { params: params });
  }
  //
  public getOccupanciesCodesByClasses(classesName) {
    const params = new HttpParams()
      .set('class', classesName)
    return this.http.get(environment.endPoints.references.construction_codes, { params: params });
  }
  //
  public getOccupanciesCodesBySubClasses(subClassesName) {
    const params = new HttpParams()
      .set('subclass', subClassesName)
    return this.http.get(environment.endPoints.references.construction_codes, { params: params });
  }
  //
  public getOccupanciesCodesByClassesAndSubClasses(classesName, subClassesName) {
    const params = new HttpParams()
      .set('class', classesName)
      .set('subclass', subClassesName)
    return this.http.get(environment.endPoints.references.construction_codes, { params: params });
  }

  public getHeadersT(lobId) {
    const params = new HttpParams()
      .set('lob_id', lobId)
    return this.http.get(environment.endPoints.headers, { params: params });
  }

  // http://localhost:5002/check/exposures?filename=SMALL.xlsx&worksheet=0&page=1&worksheet_id=ce2611d10b9ac15fc4c9d05bd836d2213ac0f8a3&nrows=3
  /* public getExposuresT(fileData: FileData, worksheetIndex: number) {
    const params = new HttpParams()
      .set('filename', fileData.filename)
      .set('worksheet', fileData.worksheet[worksheetIndex])
      .set('page', fileData.page + '')
      .set('worksheet_id', fileData.filename + '_' + fileData.worksheet[worksheetIndex])
      .set('nrows', fileData.nrows + '');

    return this.http.get(environment.endPoints.exposures, { params: params });
  } */

  // http://localhost:5002/check/exposures?filename=SMALL.xlsx&worksheet=0&page=1&worksheet_id=ce2611d10b9ac15fc4c9d05bd836d2213ac0f8a3&nrows=3
  public addLocation(location: any, file_id: string) {
    const params ={
      file_id : file_id,
      location : location,
      lob_id : 1

    }

    return this.http.post(environment.endPoints.add_location,  params);
  }

  public editLocation(location: any, file_id: string, indices : number[]) {
    const params ={
      file_id : file_id,
      location : location,
      lob_id : 1,
      indices: indices

    }

    return this.http.post(environment.endPoints.edit_location,  params);
  }

  public getMapData(fileData: FileData, worksheetIndex: number) {
    const params = new HttpParams()
      .set('filename', fileData.filename)
      .set('worksheet', fileData.worksheet[worksheetIndex])
    return this.http.get(environment.endPoints.map, { params: params });
  }

  // loc
  public countriesforExposure(fileData: FileData, selectedSheet: number) {
    const params = new HttpParams()
    .set('column', 'country')
      .set('unique', '1')
    return this.http.get(environment.endPoints.cols + '/' + fileData.fileId, { params: params });
  }

  public getExposureByColId(fileData: FileData, selectedSheet: number, colId: string, unique: number) {
    let params = new HttpParams()
      .set('column', colId)
      if (unique) {
        params = params.set('unique', unique + '')
      }
    return this.http.get(environment.endPoints.cols + '/' + fileData.fileId, { params: params });

  }

  // loc
  public getExposure(fileData: FileData, selectedSheet: number, index) {
    const params = new HttpParams()
      .set('page', index + '')
      .set('nrows', '1');

    return this.http.get(environment.endPoints.exposures + '/' + fileData.fileId, { params: params });
  }

  // loc
  public getdashboard(fileData: FileData, selectedSheet: number, argument, value, image) {
    let params = new HttpParams()
    .set('argument', argument)
      .set('percentage', value)

      if (image)
      params = params.set('image', image)

    return this.http.get(environment.endPoints.dashboard + '/' + fileData.fileId, { params: params });
  }

  public quickSearchByColCode(fileData, selectedSheet, columnCode, value, operator) {
    let params = new HttpParams()
      .set('value', value + '')
      .set('page', fileData.page + '')
      .set('nrows', fileData.nrows + '')

    if (operator) {
      params = params.set('operator', operator)
    }

    return this.http.get(environment.endPoints.check + '/' + fileData.fileId + '/search/' + columnCode, { params: params });
  }

  public getExposuresWithErrorByColCode(fileData, selectedSheet, columnCode) {
    const params = new HttpParams()
      .set('page', fileData.page)
      .set('nrows', fileData.nrows)

    return this.http.get(environment.endPoints.check + '/' + fileData.fileId + '/errors/column/' + columnCode, { params: params });
  }

  public getExposuresByErrorType(fileData, selectedSheet, filterType) {
    const params = new HttpParams()
      .set('page', fileData.page)
      .set('nrows', fileData.nrows)

    return this.http.get(environment.endPoints.check + '/' + fileData.fileId + '/errors/' + filterType, { params: params });
  }

  /* public exportData(fileId: string, columns: string[]) {
    const headers = new HttpHeaders(
      {
        'Content-Type':  'application/json',
      });
      // return this._http.get(this.baseUrl + url, { headers: headers, responseType: "blob",  observe: 'response'});

    const params = {
      file_id: fileId,
      columns: columns
    }
    return this.http.post(environment.endPoints.check_export, params, { headers: headers, responseType: 'blob', observe: 'response'});
    // return this.http.post(environment.endPoints.check_export, params, { responseType: 'arraybuffer', headers: headers,  observe: 'response'});
  } */

  exportData(fileId: string, columns: string[]):Observable<any>{
    const params = {
      file_id: fileId,
      columns: columns
    }
    return new Observable(obs => {
      var oReq = new XMLHttpRequest();
      oReq.open("POST", environment.endPoints.check_export, true);
      oReq.setRequestHeader("content-type", "application/json");
      oReq.responseType = "arraybuffer";

      oReq.onload = function (oEvent) {
        var arrayBuffer = oReq.response;
        var byteArray = new Uint8Array(arrayBuffer);
        obs.next(byteArray);
      };

      const body = JSON.stringify(params);
      oReq.send(body);
    });
  }

  public ajustTiv(fileId: string, lines: string[], tiv: number, pd: boolean, bi: boolean) {
    const params = {
      file_id: fileId,
      lob_id: this.lob_id_static,
      lines: lines,
      tiv: tiv,
      pd: pd,
      bi: bi,
    }
    return this.http.post(environment.endPoints.adjust_tiv, params);
  }

  public applyCleansing(fileId: string) {

    return this.http.get(environment.endPoints.apply_modifications + fileId);
  }

  /* // get locations
  public getAllLocations() {
    return this.http.get(environment.endPoints.exposures_counts);
  } */
  // get locations
  public getAllLocations(newFileId, oldFileId) {
    const params = new HttpParams()
    .set('new_file_id', newFileId)
    .set('old_file_id', oldFileId)
    return this.http.get(environment.endPoints.exposures_counts, {params: params});
  }
  // add locations
  public addLocations(fileId: string) {
    return this.http.get(environment.endPoints.add_locations + fileId);
  }

  // N
  public shortExposures(fileData, selectedSheet, columnCode, value, order) {
    let params = new HttpParams()
      .set('value', value)
      .set('page', fileData.page)
      .set('nrows', fileData.nrows)

    if (order) {
      params = params.set('order', order)
    }
    else {
      params = params.set('order', '')
    }

    return this.http.get(environment.endPoints.check + '/' + fileData.fileId + '/sort/' + columnCode, { params: params });
  }

  sortHeaders(headers) {
    console.log('short headers')
    var first = 'general';
    return headers.sort(function(x,y){ return x['category']['code'] == first ? -1 : y['category']['code'] == first ? 1 : 0; });
  }

  getStructureTransformColomn(headers, columnDisplayByDefault) {
    const headersMod = [];
              headers.forEach(element => {
                const headersTemp = {
                  categoryName: element.category['label'],
                  fieldName: element.name,
                  fieldCode: element.code,
                  fieldOrder: element.inCategoryOrder,
                  fieldType: element.dataType
                };
                headersMod.push(headersTemp);
              });

              const outPut = [];
    const categories = [];
    for (let i = 0; i < headersMod.length; i++) {
      const elmt = headersMod[i];
      if (!categories.includes(elmt['categoryName'])) {
        categories.push(elmt['categoryName'])
      }
    }

    for (let i = 0; i < categories.length; i++) {
      const subtask = [];
      const cat = categories[i];
      for (let j = 0; j < headersMod.length; j++) {
        const hed = headersMod[j];
        if (cat === hed['categoryName']) {
          if (columnDisplayByDefault.includes(hed['fieldCode'])) {
            subtask.push({
            name: hed['fieldName'],
            code: hed['fieldCode'],
            checked: true
          })
          }
          else {
            subtask.push({
              name: hed['fieldName'],
              code: hed['fieldCode'],
              checked: false
            })
          }

        }

      }
      outPut.push({
        name: cat,
        code: cat,
        checked: false,
        subtask: subtask
      });
    }
              const cols = outPut;
              const columnState = [];
              const initColunmState = [];
              for (let i = 0; i < cols.length; i++) {
                const categories = cols[i];
                for (let j = 0; j < categories['subtask'].length; j++) {
                  const column = categories['subtask'][j];
                  columnState.push({
                    colId: column['code'],
                    hide: !column['checked']
                  })
                  if (columnDisplayByDefault.includes(column['code'])) {
                    initColunmState.push({
                      colId: column['code'],
                      hide: false
                    })
                  }
                  else {
                    initColunmState.push({
                      colId: column['code'],
                      hide: true
                    })
                  }

                }
              }
            return {columnState: columnState, columnStructure: outPut}
      }

}

function swapArrayElements(arr, indexA, indexB) {
  const temp = arr[indexA];
  arr[indexA] = arr[indexB];
  arr[indexB] = temp;
  return arr;
};

function numberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
