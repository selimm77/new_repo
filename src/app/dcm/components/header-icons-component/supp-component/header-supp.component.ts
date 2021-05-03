// import { Component, OnDestroy} from '@angular/core';
import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, Output, EventEmitter, OnDestroy} from '@angular/core';
import { IHeaderGroupParams } from '@ag-grid-enterprise/all-modules';
import { IHeaderGroupAngularComp } from '@ag-grid-community/angular';
import {
  selectCleansingCsMetadata,
  selectCleansingData,
  selectCleansingErrors
} from '@app/dcm/modules/upload/store/cleansing/cleansing.selectors';
import {
  ActionLoadAllData,
} from '@app/dcm/modules/upload/store/cleansing/cleansing.actions';
import {CleansingService} from '@app/dcm/modules/upload/services/cleansing.service';
import {selectImportObjectState} from '@app/dcm/modules/upload/store/import/import.selectors';
import {GridOptions} from '@ag-grid-enterprise/all-modules';
import {AppState} from '@app/core';
import {FileImportService} from '@app/dcm/modules/upload/services/file-import.service';
import {Store} from '@ngrx/store';

@Component({
    templateUrl: 'header-supp.component.html',
    styleUrls: ['header-supp.component.scss']
})
export class HeaderSuppComponent implements OnDestroy, IHeaderGroupAngularComp {
public importData$;
  public csMetadata$;
  public exposures$;
  public datacheck$;
  public isFirstLoad = 1;
  public gridOptions: GridOptions;
  public self$;
  private params: any;
  private gridApi;

  constructor(private cdrf: ChangeDetectorRef,
              private cleansingService: CleansingService,
              private store$: Store<AppState>, private fileImportService: FileImportService) {

    this.gridOptions = <GridOptions>{};

    this.importData$ = this.store$.select(selectImportObjectState);
    this.csMetadata$ = this.store$.select(selectCleansingCsMetadata);
    this.exposures$ = this.store$.select(selectCleansingData);
    this.datacheck$ = this.store$.select(selectCleansingErrors);
  }

    agInit(params: IHeaderGroupParams): void {
        this.params = params;
    }

    ngOnDestroy() {
        // console.log(`Destroying HeaderGeocodeComponent`);
    }

    onSelectType(selectedElement) {
    const value = (<HTMLInputElement>document.getElementById('typeDisplay')).value;
    this.importData$.subscribe((importData) => {
                    const fileData = importData.fileData;
                    const selectedSheet = importData.selectedSheet;
        this.cleansingService.getExposuresByErrorType(fileData, selectedSheet, value).subscribe((data) => {
            if (data) {
                this.store$.dispatch(new ActionLoadAllData({ data: data }));
                this.cdrf.detectChanges();
              }
        });
    });
  }
}

