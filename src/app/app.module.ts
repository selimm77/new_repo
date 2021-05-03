import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {SharedModule} from '@app/shared';
import {CoreModule} from '@app/core';
import {SettingsModule} from './settings';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {en_US, NZ_I18N} from 'ng-zorro-antd';
import {AgmCoreModule, GoogleMapsAPIWrapper} from '@agm/core';
import { AgGridModule } from '@ag-grid-community/angular';
import { SortableHeaderComponent } from './dcm/components/header-component/sortable-header.component';
import { HeaderEditComponent } from './dcm/components/header-icons-component/edit-component/header-edit.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    CoreModule,
    SharedModule,
    SettingsModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA5XcWLtQySo-jhIu-yf4nPzC-tqSPAtro'
    }), // <---
    AgGridModule.withComponents([SortableHeaderComponent, HeaderEditComponent])
  ],
  declarations: [AppComponent],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    GoogleMapsAPIWrapper // <---
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
