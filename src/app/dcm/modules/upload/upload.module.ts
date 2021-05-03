import {NgModule} from '@angular/core';

import {SharedModule} from '@app/shared';

// import {DragDropModule} from '@angular/cdk/drag-drop';
import {NgDragDropModule} from 'ng-drag-drop';
import {DndModule} from 'ngx-drag-drop';

import {UploadRoutingModule} from './upload-routing.module';
import {UploadComponent} from './upload.component';
import {UploadContainerComponent} from './containers/upload-container/upload-container.component';
import {ButtonSetComponent} from './componenets/button-set/button-set.component';
import {UploadGridComponent} from './componenets/upload-grid/upload-grid.component';
import {ProgressListComponent} from './componenets/progress-list/progress-list.component';
import {ProgressCircleComponent} from './componenets/progress-circle/progress-circle.component';
import {MappingContainerComponent} from './containers/mapping-container/mapping-container.component';
import {CleansingContainerComponent} from './containers/cleansing-container/cleansing-container.component';
import {MappingSourceComponent} from './componenets/mapping/mapping-source/mapping-source.component';
import {MappingTargetComponent} from './componenets/mapping/mapping-target/mapping-target.component';
import {MappingOptionsComponent} from './componenets/mapping/mapping-options/mapping-options.component';
import {ImportContainerComponent} from './containers/import-container/import-container.component';
import {MatProgressBarModule} from '@angular/material';
import {MappingActionsComponent} from './componenets/mapping/mapping-actions/mapping-actions.component';
import {MappingSavePopupComponent} from './componenets/mapping/mapping-save-popup/mapping-save-popup.component';
import {MappingTemplateListPopupComponent} from './componenets/mapping/mapping-template-list-popup/mapping-template-list-popup.component';
import {MappingLibraryPopupComponent} from './componenets/mapping/mapping-library-popup/mapping-library-popup.component';
import {ImportPreviewComponent} from './componenets/import/import-preview/import-preview.component';
import {ImportEffects} from './store/import/import.effects';
import {EffectsModule} from '@ngrx/effects';
import {MappingTemplateInfoComponent} from './componenets/mapping/mapping-template-info/mapping-template-info.component';
import {MappablePipe} from './pipes/mappable.pipe';
import {ErrosSyntheseComponent} from './componenets/errors-synthese/erros-synthese.component';
import {NgCircleProgressModule} from 'ng-circle-progress';
import {LocationMapComponent} from '@app/dcm/modules/upload/containers/location-map/location-map.component';
import {TableModule} from 'primeng/table';
import { AgGridModule } from 'ag-grid-angular';
import { NzTableModule } from 'ng-zorro-antd';
import { EmptyTableComponent } from './componenets/empty-table/empty-table.component';
import { MappingHomeComponent } from './componenets/mapping/mapping-home/mapping-home.component';
import { AdvancedListComponent } from './componenets/mapping/advanced-list/advanced-list.component';
import { AdvancedOperationsComponent } from './componenets/mapping/advanced-operations/advanced-operations.component';
import { AdvancedComponent } from './componenets/mapping/advanced/advanced.component';
import { LocationsWorldComponent } from './containers/locations-world/locations-world.component';
import { LocationDataComponent } from './componenets/location-data/location-data.component';
import { DashboardExposuresComponent } from './containers/dashboard-exposures/dashboard-exposures.component';
import { DashboardParamsComponent } from './componenets/dashboard-params/dashboard-params.component';
import {DcmModule} from '@app/dcm/dcm.module';
import { GeneralLocationInfoPopupComponent } from '@app/shared/popups/general-location-info-popup/general-location-info-popup.component';


@NgModule({
    imports: [SharedModule,
        UploadRoutingModule,
        DndModule, TableModule,
        NgDragDropModule.forRoot(),
        MatProgressBarModule, NzTableModule,
        AgGridModule.withComponents([]),
        NgCircleProgressModule.forRoot({
            // set defaults here
            radius: 100,
            outerStrokeWidth: 16,
            innerStrokeWidth: 8,
            outerStrokeColor: '#78C000',
            innerStrokeColor: '#C7E596',
            animationDuration: 1,
            // animationDuration: 300,
            // lazy: false
        })

    ],
  declarations: [UploadComponent, UploadContainerComponent, ButtonSetComponent, UploadGridComponent, ProgressListComponent, ProgressCircleComponent, MappingContainerComponent, CleansingContainerComponent, MappingSourceComponent, MappingTargetComponent, MappingOptionsComponent, ImportContainerComponent, MappingActionsComponent, MappingSavePopupComponent, MappingTemplateListPopupComponent, MappingLibraryPopupComponent, ImportPreviewComponent, MappingTemplateInfoComponent, MappablePipe, ErrosSyntheseComponent, LocationMapComponent, EmptyTableComponent, MappingHomeComponent, AdvancedListComponent, AdvancedOperationsComponent, AdvancedComponent, LocationsWorldComponent, LocationDataComponent, DashboardExposuresComponent, DashboardParamsComponent],
  entryComponents: [GeneralLocationInfoPopupComponent,MappingSavePopupComponent, MappingTemplateListPopupComponent, MappingLibraryPopupComponent, LocationDataComponent, DashboardParamsComponent]
})
export class UploadModule {
}
