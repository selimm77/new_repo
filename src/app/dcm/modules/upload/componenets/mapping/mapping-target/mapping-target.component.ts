import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  EventEmitter,
  Output,
  ChangeDetectorRef
} from '@angular/core';
import {MappingTargetItem} from '../../../models/mapping/mapping-target.model';
import {MappingSourceItem} from '../../../models/mapping/mapping-source.model';
import MappingUtils from '../../../utils/mapping.utils';
import MappingRulesUtils from '../../../utils/mapping-rules.utils';
import {Observable, of} from 'rxjs';
import {AppState} from '@app/core';
import {Store} from '@ngrx/store';
import {selectMappingFilter, selectMappingTarget, selectMappingTargetFilter} from '@app/dcm/modules/upload/store/mapping/mapping.selectors';

@Component({
  selector: 'anms-mapping-target',
  templateUrl: './mapping-target.component.html',
  styleUrls: ['./mapping-target.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MappingTargetComponent implements OnInit {

  filterView: Observable<String> = of('All');
  targetFilter$: Observable<string> = of('');

  targetFilterItems;
  targetFilter;


  @Input() items: MappingTargetItem[] = []

  @Input() draggedItem: MappingSourceItem;

  @Output() updateTarget = new EventEmitter<MappingTargetItem>();

  constructor(private cdrf: ChangeDetectorRef, private store: Store<AppState>) {
    this.filterView = this.store.select(selectMappingFilter);
    this.targetFilter$ = this.store.select(selectMappingTargetFilter);
  }

  ngOnInit() {
    this.store.select(selectMappingTarget).subscribe((liste)=>{this.items = liste})
    /* this.targetFilter$.subscribe((value: string) => {
      // this.targetFilter = targetFilter;
      console.log('value => ')
      console.log(value)
      if(!value || value === undefined){
      console.log('value undefined ')
      this.assignCopy();
      console.log(this.targetFilterItems);
    } // when nothing has typed
    if (value !== undefined) {
      this.targetFilterItems = Object.assign([], this.items).filter(
       item => item.viewValue.toLowerCase().indexOf(value.toLowerCase()) > -1
    )
    }
    },
    () => {
        this.cdrf.detectChanges();
    }); */
  }

  onItemDrop(source: MappingSourceItem, target: MappingTargetItem, index) {
    const newTarget = this.copyTarget(target)
    newTarget.addSource(this.draggedItem)
    this.updateTarget.emit(newTarget)
    // console.log('number => ')
    // console.log(index)
    // const id = (<HTMLInputElement>document.getElementById("id"+index));
    // console.log(id)
    // id.scrollIntoView();
  }

  onRemoveClick(source: MappingSourceItem, target: MappingTargetItem) {
    const newTarget = this.copyTarget(target)
    newTarget.removeSource(source)
    this.updateTarget.emit(newTarget)
  }

  dropAllowed(item: MappingTargetItem) {
    return item.canBeMappedByDragItem
  }

  private copyTarget(target: MappingTargetItem) {
    return MappingUtils.copyTarget(target)
  }

  isFieldMandatory(target: MappingTargetItem) {
    return MappingRulesUtils.isFieldMandatory(target)
  }

  showElement(item) {
    console.log('==><>>>>>>>>')
    console.log(this.items)
  }

  assignCopy(){
    this.targetFilterItems = Object.assign([], this.items);
 }

 sortBy(items) {
  const itemsSorted = items.slice().sort(( a , b ) => a.viewValue > b.viewValue ? 1 : -1)
  return itemsSorted;
}

 /* filterItem(value){
    if(!value){
        this.assignCopy();
    } // when nothing has typed
    this.filteredItems = Object.assign([], this.items).filter(
       item => item.viewValue.toLowerCase().indexOf(value.toLowerCase()) > -1
    )
 } */

}
