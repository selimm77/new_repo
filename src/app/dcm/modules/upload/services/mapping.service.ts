import {MappingTemplate, MappingTemplateViewModel} from './../models/mapping/mapping-template.model';
import {MappingSourceItem, MappingSourceItemTuple} from './../models/mapping/mapping-source.model';
import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '@env/environment';
import {Observable, of} from 'rxjs';
import {MappingTargetItem, MappingTargetItemTuple} from '../models/mapping/mapping-target.model';
import {map} from 'rxjs/operators';
import { FileData, SheetModel } from '../store/import/import.model';
import { modelTarget } from '@app/dcm/modules/upload/models/mapping/mapping-static-model'
import { MappingParamaters } from '../models/mapping/mapping-paramaters.model';
import { FileModel } from '../models/import/file-model';

@Injectable({
  providedIn: 'root'
})
export class MappingService {

  nrows = 30;
  filetype = 'xlsx';
  worksheet = 'Current';
  worksheet_id_static = '';
  lob_id_static = '1';

  constructor(private http: HttpClient) {
  }

  public getTargetFields(selectedSheets: SheetModel): Observable<any> {
    
    const params = {
      files_ids: selectedSheets.checkedIds,
      lob:  this.lob_id_static
    }
    
    return this.http.post(environment.endPoints.mapping1, params)
      .pipe(map((res: any) => {
        return this.formTargetBody(res);
      }))
  }

  private formTargetBody(response: any): any {
    const target = [];

     for (let i = 0; i < response.length; i++) {
       const elmt = response[i];
     let tg;
    const targetList = [];

       for (const [key, value] of Object.entries(elmt)) {
        for (const [key2, e] of Object.entries(value['target_fields'])) {
          
            tg = new MappingTargetItem(e['code'], e['name'], {
              property: e['code'],
              group: e['category'],
              mappable: e['isMappable'],
              editable: e['isEditable'],
              format: e['dataType'],
              defaultValue: null,
               necessity: e['necessity'],
              mappingRules: e['mappingRules'],
              test: e
            })
            targetList.push(tg)
        }
    }
    target.push(targetList)
     }
    return target
  }
  
  public getSourceFields(selectedSheets: SheetModel): Observable<any> {
    
    const params = {
      files_ids: selectedSheets.checkedIds,
      lob:  this.lob_id_static
    }

    return this.http.post(environment.endPoints.mapping1, params)
      .pipe(map((res: any) =>
        { 
          return this.formSourceBody(res);
        }
      ))
    }
    
  private formSourceBody(response: any): any {
    const source = [];
     for (let i = 0; i < response.length; i++) {
       const elmt = response[i];
       let src;
     const sourceList = [];
     for (const [key, value] of Object.entries(elmt)) {
        for (const [key1, value1] of Object.entries(value['columns_details'])) {
          for (const [key2, value2] of Object.entries(value1)) {
           if (key2 === 'name') {
               src = new MappingSourceItem(key1, value2)
               sourceList.push(src)
             }
          }
          
        }
    }
     source.push(sourceList)
     }
    return source
  }

  public getMappingId(selectedSheets: SheetModel) {
    const params = {
      files_ids: selectedSheets.checkedIds,
      lob:  this.lob_id_static
    }
    return this.http.post(environment.endPoints.mapping1, params)
      .pipe(map((res: any) => {
        
        return this.formListOfMappingId(res);
      }
      ))
  }
  
  formListOfMappingId(response) {
    const mappingIds = [];
    const sheetIds = [];
     for (let i = 0; i < response.length; i++) {
       const elmt = response[i];
     for (const [key, value] of Object.entries(elmt)) {
      mappingIds.push( value['mapping_id'])
      sheetIds.push(key)
    }
  }
     return {
       mappingIds: mappingIds,
       sheetIds: sheetIds
      };
  }

  public getMappingSuggestion(selectedSheets: SheetModel): Observable<any> {

    const params = {
      files_ids: selectedSheets.checkedIds,
      lob:  this.lob_id_static
    }
    return this.http.post(environment.endPoints.mapping1, params)
      .pipe(map((res: any) => {
        return this.formSuggestionBody(res);
      }))
        
  }
  
  formSuggestionBody(response) {
    const suggest = [];
     for (let i = 0; i < response.length; i++) {
       const elmt = response[i];
       let src;
     const suggestList = [];
     for (const [key, value] of Object.entries(elmt)) {
        for (const [key1, value1] of Object.entries(value['mappings'])) {
          suggestList.push({
            mapping: value1['target'],
            taxonomie: value1['source']
        })
          
        }
    }
     suggest.push(suggestList)
     }
    return suggest
  }
  public saveMappingTemplate(mappingData: MappingTemplate, mappingId: string, params: MappingParamaters, targets: MappingTargetItem[]) {

    const mapping = this.transformMapping(targets);
    const req = {
      template: mappingData.name,
      mapping_id: mappingId,
      top_panel: params,
      mapping: mapping
    }
    return this.http.post(environment.endPoints.template, req)
  }
  
  public getMappingList(filename: string): Observable<MappingTemplateViewModel[]> {

    return this.http.get(environment.endPoints.mapping + 'templates?filename=' + filename).pipe(map((apiTemplates: any[]) =>
      apiTemplates.map(t => new MappingTemplateViewModel(
        t.mappingId,
        t.templateName,
        t.templateAuthor,
        new Date(),
        t.template,
      ))
    ))
  }

  public getMappingItem(id: string, filename: string) : any{
    return this.http.get(environment.endPoints.mapping1 + '/template/' + id)
  }

  public getMappingTemplateByHeaders(headers: any): any {

    return this.http.post(environment.endPoints.mapping1 + '/template/find-templates', {header: headers})
  }

  private transformMapping(targets) {
    const mappingTemp = targets.map(t => {
      if (t.mappedItems.map(s => s.viewValue).length !== 0) {
        return {
          source: t.mappedItems.map(s => s.viewValue),
          target: t.value
        }
      }
    });
    const mapping = [];
    mappingTemp.forEach(element => {
      if (element) {
        mapping.push(element)
      }
    }
    )
    return mapping;
  }

  public getCountries(){
   return this.http.get(environment.endPoints.mapping1 + '/countries')
  }

  public getCurrencies(){
   return this.http.get(environment.endPoints.mapping1 + '/currencies')
  }
}
