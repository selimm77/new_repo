import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SettingComponent} from './container/setting/setting.component';
import {AdministrationRoutingModule} from "@app/dcm/modules/administration/administration-routing.module";
import {GeneralComponent} from './component/general/general.component';
import {FieldsComponent} from './component/fields/fields.component';
import {GroupColsComponent} from './component/group-cols/group-cols.component';
import {DatachecksComponent} from './component/datachecks/datachecks.component';
import {SharedModule} from "@app/shared";
import { DatacheckCreateComponent } from './component/datacheck-create/datacheck-create.component';

@NgModule({
  declarations: [SettingComponent, GeneralComponent, FieldsComponent, GroupColsComponent, DatachecksComponent, DatacheckCreateComponent],
  imports: [
    CommonModule, AdministrationRoutingModule, SharedModule
  ],
  entryComponents:[DatacheckCreateComponent]
})
export class AdministrationModule {
}
