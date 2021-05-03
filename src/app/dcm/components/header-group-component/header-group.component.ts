import {Component, OnDestroy} from '@angular/core';
import {IHeaderGroupParams} from '@ag-grid-enterprise/all-modules';
import {IHeaderGroupAngularComp} from '@ag-grid-community/angular';
import {AppState} from '@app/core';
import {Store} from '@ngrx/store';
import { ActionDisplayedGroupColumn } from '@app/dcm/modules/upload/store/cleansing/cleansing.actions';
import { selectGroupColumnState } from '@app/dcm/modules/upload/store/cleansing/cleansing.selectors';
import { Observable } from 'rxjs';

@Component({
    templateUrl: 'header-group.component.html',
    styleUrls: ['header-group.component.css']
})

export class HeaderGroupComponent implements  IHeaderGroupAngularComp {
    public params: IHeaderGroupParams;
    public expanded: boolean;
    groupColumnState$: Observable<any>;
    constructor(private store$: Store<AppState>) {
        this.groupColumnState$ = store$.select(selectGroupColumnState);

    }
    
    agInit(params: IHeaderGroupParams): void {
        // console.log('init HeaderGroupComponent: ')
        this.params = params;
        this.params.columnGroup.getOriginalColumnGroup().addEventListener('expandedChanged', this.onExpandChanged.bind(this));
    }

    expandOrCollapse() {
        // console.log('==> this.params.columnGroup.getOriginalColumnGroup().isExpanded() : ');
        // console.log(this.params.columnGroup);
        // console.log(this.params.columnGroup.getOriginalColumnGroup().isExpanded());
        // console.log(this.params.displayName);
        // console.log(this.params.columnGroup.getOriginalColumnGroup()['colGroupDef']['children']);
        this.params.setExpanded(!this.expanded);
        // if (!this.params.columnGroup.getOriginalColumnGroup().isExpanded()) {
            const expandTemp = this.params.columnGroup.getOriginalColumnGroup().isExpanded();
            const groupName = this.params.displayName;
            const children = this.params.columnGroup.getOriginalColumnGroup()['colGroupDef']['children'];
            const body = {expanded: expandTemp, groupName: groupName, children: children};
            // console.log(body)
            this.store$.dispatch(new ActionDisplayedGroupColumn({ groupColumn: body }));
        // }
    };

    onExpandChanged() {
        this.expanded = this.params.columnGroup.getOriginalColumnGroup().isExpanded()
    }
}
