import {Component, OnDestroy} from '@angular/core';
import {IHeaderGroupParams} from '@ag-grid-enterprise/all-modules';
import {IHeaderGroupAngularComp} from '@ag-grid-community/angular';

@Component({
    templateUrl: 'header-geocode.component.html',
    styleUrls: ['header-geocode.component.scss']
})
export class HeaderGeocodeComponent implements OnDestroy, IHeaderGroupAngularComp {
    public params: IHeaderGroupParams;

    agInit(params: IHeaderGroupParams): void {
        this.params = params;
    }

    ngOnDestroy() {
        console.log(`Destroying HeaderGeocodeComponent`);
    }


    invokeGeocodeMethod() {
    };

}
