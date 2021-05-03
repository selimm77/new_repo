import { ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import { IHeaderGroupParams } from '@ag-grid-enterprise/all-modules';
import { IHeaderGroupAngularComp } from '@ag-grid-community/angular';
import {
  selectCleansingCsMetadata,
  selectCleansingData,
  selectCleansingErrors,
  selectFilterErrorsByType
} from '@app/dcm/modules/upload/store/cleansing/cleansing.selectors';
import {
  ActionLoadAllData, ActionFilterErrorsByType, ActionFilterQuickSearch,
} from '@app/dcm/modules/upload/store/cleansing/cleansing.actions';
import {CleansingService} from '@app/dcm/modules/upload/services/cleansing.service';
import {selectImportObjectState} from '@app/dcm/modules/upload/store/import/import.selectors';
import {GridOptions} from '@ag-grid-enterprise/all-modules';
import {AppState} from '@app/core';
import {FileImportService} from '@app/dcm/modules/upload/services/file-import.service';
import {Store} from '@ngrx/store';
import { GridLineInfo } from '@app/shared/customized-shared-location-grid/GridLineInfo';
import { CustomizedSharedGridService } from '@app/shared/customized-shared-location-grid/customized-grid-buttons.service';
import { GeneralLocationInfoPopupComponent } from '@app/shared/popups/general-location-info-popup/general-location-info-popup.component';
import { MatDialog } from '@angular/material';

@Component({
  templateUrl: 'edit-all.component.html',
  styleUrls: []
})
export class EditAllComponent implements OnDestroy, IHeaderGroupAngularComp {
public importData$;
  public csMetadata$;
  public exposures$;
  public datacheck$;
  public isFirstLoad = 1;
  public gridOptions: GridOptions;
  public self$;
  private params: any;
  private gridApi;
  public filtersInfo: any;
  public currentPage = 1 ;
  public indexRowsLoaded = []
  typeErrors = [
    { id: 'all', name: 'All' },
    { id: 'errors', name: 'Errors' },
    { id: 'warnings', name: 'Warnings' }
  ]

  constructor(public dialog: MatDialog,
    private service: CustomizedSharedGridService,
              private store$: Store<AppState>, private fileImportService: FileImportService) {

    this.gridOptions = <GridOptions>{};

  
    this.exposures$ = this.store$.select(selectCleansingData);
    this.exposures$.subscribe(data =>{
      if (data.abolute_index) {
        this.indexRowsLoaded = data.abolute_index;
      }
      else {
        this.indexRowsLoaded = data.index;
      }
   
      this.currentPage = data['current_page'];
    })
    


  }


    agInit(params: IHeaderGroupParams): void {
        this.params = params;
        this.gridApi = params.api;
    const rowIndex = this.params.rowIndex;
        // filter-division this.params.columnGroup.getOriginalColumnGroup().addEventListener('expandedChanged', this.onExpandChanged.bind(this));
    }

    ngOnDestroy() {
        // console.log(`Destroying HeaderGeocodeComponent`);
    }

    invokeEditMethod($event) {
      let line : any = {}
      let multiple : any = {}
      let page = this.currentPage - 1
      const selectedRowsData = this.gridApi.getSelectedRows();
      const selectedRowsIndex = this.gridApi.getSelectedNodes().map(s=> s.childIndex);
      const original_indices = selectedRowsIndex.map(s=> (this.indexRowsLoaded[s]));
      let original_rowId = selectedRowsIndex[0] + (page * 50)
      Object.keys(selectedRowsData[0]).forEach((col, i) => {
        if(!selectedRowsData.map(e => e[col]).every(i => i === selectedRowsData[0][col])){
 
         line[col] = null
         multiple[col] = true
        }
        else{
          line[col] = selectedRowsData[0][col]
          multiple[col] = false
        }
        })
        if(selectedRowsIndex.length > 1 && selectedRowsIndex.includes(selectedRowsIndex[0])){
          let obj = {
            line : line,
            backup : selectedRowsData[0],
            rowId : selectedRowsIndex[0],
            indices :  selectedRowsIndex ,
            multiple : multiple,
            isMultipleEdit : true,
            current_page : this.currentPage,
            original_rowId : original_rowId,
            original_indices : original_indices
    
          }
          this.onEditRowClick(obj);
     
          
        }
        else {
          let obj = {
            line : line,
            backup : selectedRowsData[0],
            rowId : selectedRowsIndex[0],
            indices :  [selectedRowsIndex[0]],
            multiple : multiple,
            isMultipleEdit : false,
            current_page : this.currentPage,
            original_rowId : original_rowId,
            original_indices : [original_rowId]
          }
          this.onEditRowClick(obj);
         
        }
      }
    
    
    // console.log(this.gridApi.getSelectedNodes());
 //   const rowIndex = this.gridApi.getSelectedNodes()[0].childIndex;
 //   this.store.dispatch(new LoadLoadPopUps({location: this.gridApi.getSelectedRows()[0]}));
//    this.service.setNextEdit(new GridLineInfo(rowIndex, rowIndex))
    // console.log(this.gridApi.getSelectedRows());




    onEditRowClick(data: any) {
      let dialogRef = this.dialog.open(GeneralLocationInfoPopupComponent, {
        data: data
      });
  
      dialogRef.afterClosed().subscribe(result => {
       
      });
    }
}

