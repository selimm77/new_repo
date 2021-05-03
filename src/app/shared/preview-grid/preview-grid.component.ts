
import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output, SimpleChanges, OnChanges, ViewChild, AfterViewInit } from '@angular/core';
import {Observable, of, BehaviorSubject, forkJoin} from 'rxjs';
import { Module, AllCommunityModules } from '@ag-grid-community/all-modules';
import { ImportContainerComponent } from '@app/dcm/modules/upload/containers/import-container/import-container.component';
import { FileImportService } from '@app/dcm/modules/upload/services/file-import.service';
import { Store } from '@ngrx/store';
import { AppState } from '@app/core';
import { ActionGetDataImported, ActionUpdateFileData } from '@app/dcm/modules/upload/store/import/import.actions';
import { GridOptions } from 'ag-grid-community';
import { selectOldUpload } from '@app/dcm/modules/upload/store/cleansing/cleansing.selectors';
import { UploadData } from '@app/dcm/modules/upload/store/cleansing/cleansing.model';
import { selectFileData, selectImportObjectState } from '@app/dcm/modules/upload/store/import/import.selectors';

@Component({
  selector: 'anms-preview-grid',
  templateUrl: './preview-grid.component.html',
  styleUrls: ['./preview-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PreviewGridComponent implements OnInit, OnChanges {

  @Input() loading = false;
  @Input() headers = [];
  @Input() rowData = [];
  @Input() totalRecords = 0;
  @Input() numberOfRecords = 0;
  @Input() nrows = 0;
  @Input() selectedSheet = 1;


  @Output() newData = new EventEmitter<any>();
  @Output() newNrows = new EventEmitter<any>();
  @Output() lazyload = new EventEmitter<any>();
  @Output() sizePageChanged = new EventEmitter<any>();
  @Output() goToLastPage = new EventEmitter<any>();

  rowClickedValue = '';
  public gridApi;
  public gridColumnApi;
  public rowsData;
  public dataLoaded;
  public columnDefs;
  public defaultColDef;
  public lastRowLoaded = 0;
  public newRows;
  public oldRow;
  public fileMetaData;
  public fileData;
  public fileImported;
  public gridOptions: GridOptions;
  public isFirstLoaded = true;
  public rowBuffer;
  public rowSelection;
  public components;
  public oldRowIndex;
  public newRowIndex;
  public indicesRow = [];
  public newValueTemp;
  public indexRowTemp;
  public contentsTemp = {};
  public indexRowToSave = [];
  public contents = [];
  public newRowsData;

  public rowIdFocused;
  public colIdFocused;
  public colFocused;
  public colRangeFocused;

  public pageLast;
  public indexRowsLoaded;
  public pageFirst = 1;
  public currentPage;
  public pageLoaded;
  public totalRows;

  public allImportedResponse;
  public loadingCellRenderer;
  public loadingCellRendererParams;
// public modules: Module[] = AllModules;
  public modules: Module[] = AllCommunityModules;
  public data$: BehaviorSubject<any[]> = new BehaviorSubject([])
  public headerLoaded;
  public paginationPageSize;
  public sideBar: false;
  oldUpload$: Observable<UploadData>;
  oldUpload

  constructor(private importContainer: ImportContainerComponent,
    private importService: FileImportService,
    private store$: Store<AppState>
    ) {
    this.oldUpload$ = store$.select(selectOldUpload);

    this.gridOptions = <GridOptions>{};

    this.defaultColDef = {
        resizable: true,
        sortable: true,
        editable: true,
        scrollable: true,
        paginator: true,
        width: 100,
        filter: 'agTextColumnFilter',
        cellStyle: {'border-left': '1px solid #cdcdce'},
        
    };
    this.loadingCellRenderer = 'customLoadingCellRenderer';
    this.loadingCellRendererParams = { loadingMessage: 'One moment please...'};
    
    this.paginationPageSize = 50;

    importContainer.headers$.subscribe((header) => {
      this.headerLoaded = header;
      if (this.dataLoaded && this.headerLoaded)
          this.getLoadedData();
      });
    
      this.oldUpload$.subscribe((data) => {
        if (data !== undefined && data !== null && data) {
          this.oldUpload = data;
        }
      });

    importContainer.data$.subscribe((data) => {
      this.allImportedResponse = data;
      this.dataLoaded = data['data'];
      this.indexRowsLoaded = data['index'];
      this.pageLast = data['last_page'];
      this.pageFirst = data['first_page'];
      this.currentPage = data['current_page'];
      if (this.dataLoaded && this.headerLoaded)
          this.getLoadedData();
    });
    importContainer.fileMetaData$.subscribe((data) => {
      if (data) {
        this.fileMetaData = data;
        this.paginationPageSize = data['nrows'];
        if (this.dataLoaded && this.headerLoaded)
          this.getLoadedData();
      }
    });
    importContainer.importData$.subscribe((data) => {
      this.fileImported = data;
      this.fileData = data.fileData;
      this.selectedSheet = data.selectedSheet;
      if (this.dataLoaded && this.headerLoaded)
          this.getLoadedData();
    });

    this.selectAllData(store$);

   }
   
  ngOnInit() {
     
  }

  // tst
  private selectAllData(store) {

    store.select(selectFileData).subscribe((metaData) => {
      
      if (metaData) {

        const data = metaData['document'];
  
        // headers
        this.headerLoaded = data['headers'];
        // data
        this.allImportedResponse = data;
        this.dataLoaded = data['data'];
        this.indexRowsLoaded = data['index'];
        this.pageLast = data['last_page'];
        this.pageFirst = data['first_page'];
        this.currentPage = data['current_page'];
        if (this.dataLoaded && this.headerLoaded)
          this.getLoadedData();
      }

    })

    store.select(selectImportObjectState).subscribe((data) => {
      
      if (data.importMetadata) {
        this.fileImported = data;
        this.fileData = data.fileData;
        this.selectedSheet = data.selectedSheet;
        // this.getLoadedData();
      }
  })
    
  }

  public getLoadedData() {    
    if (this.headerLoaded && this.dataLoaded) {
      this.columnDefs = this.createColumnDefs(this.headerLoaded);
      this.rowsData = this.createRowData(this.dataLoaded, this.headerLoaded);
      
      if (this.gridOptions.api && this.gridOptions.api != null) {
        
        this.gridOptions.columnDefs = this.columnDefs;
        this.gridOptions.api.setRowData(this.rowsData);
      }
      if (this.isFirstLoaded) {
        // console.log('= firt load =')
        this.firstRefresh(this.columnDefs, this.rowsData);
        this.isFirstLoaded = false;
      }
    }
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

  private createColumnDefs(headers) {
    const headersModel: any[] = [];
    for (let i = 0; i < headers.length; i++){
      headersModel.push({
        headerName: headers[i],
        field: createFieldCode(headers[i])
      })
    }
    return headersModel;
  }

  private createRowData(rowData, headers) {
    const rowDataModel: any[] = [];
    for (let i = 0; i < rowData.length; i++){
      const obj: any = {};
      for (let j = 0; j < headers.length; j++){
        obj[createFieldCode(headers[j])] = rowData[i][j];
      }
      rowDataModel.push(
          obj
        )
    }
    return rowDataModel;
  }

  public getPage(pageLoaded, totalRows, paginationPageSize) {
    this.pageFirst = 1;
    this.currentPage = pageLoaded;
    this.pageLast = Math.trunc((totalRows / paginationPageSize));
  }
  
  private onCellValueChanged($event) {
    const newValue = $event.newValue;
    const oldValue = $event.oldValue;
    const rowIndex = $event.rowIndex;
    const colId = $event.column.colId;
    const newRowData = $event.data;

    if (oldValue === newValue) {
      console.log('-- No change --')
    }
    else if (newValue === '') {
      console.log('-- change to empty value not allowed --')
    }
    else {
      console.log('-- change detected --');
      // colId = this.getExactColId(colId);
      this.newValueTemp = newValue;
      this.indexRowTemp = rowIndex;
      // this.indexRowTemp = indexRowDb;
      this.contentsTemp[colId] = newValue;
      this.newRowsData = $event.api.gridOptionsWrapper.gridOptions.rowData;
    }
  }

  private onCellFocused($event) {
    if ($event.column && ($event.rowIndex || $event.rowIndex === 0)) {
      const rowIndex = $event.rowIndex;
      const colId = $event.column.colId;
      const colDefs = $event.column.colDef;
      const data = $event.data;

      this.newRowIndex = rowIndex;

      if (this.oldRowIndex === this.newRowIndex) {
        if (this.contentsTemp && (this.indexRowTemp || this.indexRowTemp === 0)) {
          this.indexRowToSave.push(this.indexRowTemp);
          this.contents.push(this.contentsTemp);
          this.contentsTemp = {};
          this.indexRowTemp = null;
        }
        this.indexRowTemp = null;
        this.contentsTemp = {};
      }
      else {
        this.oldRowIndex = rowIndex;
        if (this.indexRowToSave.length > 0 && this.contents.length > 0) {
          const bodyRequest = {
            allNum: this.indexRowToSave,
            newValues: this.contents
          }

          this.rowIdFocused = rowIndex;
          this.colIdFocused = $event.column.getColId();

          if (this.gridOptions.api) {
            const cell = this.gridOptions.api.getFocusedCell();
            const allDisplayedCol = this.gridOptions.columnApi.getAllDisplayedColumns();
            
            if (cell && allDisplayedCol) {
              
              this.colFocused = this.getColumnToShow(this.colIdFocused, allDisplayedCol);
              this.colRangeFocused = this.getRangeColumnToShow(this.colIdFocused, allDisplayedCol);
            }
          }
          
          this.saveUpdatedRow(bodyRequest);
          this.indexRowToSave = [];
          this.contents = [];
        }
        else {
          // init all
          this.indexRowToSave = [];
          this.contents = [];
        }
      }
    }
  }

  private getColumnToShow(fieldCode, colList) {
    // console.log('= getColumnToShow =');
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
    // console.log('= getColumnToShow =');
    if (colList) {
      for (let i = 0; i < colList.length; i++) {
        if (fieldCode === colList[i]['colId'] || fieldCode === this.getExactColId(colList[i]['colId'])) {
          return i;
        }
      }
    }
    return null;
  }
  public getExactColId(colId) {
    const colId1 = colId.split('_1').slice(0, -1).join('_1');
    if (colId1) {
      colId = colId1;
    }
    return colId;
  }

  private saveUpdatedRow(bodyRequest) {
    // console.log('= saveUpdatedRow =')
    const newLines = [];
    const newNums = [];
    let request;
    request = {
      filename: this.fileMetaData.fileId
    }
    let worksheetIdSelected;
    if (this.fileMetaData.isExcel) {
      const worksheetSelected = this.fileMetaData.worksheet[this.selectedSheet];
      worksheetIdSelected = this.fileMetaData.worksheetId[worksheetSelected];
    }
    else {
      worksheetIdSelected = this.fileMetaData.worksheetId[Object.keys(this.fileMetaData.worksheetId)[0]];
    }

    const indexRowDatagrid = bodyRequest['allNum'][0];
    const indexRowAbsolute = this.getAbsoluteIndex(bodyRequest['allNum'][0], this.indexRowsLoaded)
    const oldRow = this.dataLoaded[bodyRequest['allNum'][0]];
    const newRow = this.transformObjToArray(this.newRowsData[indexRowDatagrid])
    const newData = this.getNewData(this.newRowsData)

    newLines.push(newRow);
    newNums.push(indexRowAbsolute);
    bodyRequest['lines'] = newRow;
    bodyRequest['num'] = indexRowAbsolute;
    
    this.importService.updateRow(worksheetIdSelected, bodyRequest.num, bodyRequest.lines).subscribe((data) => {

      this.store$.dispatch(new ActionGetDataImported({ data: newData }));

      this.rowsData = this.newRowsData;
      if (this.gridOptions.api) {
        this.gridOptions.api.setRowData(this.rowsData);
      }
      this.refreshAfterUpdate();
      this.bringFocusBack();
    })
  }

  getAbsoluteIndex(indexInDatagrid, rowIndexDb) {
    for (let i = 0; i < rowIndexDb.length; i++) {
      if (indexInDatagrid === i) {
        return rowIndexDb[i];
      }
    }
    return null;
  }
  refreshAfterUpdate() {
    const params = { force: true };
    if (this.gridApi && this.rowsData) {
      this.gridApi.refreshCells(params);
    }
    this.bringFocusBack();
  }

  public getInverseColId(colId) {
    const colId1 = colId.split('_1').slice(0, -1).join('_1');
    if (colId1) {
      return colId1;
    }
    return colId + '_1';
  }

  private bringFocusBack() {
    if (this.gridApi && this.rowIdFocused && this.colIdFocused) {
      const inverseColId = this.getInverseColId(this.colIdFocused)
      this.gridApi.setFocusedCell(this.rowIdFocused, inverseColId, null);
      this.gridApi.setFocusedCell(this.rowIdFocused, this.colIdFocused, null);
    }
  }

  transformObjToArray(obj) {
    const arr = [];
    for (const [key0, value0] of Object.entries(obj)) {
      arr.push(value0);
    }
    return arr;
  }
  getNewData(rowData) {
    const newData = [];
    for (let i = 0; i < rowData.length; i++) {
      newData.push(this.transformObjToArray(rowData[i]))
    }
    return newData;
  }

  localUpdateData(indexRowModified, newRow, dataLoaded) {
    const dataTemp = dataLoaded[indexRowModified]
    for (const [key0, value0] of Object.entries(dataTemp)) {
      if (dataTemp[key0] !== newRow[key0]) {
        dataLoaded[indexRowModified][key0] = newRow[key0];
      }
    }
    return dataLoaded;
  }
  onCellClicked($event) {
    const rowIndex = $event.rowIndex;
    const colId = $event.column.colId;
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
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  public getUpdateDataNewPage(nextLink, currentPage, fileMetaData) {

    const newFileMetadata = {
      filename: fileMetaData['filename'],
      filetype: fileMetaData['filetype'],
      fileId: fileMetaData['fileId'],
      worksheetId: fileMetaData['worksheetId'],
      page: currentPage,
      worksheet: fileMetaData['worksheet'],
      totalRows: fileMetaData['totalRows'],
      nrows: fileMetaData['nrows'],
      metadata: fileMetaData['metadata'],
      lobId: fileMetaData['defaultLobId'],
      isExcel: fileMetaData['isExcel'],
      document: fileMetaData['document']
    }

    this.importService.getDataChangedPage(nextLink).subscribe((data) => {
      if (data) {
        this.allImportedResponse = data;
        this.dataLoaded = data['data'];
        this.indexRowsLoaded = data['index'];
        this.pageLast = data['last_page'];
        this.pageFirst = data['first_page'];
        this.currentPage = data['current_page'];
        this.rowsData = this.dataLoaded;

        this.store$.dispatch(new ActionUpdateFileData({ fileData: newFileMetadata }));

        this.store$.dispatch(new ActionGetDataImported({ data: this.dataLoaded }));
        if (this.gridOptions.api) {
          this.gridOptions.api.setRowData(this.rowsData);
        }
        this.refreshAfterUpdate();
      }
      
    });
  }

  public onBtFirst() {
    if (this.allImportedResponse) {
      const nextLink = this.allImportedResponse._links.first;
      if (nextLink) {
        this.currentPage = this.allImportedResponse._links.first_page;
        this.getUpdateDataNewPage(nextLink, this.currentPage, this.fileMetaData);
      }
    }
  }

  public onBtPrevious() {
    if (this.allImportedResponse) {
      const nextLink = this.allImportedResponse._links.prev;
      if (nextLink) {
        this.currentPage = this.currentPage - 1;
        this.getUpdateDataNewPage(nextLink, this.currentPage, this.fileMetaData);
      }
    }
  }

  onBtSpecifiquePage(page) {
    if (this.allImportedResponse) {
      const link = this.allImportedResponse._links.self;

      const link1 = link.split('page=').slice(0, -1).join('page=');
      const lastExtracted = link.split('&nrows=').pop();
      const nextLink = link1 + 'page=' + page + '&nrows=' + lastExtracted;
      
      if (nextLink) {
        this.currentPage = page;
        this.getUpdateDataNewPage(nextLink, this.currentPage, this.fileMetaData);
      }
    }
  }

  public onBtNext() {
    // console.log('== onBtNext ==');
    if (this.allImportedResponse) {
      const nextLink = this.allImportedResponse._links.next;
      if (nextLink) {
        this.currentPage = this.currentPage + 1;
        this.getUpdateDataNewPage(nextLink, this.currentPage, this.fileMetaData);
      }
    }
  }

  public onBtLast() {
    // console.log('== onBtLAst ==');
    if (this.allImportedResponse) {
      const nextLink = this.allImportedResponse._links.last;
      if (nextLink) {
        this.currentPage = this.allImportedResponse._links.last_page;
        this.getUpdateDataNewPage(nextLink, this.currentPage, this.fileMetaData);
      }
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log(changes);
  }

  // tst
  onPaginationChanged(event) {
    // this.newData.emit(change)
  }

}

function createFieldCode(str) {
  return str.replace(/\s/g, '');
}

  // tst
function setText(selector, text) {
  document.querySelector(selector).innerHTML = text;
}

  // tst
function setLastButtonDisabled(disabled) {
  // document.querySelector('#btLast').disabled = disabled;
}