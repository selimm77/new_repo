import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MatchingComponent } from './matching.component';

const routes: Routes = [
  {
    path: '',
    component: MatchingComponent,
    data: { title: 'Matching' }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatchingRoutingModule {}
