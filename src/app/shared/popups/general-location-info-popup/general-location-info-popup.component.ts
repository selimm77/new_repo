import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Inject} from '@angular/core';
import {FileImportService} from '@app/dcm/modules/upload/services/file-import.service';
import {AppState} from '@app/core';
import {Store} from '@ngrx/store';
import {selectCleansingData, selectCleansingErrors, selectCleansingStage, selectSelectedRows} from '@app/dcm/modules/upload/store/cleansing/cleansing.selectors';
import {ActionCleansingFinish, ActionCleansingNextStep, ActionCleansingRefreshStage, ActionColumnState, ActionColumnStructure, ActionLoadAllData, ActionLoadCsMetadata, ActionLoadHeaders} from '@app/dcm/modules/upload/store/cleansing/cleansing.actions';
import {selectPopUp} from '@app/dcm/store/dcm.selectors';
import { CleansingService } from '@app/dcm/modules/upload/services/cleansing.service';
import {
  locationGlobalModel,
  mondatoryFields
} from '@app/shared/popups/general-location-info-popup/models/location.model';
import {LocationPopupVisibility} from '@app/shared/popups/general-location-info-popup/store-part/load-pop-up.actions';
import {selectPopupVisibility} from '@app/shared/popups/general-location-info-popup/store-part/load-pop-up.selectors';
import { LOCATION_FIELD_CODES_ENUM } from './models/location-field-codes.const';
import { Observable } from 'rxjs';
import { Import } from '@app/dcm/modules/upload/store/import/import.model';
import { selectImportObjectState } from '@app/dcm/modules/upload/store/import/import.selectors';
import { ActionUpdateFileData, ActionUpdateFileId } from '@app/dcm/modules/upload/store/import/import.actions';
import { MatDialogRef} from '@angular/material';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {NzMessageService} from 'ng-zorro-antd';
import * as _ from 'lodash';
import { LOCATION_REFERENCE_DATA } from './models/location-ref-data.const';
import { cleansingStage } from '@app/dcm/modules/upload/store/cleansing/cleansing.model';
export interface DialogData {
  indices : number[],
  line : any,
  multiple : boolean[],
  backup : any,
  rowId : number,
  isMultipleEdit : boolean,
  current_page : boolean,
  original_indices : number[]
  original_rowId : number
}

@Component({
  selector: 'anms-general-location-info-popup',
  templateUrl: './general-location-info-popup.component.html',
  styleUrls: ['./general-location-info-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeneralLocationInfoPopupComponent implements OnInit {
  dataRows = [];
  model = new FormModel('', '', 0);
  currencies;
  modelVisibility = false;
  popupModel;
  location : any = {};
  importFileData$: Observable<Import>;
  stage$: Observable<cleansingStage>;
  errorFields: any[] = [];
  public fileData;
  public selectedSheet;
  isEditMode =  false;
  isLoading : boolean = false;
  mondatoryFields : any;
  percentages : {building_percentage: any, content_percentage: any} = {
    building_percentage: 0.2,
    content_percentage: 0.8,
  };
  multiple : any = {}
  isMultipleEdit : boolean = false
  errors: any;

  constructor( public dialogRef: MatDialogRef<GeneralLocationInfoPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private store: Store<AppState>, private cdrf: ChangeDetectorRef,
               private cleansingService: CleansingService, private message: NzMessageService) {
    // this.store.select(selectCleansingData).subscribe(data => this.dataRows = JSON.parse(JSON.stringify(data)));
    this.popupModel = _.cloneDeep(locationGlobalModel);
    this.mondatoryFields = _.cloneDeep(mondatoryFields);
    this.importFileData$ = this.store.select(selectImportObjectState);
    this.store.select(selectCleansingErrors).subscribe((data) => {
      if (data) {
        // console.log('==> data errors')
        // console.log(data)
        this.errors = data;
        Object.keys(data.errors).forEach(e => {
          Object.keys(data.errors[e]).forEach(k => {
            data.errors[e][k].some(i => {
              if (this.data && this.data.original_indices.includes(i)) this.errorFields.push(e);
            });
          })
        })

      }
    })
    this.stage$ = this.store.select(selectCleansingStage);
    this.importFileData$.subscribe((importData) => {
      this.fileData = importData.fileData;
      this.selectedSheet = importData.selectedSheet;
    })
  }

  activeTab = 'GEN';
  tabs = [
    {label: 'General', id: 'GEN', state: 'VALID'},
    {label: 'Geographical', id: 'GEO', state: 'VALID'},
    {label: 'Insured Values', id: 'VAL', state: 'VALID'},
    {label: 'MPL', id: 'MPL', state: 'VALID'},
    {label: 'TAC', id: 'TAC', state: 'VALID'},
    {label: 'Pricing', id: 'PRC', state: 'VALID'},
    {label: 'CAT Analyse & CAT Information', id: 'CAT', state: 'VALID'},
    {label: 'More Inforamation', id: 'MOR', state: 'VALID'},
  ];

  selectedCurrency = 'USD';
  /* currencies = [
    {value: 'usd', viewValue: 'USD'},
    {value: 'eur', viewValue: 'EUR'},
  ] */


  ngOnInit() {
    this.data ? Object.keys(LOCATION_FIELD_CODES_ENUM).map(key =>  this.location[LOCATION_FIELD_CODES_ENUM[key]] = this.data.line[key]) :  Object.keys(LOCATION_FIELD_CODES_ENUM).map(key =>  this.location[LOCATION_FIELD_CODES_ENUM[key]] = null);
    this.isEditMode = !!this.data;
    this.data ? this.isMultipleEdit = this.data.isMultipleEdit : this.isMultipleEdit = false;
    if(this.data && this.data.isMultipleEdit)  this.multiple = this.data.multiple;
    if (this.isEditMode) {
      this.adjustMandatoryFields();
      this.cdrf.detectChanges();
    }
    this.currencies = LOCATION_REFERENCE_DATA.get('tiv_currency');
    this.initialiseEmptyFields(this.isEditMode);
    this.cdrf.detectChanges();
  }

  
  adjustMandatoryFields(){
    if(this.data.isMultipleEdit){
      Object.keys(this.mondatoryFields).forEach(k=>{
        Object.keys(this.mondatoryFields[k]).forEach(i=>{
          (this.errorFields.includes(i)) ? this.mondatoryFields[k][i] = true : this.mondatoryFields[k][i] = undefined ;
        })
      })
    }else{
      Object.keys(this.mondatoryFields).forEach(k=>{
        Object.keys(this.mondatoryFields[k]).forEach(i=>{
          if(this.data.line[i] && typeof(this.data.line[i])=='number'){
          ( this.mondatoryFields[k][i]) || (this.data.line[i] && this.data.line[i].length >0 && this.mondatoryFields[k][i]) ? this.mondatoryFields[k][i] = false : ''
        //  (this.errorFields.includes(i)) ? this.mondatoryFields[k][i] = true : this.mondatoryFields[k][i] = undefined ;
          }else{
            ( this.data.line[i] && this.data.line[i].length >0 && this.mondatoryFields[k][i]) || (this.data.line[i] && this.data.line[i].length >0 && this.mondatoryFields[k][i]) ? this.mondatoryFields[k][i] = false : ''

          }
        })
      })
      Object.keys(this.mondatoryFields).forEach(k=>{
        Object.keys(this.mondatoryFields[k]).forEach(i=>{
          (this.multiple[i]) ? this.mondatoryFields[k][i] = undefined : '' ;
        })
      })
      Object.keys(this.mondatoryFields).forEach(k=>{
        Object.keys(this.mondatoryFields[k]).forEach(i=>{
          (this.errorFields.includes(i)) ? this.mondatoryFields[k][i] = true : '' ;
        })
      })

      
      
    }

    
     
  }

  

  /* addLocation(payload){
    this.cleansingService.addLocation(payload, this.fileData.fileId).subscribe((res: any) => {
      const newFileMetadata = {...this.fileData};
      newFileMetadata.fileId = res;
      newFileMetadata.nrows++;
      this.store.dispatch(new ActionUpdateFileData({ fileData: newFileMetadata }));
      this.store.dispatch(new ActionCleansingRefreshStage())
      this.store.dispatch(new ActionCleansingNextStep())
      this.dialogRef.close();
    });
  } */

  addLocation(payload){
    let fileId = 'None';
    let jobId = 'None';
        
    if (this.fileData) {
      fileId = this.fileData.fileId
    }
    this.cleansingService.addLocation(payload, fileId).subscribe((res: any) => {
      if (this.fileData && res && this.errors) {
        const newFileMetadata = {...this.fileData};
      newFileMetadata.fileId = res;
      newFileMetadata.nrows++;
      this.store.dispatch(new ActionUpdateFileData({ fileData: newFileMetadata }));
      this.store.dispatch(new ActionCleansingRefreshStage())
      this.store.dispatch(new ActionCleansingNextStep())
      }
      else {
        fileId = res;
        this.store.dispatch(new ActionUpdateFileId({ fileId: fileId }));
        this.getCurrentData(fileId, jobId);
      }      
      this.dialogRef.close();
    });
  }

  editLocation(payload){
    this.getRequestBody(payload)
    this.cleansingService.editLocation(payload,this.fileData.fileId,this.data.original_indices).subscribe((res: any) => {
      let newFileMetadata = {...this.fileData}
      newFileMetadata.fileId = res
      newFileMetadata.page = this.data.current_page
      this.store.dispatch(new ActionUpdateFileData({ fileData: newFileMetadata }));
     this.store.dispatch(new ActionCleansingRefreshStage())
      this.store.dispatch(new ActionCleansingNextStep())
         this.stage$.subscribe(data => {
      if (data === 'FINISH') {
        this.isLoading = false
        this.dialogRef.close();
      }
    });


    });
  }

  getRequestBody(payload: any[]){
    Object.keys(this.data.line).filter(p => this.data.line[p] == null).forEach(e=>{
      (payload.findIndex(p => p.field_code === e) == -1) ? payload.push({field_code: e, value: this.data.backup[e]}) : ''
    })
    return payload
  }

  getCurrentData(fileId, jobId) {
    const selectedSheet = 0;
    // const  fileId = this.fileId;
    // const  jobId = 'None';
    this.cleansingService.getHeadersEmptyTab(1).subscribe((data) => {
      if (data) {
        // this.headers = data['headers'];
        this.store.dispatch(new ActionLoadHeaders({ headers: data['headers'] }));
        const initColunmState = data['columnState'];
        const columnStructure = data['columnStructure'];
        this.store.dispatch(new ActionColumnState({columnState: initColunmState}));
        this.store.dispatch(new ActionColumnStructure({columnStructure: columnStructure}));
        // this.columnState$.next(data['columnState']);
        // this.columnStructure$.next(data['columnStructure']);
        // this.headers$.next(data['headers']);
      }
    });
    
    this.cleansingService.getExposuresUpload(fileId).subscribe((data) => {
      console.log('getExposuresUpload => ')
      if (data) {
      // this.exposures = data;
      this.store.dispatch(new ActionLoadAllData({ data: data }));
      }
    },
      () => {
        this.cdrf.detectChanges();
      });

      /* this.cleansingService.getMetadataUpload(jobId).subscribe((data) => {
        if (data) {
          // this.metadata = data;
          this.store.dispatch(new ActionLoadCsMetadata({ csMetadata: data }));
        }
      },
        () => {
          this.cdrf.detectChanges();
        }); */
  }

  submitMethod() {
    if (this.checkValidation(false)) {
      this.isLoading = true
      const payload : any[] = [];
      Object.keys(this.location).filter(e => this.location[e] && LOCATION_FIELD_CODES_ENUM[e]).forEach(t => {
        payload.push({ field_code : LOCATION_FIELD_CODES_ENUM[t], value : this.location[t]});
      });
      if(this.isEditMode) this.editLocation(payload);
      else this.addLocation(payload);
    }
  }

  // tst
  modifyData() {
   /* this.store.select(selectPopUp).subscribe(dataPopUp => {
      this.dataRows.forEach(data => {
        if (data['Id'] === dataPopUp.location.id){
          Object.keys( dataPopUp.location).forEach(e => {
            if (e !== 'id'){
              data ['target_' + e] = dataPopUp.location[e];
            }
          });
        }
      });

    this.store.dispatch(new ActionLoadAllData({data: this.dataRows}));

    })*/
  }

  onClose() {
    this.dialogRef.close();
  }

  checkValidation(isButton) {
    const keys = Object.keys(this.mondatoryFields);
    for (const key of keys) {
      if (Object.values(this.mondatoryFields[key]).includes(true)) {
        if (!isButton) this.message.create('error', `A mondatory field is messing in the [${key}] tab`);
        return false;
      }
    }
    return true;
  }

  initialiseEmptyFields(isEdit) {
    Object.keys(this.location).forEach(targetKey => {
      if (targetKey.includes('_currency') && this.location[targetKey] === (isEdit ? '' : null)) {
        this.location[targetKey] = 'USD';
      }
      if (targetKey.includes('_unit') && this.location[targetKey] === (isEdit ? '' : null)) {
        this.location[targetKey] = null;
      }
    })
  }
}

class FormModel {
  constructor(
    public field1: string,
    public field2: string,
    public field3: number,
  ) {
  }
}
