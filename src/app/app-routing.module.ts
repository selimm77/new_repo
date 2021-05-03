import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [

  {
    path: 'dcm',
    loadChildren: 'app/dcm/dcm.module#DcmModule'
  },
  {
    path: '',
    redirectTo: '/dcm/upload',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'dcm'
  }
];

@NgModule({
  // useHash supports github.io demo page, remove in your app
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      scrollPositionRestoration: 'enabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
