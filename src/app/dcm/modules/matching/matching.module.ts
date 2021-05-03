import {NgModule} from '@angular/core';

import {SharedModule} from '@app/shared';

import {MatchingRoutingModule} from './matching-routing.module';
import {MatchingComponent} from './matching.component';
import {MatchingGridComponent} from '@app/dcm/modules/matching/components/matching-grid.component';
import {SearchMatchingPopupComponent} from '@app/dcm/modules/matching/popups/search-matching-popup.component';

// import { FeaturesComponent } from './features/features.component';

@NgModule({
  declarations: [MatchingComponent, MatchingGridComponent, SearchMatchingPopupComponent],
  imports: [SharedModule, MatchingRoutingModule],
  exports: [SearchMatchingPopupComponent],
  entryComponents: [
    SearchMatchingPopupComponent
  ]
})
export class MatchingModule {
}
