import {CustomizedSharedGridService} from './../customized-shared-location-grid/customized-grid-buttons.service';
import {CustomizedSharedLocationGridComponent} from './../customized-shared-location-grid/customized-shared-location-grid.component'
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
import {GridLineInfo} from '../customized-shared-location-grid/GridLineInfo';
import {Observable, of} from 'rxjs';
import {MappingTargetItem} from '@app/dcm/modules/upload/models/mapping/mapping-target.model';
import {selectMappingTarget} from '@app/dcm/modules/upload/store/mapping/mapping.selectors';
import {Store} from '@ngrx/store';
import {AppState, NotificationService} from '@app/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FileImportService} from '@app/dcm/modules/upload/services/file-import.service';
import {
  selectCleansingData,
  selectCleansingErrors,
  selectCleansingLoading
} from '@app/dcm/modules/upload/store/cleansing/cleansing.selectors';
import {ActionLoadAllData, ActionSelectedRows} from '@app/dcm/modules/upload/store/cleansing/cleansing.actions';
import {KeyboardShortcutsService} from 'ng-keyboard-shortcuts';
import {DOCUMENT} from '@angular/common';

declare var $: any;

@Component({
  selector: 'anms-shared-location-grid',
  templateUrl: './shared-location-grid.component.html',
  styleUrls: ['./shared-location-grid.component.scss'],
  providers: [KeyboardShortcutsService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SharedLocationGridComponent implements OnInit, AfterViewInit {
  target = this.element.nativeElement.querySelector('#div-grid');
  math = Math;

  previousState = null;
  selectAllCheckbox = false;
  isVisible = false;
  fakeRowData = null;
  requiredFormControls: FormControl[] = [];
  laoding$: Observable<boolean>;
  allRowCheck = [];
  lastState: any = null;
  @Input() editable = false;
  @Input() loading = false;
  @Input() errorsInfo$: Observable<any> = new Observable<any>();
  target$: Observable<MappingTargetItem[]>;
  myGroup = new FormGroup({});
  /*

    @Input('rowData') set _rowData(val) {
      this.rowData = val
    }
  */

  /*  @Input('columnDefs') set _columnDefs(val) {
      this.rowData = val
    }*/

    

  errors: any = {};
  @Input() prefix = '';

  @Output() editLocationButtonClick = new EventEmitter<GridLineInfo>();
  @Output() deleteLocationButtonClick = new EventEmitter<GridLineInfo>();
  @Output() geocodeLocationButtonClick = new EventEmitter<GridLineInfo>();
  @Output() cellEdited = new EventEmitter<GridLineInfo>();
  // @Output() allData = new EventEmitter<GridLineInfo>();

  isVisibleRestor = false;
  isOkLoadingRestor = false;
  public rowData: any[] = [];
  public columnDefs;
  public gridApi;
  public gridColumnApi;
  public rowSelection;
  public defaultColDef;
  _numberOfSelectedRows = 0;
  public displayedColumns = [];
  public groups: any[] = [];
  public columns: any[] = [];
  public columnsShow: any[] = [];
  public frozenColumns: any = [];
  paginatorNumber: number;
  // FOR EDIT MODE
  public editCache: any = null;
  public columnDef;
  public rowDat;

  constructor(public service: CustomizedSharedGridService, private store$: Store<AppState>, private cdrf: ChangeDetectorRef,
              private fileImportService: FileImportService, private keyboard: KeyboardShortcutsService, private element: ElementRef
    , private notif: NotificationService, @Inject(DOCUMENT) private document: Document) {

      // mei2
      /**/ this.columnDef = [
        {headerName: 'Make', field: 'make' },
        {headerName: 'Model', field: 'model' },
        {headerName: 'Price', field: 'price'}
    ];
  
    this.rowDat = [
        { make: 'Toyota', model: 'Celica', price: 35000 },
        { make: 'Ford', model: 'Mondeo', price: 32000 },
        { make: 'Porsche', model: 'Boxter', price: 72000 }
    ]; 

    this.target$ = this.store$.select(selectMappingTarget);
    this.store$.select(selectCleansingData).subscribe(data => {
      this.rowData = JSON.parse(JSON.stringify(data));
      this.fakeRowData = JSON.parse(JSON.stringify(data));

    }, () => {
    }, () => {
      this.cdrf.detectChanges();
    });

    this.store$.select(selectCleansingErrors).subscribe(data => {
      this.errors = JSON.parse(JSON.stringify(data))
    }, () => {
    }, () => {
      this.cdrf.detectChanges();
    });
    this.laoding$ = store$.select(selectCleansingLoading);

    service.getEditsObserver().subscribe((info: GridLineInfo) => {
      this.editLocationButtonClick.emit(info);
    });
    service.getDeletesObserver().subscribe((info: GridLineInfo) => this.deleteLocationButtonClick.emit(info));
    service.getGeocodeObserver().subscribe((info: GridLineInfo) => this.geocodeLocationButtonClick.emit(info));

    /*
        this.store$.select(selectCleansingData).subscribe(errors => this.rowData = data);
    */
    this.keyboard.add([
      {
        key: 'ctrl z',
        command: () => this.showModalRestor()
      }, {
        key: 'ctrl y',
        command: () => this.restorChanges()
      }, {
        key: 'ctrl shift s',
        command: () => this.saveChanges()
      }
    ]);
  }

  showControls() {
  }

  ngOnInit() {
    this.paginatorNumber = 30;
    // ++++++++++++++++++++++++++++++++++++++++++ mei2 (ok)
    this.columnDefs = [
      {
        headerName: 'Site',
        scrollable: false,
        children: [
          {
            headerName: 'Name',
            field: this.prefix + 'locationName',
            width: 170,
            editable: this.editable,
            expanded: false
          },
          {
            headerName: 'Division',
            field: this.prefix + 'division',
            width: 170,
            editable: this.editable,
            expanded: false
          }
        ]
      },
      {
        headerName: 'Geographical',
        scrollable: true,
        collapsable: true,
        children: [
          {
            headerName: 'Country',
            field: this.prefix + 'country',
            expanded: false
          },

          {
            headerName: 'State',
            field: this.prefix + 'state',
            expanded: true
          },

          {
            headerName: 'County',
            field: this.prefix + 'county',
            expanded: true
          },

          {
            headerName: 'City',
            field: this.prefix + 'city',
            expanded: true
          },

          {
            headerName: 'Street',
            field: this.prefix + 'street',
            expanded: true
          },

          {
            headerName: 'ZipCode',
            field: this.prefix + 'zipCode',
            expanded: true
          },

          {
            headerName: 'OriginalAddress',
            field: this.prefix + 'originalAddress',
            expanded: true
          },

          {
            headerName: 'Latitude',
            field: this.prefix + 'latitude',
            expanded: true
          },

          {
            headerName: 'Longitude',
            field: this.prefix + 'longitude',
            expanded: true
          },

          {
            headerName: 'Accuracy',
            field: this.prefix + 'accuracy',
            expanded: false
          },

          {
            headerName: 'Geocode',
            field: this.prefix + 'geocode',
            expanded: true
          },

          {
            headerName: 'Geocoder',
            field: this.prefix + 'geocoder',
            expanded: true
          },

          {
            headerName: 'GeocodingValidated',
            field: this.prefix + 'geocodingValidated',
            expanded: true

          }
        ]
      },
      {
        headerName: 'Insured Values',
        scrollable: true,
        collapsable: true,
        children: [
          {
            headerName: 'SiteCurrency',
            field: this.prefix + 'siteCurrency',
            expanded: false
          },
          {
            headerName: 'Tiv',
            field: this.prefix + 'tiv',
            expanded: false
          },
          {
            headerName: 'Building',
            field: this.prefix + 'building',
            expanded: true
          },
          {
            headerName: 'Stock',
            field: this.prefix + 'stock',
            expanded: true
          },
          {
            headerName: 'Machinery',
            field: this.prefix + 'machinery',
            expanded: true
          },
          {
            headerName: 'Content',
            field: this.prefix + 'content',
            expanded: true
          },
          {
            headerName: 'PbValue',
            field: this.prefix + 'pbValue',
            expanded: true
          },
          {
            headerName: 'BiType',
            field: this.prefix + 'biType',
            expanded: true
          },
          {
            headerName: 'Eip',
            field: this.prefix + 'eip',
            expanded: true
          },
          {
            headerName: 'DeclarationPeriod',
            field: this.prefix + 'declarationPeriod',
            expanded: true
          },
          {
            headerName: 'BiValue',
            field: this.prefix + 'biValue',
            expanded: true
          },
          {
            headerName: 'ForInterest',
            field: this.prefix + 'forInterest',
            expanded: true
          },
          {
            headerName: 'Interest',
            field: this.prefix + 'interest',
            expanded: true
          },
        ]
      },
      {
        headerName: 'Primary Characteristics',
        scrollable: true,
        collapsable: true,
        children: [
          {headerName: 'OccupancySource', field: 'occupancySource', expanded: false},
          {headerName: 'OccupancyClass', field: 'occupancyClass', expanded: true},
          {headerName: 'OccupancySubClass', field: 'occupancySubClass', expanded: true},
          {headerName: 'OccupancyCode', field: 'occupancyCode', expanded: false},
          {headerName: 'OccupancyScheme', field: 'occupancyScheme', expanded: true},
          {headerName: 'ConstructionSource', field: 'constructionSource', expanded: false},
          {headerName: 'ConstructionClass', field: 'constructionClass', expanded: true},
          {headerName: 'ConstructionCode', field: 'constructionCode', expanded: false},
          {headerName: 'ConstructionScheme', field: 'constructionScheme', expanded: true},
        ]
      },
      {
        headerName: 'Secondary Characteristics',
        scrollable: true,
        collapsable: true,
        children: [
          {headerName: 'YearBuilt', field: 'yearBuilt', expanded: false},
          {headerName: 'NumberOfStories', field: 'numberOfStories', expanded: true},
          {headerName: 'LargestUnitCapacity', field: 'largestUnitCapacity', expanded: true},
          {headerName: 'IsAggregation', field: 'isAggregation', expanded: true},
          {headerName: 'NumberOfBuilding', field: 'numberOfBuilding', expanded: false},
        ]
      }
    ]
    // ++++++++++++++++++++++++++++++++++++++++++ mef2 (ok)

    if (this.editable) {
      this.columnDefs = [
        {
          headerName: '', field: 'select_box', headerCheckboxSelection: true, width: '30px', scrollable: true,
          headerCheckboxSelectionFilteredOnly: true, checkboxSelection: true,
          // filter:"false"
        },
        {
          headerName: '', field: 'edit_buttons', width: '90px', filter: 'false', scrollable: true,
          cellRendererFramework: (this.editable) ? CustomizedSharedLocationGridComponent : null,
          // filter:"false"
          // cellRenderer: "customizedFilterCell",
        }].concat(this.columnDefs)
    }

    this.rowSelection = 'multiple';
    this.defaultColDef = {};
    this.colsExpandByGroup(this.columnDefs);
    if (this.rowData)
    this.allRowCheck = Array(this.rowData.length).fill(false);

  }


  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    params.api.sizeColumnsToFit();
  }

  clear() {
    this.gridApi.setRowData([]);
  }


  onRemoveSelected() {

    const selectedData = this.gridApi.getSelectedRows();
    selectedData.map((rowToDelete) => {
      // console.log(rowToDelete)
    });
    const res = this.gridApi.updateRowData({remove: selectedData});

  }

  rowsSelected() {
    return this.gridApi && this.gridApi.getSelectedRows().length > 0;
  }

  onBtExport() {
    const params = {};
    this.gridApi.exportDataAsCsv(params);
  }

  /*setrows(){

    this.http.get("http://localhost:5050/locations").subscribe(data=>{
       this.rowData=data;})

  }*/

  onCellValueChanged(params: any) {
  }

  finishEdit(field, row): void {
    let tabledata = [];
    this.store$.select(selectCleansingData).subscribe(data => tabledata = JSON.parse(JSON.stringify(data)));
    tabledata.forEach(data => {

      if (data['Id'] === row.Id) {
        Object.keys(row).forEach(e => {
          if (e !== 'id') {
            data[e] = row[e];
          }
        });
      }
    });
    this.store$.dispatch(new ActionLoadAllData({data: tabledata}));
    this.cdrf.detectChanges();
  }

  updateChache(value) {
    this.editCache = value;
    /*
        console.log('START EDITING', value);
    */

  }

  exitEdit() {
    this.editCache = {}
  }

  getScrollHeight() {
    return '100%'
  }

  isColumnInError(data: any, field: string, headerName, fieldName) {
    return this.errors && this.errors[data.Id] && this.errors[data.Id][field]
  }

  calculGroupColSpan(group) {
    let colSpan = 0;
    group.children.forEach(child => {
      if (!child.expanded) {
        colSpan++;
      }
    });
    return colSpan;
  }

  colsExpandByGroup(columnDefs) {
    this.columns = [];
    this.frozenColumns = [];
    this.groups = columnDefs.map(colDef => (
      {
        headerName: colDef.headerName,
        scrollable: colDef.scrollable,
        field: colDef.field,
        rowspan: (colDef.children) ? 1 : 2,
        colspan: (colDef.children) ? this.calculGroupColSpan(colDef) : 1,
        children: (colDef.children) ? colDef.children : [],
        width: colDef.width
      }
    ));

    this.groups.forEach(g => {
      const displayedChildren = g.children.map(child => ({
        headerName: child.headerName,
        field: child.field,
        width: '150px',
        expanded: child.expanded
      }));

      if (displayedChildren.length > 0) {
        displayedChildren.forEach(col => {
          if (!col.expanded) {
            // (g.scrollable) ? this.columns.push(col) : this.frozenColumns.push(col);
            this.columns.push(col);
          }
        });
      }
      /*
            this.columns = this.columns.concat(displayedChildren)
      */
      else {
        // this.frozenColumns.push({ignoreColumn: true, field: g.field, width: g.width || '50px'})
        this.columns.push({ignoreColumn: true, field: g.field, width: g.width || '50px'})
      }
    });

  }

  collapseGroupItems(group) {
    /*
        console.log(this.columnDefs);
    */
    const colDef = JSON.parse(JSON.stringify(this.columnDefs));
    colDef.forEach((grp, index) => {
      if (grp.children !== undefined && index === group) {
        grp.collapsable = false;
        this.columnDefs[index] = grp;
        const grpTemp: any = JSON.parse(JSON.stringify(grp));
        grp.children.forEach((element, ind) => {
          const elementTmp = JSON.parse(JSON.stringify(element));
          if (elementTmp.expanded) {
            elementTmp.expanded = false;
            grpTemp.children.push(elementTmp)
          }
        });
        colDef[index] = grpTemp;
      } else {
        if (this.lastState) {
          colDef[index] = Object.assign({}, this.lastState[index]);
        }
      }
    });
    this.lastState = colDef;
    this.colsExpandByGroup(colDef);
  }

  CollapseUncollapseGroup(group) {
    if (this.columnDefs[group].collapsable) {
      this.collapseGroupItems(group);
    } else {

      /*      console.log('echeant')
            console.log(this.columnDefs)
            this.colsExpandByGroup(this.columnDefs);*/
      this.collapseCollumns(group);
    }
  }

  collapseCollumns(group) {
    const colDef = JSON.parse(JSON.stringify(this.columnDefs));
    colDef.forEach((grp, index) => {
      if (grp.children !== undefined && index === group) {
        grp.collapsable = !grp.collapsable;
        this.columnDefs[index] = grp;
        const grpTemp: any = JSON.parse(JSON.stringify(grp));
        grp.children.forEach((element, ind) => {
          const elementTmp = JSON.parse(JSON.stringify(element));

          elementTmp.expanded = true;
          grpTemp.children.push(elementTmp)
        });
        colDef[index] = grpTemp;
      } else {
        if (this.lastState) {
          colDef[index] = Object.assign({}, this.lastState[index]);
        }
      }
    });
    this.lastState = colDef;
    this.colsExpandByGroup(colDef);
  }

  collapseGroupExpanded(group) {
    this.columns.forEach((element, index) => {
      this.columnDefs[group].children.forEach(item => {
        if (item.field === element.field) {
          this.columns[index].expanded = item.expanded;
        }
      })
    })
  }

  groupState(group) {
    return this.columnDefs[group].collapsable;
  }

  returnFieldFormat(field) {
    let format = 'string';
    this.target$.subscribe(data => {
      data.forEach(elem => {
        if (elem.property.toLowerCase() === field.toLowerCase()) {
          format = elem.format
        }
      })
    });
    return format;
  }

  checkEditable(field) {
    /*
        console.log('###################### => ', this.columns);
    */
    /*
        console.log(col);
    */
    let editable = false;
    this.target$.subscribe(data => {
      data.forEach(elem => {
        if (elem.property.toLowerCase() === field.toLowerCase() || (elem.property.toLowerCase() === 'locationname'
          && field.toLowerCase() === 'name')) {
          editable = elem.editable
        }
      })
    });
    return editable;
  }

  createFormControl(name, value?) {
    this.myGroup.addControl(name, new FormControl([''], Validators.required));
    return name;
    /*
        console.log('######################### added')
    */
  }

  checkMandatory(field, value) {
    let mandatory = false;
    this.target$.subscribe(data => {
      data.forEach(elem => {
        console.log('================================== (chekMandatory) => ')
        if ((elem.property.toLowerCase() === 'locationname' && field.toLowerCase() === 'name') && (value === '' || value === null)) {
          mandatory = true;
        }
        if ((elem.property.toLowerCase() === field.toLowerCase() && elem.mandatory === true && (value === '' || value === null))) {
          mandatory = true;
        }

      })
    });
    return mandatory;
  }

  _blur(col, data, value) {
    // TODO PRENDRE EN CONSIDERATION LE FORMAT DMS

    const pattern = /^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/;

    if (!pattern.test(value)) {
      this.errors[data.Id]['target_latitude'] = 'Invalid format, expected number';
      return true;
    }
    return false;
  }

  _blur_longitude(col, data, value) {
    // TODO PRENDRE EN CONSIDERATION LE FORMAT DMS
    const pattern = /^(\|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$/;

    if (!pattern.test(value)) {
      event.preventDefault();
    }
  }

  _keyUp(event: any, col, data, value) {
    /* console.log(event)
     if (this.rowData[data.Id][col.field].length === 2) {
       this.rowData[data.Id][col.field] = parseFloat(this.rowData[data.Id][col.field]).toFixed(2)
     } */
  }

  _keyPress(event: any, col, data, value) {
    /*    if (this.rowData[data.Id][col.field].length === 2) {
          this.rowData[data.Id][col.field] = parseFloat(this.rowData[data.Id][col.field]).toFixed(2)
        }

        const pattern = /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/;
        const inputChar = String.fromCharCode(event.charCode);
        console.log('test')
        if (!pattern.test(inputChar)) {
          // invalid character, prevent input
          event.preventDefault();
        }*/
  }

  updateNumber(e, col, data) {
    this.rowData[data.Id][col.field] = e;
  }

  isInComlumnsRows(column) {
    let columnToReturn = 'other';
    const arrayOfClumns = ['Latitude', 'Longitude', 'Content', 'Stock', 'Machinery', 'PbValue', 'BiValue', 'Name'];
    arrayOfClumns.forEach(elem => {
      if (column === elem) {
        columnToReturn = column
      }
    });
    return columnToReturn;
  }

  calculContent(data) {
    let machinery = 0;
    let stock = 0;
    if (this.rowData[data.Id]['target_machinery'] !== '') {
      machinery = parseFloat(this.rowData[data.Id]['target_machinery']);
    }
    if (this.rowData[data.Id]['target_stock'] !== '') {
      stock = parseFloat(this.rowData[data.Id]['target_stock']);
    }
    this.rowData[data.Id]['target_content'] = machinery + stock;
    this.cdrf.detectChanges();
  }

  calculPdValue(data) {
    console.log(data);
    let content = 0;
    let building = 0;
    if (this.rowData[data.Id]['target_content'] !== '') {
      content = parseFloat(this.rowData[data.Id]['target_content']);
    }
    if (this.rowData[data.Id]['target_building'] !== '') {
      building = parseFloat(this.rowData[data.Id]['target_building']);
    }
    this.rowData[data.Id]['target_pbValue'] = content + building;
    this.cdrf.detectChanges();
  }

  calculTiv(data) {
    if (this.rowData[data.Id]['target_biValue'] === '' && this.rowData[data.Id]['target_pbValue'] === '') {
      return;
    }
    let pbValue = 0;
    let stock = 0;
    if (this.rowData[data.Id]['target_pbValue'] !== '') {
      pbValue = parseFloat(this.rowData[data.Id]['target_pbValue']);
    }
    if (this.rowData[data.Id]['target_biValue'] !== '') {
      stock = parseFloat(this.rowData[data.Id]['target_biValue']);
    }
    this.rowData[data.Id]['target_tiv'] = pbValue + stock;
    this.cdrf.detectChanges();
  }

  modifyRow(row) {
    const columns = [];
    const rowsValues = [];
    Object.keys(row).forEach((col, i) => {
      if (i !== 0) {
        columns.push(col.split('target_')[1]);
        rowsValues.push(row[col]);
      }
    });
    this.fileImportService.modifyRow({
      columns: columns,
      rows: [{
        values: rowsValues,
        x: row.Id
      }]
    }).subscribe(
      data => {
        const j = JSON.parse(data.toString());
        j.errors = JSON.parse(j.errors);
        const copy = [];
        j.errors.forEach(elem => {
          copy[elem.column] = elem.error
        });
        this.errors[j.Id] = copy;

      },
      () => {
      },
      () => {
        this.cdrf.detectChanges();
      }
    );
  }

  // mei2 important
  dataAsObservable(data) {
    return of(data);
  }


  handleKeyDown(event: any, data, column, index?) {
    const x = Object.assign({}, data);
    if (event.keyCode === 9) {
      this.modifyRow(x);
      this.rowData[0] = x;
    } else if (event.keyCode === 38) {
      this.modifyRow(x);
      $(this.returnId(data.Id - 1, column, ' p-cellEditor'))[0].click();
    } else if (event.keyCode === 39) {
      this.modifyRow(x);
      $(this.returnId(data.Id, this.columns[this.returnColumnIndex(column) + 1].headerName, ' p-cellEditor'))[0].click();
    } else if (event.keyCode === 37) {
      this.modifyRow(x);
      $(this.returnId(data.Id, this.columns[this.returnColumnIndex(column) - 1].headerName, ' p-cellEditor'))[0].click();
    } else if (event.keyCode === 40) {
      this.modifyRow(x);
      $(this.returnId(data.Id + 1, column, ' p-cellEditor'))[0].click();
    } else if (event.keyCode === 13) {
    }
  }

  onFilter() {
    this.cdrf.detectChanges();
  }

  test(data) {
  }

  // TargetOB
  selectAllChanged(dt) {
    if (!this.selectAllCheckbox) {
      this.allRowCheck = this.allRowCheck.slice().fill(false, 0, this.allRowCheck.length)
    } else {
      const data = dt.filteredValue ? dt.filteredValue : this.allRowCheck;
      this.allRowCheck = this.allRowCheck.slice().fill(true, 0, data.length)
    }
    // this.selectAllCheckbox = !this.selectAllCheckbox;
    this.store$.dispatch(new ActionSelectedRows({selectedRows: this.allRowCheck}));
    this.cdrf.detectChanges();
    this.getNbrOfCheckedRows();
  }

  ngAfterViewInit() {
  }


  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  rowSelectedChange(index) {
    this.allRowCheck[index] = !this.allRowCheck[index];
    this.store$.dispatch(new ActionSelectedRows({selectedRows: this.allRowCheck}));
    this.getNbrOfCheckedRows();
  }

  applyToAll($event, dt) {
    if (this.errors[$event.data.data.Id][$event.data.column] === undefined) {
      const data = dt.filteredValue ? dt.filteredValue : this.rowData;
      data.forEach((element, index) => {
        if (this.allRowCheck[index]) {
          data[index][$event.data.column] = $event.data.data[$event.data.column];
          this.modifyRow(data[index]);
        }
      });

    } else {
      this.notif.error('The value of ' + $event.data.column.split('target_')[1] + ' in row ' + $event.data.data.Id + ' must be valid to propagate')
    }
    /* console.log(this.rowData)
     console.log($event)*/
    this.cdrf.detectChanges();
  }

  showModalRestor(): void {
    this.isVisibleRestor = true;
    this.cdrf.detectChanges();
  }

  handleOkRestor(): void {
    this.previousState = JSON.parse(JSON.stringify(this.rowData))
    this.store$.dispatch(new ActionLoadAllData({data: this.fakeRowData}));
    this.isOkLoadingRestor = true;
    window.setTimeout(() => {
    }, 4000);
    this.isVisibleRestor = false;
    this.isOkLoadingRestor = false;
    this.cdrf.detectChanges();
  }

  handleCancelRestor(): void {
    this.isVisibleRestor = false;
  }

  saveChanges() {
    this.notif.success('Changes Saved Successfully');
  }

  restorChanges() {
    this.store$.dispatch(new ActionLoadAllData({data: this.previousState}));
  }

  returnId(index, columnFiled, pEditor?) {
    let temp = '';
    if (pEditor !== undefined) {
      temp = pEditor;
    }
    return '#' + columnFiled + index + temp;
  }

  trackByFunction = (index, item) => {
    return index // O index
  }

  returnColumnIndex(columnHeader) {
    let index = 0;
    this.columns.forEach((element, indx) => {
      if (element.headerName === columnHeader) {
        index = indx;
      }
    });
    return index;
  }

  showPtable(data) {
    console.log('data', data);
  }

  getNbrOfCheckedRows() {
    let counter = 0;
    this.allRowCheck.forEach(val => {
      if (val === true) {
        counter++;
      }
    });
    this._numberOfSelectedRows = counter;
  }


}
