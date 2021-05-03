import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';

import { LocationsRoutingModule } from './locations-routing.module';
import { LocationsComponent } from './locations.component';
import { MainContainerComponent } from './containers/main-container/main-container.component';
import { CurrentLocationsGridComponent } from './components/current-locations-grid/current-locations-grid.component';
// import { FeaturesComponent } from './features/features.component';

@NgModule({
  imports: [SharedModule, LocationsRoutingModule],
  declarations: [LocationsComponent, MainContainerComponent, CurrentLocationsGridComponent]
})
export class LocationsModule{}
