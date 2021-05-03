import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';


import { settingsReducer } from './settings.reducer';
import { SettingsEffects } from './settings.effects';

@NgModule({
  imports: [
    StoreModule.forFeature('settings', settingsReducer),
    EffectsModule.forFeature([SettingsEffects])
  ]
})
export class SettingsModule {}
