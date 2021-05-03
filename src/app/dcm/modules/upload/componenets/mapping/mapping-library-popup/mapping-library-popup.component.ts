import {MappingTargetItemTaxonomies} from './../../../models/mapping/mapping-target.model';
import {TaxonomiesService} from './../../../services/taxonomies.service';
import {MappingSourceItem} from './../../../models/mapping/mapping-source.model';
import {Component, OnInit, ChangeDetectionStrategy, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {BehaviorSubject} from 'rxjs';
import {take} from 'rxjs/operators';

@Component({
  selector: 'anms-mapping-library-popup',
  templateUrl: './mapping-library-popup.component.html',
  styleUrls: ['./mapping-library-popup.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MappingLibraryPopupComponent implements OnInit {
  targets = [];
  targets$: BehaviorSubject<MappingTargetItemTaxonomies[]> = new BehaviorSubject([])
  loadingTargets$: BehaviorSubject<boolean> = new BehaviorSubject(false)
  textFilter = '';

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public source: MappingSourceItem,
    public taxService: TaxonomiesService,
  ) {
  }

  ngOnInit() {
    this.loadingTargets$.next(true)
    this.taxService.getTargetFields().subscribe(res => {
      this.loadingTargets$.next(false)
      res.forEach(t => {
        t.isSuggestion = this.source.taxonomies.find(tax => tax.value === t.value) ? true : null
      })
      this.targets = res;
      this.targets$.next(res)
    })
  }

  loadTaxonomies(target: MappingTargetItemTaxonomies) {
    if (!target.loaded && !target.loading) {
      target.loading = true
      this.taxService.getTargetTaxonomies(target.value).subscribe(taxes => {
        target.loading = false;
        target.loaded = true
        target.taxonomies = taxes

        this.targets$.pipe(take(1)).subscribe(targets => this.targets$.next(targets))
      }, err => {
        target.loading = false
      })
    }
  }

  onItemDrop(data, item, ix) {
    this.targets$.value

    this.targets[ix].taxonomies.push({viewValue: item});

  }

  onRemoveClick(sField, item) {

  }

}

export const MAX_MAPPING_ITEMS = 3
