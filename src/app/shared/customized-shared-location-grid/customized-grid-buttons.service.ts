import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { GridLineInfo } from './GridLineInfo';

@Injectable({
  providedIn: 'root'
})
export class CustomizedSharedGridService {

  private edits   : Subject<GridLineInfo> = new Subject()
  private deletes : Subject<GridLineInfo> = new Subject()
  private geocodes : Subject<GridLineInfo> = new Subject()

  constructor(){}

  getEditsObserver(){ return this.edits }
  // getDataRowObservable() { return this.edits }
  getDeletesObserver(){ return this.deletes }
  getGeocodeObserver(){ return this.geocodes }

  setNextEdit( line: GridLineInfo ){ return this.edits.next(line) }
  setNextDelete( line: GridLineInfo ){ return this.deletes.next(line) }
  setNextGeocode( line: GridLineInfo ){ return this.geocodes.next(line) }
}


