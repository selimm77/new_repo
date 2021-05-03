import { FileData } from "../import/import.model";

export interface Cleansing {
  stage: cleansingStage
  filters: any
  page: number
  limit: number
  statistics: any
  data: any
  errors: any
  flowId: string
  errorsInfo: any
  selectedRows: any[]
  datachek: any
  headers: any
  jobId: any
  columnState: any[]
  columnStructure: any[]
  groupColumn: any
  // columnState: ColumnModel[];
  quickSearch: any
  typeError: any
  filterColumn: any
  editable: boolean
  locationsLoaded: any
  timeStamp: any
  oldFileId: string
  oldUpload: UploadData
}
export interface CleansingState extends Cleansing { 
    deletedOrUpdated: boolean,
    loading: boolean
    loaded: boolean
    failed: boolean
    csMetadata: any
    stageBeforeLoad: cleansingStage
} 

export interface ColumnModel {
  colId: string,
  hide: boolean
}

export interface UploadData {
  fileId: string
  jobId: any
  fileData: FileData
  headers: any
  data: any
  csMetadata: any
  columnState: any[]
  columnStructure: any[]
  mappingId: any
}

export type cleansingStage = 'STANDBY' | 'MAPPING' | 'TRANSFORM' | 'CLEANSING' | 'SNAPSHOT' | 'EDIT' | 'FINISH' 
