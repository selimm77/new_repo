import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImportContainerComponent } from './containers/import-container/import-container.component';
import { UploadContainerComponent } from './containers/upload-container/upload-container.component';
import { MappingContainerComponent } from './containers/mapping-container/mapping-container.component';
import { CleansingContainerComponent } from './containers/cleansing-container/cleansing-container.component';
import {LocationsWorldComponent} from "@app/dcm/modules/upload/containers/locations-world/locations-world.component";
import {DashboardExposuresComponent} from "@app/dcm/modules/upload/containers/dashboard-exposures/dashboard-exposures.component";

const routes: Routes = [
  {
    path: '',
    component: UploadContainerComponent,
    data: { title: 'Import' }
  },
  {
    path: 'import',
    component: ImportContainerComponent,
    data: { title: 'Import' }
  },
  {
    path: 'mapping',
    component: MappingContainerComponent,
    data: { title: 'Mapping' }
  },{
    path: 'locations',
    component : LocationsWorldComponent
  },{
    path: 'dashboard',
    component : DashboardExposuresComponent
  },
  {
    path: 'cleansing',
    component: CleansingContainerComponent,
    data: { title: 'Cleansing' }
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadRoutingModule {}
