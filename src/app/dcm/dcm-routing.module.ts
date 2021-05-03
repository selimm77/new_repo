import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {MainComponent} from './containers/main/main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'upload',
        pathMatch: 'full',
        redirectTo: 'upload',
      },
      {
        path: 'upload',
        data: {title: 'Upalod'},
        loadChildren: './modules/upload/upload.module#UploadModule'
      },
      {
        path: 'locations',
        data: {title: 'Current Locations'},
        loadChildren: './modules/locations/locations.module#LocationsModule'
      },


      {
        path: 'matching',
        data: {title: 'Matching'},
        loadChildren: './modules/matching/matching.module#MatchingModule'
      },
      {
        path: 'administration',
        data: {title: 'Administration'},
        loadChildren: './modules/administration/administration.module#AdministrationModule'
      },
      {
        path: '**',
        redirectTo: 'upload'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DcmRoutingModule {
}
