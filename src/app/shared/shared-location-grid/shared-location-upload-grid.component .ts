import { UploadContainerComponent } from '../../dcm/modules/upload/containers/upload-container/upload-container.component';
import {
  CustomizedSharedGridService
} from '../customized-shared-location-grid/customized-grid-buttons.service';
import {
  CustomizedSharedLocationGridComponent
} from '../customized-shared-location-grid/customized-shared-location-grid.component';
import * as _ from 'lodash';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {
  GridLineInfo
} from '../customized-shared-location-grid/GridLineInfo';
import {
  Observable,
  of ,
  BehaviorSubject,
  forkJoin,
  combineLatest,
  Subject,
  ReplaySubject,
  range,
} from 'rxjs';
import {
  MappingTargetItem
} from '@app/dcm/modules/upload/models/mapping/mapping-target.model';
import {
  selectMappingTarget, selectMappingId
} from '@app/dcm/modules/upload/store/mapping/mapping.selectors';
import {
  Store,
  select
} from '@ngrx/store';
import {
  AppState,
  NotificationService
} from '@app/core';
import {
  selectCleansingData,
  selectCleansingErrors,
  selectCleansingLoading,
  selectCleansingCsMetadata,
  selectCleansingHeaders,
  selectCleansingJobId,
  selectFilterQuickSearch,
  selectColumnState,
  selectColumnStructure,
  selectEditGrid,
  selectGroupColumnState
} from '@app/dcm/modules/upload/store/cleansing/cleansing.selectors';
import {
  ActionLoadAllData,
  ActionLoadErrors,
  ActionLoadCsMetadata,
  ActionColumnState,
  ActionColumnStructure,
  ActionUpdateOldFileId
} from '@app/dcm/modules/upload/store/cleansing/cleansing.actions';
import {
  KeyboardShortcutsService
} from 'ng-keyboard-shortcuts';
import {
  FileImportService
} from '@app/dcm/modules/upload/services/file-import.service';
import {
  FileData
} from '@app/dcm/modules/upload/store/import/import.model';
import {
  selectFileData, selectImportObjectState
} from '@app/dcm/modules/upload/store/import/import.selectors';
import {
  Module,
  AllModules
} from '@ag-grid-enterprise/all-modules';
import {
  SortableHeaderComponent
} from '@app/dcm/components/header-component/sortable-header.component';
import {
  dataModel
} from './data-model';
import {
  HeaderGroupComponent
} from '@app/dcm/components/header-group-component/header-group.component';
import {
  HeaderEditComponent
} from '@app/dcm/components/header-icons-component/edit-component/header-edit.component';
import {
  HeaderGeocodeComponent
} from '@app/dcm/components/header-icons-component/geocode-component/header-geocode.component';
import {
  HeaderSuppComponent
} from '@app/dcm/components/header-icons-component/supp-component/header-supp.component';

import {
  explosuresModel
} from '@app/dcm/modules/upload/models/cleansing-models/explosures-model';

import { GridOptions } from 'ag-grid-community';
import { CleansingService } from '@app/dcm/modules/upload/services/cleansing.service';
import {Router} from '@angular/router';
import { CustomTooltipComponent } from './custom-tooltip.component';
import { DropdownErrorFilterComponent } from '@app/dcm/modules/upload/componenets/cleansing/filters/dropdown-error-filter/dropdown-error-filter.component';
import { DivisionFilterComponent } from '@app/dcm/modules/upload/componenets/cleansing/filters/division-filter/division-filter.component';
import { DefaultFilterComponent } from '@app/dcm/modules/upload/componenets/cleansing/filters/default-filters/default-filter.component';
import { DefaultFilteredQuickSearchComponent } from '@app/dcm/modules/upload/componenets/cleansing/filters/default-filters-quick-search/default-filtered-quick-search.component';
import { TivFilterComponent } from '@app/dcm/modules/upload/componenets/cleansing/filters/tiv-filters/tiv-filter.component';
import { reduce } from 'lodash';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {ViewChild} from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';
import { FilterPipe } from '../pipes/filter.pipe';
// import { T } from 'ng-zorro-antd';
import { ActionUpdateFileId } from '@app/dcm/modules/upload/store/import/import.actions';
import {LoadLoadPopUps} from '@app/shared/popups/general-location-info-popup/store-part/load-pop-up.actions';
import {LOCATION_REFERENCE_DATA, COLOMN_LISTS} from '@app/shared/popups/general-location-info-popup/models/location-ref-data.const';
import { CATEGORIES, DEFAULT_COLUMN, DEFAULT_COLUMN_COLLAPSE } from '@app/dcm/modules/upload/componenets/manage-column/group-column.const';

declare var $: any;

@Component({
  selector: 'anms-shared-location-upload-grid',
  templateUrl: './shared-location-upload-grid.component.html',
  styleUrls: ['./shared-location-grid.component.scss'],
  providers: [KeyboardShortcutsService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // encapsulation: ViewEncapsulation.None
})
export class SharedLocationUploadGridComponent implements OnInit, AfterViewInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  // @Input() prefix = '';
  // @Input() editable = false;
  // @Input() loading = false;
  // @Input() errorsInfo$: Observable<any> = new Observable<any>();
  @Input() metadata = null;
  @Input() headers = null;
  @Input() exposures = null;
  // @Input() datachecks = null;

  @Output() editLocationButtonClick = new EventEmitter<any>();
  @Output() geocodeLocationButtonClick = new EventEmitter<GridLineInfo>();
  @Output() cellEdited = new EventEmitter<GridLineInfo>();
  target$: Observable<MappingTargetItem[]>;
  data$: BehaviorSubject<any[]> = new BehaviorSubject([]);
  fileMetaData$: Observable<FileData>;
  columnState$: Observable<any[]>;
  groupColumnState$: Observable<any>;
  importData$;
  jobId$;
  mappingId$;

  public isVisibleRestor = false;
  public previousState = null;
  public fakeRowData = null;
  public isOkLoadingRestor = false;
  public lastState: any = null;
  public paginationPageSize;

  public rowSelection;
  public columnDefs;
  public rowData;
  public sideBar: any = false;
  public defaultColDef: any;
  public frameworkComponents: any;
  // (free_ver) public modules: Module[] = AllCommunityModules;
  public modules: Module[] = AllModules;
  public datatest;
  public headersMod;
  public jobId;
  public datasource;
  public gridColumnApi;
  public gridApi;
  public gridApi1;
  public components;
  public rowBuffer;
  public rowModelType;
  public cacheOverflowSize;
  public maxConcurrentDatasourceRequests;
  public infiniteInitialRowCount;
  public maxBlocksInCache;
  public icons;
  public rowGroupPanelShow;
  public pivotPanelShow;
  public config;
  public currentPage = 1;
  public lastPageLoaded = 0;
  public eventModif = false;
  public dataRow;
  public idRow;
  public indexRow;
  public numRow = 0;
  public indexRowsLoaded;
  public fieldCodeId = [];
  public headerName = [];
  public colDef = [];
  public colState;
  public groupState;
  public sortState;
  public filterState;
  public numberIdChange = 1;
  public numberIdFocusedCellChange = 1;
  public idFocusedBack = 1;
  public rowIdFocused;
  public colIdFocused;
  public colFocused;
  public colRangeFocused;
  public gridOptions: GridOptions;
  public autoGroupColumnDef;
  public metadataModel;
  public headerModel;
  public exposureModel;
  public datacheckModel;
  public indexRowPage;
  public linksPage;
  public exposureModelSub: Subject<any>;
  public headersModelSub: Subject<any>;
  public datacheckModelSub: Subject<any>;
  public exposureOriginal;
  public metadataLoaded;
  public headersLoaded;
  public exposuresLoaded;
  public datachecksLoaded;
  public csMetadataLoaded;
  public rowsData;
  public rowsDataOld;
  public loading$: Observable<boolean>;
  public noRowsTemplate;
  public loadingTemplate;
  public rowDataClicked1 = {};
  public fileData;
  public selectedSheet;
  public isFirstLoaded = true;
  public headersT;
  public exposuresT;
  public pageOne = 1;
  public pageTow = 2;
  public pageThree = 3;
  public pageFour = 4;
  public pageFive = 5;
  public pageFirst = 1;
  public pageLast;
  public typeError = 'errors';
  public typeWarning = 'warnings';
  public datacheckErrors;
  public datacheckWarnings;
  public colsIdWithErros;
  public columnWithNumber = ['tiv_amount', 'machinery_value', 'content_value', 'pd_value', 'bi_value', 'building_value', 'stock_value'];
  public dropdownCell = ['occupancy_sub_class', 'occupancy_code', 'construction_class', 'construction_code', 'country', 'site_currency'];
  public oldRowDataClikedCell; // {code:value, ... }
  public oldInfoClickedCell; // {index: , columnCode: , value: }
  public oldDataClickedCell; // [{code:value, ... },{} ... ] <= all exposures
  public notify = false;
  public newRowDataClikedCell; // {code:value, ... }
  public newInfoClickedCell; // {index: , columnCode: , value: }
  public newDataClickedCell; // [{code:value, ... },{} ... ] <= all exposures
  public isNewPage = true;
  public oldDataNewPage = null;
  public isLoading = false;
  public firstPageData;
  public lastPageData;
  public KEY_LEFT = 37;
  public KEY_UP = 38;
  public KEY_RIGHT = 39;
  public KEY_DOWN = 40;
  public KEY_ENTER = 13;
  public oldRowIndex;
  public newRowIndex;
  public focusedRowIndex;
  public focusedColId;
  public isFirstLoad = true;
  public indicesRow = [];
  public neValuesInRow = [];
  public isNewRowFocused = false;
  public newValueTemp;
  public newValueToSave = [];
  public newValueMultipleRow;
  public indexToSaveMultipleRow = [];
  public colIdToSaveMultipleRow;
  public colIdToSaveMultipleCol = {};
  public firstChangeMultipleRow = true;
  public newValueMultipleCol;
  public isMultipleColToModify = false;
  public indexRowTemp;
  public indexRowModifyTemp;
  public indexRowToSave = [];
  public indexRowModify = [];
  public contents = {};
  public isEnterForSave = false;
  public tooltipShowDelay;
  public jobIdLoaded;
  public absoluteIndex;
  // refs
  public occupancies_classes; // occupancies
  public occupancies_subclasses;
  public occupancies_codes;

  public construction_classes; // constructions
  public construction_codes;

  public countries; // countries
  public countriesNameLists;
  public countriesCodeLists;
  public countriesNameCode;
  public countriesCodeName;
  public countryWithStates = [];
  public uniqueCountry = [];
  public countryStates = {};

  public states; // states
  public statesNameLists;
  public statesCodeLists;
  public statesNameCode;
  public statesCodeName;

  public counties; // counties
  public countiesNameLists;
  public countiesCodeLists;
  public countiesNameCode;
  public countiesCodeName;
  public stateWithCounties = {};
  public uniqueState = [];

  public currencies; // currencies

  public mappingId;
  public filterModel;
  public listFilteredColumn = [];
  public isVisibleComment = false;
  public isVisiblePdBi = false;
  public isManageColumn = false;  

  public displayByDefaultAfterCollapse = DEFAULT_COLUMN_COLLAPSE.concat(DEFAULT_COLUMN);

  public expandedColsLength = 0;
  public expandedColsLengthBeforeEdit = 0;
  public isModification: boolean = false;
  public listModification: any[] = [];
  public selectedDisplayColumnExpanded = [];
  public selectedDisplayColumn = [];

  public isFirstFocus = true;

  isGridEditable$: Observable<boolean>;
  isGridEditable: boolean = true;
  uniqueIndexRowWithError = [];
  rowsSelected: number = 0;
  isRowsSelected: boolean = false;
  isChangeDetected: boolean = false;
  newHeadersLoaded;
  headersOriginal;

  public columnState = [];

  public calculTiv = [
    {
      name: 'PD', // name view
      id: 'pd_value', // name or id from DB
      value: [], // value from DB
      index: [], // index refer to DB
      checked: false,
      color: 'grey'
    },
    {
      name: 'BI', // name view
      id: 'bi_value', // name or id from DB
      value: [], // value from DB
      index: [], // index refer to DB
      checked: false,
      color: 'grey'
    }
  ]

  public groupColumnState = [];

  public colorPdBi = false;


  tivInput = null;
  task: any;
  allComplete = false;
  filterPipe = new FilterPipe();
  name : string ;


  // test
  constructor(
    private cleansingContainer: UploadContainerComponent,
    public service: CustomizedSharedGridService,
    private importService: FileImportService,
    private cleansingService: CleansingService,
    private keyboard: KeyboardShortcutsService,
    private store: Store<AppState>,
    private cdrf: ChangeDetectorRef,
    private notif: NotificationService,
    // private fakeServer: FakeServer,
    private router : Router
  ) {
    this.gridOptions = <GridOptions>{};

    this.exposureModelSub = new ReplaySubject(3);
    this.headersModelSub = new ReplaySubject(3);
    this.datacheckModelSub = new ReplaySubject(3);

    this.importData$ = this.store.select(selectImportObjectState);
    this.target$ = this.store.select(selectMappingTarget);
    this.loading$ = store.select(selectCleansingLoading);
    this.jobId$ = store.select(selectCleansingJobId);
    this.mappingId$ = store.select(selectMappingId);
    this.columnState$ = store.select(selectColumnState);
    this.groupColumnState$ = store.select(selectGroupColumnState);

    this.columnState$.subscribe((colSt) => {
      if (colSt !== undefined) {
        // this.columnState = this.getStateOfAllColumns(colSt)
        this.columnState = colSt;
        // this.setStateToGrid()
      }
    })

    store.select(selectFilterQuickSearch).subscribe((data) => {
      this.listFilteredColumn = [];
      if (data) {
        const contents = data.contents;
          if (data.active) {
            this.listFilteredColumn.push(Object.keys(contents)[0])
          }
      }
  },
      () => {
          this.cdrf.detectChanges();
      });
      
    this.groupColumnState$.subscribe((groupColSt) => {
      if (groupColSt !== undefined && groupColSt !== null && groupColSt) {
            const colsTemp = this.getColumnAfterExpanded(groupColSt['children'])
            if (groupColSt['expanded'] && this.selectedDisplayColumn.length > 0) {
              this.expandedColsLength += 1;
              this.selectedDisplayColumnExpanded = colsTemp.concat(this.selectedDisplayColumn);
              if (!this.isModification) {
                this.expandedColsLengthBeforeEdit += 1;
              }
            }
            else {
              if (!groupColSt['expanded']) {
                if (this.expandedColsLength > 0) {
                  this.expandedColsLength -= 1;
                }
                if (this.expandedColsLengthBeforeEdit > 0) {
                  this.expandedColsLengthBeforeEdit -= 1;
                  this.isModification = false;
                }
              }
              const newColsTemp = this.removeDefaultColumnAfterCollape(this.displayByDefaultAfterCollapse, colsTemp)
              
              const newlistCols = this.removeColumnAfterCollape(this.selectedDisplayColumnExpanded, newColsTemp)
              
              this.selectedDisplayColumnExpanded = newlistCols;
                this.getLoadedData();
            }
          }
        },
        () => {
          this.cdrf.detectChanges();
        })


    this.importData$.subscribe((importData) => {
      this.fileData = importData.fileData;
      this.selectedSheet = importData.selectedSheet;
    })
    this.jobId$.subscribe((jobId) => {
      this.jobId = jobId;
    })
    this.mappingId$.subscribe((mappingId) => {
      this.mappingId = mappingId;
    })

    this.getAllData(cleansingContainer);
    this.selectAllData(store);
    this.getAllRefs(cleansingService);

    this.loadingTemplate =
      `<span class="ag-overlay-loading-center">data is loading...</span>`;
    this.noRowsTemplate =
      `"<span">no rows to show</span>"`;


      service.getEditsObserver().subscribe((info: GridLineInfo) => {
        let line : any = {}
        let multiple : any = {}
        const selectedRowsData = this.gridApi.getSelectedRows();
        const selectedRowsIndex = this.gridApi.getSelectedNodes().map(s=> s.childIndex);
        Object.keys(info.line).forEach((col, i) => {
          if(!selectedRowsData.map(e => e[col]).every(i => i === info.line[col])){
  
           line[col] = null
           multiple[col] = true
          }
          else{
            line[col] = info.line[col]
            multiple[col] = false
          }
          })
          if(selectedRowsIndex.length > 1 && selectedRowsIndex.includes(info.rowId)){
            let obj = {
              line : line,
              backup : info.line,
              rowId : info.rowId,
              indices :  selectedRowsIndex ,
              multiple : multiple,
              isMultipleEdit : true
            }
            this.editLocationButtonClick.emit(obj);
          }
          else {
            let obj = {
              line : line,
              backup : info.line,
              rowId : info.rowId,
              indices :  [info.rowId],
              multiple : multiple,
              isMultipleEdit : false
            }
            this.editLocationButtonClick.emit(obj);
          }
      });

    service
      .getGeocodeObserver()
      .subscribe((info: GridLineInfo) =>
        this.geocodeLocationButtonClick.emit(info)
      );

    this.fileMetaData$ = this.store.pipe(select(selectFileData));
    this.tooltipShowDelay = 0;

    this.frameworkComponents = {
      sortableHeaderComponent: SortableHeaderComponent,
      headerGroupComponent: HeaderGroupComponent,
      headerEditComponent: HeaderEditComponent,
      headerGeocodeComponent: HeaderGeocodeComponent,
      headerSuppComponent: HeaderSuppComponent,
      dropdownErrorFilterComponent: DropdownErrorFilterComponent,
      customizedSharedLocationGridComponent: CustomizedSharedLocationGridComponent,
      customTooltipComponent: CustomTooltipComponent,
      // partialMatchFilterComponent: PartialMatchFilterComponent,
      defaultFilterComponent: DefaultFilterComponent,
      divisionFilterComponent: DivisionFilterComponent,
      tivFilterComponent: TivFilterComponent,
      defaultFilteredQuickSearchComponent: DefaultFilteredQuickSearchComponent
    };

    this.defaultColDef = {
      cellStyle: {
        'background-color': 'white',
      },
      resizable: true,
      sortable: true,
      // flex: 1,
      editable: this.isGridEditable,
      scrollable: true,
      valueFormatter: numberFormatter,
      paginator: true,
      suppressCellFlash: true,
      filter: 'agTextColumnFilter',
      filterParams: { /* buttons: ['apply'] */ debounceMs: 1000 },
      headerComponentParams: {
        menuIcon: 'fa-bars'
      }
    };

    this.keyboard.add([
      {
        key: 'ctrl z',
        command: () => this.showModalRestor()
      },
      {
        key: 'enter',
        command: () => this.onEnter()
      }
    ]);

    this.datasource = {
      rowCount: null,
      getRows: function(params) {
        setTimeout(function() {
          const rowsThisPage = dataModel.slice(params.startRow, params.endRow);
          for (let i = 0; i < rowsThisPage.length; i++) {
            const item = rowsThisPage[i];
            const itemCopy = JSON.parse(JSON.stringify(item));
            rowsThisPage[i] = itemCopy;
          }

          let lastRow = -1;
          if (dataModel.length <= params.endRow) {
            lastRow = dataModel.length;
          }
          params.successCallback(rowsThisPage, lastRow);
        }, 3000);
      }
    };

    this.components = {
      loadingRenderer: function(params) {
        if (params.value !== undefined) {
          return params.value;
        } else {
          return '<img src="assets/icons/loding.gif">';
        }
      }
    };

    this.paginationPageSize = 50;
    this.autoGroupColumnDef = { minWidth: 120 };
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: explosuresModel.length
    };
    this.rowBuffer = 0;
    this.rowSelection = 'multiple';
    this.cacheOverflowSize = 2;
    this.maxConcurrentDatasourceRequests = 1;
    this.infiniteInitialRowCount = 15;
    this.maxBlocksInCache = 10;

    this.rowModelType = 'serverSide';

    this.rowGroupPanelShow = 'always';
    this.pivotPanelShow = 'always';
    this.icons = {
      columns: '<i class="fa fa-handshake"/>'
    };
  }

  ngOnInit(): void {}

  getColumnAfterExpanded(newcolumns) {
    const cols = [];
    for (let i = 0; i < newcolumns.length; i++) {
      const elemnts = newcolumns[i];
      cols.push(elemnts['field'])
    }
    return cols;
  }

  removeColumnAfterCollape(oldcolumns, newcolumns) {
    const cols = [];
    for (let i = 0; i < oldcolumns.length; i++) {
      const elemnts = this.getExactColId(oldcolumns[i]);
      if (!newcolumns.includes(elemnts)) {
        cols.push(elemnts)
      }
    }
    return cols;
  }

  removeDefaultColumnAfterCollape(defaultColumns, columns) {
    const cols = [];
    for (let i = 0; i < columns.length; i++) {
      const elemnts = columns[i];
      if (!defaultColumns.includes(elemnts)) {
        cols.push(elemnts)
      }
    }
    return cols;
  }

  private selectAllData(store) {

    store.select(selectEditGrid).subscribe((editable) => {
      if (editable !== undefined) {
        this.isGridEditable = editable;
      }
    },
    () => {
      this.cdrf.detectChanges();
    })

    store.select(selectColumnStructure).subscribe((cols) => {
      if (cols !== undefined) {
        const newTask = this.setWorkTaskes(cols);
      this.task = newTask;
      }
    },
    () => {
      this.cdrf.detectChanges();
    })

    store.select(selectCleansingHeaders).subscribe((data) => {
      if (data) {
        this.headersOriginal = data;
        this.headersLoaded = this.transformHeaders(data);
        this.headersMod = this.getListFieldCode(this.headersLoaded);
        this.getLoadedData();
      }

    },
      () => {
        this.cdrf.detectChanges();
      });

    store.select(selectCleansingData).subscribe((data) => {
      if (data) {
        this.exposureOriginal = data;
        this.exposuresLoaded = data.exposures;

        if (data.abolute_index) {
          this.indexRowsLoaded = data.abolute_index;
        }
        else {
          this.indexRowsLoaded = data.index;
        }
        this.pageLast = data['last_page'];
        this.pageFirst = data['first_page'];
        this.currentPage = data['current_page'];
      }
    },
      () => {
        this.cdrf.detectChanges();
      });

    store.select(selectCleansingErrors).subscribe((data) => {
      if (data) {
        this.datachecksLoaded = data;
        if (this.datachecksLoaded) {
          this.getLoadedData();
        }
      }
    },
      () => {
        this.cdrf.detectChanges();
      });

    store.select(selectCleansingCsMetadata).subscribe((data) => {
      if (data) {
        this.csMetadataLoaded = data;
        if (this.csMetadataLoaded) {
          this.getLoadedData();
        }
      }
    },
      () => {
        this.cdrf.detectChanges();
      });
  }

  private getAllData(cleansingContainer) {

    cleansingContainer.headers$.subscribe((data) => {
      if (data) {
        this.headersOriginal = data;
        this.headersLoaded = this.transformHeaders(data);
        if (this.headersLoaded) {
          this.getLoadedData();
        }
      }
    },
      () => {
        this.cdrf.detectChanges();
      })

      cleansingContainer.columnState$.subscribe((data) => {
        if (data) {
          this.columnState = data;
          if (this.columnState) {
            this.getLoadedData();
          }
        }
      },
        () => {
          this.cdrf.detectChanges();
        })

        cleansingContainer.columnStructure$.subscribe((data) => {
          if (data) {
            this.task = this.setWorkTaskes(data);
            if (this.task) {
              this.getLoadedData();
            }
          }
        },
          () => {
            this.cdrf.detectChanges();
          })

    cleansingContainer.exposure$.subscribe((data) => {
      if (data) {
        this.exposureOriginal = data;
        this.exposuresLoaded = data.exposures;
        this.pageLast = data['last_page'];
        this.pageFirst = data['first_page'];
        this.currentPage = data['current_page'];

        if (data.abolute_index) {
          this.indexRowsLoaded = data.abolute_index;
        }
        else {
          this.indexRowsLoaded = data.index;
        }

        const countriesInit = this.getInitialListOfCountry(this.exposuresLoaded)

        this.uniqueCountry = this.getInitialDistinctCountry(countriesInit);

        this.cleansingService.getCountries().subscribe((d) => {
          this.countries = d['countries'];
          const countriesObj = this.transformElements(this.countries);
          this.countriesNameLists = countriesObj.elementsNameList;
          this.countriesCodeLists = countriesObj.elementsCodeList;
          this.countriesNameCode = countriesObj.elementsNameCode;
          this.countriesCodeName = countriesObj.elementsCodeName;

          this.createCountryWithStates(this.uniqueCountry, this.countriesNameCode);

          if (this.exposuresLoaded && this.countryWithStates) {
            this.getLoadedData();
          }
        })

      }
    },
      () => {
        this.cdrf.detectChanges();
      });

    cleansingContainer.datacheck$.subscribe((data) => {
      if (data) {
        this.datachecksLoaded = data;
        if (this.datachecksLoaded) {
          this.getLoadedData();
        }
      }
    },
      () => {
        this.cdrf.detectChanges();
      });

    cleansingContainer.metadata$.subscribe((data) => {
      if (data) {
        this.csMetadataLoaded = data;
        if (this.csMetadataLoaded) {
          this.getLoadedData();
        }
      }
    },
      () => {
        this.cdrf.detectChanges();
      });
  }

  private getAllRefs(cleansingService) {
    this.getCountries(cleansingService);
    this.getOccupancies(cleansingService);
    this.getCurrencies(cleansingService);
    this.getConstructions(cleansingService);
    this.getConstructionsCode(cleansingService);
    this.getOccupanciesSubclasses(cleansingService);
    this.getOccupanciesCodes(cleansingService);
  }

  public getOccupancies(cleansingService) {
    cleansingService.getOccupanciesClasses().subscribe((data) => {
      this.occupancies_classes = data.classes;
    })
  }
  public getOccupanciesSubclasses(cleansingService) {
    cleansingService.getOccupanciesSubclasses().subscribe((data) => {
      this.occupancies_subclasses = data.subclasses;
    })
  }
  public getOccupanciesCodes(cleansingService) {
    cleansingService.getOccupanciesCodes().subscribe((data) => {
      this.occupancies_codes = data.codes;
    })
  }

  public getConstructionsCode(cleansingService) {
    cleansingService.getConstructionsCode().subscribe((data) => {
      this.construction_codes = data.codes;
    })

  }

  public getCurrencies(cleansingService) {
    cleansingService.getCurrencies().subscribe((data) => {
      this.currencies = data.currencies;
    })
  }

  public getConstructions(cleansingService) {
    cleansingService.getConstructionsClasses().subscribe((data) => {
      this.construction_classes = data.classes;
    })
  }

  // ***** get Countries **** //
  public getCountries(cleansingService) {
    cleansingService.getCountries().subscribe((data) => {
      this.countries = data.countries;
      const countriesObj = this.transformElements(this.countries);
      this.countriesNameLists = countriesObj.elementsNameList;
      this.countriesCodeLists = countriesObj.elementsCodeList;
      this.countriesNameCode = countriesObj.elementsNameCode;
      this.countriesCodeName = countriesObj.elementsCodeName;
    })
  }

  // ***** get state **** //
  public getCodeOfElement(elementObjNameCode, nameElement) {
    return elementObjNameCode[nameElement];
  }

  public getCountiesByState(StateCode, stateNameSelected) {
    this.cleansingService.getCountiesByState(StateCode).subscribe((data) => {
      this.counties = data['counties'];

      const countiesObj = this.transformElements(this.counties);
      this.countiesNameLists = countiesObj.elementsNameList;
      this.countiesCodeLists = countiesObj.elementsCodeList;
      this.countiesNameCode = countiesObj.elementsNameCode;
      this.countiesCodeName = countiesObj.elementsCodeName;

      if (!this.uniqueState.includes(stateNameSelected)) {
        this.uniqueState.push(stateNameSelected);
        this.stateWithCounties[stateNameSelected] = this.counties;
      }
      else {
        console.log('= state with counties is already loaded =')
      }
    })
  }

  public getStatesByCountry(countryCode, countryNameSelected) {
    this.cleansingService.getStatesByCountry(countryCode).subscribe((data) => {
      this.states = data['states'];
      const statesObj = this.transformElements(this.states);
      this.statesNameLists = statesObj.elementsNameList;
      this.statesCodeLists = statesObj.elementsCodeList;
      this.statesNameCode = statesObj.elementsNameCode;
      this.statesCodeName = statesObj.elementsCodeName;

      if (this.uniqueCountry.length > 0) {

        if (!this.uniqueCountry.includes(countryNameSelected)) {
          this.uniqueCountry.push(countryNameSelected);
          this.createCountryWithStates(this.uniqueCountry, this.countriesNameCode);
        }
        else {
          console.log('= country with state is already loaded =')
        }
      }
    })
  }

  public getInitialListOfCountry(exposuresLoaded) {
    const countriesList = [];
    if (exposuresLoaded) {
      for (let i = 0; i < exposuresLoaded.length; i++) {
        countriesList.push((exposuresLoaded[i])['country'])
      }
    }
    return countriesList;
  }

  public getInitialDistinctCountry(listOfCountry) {
    const uniqueCountry = listOfCountry.filter(onlyUnique);
    this.uniqueCountry = uniqueCountry;
    return uniqueCountry;
  }

  public createCountryWithStates(uniqueCountry, countriesNameCode) {
    if (uniqueCountry && !uniqueCountry.includes(undefined)) {
      const observablesList = [];
      for (let i = 0; i < uniqueCountry.length; i++) {
        if (countriesNameCode) {
          const codeCountry = this.getCodeOfElement(countriesNameCode, uniqueCountry[i]);
          observablesList.push(this.cleansingService.getStatesByCountry(codeCountry));
        }
      }
      const countryWithStatesTemp = {};
      forkJoin(observablesList).subscribe((response) => {
        for (const [key0, value0] of Object.entries(response)) {
            for (const [key1, value1] of Object.entries(value0)) {
              countryWithStatesTemp[uniqueCountry[key0]] = value1;
            }
        }
        this.countryStates = countryWithStatesTemp;
      });
    }
  }

  getUniqueIndexRowWithError(datacheck) {
    const rowIndexWithError = [];
    for (let i = 0; i < datacheck.length; i++) {
      const elemnt = datacheck[i];
      for (let j = 0; j < elemnt.indexDataGrid.length; j++) {
        const element = elemnt.indexDataGrid[j];
        if (!rowIndexWithError.includes(element)) {
          rowIndexWithError.push(element);
        }
      }
    }
    return rowIndexWithError;
  }

  public getLoadedData() {
    if (this.headersLoaded && this.exposuresLoaded) {
      this.newHeadersLoaded = this.getSelectedColumn(this.columnState, this.headersLoaded);
      this.columnDefs = this.createColumnDefs(this.newHeadersLoaded);
      // this.columnDefs = this.createColumnDefs(this.headersLoaded);
      const rowsDataC = this.createRowData(this.exposuresLoaded)
      this.rowsData = this.createRowData(this.exposuresLoaded);
      this.rowData = rowsDataC;

        if (this.columnDefs && this.rowsData && this.rowsData != null && this.columnDefs != null) {

          if (this.gridOptions.api && this.gridOptions.api != null) {
            this.gridOptions.columnDefs = this.columnDefs;
            this.gridOptions.api.setRowData(this.rowsData);
          }
          if (this.isFirstLoaded) {
            this.firstRefresh(this.columnDefs, this.rowsData);
            this.isFirstLoaded = false;
          }
        }


    }
  }
  getSelectedColumn(columnState, headersLoaded) {
    const newHeaders = [];
    const selectedCategorie = [];
    const selectedDisplayColumnTemp = [];

    if (columnState !== undefined && headersLoaded !== undefined) {
      
        for (let j = 0; j < columnState.length; j++) {
          const sLoaded = columnState[j];
            for (let i = 0; i < headersLoaded.length; i++) {
              const hLoaded = headersLoaded[i];
              if ((sLoaded['colId'] === hLoaded['fieldCode']) && (sLoaded['hide'] === false)) {
                newHeaders.push(hLoaded);
                if (!selectedCategorie.includes(hLoaded['categoryName'])) {
                  selectedCategorie.push(hLoaded['categoryName'])
                }
                if (!selectedDisplayColumnTemp.includes(hLoaded['fieldCode'])) {
                  selectedDisplayColumnTemp.push(hLoaded['fieldCode']);
                }
              }
              else if (((sLoaded['colId'] === hLoaded['fieldCode']) && (sLoaded['hide'] === true)) && selectedCategorie.includes(hLoaded['categoryName'])) {
                newHeaders.push(hLoaded);
              }
            }
        }
      }

      if (this.selectedDisplayColumnExpanded.length > 0) {
        this.selectedDisplayColumn = this.selectedDisplayColumnExpanded;
      }
      else {
        this.selectedDisplayColumn = selectedDisplayColumnTemp;
      }
      return newHeaders;
  }

  /* dataFiltered(i : number) {
    let filtered = this.task[i].subtask
    filtered = this.filterPipe.transform(filtered, 'name', this.name)
    return filtered
  } */
  
  dataFiltered(task) {
    let filtered = task.subtask
  
    filtered = this.filterPipe.transform(filtered, 'name', this.name)
    
    return filtered
  }

  categoriesFilter(task) {
    let taskTemp = [];

    if (this.name && this.name !== '') {
      for (let j = 0; j < task.length; j++) {
        let filtered = task[j].subtask;
          filtered = this.filterPipe.transform(filtered, 'name', this.name)
          
        if (filtered.length > 0) {
          // taskTemp[j] = task[j]
          taskTemp.push(task[j]);
        }
      }
      // return task;
      return taskTemp;
    }
    else {
      return task;
    }
  }

  getRowErrors(fieldCode, datacheckModel) {
    let rowWithErr;
    let indexWithErr;
    const datacheckMod = datacheckModel['datacheckMod'];
    const typeError = datacheckModel['typeError'];
    if (datacheckMod) {
      for (const [key0, value0] of Object.entries(datacheckMod)) {
        for (const [key, value] of Object.entries(datacheckMod[key0])) {
          if (value === fieldCode) {
            const rowWithErrors = datacheckMod[key0]['rowWithErrors'];
            const indexDataGrid = datacheckMod[key0]['indexDataGrid'];
            if (rowWithErrors && rowWithErrors.length > 0) {
              rowWithErr = rowWithErrors;
              indexWithErr = indexDataGrid;
            }
          }
        }
      }
    }
    return {
      rowWithErr,
      indexWithErr
    }
  }

  public defColoredColumn(headerName, fieldCode, widthColumn, columnGroupShow, datacheckOrigin, typeError, nrows) {

    const errorsModel = this.changeDataCheckModel(datacheckOrigin, typeError);
    let panned = false;
    /* if (fieldCode === 'division' || fieldCode === 'location_name') {
      panned = true;
    } */
    const columnWithNumber = this.columnWithNumber;
    const children = {
      headerName: headerName,
      field: fieldCode,
      width: widthColumn,
      expanded: true,
      enableRowGroup: true,
      enablePivot: true,
      editable: true,
      pinned: panned,
      columnGroupShow: columnGroupShow,
      floatingFilterComponent: getFilter(this.listFilteredColumn, fieldCode),
      floatingFilterComponentParams: {
        suppressFilterButton: true
      },
      // icons: {
      //   filter: getIcons(fieldCode)
      // },

      valueSetter: function (params) {
          params.data[fieldCode] = params.newValue;
        return true;
      },
      cellStyle: function (params) {
        // const border = '1px solid #cdcdce';
        let color = 'transparent';

        if (datacheckOrigin[typeError][fieldCode]) {
          const indexErrL = Object.values(datacheckOrigin[typeError][fieldCode]);
          const listError = indexErrL[0];

          const isIndexInListOfError = isIndexInError(listError, nrows, params.node.childIndex);
          if (isIndexInListOfError) {
              color = 'transparent';
              // color = 'red';
          }
        }
        let alignValue = 'left';
        if (columnWithNumber.includes(fieldCode)) {
          alignValue = 'right';
        }
        return {
          'background-color': color,
          // 'border-left': border,
          'text-align': alignValue
        };
      },
    };

    return children;
  }

  private transformHeaders(headers) {
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
    return headersMod;
  }

  private transformElements(elements) {
    const elementsNameList = [];
    const elementsCodeList = [];
    const elementsNameCode = {};
    const elementsCodeName = {};
    if (elements) {
      for (let i = 0; i < elements.length; i++) {
          elementsNameList.push((elements[i])['name']);
          elementsCodeList.push((elements[i])['code']);
          elementsNameCode[(elements[i])['name']] = (elements[i])['code'];
          elementsCodeName[(elements[i])['code']] = (elements[i])['name'];

        }
    }
      return {
        elementsNameList: elementsNameList,
        elementsCodeList: elementsCodeList,
        elementsNameCode: elementsNameCode,
        elementsCodeName: elementsCodeName
      }
  }

  public isFirstColumn(params) {
    const displayedColumns = params.columnApi.getAllDisplayedColumns();
    const thisIsFirstColumn = displayedColumns[0] === params.column;
    return thisIsFirstColumn;
  }

  public getCurrentValueElement(exposuresLoaded, order, fieldCode) {
    return (exposuresLoaded[order])[fieldCode];
  }

  public createDropdownInCell(fieldCode, headerName, listes, widthColumn, columnGroupShow) {
    let panned = false;
    /* if (fieldCode === 'division' || fieldCode === 'location_name') {
      panned = true;
    } */
    const columnWithNumber = this.columnWithNumber;
    return {
      headerName: headerName,
      field: fieldCode,
      width: widthColumn,
      expanded: false,
      enableRowGroup: true,
      enablePivot: true,
      editable: true,
      panned: panned,
      columnGroupShow: columnGroupShow,
      cellRenderer: 'headerEditComponent',
      cellEditor: 'agRichSelectCellEditor',
      floatingFilterComponent: getFilter(this.listFilteredColumn, fieldCode),
      floatingFilterComponentParams: {
        suppressFilterButton: true
      },
      valueSetter: function (params) {
          params.data[fieldCode] = params.newValue;
        return true;
      },
      cellStyle: function (params) {
        let alignValue = 'left';
        if (columnWithNumber.includes(fieldCode)) {
          alignValue = 'right';
        }
        return {
          // 'border-left': '1px solid #cdcdce',
          'text-align': alignValue
        }
      },
      cellEditorParams: {
        cellHeight: 35,
        values: listes,
      },
    };
  }

  public createDropdownCellWithError(children, list) {
    const value = {
      cellHeight: 35,
      values: list,
    };
    children['cellRenderer'] = 'headerEditComponent',
    children['cellEditor'] = 'agRichSelectCellEditor';
    children['cellEditorParams'] = value;
    return children;
  }

  getDropdownCellContent(fieldCode) {
    if(COLOMN_LISTS.includes(fieldCode)) {
      return LOCATION_REFERENCE_DATA.get(fieldCode);
    }
    return null;
  }

  public createColumnDefsChildrenStructure(headerName, fieldCode, order) {
    let children;
    let widthColumn;
    const nrows = this.fileData.nrows;

      if (fieldCode === 'division' || fieldCode === 'location_name') {
        widthColumn = 120;
      }
      else {
        widthColumn = 147;
      }
      let columnGroupShow;

      if (this.selectedDisplayColumn.includes(fieldCode)) {
        columnGroupShow = 'close';

    } else {
        columnGroupShow = 'open';
    }

        if (fieldCode === 'occupancy_class' && this.occupancies_classes) {
          const listes = this.occupancies_classes;
          const columnWithNumber = this.columnWithNumber;
          children = {
            headerName: headerName,
            field: fieldCode,
            width: widthColumn,
            expanded: false,
            enableRowGroup: true,
            enablePivot: true,
            editable: true,
            floatingFilterComponent: getFilter(this.listFilteredColumn, fieldCode),
            floatingFilterComponentParams: {
              suppressFilterButton: true
            },
            valueSetter: function (params) {
              params.data[fieldCode] = params.newValue;
              return true;
              },
              cellStyle: function (params) {
                let alignValue = 'left';
                if (columnWithNumber.includes(fieldCode)) {
                  alignValue = 'right';
                }
                return {
                  // 'border-left': '1px solid #cdcdce',
                  'text-align': alignValue
                }
              },
            cellRenderer: 'headerEditComponent',
            columnGroupShow: columnGroupShow,
            cellEditor: 'agRichSelectCellEditor',
            cellEditorParams: {
              cellHeight: 35,
              values: listes,
            },

          };
        }

        else if (this.getDropdownCellContent(fieldCode) !== null) {
          children = this.createDropdownInCell(fieldCode, headerName, this.getDropdownCellContent(fieldCode), widthColumn, columnGroupShow);
        }
        else if (fieldCode === 'country' && this.countriesNameLists) {
          let panned = false;
          /* if (fieldCode === 'division' || fieldCode === 'location_name') {
            panned = true;
          } */
          const listes = sortBy(this.countriesNameLists);
          const columnWithNumber = this.columnWithNumber;
          return {
            headerName: headerName,
            field: fieldCode,
            width: widthColumn,
            expanded: false,
            enableRowGroup: true,
            enablePivot: true,
            editable: true,
            panned: panned,
            columnGroupShow: columnGroupShow,
            cellRenderer: countryCellRendererDrowpdown,
            // cellRenderer: 'headerEditComponent',
            cellEditor: 'agRichSelectCellEditor',
            floatingFilterComponent: getFilter(this.listFilteredColumn, fieldCode),
            floatingFilterComponentParams: {
              suppressFilterButton: true
            },
            valueSetter: function (params) {
              params.data[fieldCode] = params.newValue;
              return true;
            },
            cellStyle: function (params) {
              let alignValue = 'left';
              if (columnWithNumber.includes(fieldCode)) {
                alignValue = 'right';
              }
              return {
                // 'border-left': '1px solid #cdcdce',
                'text-align': alignValue
              }
            },
            cellEditorParams: {
              cellHeight: 35,
              values: listes,
              cellRenderer: countryCellRenderer,
            },
          };
        }
        else if (fieldCode === 'state' && this.countryStates) {
          const countryStates = this.countryStates;
          const columnWithNumber = this.columnWithNumber;
          children = {
            headerName: headerName,
            field: fieldCode,
            width: widthColumn,
            expanded: false,
            enableRowGroup: true,
            enablePivot: true,
            editable: true,
            columnGroupShow: columnGroupShow,
            cellRenderer: 'headerEditComponent',
            cellEditor: 'agRichSelectCellEditor',
            floatingFilterComponent: getFilter(this.listFilteredColumn, fieldCode),
            floatingFilterComponentParams: {
              suppressFilterButton: true
            },
            valueSetter: function (params) {
              params.data[fieldCode] = params.newValue;
              return true;
              },
              cellStyle: function (params) {
                let alignValue = 'left';
                if (columnWithNumber.includes(fieldCode)) {
                  alignValue = 'right';
                }
                return {
                  // 'border-left': '1px solid #cdcdce',
                  'text-align': alignValue
                }
              },
            cellEditorParams: function (params) {
              const selectedCountry = params.data.country;
              let allowedStates = [];
              if (isDefined(selectedCountry)) {
                const allowedStatesObj = mapElementToSpecifiqueObj(countryStates, selectedCountry);
                allowedStates = sortBy(allowedStatesObj.elementsNameList);
              }
              return {
                values: allowedStates,
                formatValue: function (value) {
                  return value;
                  // return value + ' (' + selectedCountry + ')';
                },
              };
            },
          };
        }
        else if (fieldCode === 'county' && this.stateWithCounties) {
          const stateWithCounties = this.stateWithCounties;
          const columnWithNumber = this.columnWithNumber;
          children = {
            headerName: headerName,
            field: fieldCode,
            width: widthColumn,
            expanded: false,
            enableRowGroup: true,
            enablePivot: true,
            editable: true,
            columnGroupShow: columnGroupShow,
            cellRenderer: 'headerEditComponent',
            cellEditor: 'agRichSelectCellEditor',
            floatingFilterComponent: getFilter(this.listFilteredColumn, fieldCode),
            floatingFilterComponentParams: {
              suppressFilterButton: true
            },
            valueSetter: function (params) {
              params.data[fieldCode] = params.newValue;
              return true;
            },
            cellStyle: function (params) {
              let alignValue = 'left';
              if (columnWithNumber.includes(fieldCode)) {
                alignValue = 'right';
              }
              return {
                // 'border-left': '1px solid #cdcdce',
                'text-align': alignValue
              }
            },
            cellEditorParams: function (params) {
              const selectedState = params.data.state;
              let allowedCounties = [];
              if (isDefined(selectedState)) {
                const allowedCountiesObj = mapElementToSpecifiqueObj(stateWithCounties, selectedState);
                allowedCounties = sortBy(allowedCountiesObj.elementsNameList);
              }
              return {
                values: allowedCounties,
                formatValue: function (value) {
                  return value;
                  // return value + ' (' + selectedCountry + ')';
                },
              };
            },
          };
        }

        else {
          let panned = false;
          let borderPannedTop = 'transparent';
          /* if (fieldCode === 'division' || fieldCode === 'location_name') {
            panned = true;
            borderPannedTop = '1px solid #cdcdce';
          }      */
          const columnWithNumber = this.columnWithNumber;
          children = {
            headerName: headerName,
            field: fieldCode,
            width: widthColumn,
            expanded: false,
            enableRowGroup: true,
            enablePivot: true,
            editable: true,
            pinned: panned,
            valueFormatter: numberFormatter,
            columnGroupShow: columnGroupShow,
            floatingFilterComponent: getFilter(this.listFilteredColumn, fieldCode),
            floatingFilterComponentParams: {
              suppressFilterButton: true
            },
            valueSetter: function (params) {
              params.data[fieldCode] = params.newValue;
              return true;
              },
              cellStyle: function (params) {
                let alignValue = 'left';
                if (columnWithNumber.includes(fieldCode)) {
                  alignValue = 'right';
                }
                return {
                  'text-align': alignValue,
                  'border-top': borderPannedTop
                }
              }
          };
        }
    return children;
  }

  public createColumnDefsParentStructure(categoryName, children) {
    const parent = {
      headerName: categoryName,
      scrollable: true,
      collapsable: true,
      headerGroupComponent: 'headerGroupComponent',
      children: children
    };
    return parent;
  }

  public listCategories(headerModel) {
    const flags = [],
      output = [],
      l = headerModel.length;
    for (let i = 0; i < l; i++) {
      if (flags[headerModel[i].categoryName]) continue;
      flags[headerModel[i].categoryName] = true;
      output.push(headerModel[i].categoryName);
    }
    return output;
  }

  public onShowAutoSideBar() {
    if (this.sideBar === false) {
      this.gridApi.openToolPanel('columns');
      this.sideBar = 'columns'
      return true;
    } else {
      this.sideBar = false;
      return false;
    }
  }

  public onShowSideBar() {
    // console.log(event);
    const isVisible = this.onShowAutoSideBar()
    if (this.gridApi.isSideBarVisible() || isVisible) {
      if (isVisible) {
        document.getElementById('mySidenav').style.width = '7px';
        document.getElementById('sideBar').style.width = '35px';
        // document.getElementById('setting').style.width = '35px';
        // document.getElementById('helps').style.width = '35px';
      }
      else {
        document.getElementById('sideBar').style.width = '47px';
        // document.getElementById('setting').style.width = '47px';
        // document.getElementById('helps').style.width = '47px';
      }
      this.refreshGrid()
      this.openToolPanel('columns');
      this.refreshGrid();
    }
  }

  public groupeFielByCategoryName(headerModels) {
    const grouped = _.mapValues(
      _.groupBy(headerModels, 'categoryName'),
      clist => clist.map(headerModel => _.omit(headerModel, 'categoryName'))
    );
    return grouped;
  }

  private createColumnDefs(headerModel) {
    let columnDefsTemp;
    let linesWithErrors = this.uniqueIndexRowWithError;
    const headerCategoryList = this.listCategories(headerModel);
    const headergroupedByCategory = this.groupeFielByCategoryName(headerModel);
    const parents = [];

    for (let i = 0; i < headerCategoryList.length; i++) {
      const categoryName = headerCategoryList[i];
      const children = [];
      const childrens = [];
      for (
        let j = 0;
        j < headergroupedByCategory[headerCategoryList[i]].length;
        j++
      ) {
        children.push(headergroupedByCategory[headerCategoryList[i]][j]);

        childrens.push(
          this.createColumnDefsChildrenStructure(
            children[j]['fieldName'],
            children[j]['fieldCode'],
            j
          )
        );
      }

      parents.push(
        this.createColumnDefsParentStructure(categoryName, childrens)
      );
    }

    const iconsAction = [
      {
        headerName: '',
        field: 'mycheckbox',
        width: 35,
        headerCheckboxSelection: true,
        checkboxSelection: true,
        resizable: false,
        sortable: false,
        filter: false,
        editable: false,
        menuTabs: false,
        scrollable: false,
        paginator: false,
        suppressMenu: true,
        suppressColumnsToolPanel: true,
        cellStyle: {
          'border-left': '0px',
          // 'border-top-color': '#cdcdce'
        },
        // fixed left side
        pinned: true
      },
      // unify column
      {
        headerName: '',
        field: 'indiqueError',
        valueGetter: 'node.id',
        width: 40,
        resizable: false,
        sortable: false,
        filter: false,
        menuTabs: false,
        editable: false,
        scrollable: false,
        paginator: false,
        pinned: true,
        suppressMenu: true,
        suppressColumnsToolPanel: true,
        cellStyle: function (params) {
          let color = 'black';
          let background = 'transparent';
          if (isErrorInRow(linesWithErrors, Number(params.node.id))) {
            color = 'black';
            background = 'transparent';
          }
          return {
            'border-right': '1px solid #cdcdce',
            'border-left': '1px solid #cdcdce',
            'background-color': background,
            'color': color,
            'text-align': 'left'
          }
        }
      },
      {
        headerName: '',
        field: 'cstLoc',
        width: 84,
        resizable: false,
        sortable: false,
        filter: false,
        headerComponent: 'dropdownErrorFilterComponent',
        cellRenderer: 'customizedSharedLocationGridComponent',
        menuTabs: false,
        editable: false,
        scrollable: false,
        paginator: false,
        // fixed left side
        pinned: true,
        suppressMenu: true,
        suppressColumnsToolPanel: true,
      cellStyle: {
        'text-align': 'right'
      },
      }
    ];
    columnDefsTemp = iconsAction;
    columnDefsTemp.push.apply(iconsAction, parents);

    return columnDefsTemp;
  }
  public createRowData(exposures) {
    let clonedExposures = exposures.map(x => Object.assign({}, x));
    return clonedExposures;
    // return exposures;
  }

  private getColsIdWithError(datacheckMod) {
    const colsIdWithErrors = [];
    if (datacheckMod['errors']) {
      for (const [colsCode, value] of Object.entries(datacheckMod['errors'])) {
        colsIdWithErrors.push(colsCode);
      }
    }
    return colsIdWithErrors;
  }

  private changeDataCheckModel(datacheck, type) {
    const datacheckMod = datacheck[type];
    const datacheckErrorModel = [];
    if (datacheckMod) {
      for (const [colsCode, typeErrWithlistIndexErr] of Object.entries(datacheckMod)) {
        for (const [typeError, listIndexErr] of Object.entries(typeErrWithlistIndexErr)) {
          const listIndexErrDataGrid = this.getEquivalentIndexInDataGrid(this.indexRowsLoaded, listIndexErr);
          datacheckErrorModel.push({
          fieldCode : colsCode,
          typeError: typeError,
          indexRowDb: listIndexErr,
          indexDataGrid: listIndexErrDataGrid,
        })
      }
      }
    }
  return datacheckErrorModel;
  }

  private createDataCheckStructure(datacheck, type, exposuresOrigin) {
    const datacheckErrorModel = [];
    let datacheckMod;
    const exposureTransformed = this.createExposureStructure(exposuresOrigin);

    if (exposureTransformed) {
      datacheckMod = datacheck[type];

      if (datacheckMod) {
        for (const [colsCode, value] of Object.entries(datacheckMod)) {

        let typeError;
        let columnCode;
        if (type === 'errors') {
          typeError = Object.keys(datacheckMod[colsCode])[0];

          const temp = datacheckMod[colsCode];
          columnCode = temp[typeError];
        }
        else if (type === 'warnings') {

          typeError = 'warnings';
          columnCode = datacheckMod[colsCode];
        }
        else {return null; }

        let datacheckErrorModelTemp = {};
        const rowWithErrors = [];

          const indexErrorDataGrid = [];
        if (columnCode) {

      datacheckErrorModelTemp = {};
          for (const [index, value2] of Object.entries(exposureTransformed[0])) {
        columnCode.forEach(indexColWithError => {

          if (Number(index) === columnCode[indexColWithError]) {
            indexErrorDataGrid.push(Number(index));
            rowWithErrors.push(exposureTransformed[0][index])
          }
        })
      }
         datacheckErrorModelTemp = {
          fieldCode : colsCode,
          typeError: typeError,
          rowWithErrors : rowWithErrors,
          indexDataGrid: indexErrorDataGrid,
        }
        datacheckErrorModel.push(datacheckErrorModelTemp);
        }
      }
      }
    }
    return datacheckErrorModel;
  }

  public createExposureStructure(exposuresOrigin) {
    const data = exposuresOrigin.exposures;
    const indexRows = exposuresOrigin.index;
    const exposureTransformed = [];
    if (data && indexRows) {
        exposureTransformed.push(this.creatKeyValue(indexRows, data));
    }
    return exposureTransformed;
  }

public creatKeyValue(keys, values) {
    const result = {};
    keys.forEach((key, i) => result[key] = values[i]);
    return result;
}

  refreshGrid() {
    const params = { force: false };
    this.gridApi.refreshCells(params);
  }

  firstRefresh(headers, exposures) {

    this.columnDefs = headers;
    this.rowsData = exposures;
    const params = { force: true };
    if (this.gridApi && this.columnDefs && this.rowsData) {
      if (this.gridOptions.api) {
        this.gridOptions.api.setColumnDefs(this.columnDefs);
        this.gridOptions.api.setRowData(this.rowsData);
      }
      this.gridApi.refreshCells(params);
    }

  }
  getListFieldCode(headers) {
    const fieldCodeList = [];
    for (let i = 0; i < headers.length; i++) {
      const element = headers[i];
      fieldCodeList.push(element['fieldCode'])
    }
    return fieldCodeList;
  }

  scramble() {
    const rows = this.rowsData;
    const indexRowModify = this.indexRowModify;
    const headersMod = this.headersMod;
    const fieldCodeId = this.fieldCodeId;
    const contents = this.contents;
    if (rows && indexRowModify.length > 0) {
      for (let i = 0; i < rows.length; i++) {
        const item = rows[i];
        if (indexRowModify.includes(i)) {
          this.scrambleItem(item, headersMod, fieldCodeId, contents);
        }
      }
    }
}

  scrambleItem(item, headersMod, fieldCodeId, contents) {
    if (headersMod && fieldCodeId.length > 0 && contents !== {}) {
      headersMod.forEach(function (colId) {
        if (fieldCodeId.includes(colId)) {
          item[colId] = contents[colId];
        }
        else {
          return;
        }
      });
    }
}

  purgeCache() {
    this.gridApi.purgeServerSideCache([]);
  }

  refreshAfterUpdate() {
    // const params = { force: false };
    if (this.gridApi && this.columnDefs && this.rowsData) {
      if (this.gridOptions.api && this.gridColumnApi) {
        this.saveState();
      }
      this.gridOptions.api.setColumnDefs(this.columnDefs);
      this.gridOptions.api.setRowData(this.rowsData);
      // this.gridApi.refreshCells(params);
      if (this.gridOptions.api && this.gridColumnApi) {
        this.restoreState();
        this.adjustSizeDataGrid();
      }
    }
    this.contents = {};
    this.fieldCodeId = [];
    this.headerName = [];
    this.colDef = [];
    this.indexRowToSave = [];
    this.indexRowModify = [];
    this.firstChangeMultipleRow = true;
  }



  saveState() {
    this.colState = this.gridColumnApi.getColumnState();
    if (this.colState && this.numberIdChange === 1) {
      for (let i = 0 ; i < this.colState.length; i++) {
        this.colState[i]['colId'] = this.getExactColId(this.colState[i]['colId'])
      }
    }
    this.groupState = this.gridColumnApi.getColumnGroupState();
    this.sortState = this.gridApi.getSortModel();
    this.filterState = this.gridApi.getFilterModel();
    console.log('column state saved');
  }

  getStateOfAllColumns(colState) {
    const columnState = [];
    const firstIndexCol = 3;
    for (let i = firstIndexCol; i < colState.length; i++) {
      const elmtName = this.getExactColId(colState[i]['colId']);
      const elmtState = colState[i]['hide'];
      columnState.push({
        colId: elmtName,
        hide: elmtState
      })
    }

    return columnState;
  }

  restoreState() {
    if (!this.colState) {
      console.log('no columns state to restore by, you must save state first');
      return;
    }
    this.numberIdChange = 2;

    this.gridColumnApi.setColumnGroupState(this.groupState);
    this.gridApi.setSortModel(this.sortState);
    // setFilter
    this.gridApi.setFilterModel(this.filterState);
    this.gridApi.setFilterModel(this.filterModel);
    console.log('column state restored');
  }

  refreshAll(headers, exposures) {

    this.contents = {};
    this.fieldCodeId = [];
    this.headerName = [];
    this.colDef = [];

    this.columnDefs = headers;
    this.rowsData = exposures;
    const params = { force: false };
    if (this.gridApi && this.columnDefs && this.rowsData) {
      if (this.gridOptions.api) {
        this.gridOptions.api.setColumnDefs(this.columnDefs);
        this.gridOptions.api.setRowData(this.rowsData);
      }
        }
  }

  scrambleAndRefreshAll() {
    const params = { force: false };
    this.gridApi.refreshCells(params);
  }

  onGridReady(params) {
    this.gridApi = params.api;

    // console.log(this.gridApi);
    this.gridColumnApi = params.columnApi;
    this.gridApi.openToolPanel('columns');
    this.lastPageLoaded = this.gridApi.paginationGetTotalPages();
    this.adjustSizeDataGrid();
    // this.setStateToGrid()

  }

  focusOut () {
    console.log('focusOut =>>>>>')
    /* if (this.gridApi) {
      this.gridApi.deselectAll()
    } */
    if (this.gridOptions && !this.isFirstFocus) {
      this.gridOptions.api.clearFocusedCell();
      this.isFirstFocus = true;
    }
    else {
      this.isFirstFocus = false;
    }
     }

  resetCalculTiv() {
    const tiv = this.calculTiv;
    this.tivInput = '';
    for (let i = 0; i < tiv.length; i++) {
      this.calculTiv[i].value = [];
      this.calculTiv[i].index = [];
      this.calculTiv[i].checked = false;
      this.colorPdBi = false;
    }
  }

  setCheck(check, id) {
    for (let i = 0; i < this.calculTiv.length; i++) {
    if (this.calculTiv[i].id === id) {
      this.calculTiv[i].checked = check;
      this.colorPdBi = false;
    }
    if (!this.calculTiv[i].checked) {
      this.calculTiv[i].value = [];
      this.calculTiv[i].index = [];
    }
  }
}

  setCheckedRows() {
    const indexDb = this.exposureOriginal.index;
      const allValue = this.gridApi.getSelectedRows();
      for (let i = 0; i < this.calculTiv.length; i++) {
        const indexTemp = [];
        const valueTemp = [];
        for (let j = 0; j < allValue.length; j++) {
          const element = allValue[j];
          const indexList = this.gridApi.getSelectedNodes()[j].childIndex;
          indexTemp.push(indexList);
          valueTemp.push(element)
          // this.calculTiv[i].index.push(index);
        }
        if (allValue.length > 0) {
          this.calculTiv[i].index = this.getListOfEquivalentIndexInDb(indexDb, indexTemp);
          this.calculTiv[i].value = valueTemp;
        }
    }

  }

  isChecked(elmt) {
    for (let i = 0; i < elmt.length; i++) {
      if (elmt[i].checked === true) {
        return true;
      }
    }
    return false;
  }
  isCheckedRows(elmt) {
    for (let i = 0; i < elmt.length; i++) {
      if (elmt[i].value.length > 0 && elmt[i].index.length > 0) {
        return true;
      }
    }
    return false;
  }

  isTivImput() {
    this.tivInput = (<HTMLInputElement>document.getElementById('tivInput')).value;
    if (this.tivInput !== null && this.tivInput !== '') {
      return true;
    }
    return false;
  }

  getTivImput() {
    return (<HTMLInputElement>document.getElementById('tivInput')).value;
  }

  invokeTivMethod($event) {
    // if one of BD and BI checked  and tiv not empty
    // show popup (Do you confirm to change, model in last version), if ok: send a request, else initialize all value
    // else change color PD and BI to red
    this.tivInput =  this.getTivImput();
    this.setCheckedRows();
    if (this.isChecked(this.calculTiv) && this.isCheckedRows(this.calculTiv) && this.isTivImput()) {
      console.log('######## popup, change color BD and BI to grey #######')
      this.colorPdBi = false;
      this.isVisiblePdBi = true;
    }
    else if (this.isChecked(this.calculTiv) && (!this.isCheckedRows(this.calculTiv) || !this.isTivImput())) {
      // this.resetCalculTiv(this.calculTiv)
      this.colorPdBi = false;
      console.log('------ No rows checked or Tiv empty ------')
    }
    else if (!this.isChecked(this.calculTiv) && this.isCheckedRows(this.calculTiv)) {
      // this.resetCalculTiv(this.calculTiv)
      this.colorPdBi = true;
      console.log('------ row checked but PD and BI No => change color PD and BI to red ------')
    }
    else {
      console.log('------ No row checked, PD and BI No checked => change color PD and BI to red ------')
      this.resetCalculTiv();
      this.colorPdBi = true;
    }
  }

  invokeLinkMethod($event) {
    console.log('invoke link method');
  }

  invokeEditMethod($event) {
    let line : any = {}
    let multiple : any = {}
    let page = this.currentPage - 1
    const selectedRowsData = this.gridApi.getSelectedRows();
    const selectedRowsIndex = this.gridApi.getSelectedNodes().map(s=> s.childIndex);
    const original_indices = selectedRowsIndex.map(s=> (this.indexRowsLoaded[s]));
    let original_rowId = selectedRowsIndex[0] + (page * 50)
      if(selectedRowsData.length >0){
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
      
        if(selectedRowsIndex.length > 1 ){
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
          this.editLocationButtonClick.emit(obj);
     
          
        }
        else {
          let obj = {
            line : line,
            backup : selectedRowsData[0],
            rowId : selectedRowsIndex[0],
            indices :  selectedRowsIndex,
            multiple : multiple,
            isMultipleEdit : false,
            current_page : this.currentPage,
              original_rowId : original_rowId,
              original_indices : [original_rowId]
    
          }
          this.editLocationButtonClick.emit(obj);
         
        }
      }
       
    
    
    
    // console.log(this.gridApi.getSelectedNodes());
 //   const rowIndex = this.gridApi.getSelectedNodes()[0].childIndex;
 //   this.store.dispatch(new LoadLoadPopUps({location: this.gridApi.getSelectedRows()[0]}));
//    this.service.setNextEdit(new GridLineInfo(rowIndex, rowIndex))
    // console.log(this.gridApi.getSelectedRows());

  }

  invokeDeleteMethod() {
    // this.gridApi.updateRowData({remove: this.gridApi.getSelectedRows()})
    if (this.gridApi.getSelectedRows().length > 0) {
      let dataList = [];
      let indexList = [];
      const allValue = this.gridApi.getSelectedRows();
      const indexTemp = [];
      const exposures = this.exposureOriginal;
      const selfLink = this.exposureOriginal._links.self;
      for (let j = 0; j < allValue.length; j++) {
        const element = allValue[j];
        const indexList = this.gridApi.getSelectedNodes()[j].childIndex;
        indexTemp.push(indexList);
        // this.calculTiv[i].index.push(index);
      }
        if (exposures) {
          const indexDb = exposures.index;
          const listIndex = this.getListOfEquivalentIndexInDb(indexDb, indexTemp);
          const body = {
            is_all: false,
            indices: listIndex
          }
          if (this.importData$) {
            if (this.csMetadataLoaded) {
                const jobId = this.csMetadataLoaded.jobId;
                if (jobId) {
                    const fileData = this.fileData;
                    const selectedSheet = this.selectedSheet;
                    this.cleansingService.deleteRow(fileData, selectedSheet, jobId, body).subscribe((isDeleted) => {
                    console.log('delete ok, update metadata and check => ');
                    if (this.gridApi) {
                      const selectedRows = this.getSelectedRowsInfos(this.gridApi);
                      dataList = selectedRows.selectedRowsData;
                      indexList = selectedRows.selectedRowsIndex;
                      this.deleteRows(this.gridApi, dataList);
                    }
                    this.updateCsMetadata(jobId);
                    // this.updateCheck(fileData, selectedSheet);
                    this.updateExposures(selfLink);
                    }, err => {
                      this.notif.error('Delete rows failed');
                      // console.log('=Delete rows failed=')
                    })
                }
            }
          }
        }
    }
  }


  showModalRestor(): void {

    this.isVisibleRestor = true;
    if (this.columnDefs && this.rowsData) {
      if (this.gridOptions.api) {
        this.gridOptions.api.setColumnDefs(this.columnDefs);
        this.gridOptions.api.setRowData(this.rowsData);
      }
      this.refreshAll(this.columnDefs, this.rowsData);
    }
    this.cdrf.detectChanges();
  }

  refreshAllGrid(): void {

    if (this.columnDefs && this.rowsData) {
      if (this.gridOptions.api) {
        this.gridOptions.api.setColumnDefs(this.columnDefs);
        this.gridOptions.api.setRowData(this.rowsData);
      }
      // this.refreshAll(this.columnDefs, this.rowsData);
    }
    // this.cdrf.detectChanges();
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

  handleCancelRestor(): void {
    this.isVisibleRestor = false;
  }

  handleOkRestor(): void {
    this.previousState = JSON.parse(JSON.stringify(this.rowsData));
    this.fakeRowData = explosuresModel;
    this.isOkLoadingRestor = true;
    window.setTimeout(() => {}, 4000);
    this.isVisibleRestor = false;
    this.isOkLoadingRestor = false;
    this.cdrf.detectChanges();
  }

  // tst
  onPageSizeChanged(newPageSize) {
    const value = (<HTMLInputElement>document.getElementById('pageSize')).value;
    this.gridApi.paginationSetPageSize(Number(value));
  }

  // tst
  getIndexRow(event) {
    if (event) return event.rowIndex;
    else return null;
  }

  openToolPanel(key) {
    this.gridApi.openToolPanel(key);
  }

  onBtStartEditing(rowIndex, colKey) {
    this.gridApi.startEditingCell({
      rowIndex: rowIndex,
      colKey: colKey,
    });
  }

  getEquivalentIndexInDb(rowIndexDataGrid, rowIndexDb) {
    return rowIndexDb[rowIndexDataGrid];
  }

  getEquivalentIndexInDataGrid(listRowIndexDb, listRowIndexDbSpecific) {
    const indexInDataGrid = [];
    for (const [indexDg, indexDbSp] of Object.entries(listRowIndexDbSpecific)) {
      if (listRowIndexDb.includes(indexDbSp)) {
        const index = listRowIndexDb.indexOf(Number(indexDbSp));
        indexInDataGrid.push(index);
      }
    }
    return indexInDataGrid;
  }

  public onEnter() {
    console.log(' ++ enter ++ ');
    this.isEnterForSave = true;
  }

  public getExactColId(colId) {
    if (colId !== undefined) {
      const colId1 = colId.split('_1').slice(0, -1).join('_1');
    if (colId1) {
      colId = colId1;
    }
    }
    return colId;
  }
  public getInverseColId(colId) {
    if (colId !== undefined) {
    const colId1 = colId.split('_1').slice(0, -1).join('_1');
        if (colId1) {
          return colId1;
        }
    }
    return colId + '_1';
  }

  private onCellValueChanged(event) {
    // when edit on cell
    const newValue = event.newValue;
    const oldValue = event.oldValue;
    const rowIndex = event.rowIndex;
    let colId = event.column.colId;
    const colDef = event.column.colDef;
    const headerName = colDef.headerName;
    const indexRowDb = this.getEquivalentIndexInDb(rowIndex, this.indexRowsLoaded);

    if (!this.oldRowIndex || this.oldRowIndex === 0) {
      // console.log('** new row db grid**')
      this.oldRowIndex = rowIndex;
      this.indicesRow.push(indexRowDb);
    }
    if (oldValue === newValue) {
      console.log('-- No change --')
      this.isChangeDetected = false;
    }
    else if (newValue === '') {
      console.log('-- empty value not allowed --')
      this.isChangeDetected = false;
    }
    else {
      console.log('-- change detected --');
      colId = this.getExactColId(colId);
      this.newValueTemp = newValue;
      this.contents[colId] = newValue;
      this.fieldCodeId.push(colId);
      this.headerName.push(headerName);
      this.colDef.push(colDef);
      this.indexRowTemp = indexRowDb;
      this.indexRowModifyTemp = rowIndex;
      this.isChangeDetected = true;
      
      if (this.firstChangeMultipleRow) {
        this.newValueMultipleRow = newValue;
        this.firstChangeMultipleRow = false;
      }
      if (this.newValueMultipleRow === newValue) {
        if (this.indexToSaveMultipleRow.length > 0 && this.indexToSaveMultipleRow.includes(rowIndex)) {
          this.colIdToSaveMultipleCol[colId] = newValue;
          this.isMultipleColToModify = true;
        }
        this.colIdToSaveMultipleCol[colId] = newValue;
        this.indexToSaveMultipleRow.push(rowIndex);
        this.colIdToSaveMultipleRow = colId;
      }
      if (this.isNewRowFocused) {
        this.indicesRow = [];
        this.isNewRowFocused = false;
      }

    }

  }

  onRowSelected($event) {
    this.rowsSelected = 0;
    this.isRowsSelected = false;
    const allValue = this.gridApi.getSelectedRows();
    this.rowsSelected = allValue.length;
    if (this.rowsSelected > 0) {
      this.isRowsSelected = true;
    }
    else {
      this.rowsSelected = 0;
      this.isRowsSelected = false;
    }
  }
  private onCellFocused($event) {
    if ($event.column && ($event.rowIndex || $event.rowIndex === 0)) {
      const rowIndex = $event.rowIndex;
      this.focusedRowIndex = $event.rowIndex;
      this.focusedColId = $event.column.colId;

      this.newRowIndex = rowIndex;

      if (this.oldRowIndex === this.newRowIndex) {
        if (this.newValueTemp !== undefined && this.newValueTemp  !== null && this.indexRowTemp !== undefined && this.indexRowTemp !== null) {
          this.newValueToSave.push(this.newValueTemp);
          this.indexRowToSave.push(this.indexRowTemp);
          this.indexRowModify.push(this.indexRowModifyTemp);
        }
        this.newValueTemp = null;
        this.indexRowTemp = null;
      }
      else {
        this.oldRowIndex = rowIndex;
        this.isNewRowFocused = true;

        if (this.indexToSaveMultipleRow.length > 1 && this.colIdToSaveMultipleRow && this.newValueMultipleRow) {

          let contents = {};
          let indexTemp = [];

          if (this.isMultipleColToModify) {
            console.log('** multiple column **');
            // multiple column but same row
            contents = this.colIdToSaveMultipleCol;
            indexTemp.push(this.indexToSaveMultipleRow[0]);
          }
          else {
            console.log('** multiple row **');
            // multiple row but same column
            contents[this.colIdToSaveMultipleRow] = this.newValueMultipleRow;
            indexTemp = this.indexToSaveMultipleRow;
          }

          const bodyRequest = {
            is_all: false,
            indices: indexTemp,
            content: contents
          }

          if (this.gridOptions.api) {
            const cell = this.gridOptions.api.getFocusedCell();
            const allDisplayedCol = this.gridOptions.columnApi.getAllDisplayedColumns();

            if (cell && allDisplayedCol) {
              this.rowIdFocused = cell.rowIndex;
              this.colIdFocused = cell.column.getColId();
              this.colFocused = this.getColumnToShow(this.colIdFocused, allDisplayedCol);
              this.colRangeFocused = this.getRangeColumnToShow(this.colIdFocused, allDisplayedCol);
            }
          }

          this.saveUpdatedData(bodyRequest);

          this.newValueMultipleRow = null;
          this.firstChangeMultipleRow = true;
          this.indexToSaveMultipleRow = [];
          this.colIdToSaveMultipleRow = null;
          this.isMultipleColToModify = false;
          this.isChangeDetected = false;

          this.newValueToSave = [];
          this.indexRowToSave = [];
        }
        else if (this.indexRowToSave.length > 0 && this.contents !== {}) {
          const indexRowUnique = [];
          indexRowUnique.push(this.indexRowToSave[0]);

          const bodyRequest = {
            is_all: false,
            indices: indexRowUnique,
            content: this.contents
          }

          if (bodyRequest.content['country']) {
            const countryNameSelected = bodyRequest.content['country'];
            if (this.countriesNameCode && countryNameSelected) {
              const codeElement = this.getCodeOfElement(this.countriesNameCode, countryNameSelected);
              this.getStatesByCountry(codeElement, countryNameSelected);
            }
          }
          if (bodyRequest.content['state']) {
            const stateNameSelected = bodyRequest.content['state'];
            if (this.statesNameCode && stateNameSelected) {
              const codeElement = this.getCodeOfElement(this.statesNameCode, stateNameSelected);
              this.getCountiesByState(codeElement, stateNameSelected);
            }
          }
          if (this.gridOptions.api) {
            const cell = this.gridOptions.api.getFocusedCell();
            const allDisplayedCol = this.gridOptions.columnApi.getAllDisplayedColumns();
            if (cell && allDisplayedCol) {
              this.rowIdFocused = cell.rowIndex;
              this.colIdFocused = cell.column.getColId();
              this.colFocused = this.getColumnToShow(this.colIdFocused, allDisplayedCol);
              this.colRangeFocused = this.getRangeColumnToShow(this.colIdFocused, allDisplayedCol);

            }
          }

          this.saveUpdatedData(bodyRequest);

          this.newValueToSave = [];
          this.indexRowToSave = [];
          this.newValueMultipleRow = null;
          this.firstChangeMultipleRow = true;
          this.indexToSaveMultipleRow = [];
          this.colIdToSaveMultipleRow = null;
          this.isMultipleColToModify = false;
          this.isChangeDetected = false;

        }
        else {
          // init all
          this.newValueToSave = [];
          this.indexRowToSave = [];
          this.contents = {};
          this.fieldCodeId = [];
          this.headerName = [];
          this.colDef = [];
          this.newValueMultipleRow = null;
          this.firstChangeMultipleRow = true;
          this.indexToSaveMultipleRow = [];
          this.colIdToSaveMultipleRow = null;
          this.isMultipleColToModify = false;
          this.isChangeDetected = false;

        }
      }
    }
    if (this.isFirstLoad) {
      if (this.exposureOriginal) {
        const self = this.exposureOriginal._links.self;
        if (self) {
          this.getUpdatedData(self, this.headersLoaded, false);
        }
      }
      this.isFirstLoad = false;
    }
  }

  public updateCsMetadata(jobId) {
    this.cleansingService.getUpdateCsMetadata(jobId).subscribe((data) => {
      
      if (data) {
        this.datachecksLoaded = data;
        this.store.dispatch(new ActionLoadCsMetadata({ csMetadata: data }));
      }
    })
  }
  public updateCheck(fileData, selectedSheet) {
    this.cleansingService.getUpdateCheck(fileData, selectedSheet, this.currentPage).subscribe((data) => {
      if (data) {
        this.datachecksLoaded = data;
        // this.store.dispatch(new ActionLoadErrors({ errors: data }));
      }
    })
  }

  public updateExposures(selfLink) {
    this.cleansingService.getUpdateExposures(selfLink).subscribe((data) => {
      if (data) {
        this.exposureOriginal = data;
        const exposureTemp = data['exposures'];
        this.pageLast = data['last_page'];
        this.pageFirst = data['first_page'];
        this.currentPage = data['current_page'];

        if (data['abolute_index']) {
          this.indexRowsLoaded = data['abolute_index'];
        }
        else {
          this.indexRowsLoaded = data['index'];
        }

        this.oldDataNewPage = data['exposures'];
        this.exposuresLoaded = exposureTemp;

        this.store.dispatch(new ActionLoadAllData({ data: data }));
      }
    });
  }

  getStateGroupColumns() {
    if (this.gridColumnApi) {
      this.groupState = this.gridColumnApi.getColumnGroupState();
      /* this.displayedCenterColumns = this.gridColumnApi.getDisplayedCenterColumns();
      if(this.firstLoadManageColumn) {
        this.selectedDisplayColumnExpanded = this.getColIdExpanded(this.displayedCenterColumns);
        this.firstLoadManageColumn = false;
      } */

    if (this.listModification.length === 0) {
      this.listModification = this.getGroupExpanded(this.groupState);
    }
    }
  }

  getGroupExpanded(goupCols) {
    const isModifTemp = [];
    for (let i = 0; i < goupCols.length; i++) {
      const elemnts = goupCols[i];
      if (elemnts['open']) {
        isModifTemp.push({groupId: elemnts['groupId'], open: elemnts['open']});
      }
    }
    return isModifTemp;
  }

  public saveUpdatedData(body) {
    this.getStateGroupColumns();
    const fileData = this.fileData;
    const selectedSheet = this.selectedSheet;
    this.cleansingService.doUpdateData(this.jobId, fileData, selectedSheet, this.mappingId, body).subscribe((jobId) => {
      if (jobId) {

        this.updateCsMetadata(jobId['job_id']);

        // this.updateCheck(fileData, selectedSheet);
        console.log('++ update succesfully ++')
        const self = this.exposureOriginal._links.self;
        if (self) {

          this.cleansingService.getUpdateExposures(self).subscribe((data) => {
            if (data) {

              if (!this.isNewPage) {
                this.store.dispatch(new ActionLoadAllData({ data: data }));
              }
              this.exposureOriginal = data;
              this.pageLast = data['last_page'];
              this.pageFirst = data['first_page'];
              const exposureTemp = data['exposures'];
              this.currentPage = data['current_page'];

              if (data['abolute_index']) {
                this.indexRowsLoaded = data['abolute_index'];
              }
              else {
                this.indexRowsLoaded = data['index'];
              }
              this.oldDataNewPage = data['exposures'];
              this.exposuresLoaded = exposureTemp;
              if (exposureTemp) {
                this.exposuresLoaded = exposureTemp;
                this.oldDataClickedCell = exposureTemp;
                // to comment when using scramble() in refresh
                this.rowsData = this.createRowData(exposureTemp);
                // set selected value in manage column
                this.newHeadersLoaded = this.getSelectedColumn(this.columnState, this.headersLoaded);
                this.columnDefs = this.createColumnDefs(this.newHeadersLoaded);
                // this.columnDefs = this.createColumnDefs(this.headersLoaded);
              }
              if (this.columnDefs && this.rowsData) {
                this.expandedColsLengthBeforeEdit = this.expandedColsLength;
                this.expandedColsLength = 0;
                this.isModification = true;
                this.refreshAfterUpdate();
                this.bringFocusBack();
              }
            }
          });
        }
      }
      else {
        this.onUpdateFailed();
      }
    }, err => {
      console.log('=Update cell failed=')
    }/* , () => {},
     () => {
      console.log('= inside success 4 =')
      this.bringFocusBack();
    } */)
  }

  private getColumnToShow(fieldCode, colList) {
    if (colList) {
      for (let i = 0; i < colList.length; i++) {
        if (fieldCode === colList[i]['colId'] || fieldCode === this.getExactColId(colList[i]['colId'])) {
          return colList[i];
        }
      }
    }
    return null;
  }

  private getRangeColumnToShow(fieldCode, colList) {
    if (colList) {
      for (let i = 0; i < colList.length; i++) {
        if (fieldCode === colList[i]['colId'] || fieldCode === this.getExactColId(colList[i]['colId'])) {
          return i;
        }
      }
    }
    return null;
  }

  adjustSizeDataGrid() {
    if (this.gridOptions.columnApi && this.gridOptions.api) {
      const allDisplayed = this.gridOptions.columnApi.getAllDisplayedColumns();
      if (allDisplayed.length < 9) {
        this.gridOptions.api.sizeColumnsToFit();
      }
    }
  }

  private bringFocusBack() {
    // console.log('= bringFocusBack =');
    if (this.gridOptions.api && this.rowIdFocused && this.colIdFocused && this.colFocused && this.colRangeFocused) {

      const displayedCol = this.gridOptions.columnApi.getAllDisplayedColumns()[this.colRangeFocused];

      const displayedColCenter = this.gridOptions.columnApi.getDisplayedCenterColumns()[this.colRangeFocused]
      const displayedColLeft = this.gridOptions.columnApi.getDisplayedLeftColumns()[this.colRangeFocused]
      const displayedColRight = this.gridOptions.columnApi.getDisplayedRightColumns()[this.colRangeFocused]

      // scrolls to the exact row
      this.gridOptions.api.ensureIndexVisible(this.rowIdFocused);
      // scrolls to the exact column
      this.gridOptions.api.ensureColumnVisible(displayedCol);
      this.gridOptions.api.ensureColumnVisible(displayedColCenter);
      this.gridOptions.api.ensureColumnVisible(displayedColLeft);
      this.gridOptions.api.ensureColumnVisible(displayedColRight);
      this.gridOptions.api.setFocusedCell(this.rowIdFocused, displayedCol, null);
      this.adjustSizeDataGrid();
    }
  }

  public onBtStartEditingCell() {
    // console.log('= onBtStartEditingCell =');
    if (this.gridApi && this.focusedRowIndex && this.colIdFocused) {
      // this.bringFocusBack();
      const inverseColId = this.getInverseColId(this.colIdFocused)
      this.gridOptions.api.startEditingCell({
        rowIndex: this.focusedRowIndex,
        colKey: inverseColId,
        // rowPinned: null,
        // keyPress: key,
        // charPress: char,
      });
      this.gridOptions.api.startEditingCell({
        rowIndex: this.focusedRowIndex,
        colKey: this.colIdFocused,
      });
    }
  }

  getNewInsertData(gridApi) {
    const newExposures = [];
    gridApi.forEachNode(function (rowNode, index) {
      newExposures.push(rowNode.data);
    });
    return newExposures;
  }

  getDataIfModifyOneRow(oldExposures, newExposures, indexRowsLoaded) {
      const contents = {};
      const indices = [];
      let i = 0;
          for (const [key0, value0] of Object.entries(newExposures)) {
            if (JSON.stringify(oldExposures[key0]) !== JSON.stringify(value0)) {
            for (const [key, valueNew] of Object.entries(value0)) {
            if (oldExposures[key0][key] !== valueNew) {
              if (i === 0 || indices.includes(indexRowsLoaded[key0])) {
                indices.push(indexRowsLoaded[key0]);
              }
              i = i + 1;
              if (valueNew) {
                contents[key] = valueNew;
              }
              else {
                // the backend don't authorize empty value
                return false;
              }
            }
          }
          return {
              is_all: false,
              indices: indices,
              content: contents
            }
          }
        }
        return false;
  }

  getDataIfModify(oldExposures, newExposures, indexRowsLoaded) {
    if (JSON.stringify(oldExposures) === JSON.stringify(newExposures)) {
      console.log('No modification');
      return false;
    }
    else {
      const contents = {};
      const indices = [];
      let i = 0;
          for (const [key0, value0] of Object.entries(newExposures)) {
            if (JSON.stringify(oldExposures[key0]) !== JSON.stringify(value0)) {
            for (const [key, valueNew] of Object.entries(value0)) {
              // probleme de duplication de clé pour les memes colonnes
            if (oldExposures[key0][key] !== valueNew) {
              // adapted to the structure, only a modification in one line each time
              if (i === 0 || indices.includes(indexRowsLoaded[key0])) {
                indices.push(indexRowsLoaded[key0]);
              }
              i = i + 1;
              if (valueNew) {
                contents[key] = valueNew;
              }
              else {
                return false;
              }
            }
          }
          }
        }
        const modifyData = {
              is_all: false,
              indices: indices,
              content: contents
            }
        return modifyData;
    }
  }

  onMakeAnUpdate(oldDataClickedCell, newExposures, indexRowsLoaded) {
    if (this.gridApi) {

        const isModify = this.getDataIfModify(oldDataClickedCell, newExposures, indexRowsLoaded);
        if (isModify) {
          let exposureUpdated;
          if (this.importData$) {
            this.importData$.subscribe((importData) => {
              const fileData = importData.fileData;
              const selectedSheet = importData.selectedSheet;
              exposureUpdated = this.exposureOriginal;
              this.cleansingService.doUpdateData(this.jobId, fileData, selectedSheet, this.mappingId, isModify ).subscribe((jobId) => {
                if (exposureUpdated && jobId) {
                const self = this.exposureOriginal._links.self;
                if (self) {
                  this.updateCsMetadata(jobId['job_id']);
                  // update check
                  // this.updateCheck(fileData, selectedSheet);
                  // this.getUpdatedData(self, this.headersLoaded, true);
                  this.cleansingService.getUpdateExposures(self).subscribe((data) => {
                    if (data) {
                      if (isModify) {
                        if (!this.isNewPage) {
                          this.store.dispatch(new ActionLoadAllData({ data: data }));
                        }
                      }
                      this.exposureOriginal = data;
                      const exposureTemp = data['exposures'];
                      if (exposureTemp) {
                        this.exposuresLoaded = exposureTemp;
                        this.oldDataClickedCell = exposureTemp;
                        this.rowsData = this.createRowData(exposureTemp);
                      }
                      if (this.columnDefs && this.rowsData) {
                        this.refreshAfterUpdate();
                      }
                    }
                  });
                }
              }
              else {
                  // setTimeout(function () { return true; }, 20000);
                  this.onUpdateFailed();
              }
              });

          })
        }
        }
        else if (!this.isNewPage) {
          console.log('No modification detected!');
          if (this.exposureOriginal) {
            const self = this.exposureOriginal._links.self;
            if (self) {
              this.getUpdatedData(self, this.headersLoaded, false);
            }
          }
        }
      }
  }

  onCellDoubleClicked(event) {
    let clickedCellValue;
    if (event.data && event.column) {
      for (const [key, value] of Object.entries(event.data)) {
        if (key === event.column.colId) {
          clickedCellValue = value;
        }
      }
    }
  }

onCellClicked($event) {
  const rowIndex = $event.rowIndex;
  const colId = this.getExactColId($event.column.colId);
  const data = $event.data;
  const dataList = [];
  let clickedCellValue;
  if (data && colId) {
    for (const [key, value] of Object.entries(data)) {
      if (key === colId) {
        clickedCellValue = value;
      }
    }
  }
    this.eventModif = true;
    this.indexRow = $event.rowIndex;
    this.idRow = $event.rowIndex;
    this.dataRow = $event.data;
    // console.log(rowIndex)
    // console.log(colId)
    // console.log(clickedCellValue)
  }

  onUpdateSaved() {
     this.notif.success('Update successfully');
  }
  onUpdateFailed() {
    this.notif.error('Update failed');
  }

  public getUpdatedData(self, headersLoaded, isModify) {
    this.cleansingService.getUpdateExposures(self).subscribe((data) => {
      if (data) {
        if (isModify) {
          console.log('Need to synchronize data after modification')
          // this.store.dispatch(new ActionLoadAllData({ data: data }));
        }
        this.exposureOriginal = data;
        const exposureTemp = data['exposures'];
        this.pageLast = data['last_page'];
        this.pageFirst = data['first_page'];
        this.currentPage = data['current_page'];

        if (data['abolute_index']) {
          this.indexRowsLoaded = data['abolute_index'];
        }
        else {
          this.indexRowsLoaded = data['index'];
        }
        this.exposuresLoaded = exposureTemp;

        if (exposureTemp) {
          this.rowsDataOld = this.rowsData;
          this.rowsData = this.createRowData(exposureTemp);
          // set selected value in manage column
          this.newHeadersLoaded = this.getSelectedColumn(this.columnState, this.headersLoaded);
          this.columnDefs = this.createColumnDefs(this.newHeadersLoaded);
          // this.columnDefs = this.createColumnDefs(headersLoaded);
        }
        if (this.columnDefs && this.rowsData) {
          this.refreshAfterUpdate();
        }
      }
    });
  }

  onBtNextCell() {
    this.gridApi.tabToNextCell();
  }

  onBtPreviousCell() {
    this.gridApi.tabToPreviousCell();
  }
  onBtWhich() {
    const cellDefs = this.gridApi.getEditingCells();
    if (cellDefs.length > 0) {
      const cellDef = cellDefs[0];
      console.log(
        'editing cell is: row = ' +
        cellDef.rowIndex +
        ', col = ' +
        cellDef.column.getId() +
        ', floating = ' +
        cellDef.rowPinned
      );
    } else {
      console.log('no cells are editing');
    }
  }

  onBtStartEditingDown(key, char, pinned, indexRow, colId) {
    this.gridApi.startEditingCell({
      rowIndex: indexRow,
      colKey: colId,
      rowPinned: pinned,
      keyPress: key,
      charPress: char,
    });
  }

  onBtStopEditing() {
    this.gridApi.stopEditing();
    this.cdrf.detectChanges();
  }

  onCellKeyDown(e) {
    const keyPressed = e.event.key;
    if (this.gridApi.getEditingCells().length > 0) {
      if (keyPressed === 'ArrowLeft') {
      this.onBtStopEditing();
      this.onBtPreviousCell();
    }
    if (keyPressed === 'ArrowRight') {
      this.onBtStopEditing();
      this.onBtNextCell();
    }
    if (keyPressed === 'ArrowDown') {
      if (this.focusedRowIndex && this.focusedColId) {
        this.focusedRowIndex = this.focusedRowIndex + 1;
        this.onBtStopEditing();
        this.onBtStartEditingDown(13, null, '', this.focusedRowIndex, this.focusedColId)
      }
    }
    if (keyPressed === 'ArrowUp') {
      if (this.focusedRowIndex && this.focusedColId) {
        this.focusedRowIndex = this.focusedRowIndex - 1;
        this.onBtStopEditing();
        this.onBtStartEditingDown(13, null, '', this.focusedRowIndex, this.focusedColId)
      }
    }
    }

  }

  onCellKeyPress(e) {
    console.log(' = enter = ');
    const keyPressed = e.event.key;
    if (keyPressed === 'Enter') {
      console.log('= onCellEnterkey = ');
      this.isEnterForSave = true;
      const rowNode = e.node;
      const newSelection = !rowNode.selected;
      if (this.isChangeDetected) {
        console.log('==> change detected after onCellEnterkey : ');
        // console.log(this.indexRowToSave)
        // console.log(this.contents)
        // const body = getUpadedCell();
        if (this.indexRowToSave.length > 0 && this.contents !== {}) {
          const indexRowUnique = [];
          indexRowUnique.push(this.indexRowToSave[0]);

          const bodyRequest = {
            is_all: false,
            indices: indexRowUnique,
            content: this.contents
          }

          if (bodyRequest.content['country']) {
            const countryNameSelected = bodyRequest.content['country'];
            if (this.countriesNameCode && countryNameSelected) {
              const codeElement = this.getCodeOfElement(this.countriesNameCode, countryNameSelected);
              this.getStatesByCountry(codeElement, countryNameSelected);
            }
          }
          if (bodyRequest.content['state']) {
            const stateNameSelected = bodyRequest.content['state'];
            if (this.statesNameCode && stateNameSelected) {
              const codeElement = this.getCodeOfElement(this.statesNameCode, stateNameSelected);
              this.getCountiesByState(codeElement, stateNameSelected);
            }
          }
          if (this.gridOptions.api) {
            const cell = this.gridOptions.api.getFocusedCell();
            const allDisplayedCol = this.gridOptions.columnApi.getAllDisplayedColumns();
            if (cell && allDisplayedCol) {
              this.rowIdFocused = cell.rowIndex;
              this.colIdFocused = cell.column.getColId();
              this.colFocused = this.getColumnToShow(this.colIdFocused, allDisplayedCol);
              this.colRangeFocused = this.getRangeColumnToShow(this.colIdFocused, allDisplayedCol);

            }
          }

          this.saveUpdatedData(bodyRequest);

          this.newValueToSave = [];
          this.indexRowToSave = [];
          this.newValueMultipleRow = null;
          this.firstChangeMultipleRow = true;
          this.indexToSaveMultipleRow = [];
          this.colIdToSaveMultipleRow = null;
          this.isMultipleColToModify = false;
          this.isChangeDetected = false;
        }
      }
    }
  }

  navigateToNextCell(params) {
    const previousCell = params.previousCellPosition;
    const suggestedNextCell = params.nextCellPosition;
    console.log(params.key)

    switch (params.key) {
       case this.KEY_DOWN:
         const nextRowIndex1 = previousCell.rowIndex + 1;
         if (nextRowIndex1 < 0) {
           return null;
         } else {
           // this.onBtStopEditing();
           return {
             rowIndex: nextRowIndex1,
             column: previousCell.column,
             floating: previousCell.floating,
           };
         }
       case this.KEY_UP:
         const nextRowIndex2 = previousCell.rowIndex - 1;
         const renderedRowCount = this.gridApi.getModel().getRowCount();
         if (nextRowIndex2 >= renderedRowCount) {
           return null;
         } else {
           // this.onBtStopEditing();
           return {
             rowIndex: nextRowIndex2,
             column: previousCell.column,
             floating: previousCell.floating,
           };
         }
       case this.KEY_LEFT:
       case this.KEY_RIGHT:
       return suggestedNextCell;
  }

  }

  onBtFirst() {
    // console.log('= onBtFirst() =');
    const newExposures = this.getNewInsertData(this.gridApi);

    if (this.oldRowDataClikedCell && this.oldInfoClickedCell && this.oldDataClickedCell && newExposures) {
      this.onMakeAnUpdate(this.oldDataClickedCell, newExposures, this.indexRowsLoaded);
    }
    if (this.firstPageData) {
      this.isNewPage = true;
      const data = this.firstPageData;
      this.exposureOriginal = data;
      this.pageLast = data['last_page'];
      this.pageFirst = data['first_page'];
      const exposureTemp = data['exposures'];
      this.currentPage = data['current_page'];

      if (data['abolute_index']) {
        this.indexRowsLoaded = data['abolute_index'];
      }
      else {
        this.indexRowsLoaded = data['index'];
      }
      this.exposuresLoaded = exposureTemp;
      this.oldDataNewPage = data['exposures'];

      this.store.dispatch(new ActionLoadAllData({ data: data }));

      if (exposureTemp) {
        this.rowsData = this.createRowData(exposureTemp);
        // set selected value in manage column
        this.newHeadersLoaded = this.getSelectedColumn(this.columnState, this.headersLoaded);
        this.columnDefs = this.createColumnDefs(this.newHeadersLoaded);
        // this.columnDefs = this.createColumnDefs(this.headersLoaded);
      }
      if (this.columnDefs && this.rowsData) {
        this.gridOptions.api.setRowData(this.rowsData);
        this.gridOptions.api.setColumnDefs(this.columnDefs);
        this.refreshAll(this.columnDefs, this.rowsData);
      }
    }
    else if (this.exposureOriginal) {
      this.isNewPage = true;
      const firstLink = this.exposureOriginal._links.first;
      if (firstLink) {
        this.currentPage = this.pageFirst;
        this.getUpdateDataNewPage(firstLink);
      }
    }
  }

  onBtLast() {
    // console.log('= onBtLast() =');
    const newExposures = this.getNewInsertData(this.gridApi);
    if (this.oldRowDataClikedCell && this.oldInfoClickedCell && this.oldDataClickedCell && newExposures) {
      this.onMakeAnUpdate(this.oldDataClickedCell, newExposures, this.indexRowsLoaded);
    }
    if (this.lastPageData) {
      this.isNewPage = true;
      const data = this.lastPageData;
      this.exposureOriginal = data;
      this.pageLast = data['last_page'];
      this.pageFirst = data['first_page'];

      const exposureTemp = data['exposures'];
      this.currentPage = data['current_page'];

      if (data['abolute_index']) {
        this.indexRowsLoaded = data['abolute_index'];
      }
      else {
        this.indexRowsLoaded = data['index'];
      }

      // this.indexRowsLoaded = data['index'];

      this.oldDataNewPage = data['exposures'];
      this.exposuresLoaded = exposureTemp;

      this.store.dispatch(new ActionLoadAllData({ data: data }));

      if (exposureTemp) {
        this.rowsData = this.createRowData(exposureTemp);
        // set selected value in manage column
        this.newHeadersLoaded = this.getSelectedColumn(this.columnState, this.headersLoaded);
        this.columnDefs = this.createColumnDefs(this.newHeadersLoaded);
        // this.columnDefs = this.createColumnDefs(this.headersLoaded);
      }
      if (this.columnDefs && this.rowsData) {
        this.gridOptions.api.setRowData(this.rowsData);
        // this.gridOptions.api.sizeColumnsToFit();
        this.gridOptions.columnDefs = this.columnDefs;
        this.refreshAll(this.columnDefs, this.rowsData);
      }
    }
    else if (this.exposureOriginal) {
      this.isNewPage = true;
      const link = this.exposureOriginal._links.last;
      this.currentPage = this.pageLast;
      if (link) {
        this.getUpdateDataNewPage(link);
      }
    }
  }

  public getUpdateDataNewPage(link) {
    const fileData = this.fileData;
    const selectedSheet = this.selectedSheet;
    const jobId = this.jobId;

      this.cleansingService.getExposuresChangedPage(link).subscribe((data) => {
        if (data) {
          // update csMetadata
          this.updateCsMetadata(jobId);
          // update check
          // this.updateCheck(fileData, selectedSheet);
          this.exposureOriginal = data;
          this.pageLast = data['last_page'];
          this.pageFirst = data['first_page'];
          const exposureTemp = data['exposures'];
          this.currentPage = data['current_page'];
          if (data['abolute_index']) {
            this.indexRowsLoaded = data['abolute_index'];
          }
          else {
            this.indexRowsLoaded = data['index'];
          }
          this.oldDataNewPage = data['exposures'];
          this.exposuresLoaded = exposureTemp;

          this.store.dispatch(new ActionLoadAllData({ data: data }));

          if (exposureTemp) {
            this.rowsData = this.createRowData(exposureTemp);
            // set selected value in manage column
            this.newHeadersLoaded = this.getSelectedColumn(this.columnState, this.headersLoaded);
            this.columnDefs = this.createColumnDefs(this.newHeadersLoaded);
            // this.columnDefs = this.createColumnDefs(this.headersLoaded);
          }
          if (this.columnDefs && this.rowsData) {
          this.refreshAfterUpdate();
          }
          /* const self = this.exposureOriginal._links.self;
          if (self) {
            this.getUpdatedData(self, this.headersLoaded, false);
          } */
        }
      });
  }

  onBtSpecifiquePage(page) {
    /* const newExposures = this.getNewInsertData(this.gridApi);
    if (this.oldRowDataClikedCell && this.oldInfoClickedCell && this.oldDataClickedCell && newExposures) {
      this.onMakeAnUpdate(this.oldDataClickedCell, newExposures, this.indexRowsLoaded);
    } */
    if (this.exposureOriginal) {
      this.isNewPage = true;
      const link = this.exposureOriginal._links.first;
      this.currentPage = page;

      if (link) {
        let linkSpecifique;
        let headLink = link.split('?page=').slice(0, -1).join('?page=');
        const nrowsExtracted = link.split('&nrows=').pop();
        // i temp
        if (headLink === '') {
          headLink = link.split('&page=').slice(0, -1).join('&page=');
          linkSpecifique = headLink + '&page=' + page + '&nrows=' + nrowsExtracted;
        }
        else {
          linkSpecifique = headLink + '?page=' + page + '&nrows=' + nrowsExtracted;
        }
        // f temp

        this.getUpdateDataNewPage(linkSpecifique);
      }
    }
  }

  onBtNext() {
    if (this.exposureOriginal) {
      this.isNewPage = true;
      const nextLink = this.exposureOriginal._links.next;
      if (nextLink) {
        this.currentPage = this.currentPage + 1;
        this.getUpdateDataNewPage(nextLink);
      }
    }
  }

  onBtPrevious() {
    const newExposures = this.getNewInsertData(this.gridApi);
    if (this.oldRowDataClikedCell && this.oldInfoClickedCell && this.oldDataClickedCell && newExposures) {
      this.onMakeAnUpdate(this.oldDataClickedCell, newExposures, this.indexRowsLoaded);
    }
    if (this.exposureOriginal) {
      this.isNewPage = true;

      const link = this.exposureOriginal._links.prev;
      if (link) {
        this.currentPage = this.currentPage - 1;
        this.getUpdateDataNewPage(link);
      }
    }
  }

  ngAfterViewInit() {
  }

  public inFirstColumn(cell) {
    // cell.column is not a documented property!!
    return cell.column.colId === cell.column.parent.displayedChildren[0].colId;
  }

  public goToAdmin() {
    this.router.navigate(['dcm/administration']);
  }

  onManageColumn() {
    this.task = this.onSortCategorie(this.task)
    this.isManageColumn = true;
  }

  onSortCategorie(categories) {
    const sortCategories = [];
    const sortCategoriesNotInList = [];
    let index = 0;
    for (let i = 0; i < CATEGORIES.length; i++) {
      const elemnt1 = CATEGORIES[i];
      console.log(elemnt1)
      for (let j = 0; j < categories.length; j++) {
        const elemnt2 = categories[j];
        if (elemnt1 === elemnt2['code']) {
          sortCategories[index] = elemnt2;
          index++;
        }
        if (!CATEGORIES.includes(elemnt2['code']) && !sortCategoriesNotInList.includes(elemnt2)) {
          sortCategoriesNotInList.push(elemnt2)
        }
      }
    }
    const newCategories = sortCategories.concat(sortCategoriesNotInList)
    
    return newCategories;
  }

  getAllColumns(colState) {
    const displayedCol = [];
    for (let i = 0; i < colState.length; i++) {
      const elmtName = colState[i]['colId'];
        displayedCol.push(elmtName)
    }
    return displayedCol;
  }

  setWorkTaskes(cols) {
    const outPut = [];
    for (let i = 0; i < cols.length; i++) {
      const subtask = [];
      const cat = cols[i];
      for (let j = 0; j < cat['subtask'].length; j++) {
        const hed = cat['subtask'][j];
          /* subtask.push({
            name: hed['name'],
            code: hed['code'],
            checked: true
          }) */
          if (DEFAULT_COLUMN.includes(hed['code'])) {
            subtask.push({
            name: hed['name'],
            code: hed['code'],
            checked: true
          })
          }
          else {
            subtask.push({
              name: hed['name'],
              code: hed['code'],
              checked: false
            })
          }
      }
      outPut.push({
        name: cat['name'],
        code: cat['code'],
        checked: false,
        subtask: subtask
      });
    }
    return outPut;
  }

  handleOkManageColumn() {
    this.isManageColumn = false;
    this.selectedDisplayColumnExpanded = [];
    const cols = this.task;
    const columnState = [];
    for (let i = 0; i < cols.length; i++) {
      const categories = cols[i];
      for (let j = 0; j < categories['subtask'].length; j++) {
        const column = categories['subtask'][j];
        columnState.push({
          colId: column['code'],
          hide: !column['checked']
        })

      }
    }
    if (isDefined(columnState)) {
      this.columnState = columnState;
      this.getLoadedData();
      // this.setStateToGrid();
      this.store.dispatch(new ActionColumnState({columnState: this.columnState}));
    }
  }

  handleCancelManageColumn() {
    this.isManageColumn = false;
  }

  handleOutsideClick() {
    console.log('click outside')
  }

    handleResetManageColumn() {
      if (this.headersOriginal) {
        const data = this.getStructureTransformColomn(this.headersOriginal);
        const initColunmState = data['columnState'];
        const columnStructure = data['columnStructure'];
        this.columnState = initColunmState;
        this.getLoadedData();
        this.store.dispatch(new ActionColumnState({columnState: initColunmState}));
        this.store.dispatch(new ActionColumnStructure({columnStructure: columnStructure}));
        
      }
      this.isManageColumn = false;
    }

    getStructureTransformColomn(headers) {
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
            if (DEFAULT_COLUMN.includes(hed['fieldCode'])) {
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
                    if (DEFAULT_COLUMN.includes(column['code'])) {
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

  getOrderdColumnState(){
    let oldState = this.gridColumnApi.getColumnState()
    return oldState.slice(0, 3).concat(this.columnState.map( e => oldState.find(t=> t.colId === e.colId)))
  }


  setStateToGrid() {
    const displayedCol = this.getDisplayedColumns(this.columnState)
    this.gridColumnApi.setColumnsVisible(displayedCol.displayedCol, true)
    this.gridColumnApi.setColumnsVisible(displayedCol.hideCol, false)
    this.gridColumnApi.setColumnState(this.getOrderdColumnState())
    this.adjustSizeDataGrid();
  }

  drop(event: CdkDragDrop<string[]>,index: number) {
    moveItemInArray(this.task[index].subtask, event.previousIndex, event.currentIndex);
  }

  handleCancelPdBi($event) {
    this.isVisiblePdBi = false;
    this.resetCalculTiv();
  }

  handleOkPdBi($event) {
    this.isVisiblePdBi = false;
    const fileData = this.fileData;
    const selectedSheet = this.selectedSheet;
    const selfLink = this.exposureOriginal._links.self;

    // console.log('handleOkPdBi calculTiv => ')
    // console.log(this.calculTiv)
    const fileId = fileData.fileId;
    let index = [];
    let obj = {};
    for (let i = 0; i < this.calculTiv.length; i++) {
      const elmnt = this.calculTiv[i];
      obj[elmnt.name] = elmnt.checked;
      if (elmnt.checked) {
        index = elmnt.index;
      }
    }
    obj['lines'] = index;
    obj['tiv'] = this.tivInput;

    console.log(obj);
    const lines = obj['lines'];
    const tiv = obj['tiv'];
    const pd = obj['PD'];
    const bi = obj['BI'];
    this.cleansingService.ajustTiv(fileId, lines, tiv, pd, bi).subscribe((newFileId: string) => {
    console.log('======> adjustTiv ok : ');
    // console.log(data)
    // const newFileId = data['file_id'];
    if (newFileId !== undefined) {
      this.store.dispatch(new ActionUpdateFileId({fileId: newFileId}))
      this.store.dispatch(new ActionUpdateOldFileId({oldFileId: newFileId}))
    }

      this.resetCalculTiv();
      this.resetSelectedRows();
      this.updateCsMetadata(this.jobId);
      // this.updateCheck(fileData, selectedSheet)
      // this.getUpdateCheckAfterCalculTiv(newFileId, fileData);
      // this.updateExposures(selfLink);
      this.getUpdateExposuresAfterCalculTiv(newFileId, fileData);
    }, err => {
      this.notif.error('Calcul TIV failed');
      this.resetCalculTiv();
    });

  }

  resetSelectedRows() {
    this.rowsSelected = 0;
    this.isRowsSelected = false;
  }

  getUpdateExposuresAfterCalculTiv(newFileId, fileData) {
    this.cleansingService.getUpdateExposuresAfterCalculTiv(newFileId, fileData).subscribe((data) => {
      if (data) {
        this.exposureOriginal = data;
        const exposureTemp = data['exposures'];
        this.pageLast = data['last_page'];
        this.pageFirst = data['first_page'];
        this.currentPage = data['current_page'];

        if (data['abolute_index']) {
          this.indexRowsLoaded = data['abolute_index'];
        }
        else {
          this.indexRowsLoaded = data['index'];
        }

        this.oldDataNewPage = data['exposures'];
        this.exposuresLoaded = exposureTemp;

        this.store.dispatch(new ActionLoadAllData({ data: data }));
      }
    }, err => console.log('Error for update calcul tiv'));
  }

  public getUpdateCheckAfterCalculTiv(newFileId, fileData) {
    this.cleansingService.getUpdateCheckAfterCalculTiv(newFileId, fileData).subscribe((data) => {
      if (data) {
        this.datachecksLoaded = data;
        // this.store.dispatch(new ActionLoadErrors({ errors: data }));
      }
    })
  }

  // //#start
  updateAllComplete() {
    for (let t = 0; t < this.task.length; t++) {
      const element = this.task[t];
      this.allComplete = this.task[t].subtask != null && this.task[t].subtask.every(t => t.checked);
    }
    // this.valide(this.task);
  }

  someComplete(): boolean {
    for (let tsk = 0; tsk < this.task.length; tsk++) {
      if (this.task[tsk].subtask == null) {
        return this.task[tsk].checked && !this.allComplete;
        // return false;
      }
      return this.task[tsk].subtask.filter(t => t.checked).length > 0 && !this.allComplete;
    }
  }

  setAll(checked: boolean, checkedIndex: number) {
    if (this.task[checkedIndex].checked) {
      this.task[checkedIndex].checked = false;
      checked = false;
    }
    else {
      this.task[checkedIndex].checked = true;
      checked = true;
    }
      if (this.task[checkedIndex].subtask == null) {
            return;
          }
          if (this.task[checkedIndex].subtask.length > 0) {
            this.task[checkedIndex].subtask.forEach(t => t.checked = checked);
          }
          // this.valide(this.task);
    // this.valide();
  }

  setAllTree(checked: boolean) {
    for (let tsk = 0; tsk < this.task.length; tsk++) {
      this.allComplete = checked;
      this.task[tsk].checked = checked
          if (this.task[tsk].subtask == null) {
            return;
          }
          this.task[tsk].subtask.forEach(t => t.checked = checked);
    }
    // this.valide(this.task);
  }

  transformForManageColumn(headers) {
    const outPut = [];
    const categories = this.getCategories(headers);

    for (let i = 0; i < categories.length; i++) {
      const subtask = [];
      const cat = categories[i];
      for (let j = 0; j < headers.length; j++) {
        const hed = headers[j];
        if (cat === hed['categoryName']) {
          subtask.push({
            name: hed['fieldName'],
            code: hed['fieldCode'],
            checked: true
          })
        }

      }
      outPut.push({
        name: cat,
        code: cat,
        checked: true,
        subtask: subtask
      });
    }
    return outPut;
  }

  getCategories(headers) {
    const categories = [];
    for (let i = 0; i < headers.length; i++) {
      const elmt = headers[i];
      if (!categories.includes(elmt['categoryName'])) {
        categories.push(elmt['categoryName'])
      }
    }
    return categories;
  }

  getDisplayedColumns(colState) {
    const displayedCol = [];
    const hideCol = [];
    for (let i = 0; i < colState.length; i++) {
      const elmtName = colState[i]['colId'];
      const elmtState = colState[i]['hide'];
      if (elmtState) {
        hideCol.push(elmtName)
      }
      else {
        displayedCol.push(this.getInverseColId(elmtName))
      }
    }
    return {displayedCol, hideCol};
  }
  // #end
}

function getFilter(listsFilteredColumn, fieldCode) {
  let defaultFilter = 'defaultFilterComponent';
  /* if (fieldCode === 'division') {
    defaultFilter = 'divisionFilterComponent';
  } */
  /* if (fieldCode === 'tiv_amount') {
    defaultFilter = 'tivFilterComponent';
  } */
  if (listsFilteredColumn.includes(fieldCode)/*  && fieldCode !== 'division' */) {
    defaultFilter = 'defaultFilteredQuickSearchComponent';
  }
  return defaultFilter;
}

function  isIndexInError(listError, nrows, childIndex) {
  // const nrows = 50;
  const errorIndexRelative = [];
  for (let i = 0; i < nrows; i++) {
   /* if (listError.includes(listError[0] + i)) {
      errorIndexRelative.push(i);
    } */
    if (listError.includes(i)) {
      errorIndexRelative.push(i);
    }
  }
  if (errorIndexRelative.includes(childIndex)) {
    return true;
   }
  return false;
 }

function comparateObject(obj, list) {
  for (const [key, value] of Object.entries(list)) {
    if (JSON.stringify(value) === JSON.stringify(obj)) {
      return true;
    }
  }
  return false;
}

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

function isDefined(elements) {
  let isDef = false;
  if (elements !== undefined && elements !== null && elements !== '' && elements !== {}) {
    isDef = true;
  }
  return isDef;
}

function sortBy(items) {
    let itemsSorted;
    if (items === undefined) {
      itemsSorted = [];
    }
    else {
      itemsSorted = items.slice().sort((a, b) => a > b ? 1 : -1)
    }
    return itemsSorted;
  }

function mapElementToSpecifiqueObj(countryStates, selectedCountry) {
  const elements = countryStates[selectedCountry];
  const elementsNameList = [];
  const elementsCodeList = [];
  const elementsNameCode = {};
  const elementsCodeName = {};
  if (elements) {
    for (let i = 0; i < elements.length; i++) {
      elementsNameList.push((elements[i])['name']);
      elementsCodeList.push((elements[i])['code']);
      elementsNameCode[(elements[i])['name']] = (elements[i])['code'];
      elementsCodeName[(elements[i])['code']] = (elements[i])['name'];
    }
  }

  return {
    elementsNameList: elementsNameList,
    elementsCodeList: elementsCodeList,
    elementsNameCode: elementsNameCode,
    elementsCodeName: elementsCodeName
  }
}

function numberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function numberFormatter(params) {
  const columnWithNumber = ['tiv_amount', 'machinery_value', 'content_value', 'pd_value', 'bi_value', 'building_value', 'stock_value'];

  if (columnWithNumber.includes(params.colDef.field)) {
    if (params.value !== null && params.value !== undefined) {
      return numberWithCommas(params.value);
    }
    return null;
  }
  return params.value;
}

function isErrorInRow(linesWithErrors, index) {
  return linesWithErrors.includes(index);
}

function countryCellRenderer(params) {
  let val = params.value;
  if (val !== undefined && countrySpecific(params.value) !== undefined) {
    val = countrySpecific(params.value)
    return `<img border='0' width='15' height='14' style='margin-bottom: 2px; margin-left: -7px; margin-right: 5px' src='assets/images/flags/${countryFlagName(val)}.png' /><span>${val}</span>`;
  }
  else {
    return null;
  }
}
function countryCellRendererDrowpdown(params) {
  let val = params.value;
  if (val !== undefined && countrySpecific(params.value) !== undefined) {
    val = countrySpecific(params.value)
    return `<img border='0' width='15' height='14' style='margin-bottom: 2px; margin-left: -7px; margin-right: 5px' src='assets/images/flags/${countryFlagName(val)}.png' /><span><img src="assets/icons/sort-down.png" alt="image" style = "width: 10px; float: right; margin-top: 7px;" />${val}</span>`;
  }
  else {
    return null;
  }
}
function countryFlagName(country) {
    return country.split(' ').join('-');
}
function countrySpecific(country) {
  switch (country) {
    case 'Cura�ao':
      return country = 'Curacao'
    case 'Saint Barth�lemy':
      return country = 'Saint Barthelemy'
    case '�land Islands':
      return country = 'Aland Islands'
    default:
      return country;
}
}
