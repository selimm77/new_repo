import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import {CustomizedSharedGridService} from './customized-grid-buttons.service';
import {GridLineInfo} from './GridLineInfo';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '@app/core';
import {LoadLocationMaps} from '@app/dcm/modules/upload/containers/location-map/store-part/location-map.actions';
import {LocationMapState} from '@app/dcm/modules/upload/containers/location-map/store-part/location-map.reducer';
import {FileImportService} from '@app/dcm/modules/upload/services/file-import.service';
import {
  ActionCleansingDeleteOrUpdate,
  ActionLoadAllData,
  ActionLoadCsMetadata,
  ActionLoadErrors
} from '@app/dcm/modules/upload/store/cleansing/cleansing.actions';
import {CleansingService} from '@app/dcm/modules/upload/services/cleansing.service';
import {selectPopUp} from '@app/dcm/store/dcm.selectors';
import {
  selectCleansingCsMetadata,
  selectCleansingData,
  selectCleansingErrors
} from '@app/dcm/modules/upload/store/cleansing/cleansing.selectors';
import {selectImportObjectState} from '@app/dcm/modules/upload/store/import/import.selectors';
import {GridOptions} from '@ag-grid-enterprise/all-modules';
import {LocationModel} from '@app/shared/popups/general-location-info-popup/models/location.model';
import {LoadLoadPopUps} from '@app/shared/popups/general-location-info-popup/store-part/load-pop-up.actions';

@Component({
  selector: 'anms-customized-shared-location-grid',
  templateUrl: './customized-shared-location-grid.component.html',
  styleUrls: ['./customized-shared-location-grid.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomizedSharedLocationGridComponent {

  @Input() rowIndex = 0;
  @Input() id = 0;
  @Input() data: Observable<any> = null;
  @Input() allData = false;

  isVisible = false;
  dataRows = [];
  public importData$;
  public csMetadata$;
  public exposures$;
  public datacheck$;
  public isFirstLoad = 1;
  public gridOptions: GridOptions;
  public self$;
  private params: any;
  private gridApi;
  public isVisibleComment = false;

  constructor(private service: CustomizedSharedGridService, private cdrf: ChangeDetectorRef,
              private cleansingService: CleansingService,
              private store$: Store<AppState>, private fileImportService: FileImportService) {

    this.gridOptions = <GridOptions>{};

    this.importData$ = this.store$.select(selectImportObjectState);
    this.csMetadata$ = this.store$.select(selectCleansingCsMetadata);
    this.exposures$ = this.store$.select(selectCleansingData);
    this.datacheck$ = this.store$.select(selectCleansingErrors);
  }

  agInit(params: any): void {
    this.params = params;
    this.gridApi = params.api;
    const rowIndex = this.params.rowIndex;
  }

  refresh(params: any): boolean {
    this.params = params;
    return true;
  };

  refreshGrid() {
    const params = {force: true};
    this.gridApi.refreshCells(params);
  }

  handleCancelComment($event) {
    this.isVisibleComment = false;
  }
  handleOkComment($event) {
    console.log('<= handleOkComment =>')
    this.isVisibleComment = false;
  }

  showComment() {
    console.log('= Show popup for comment =');
    this.isVisibleComment = true;
  }

  invokeEditMethod(event) {
    this.data = this.params.data;
    this.store$.dispatch(new LoadLoadPopUps({location: this.data}))
    this.service.setNextEdit(new GridLineInfo(this.params.rowIndex, this.id,this.params.data))
  }

  getSelectedRowsInfos(gridApi) {
    const selectedRowsIndex = [];
    const selectedRowsData = gridApi.getSelectedRows();
    const selectedRowsNode = gridApi.getSelectedNodes();
    for (let i = 0; i < selectedRowsNode.length; i++) {
      const element = selectedRowsNode[i].childIndex;
      selectedRowsIndex.push(element);
    }
    return {
      selectedRowsData: selectedRowsData,
      selectedRowsIndex: selectedRowsIndex
    }
  }

  invokeGeocodeMethod() {
    if (this.gridApi) {
      const selectedRows = this.getSelectedRowsInfos(this.gridApi);
    }
    if (this.params) {
      const data = this.params.data;
      const index = this.params.rowIndex;
    }
    const locationMap = new LocationMapState();
    locationMap.loaded = true;
    locationMap.location = this.prepareFata();
    this.store$.dispatch(new LoadLocationMaps(locationMap))

  }

  public deleteRows(gridApi, dataList) {
    gridApi.updateRowData({remove: dataList})
  }

  getListOfEquivalentIndexInDb(rowIndexDb, rowIndexDataGrid) {
    const indexDb = [];
    for (let i = 0; i < rowIndexDataGrid.length; i++) {
      const index = rowIndexDb[rowIndexDataGrid[i]];
      indexDb.push(index);
    }
    return indexDb;
  }

  public updateCsMetadata(jobId) {
    this.cleansingService.getUpdateCsMetadata(jobId).subscribe((data) => {
      if (data) {
        this.store$.dispatch(new ActionLoadCsMetadata({csMetadata: data}));
      }
    })
  }

  public updateCheck(fileData, selectedSheet) {
    this.cleansingService.getUpdateCheck(fileData, selectedSheet, fileData.page).subscribe((data) => {
      if (data) {
        this.store$.dispatch(new ActionLoadErrors({errors: data}));

      }
    })
  }

  public getUpdatedData(self$) {
    this.cleansingService.getUpdateExposures(self$).subscribe((data) => {
      if (data) {
        this.store$.dispatch(new ActionLoadAllData({data: data}));
      }
    });
  }

  showModal(): void {
    if (this.params) {
      let dataList = [];
      let indexList = [];
      const data = this.params.data;
      const indexDatagrid = this.params.rowIndex;

      if (this.gridApi) {
        const selectedRows = this.getSelectedRowsInfos(this.gridApi);
        dataList = selectedRows.selectedRowsData;
        indexList = selectedRows.selectedRowsIndex;
        if (!selectedRows.selectedRowsIndex.includes(indexDatagrid)) {
          dataList.push(data);
          indexList.push(indexDatagrid);
        }
        this.deleteRows(this.gridApi, dataList);
      }

      this.exposures$.subscribe((exposures) => {
        if (exposures) {
          const indexDb = exposures.index;
          const listIndex = this.getListOfEquivalentIndexInDb(indexDb, indexList);

          const body = {
            is_all: false,
            indices: listIndex
          }

          this.self$ = exposures._links.self;
          if (this.importData$) {
            if (this.csMetadata$) {
              this.csMetadata$.subscribe((csMetadata) => {
                const jobId = csMetadata.jobId;
                if (jobId) {
                  this.importData$.subscribe((importData) => {
                    const fileData = importData.fileData;
                    const selectedSheet = importData.selectedSheet;
                    this.cleansingService.deleteRow(fileData, selectedSheet, jobId, body).subscribe((isDeleted) => {
                    })

                  })
                }
              })
            }

          }
        }
      });

    }
  }

  // add fake data here
  prepareFata() {
    const location = new LocationModel();

    if (this.data) {
      this.data.subscribe(data => {
        const fakeData = Object.assign({}, data);
        location.id = 1;
        location.accuracy = null;
        location.biType = null;
        location.building = null;
        location.city = null;
        location.constructionClass = null;
        location.constructionCode = null;
        location.constructionScheme = null;
        location.constructionSource = null;
        location.content = null;
        location.country = null;
        location.county = null;
        location.declarationPeriod = null;
        location.division = null;
        location.eip = null;
        location.forInterest = null;
        location.geocode = null;
        location.geocoder = null;
        location.geocodingValidated = null;
        location.interest = null;
        location.isAggregation = null;
        location.largestUnitCapacity = null;
        location.latitude = null;
        location.locationName = null;
        location.longitude = null;
        location.machinery = null;
        location.numberOfBuilding = null;
        location.numberOfStories = null;
        location.occupancyClass = null;
        location.occupancyCode = null;
        location.occupancyScheme = null;
        location.occupancySource = null;
        location.occupancySubClass = null;
        location.originalAddress = null;
        location.pbValue = null;
        location.siteCurrency = null;
        location.state = null;
        location.stock = null;
        location.street = null;
        location.tiv = null;
        location.yearBuilt = null;
        location.zipCode = null;
      })

    }
    return location;
  }


  handleOk(): void {
    this.store$.select(selectCleansingData).subscribe(data => this.dataRows = JSON.parse(JSON.stringify(data)));
    let x = null;
    this.store$.dispatch(new LoadLoadPopUps({location: this.prepareFata()}));
    this.data.subscribe(d => {
      x = d;
    });
    this.store$.dispatch(new ActionCleansingDeleteOrUpdate({deletedOrUpdated: true}));
    this.store$.select(selectPopUp).subscribe(dataPopUp => {
        this.dataRows = this.dataRows.filter((data) =>
          data.Id !== dataPopUp.location.id
        )
      },
      error => {
      }, () => {
        this.fileImportService.deleteRow(x).subscribe(data => {
        }, (error) => {
        });
      });
    this.store$.dispatch(new ActionLoadAllData({data: this.dataRows}));
    this.cdrf.detectChanges();

    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

}
