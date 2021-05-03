import {MappingEffects} from './modules/upload/store/mapping/mapping.effects';
import {ImportEffects} from './modules/upload/store/import/import.effects';
import {EffectsModule} from '@ngrx/effects';
import {NgModule} from '@angular/core';
import {SharedModule} from '@app/shared';
import {DcmRoutingModule} from './dcm-routing.module';
import {MainComponent} from './containers/main/main.component';
import {UploadModule} from './modules/upload/upload.module'
import {MatchingModule} from './modules/matching/matching.module'
import {LocationsModule} from './modules/locations/locations.module';
import {StepperComponent} from './components/stepper/stepper.component';
import {HeaderComponent} from './components/header/header/header.component';
import {HeaderFirstComponent} from './components/header/header-first/header-first.component';
import {StoreModule} from '@ngrx/store';
import {FEATURE_NAME, reducers} from './store/dcm.state';
import {SidenavComponent} from './components/sidenav/sidenav.component';
import {CleansingEffects} from './modules/upload/store/cleansing/cleansing.effects';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {AgmCoreModule} from '@agm/core';
 import {ConfigadminEffect} from '@app/dcm/modules/administration/store/configadmin.effect';
import { HeaderStepperComponent } from './components/header-stepper/header-stepper.component';

@NgModule({
  imports: [AgmCoreModule,  NgZorroAntdModule, SharedModule, DcmRoutingModule, UploadModule, MatchingModule, LocationsModule, StoreModule.forFeature(FEATURE_NAME, reducers), EffectsModule.forFeature([ImportEffects, MappingEffects, CleansingEffects, ConfigadminEffect])],
  declarations: [MainComponent, StepperComponent, HeaderStepperComponent, HeaderComponent, HeaderFirstComponent, SidenavComponent],
  entryComponents: []
})
export class DcmModule {
}
