import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SettingComponent} from "@app/dcm/modules/administration/container/setting/setting.component";


const routes: Routes = [
  {
    path: '',
    component: SettingComponent,
    data: {title: 'Field Setting'}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule {
}
