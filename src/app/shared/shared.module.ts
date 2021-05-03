import {NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {TranslateModule} from '@ngx-translate/core';

import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatChipsModule} from '@angular/material/chips';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatDividerModule} from '@angular/material/divider';
import {
  MatSliderModule,
  MatStepperModule,
  MatGridListModule,
  MatTableModule,
  MatPaginatorModule,
  MatDialogModule,
  MatBadgeModule,
} from '@angular/material/';
import {MatSortModule} from '@angular/material/sort';

import {AgGridModule} from '@ag-grid-community/angular';

import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {
  faBars,
  faUserCircle,
  faPowerOff,
  faCog,
  faPlayCircle,
  faRocket,
  faPlus,
  faEdit,
  faTrash,
  faTimes,
  faCross,
  faCaretUp,
  faCaretDown,
  faExclamationTriangle,
  faFilter,
  faTasks,
  faCheck,
  faSquare,
  faLanguage,
  faPaintBrush,
  faLightbulb,
  faWindowMaximize,
  faStream,
  faBook,
  faCalculator,
  faFileUpload,
  faMagic,
  faPlay,
  faStop
} from '@fortawesome/free-solid-svg-icons';
import {
  faGithub,
  faMediumM,
  faTwitter,
  faInstagram,
  faYoutube
} from '@fortawesome/free-brands-svg-icons';

library.add(
  faBars,
  faUserCircle,
  faPowerOff,
  faCog,
  faRocket,
  faPlayCircle,
  faGithub,
  faMediumM,
  faTwitter,
  faInstagram,
  faYoutube,
  faPlus,
  faEdit,
  faTrash,
  faTimes,
  faCaretUp,
  faCaretDown,
  faExclamationTriangle,
  faFilter,
  faTasks,
  faCheck,
  faCross,
  faSquare,
  faLanguage,
  faPaintBrush,
  faLightbulb,
  faWindowMaximize,
  faStream,
  faBook,
  faCalculator,
  faFileUpload,
  faMagic,
  faPlay,
  faStop
);

import {BigInputComponent} from './big-input/big-input.component';
import {BigInputActionComponent} from './big-input/big-input-action.component';

import {FlexLayoutModule} from '@angular/flex-layout';
import {CdkTableModule} from '@angular/cdk/table';
import {GridComponent} from './grid/grid.component';
import {PreviewGridComponent} from './preview-grid/preview-grid.component';
import {SharedLocationGridComponent} from './shared-location-grid/shared-location-grid.component';
import {CustomizedSharedLocationGridComponent} from './customized-shared-location-grid/customized-shared-location-grid.component';
import {LocationGridEditeComponent} from './location-grid-edite/location-grid-edite.component';

import {TableModule} from 'primeng/table';
import {ToggleHeaderButtonComponent} from './toggle-header-button/toggle-header-button.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {SliderModule} from 'primeng/slider';
import {DropdownModule, MultiSelectModule} from 'primeng/primeng';
import {PaginatorModule} from 'primeng/paginator';
import {GeoCodingService} from '@app/shared/services/geocoding/geo-coding.service';
import {FormatDoublePipe} from '@app/dcm/modules/upload/pipes/format-double.pipe';
import {FocusDirective} from '@app/shared/focus-directive';
import {NgxEchartsModule} from 'ngx-echarts';
import {ShContextMenuModule} from 'ng2-right-click-menu';
import {KeyboardShortcutsModule} from 'ng-keyboard-shortcuts';
import {FileDropModule} from 'ngx-file-drop';
import {FocusDirectiveDirective} from '@app/dcm/directives/focus-directive.directive';
import { CustomizedSharedGridComponent } from './customized-shared-location-grid/customized-shared-grid.component';
import { SortableHeaderComponent } from '@app/dcm/components/header-component/sortable-header.component';
import { HeaderGroupComponent } from '@app/dcm/components/header-group-component/header-group.component';
import { HeaderEditComponent } from '@app/dcm/components/header-icons-component/edit-component/header-edit.component';
import { HeaderGeocodeComponent } from '@app/dcm/components/header-icons-component/geocode-component/header-geocode.component';
import { HeaderSuppComponent } from '@app/dcm/components/header-icons-component/supp-component/header-supp.component';
import { DropdownErrorFilterComponent } from '@app/dcm/modules/upload/componenets/cleansing/filters/dropdown-error-filter/dropdown-error-filter.component';
import { TivFilterComponent } from '@app/dcm/modules/upload/componenets/cleansing/filters/tiv-filters/tiv-filter.component';
import { DivisionFilterComponent } from '@app/dcm/modules/upload/componenets/cleansing/filters/division-filter/division-filter.component';
import { PartialMatchFilterComponent } from '@app/dcm/modules/upload/componenets/cleansing/filters/filter-component-example/partial-match-filter.component';
import { DefaultFilterComponent } from '@app/dcm/modules/upload/componenets/cleansing/filters/default-filters/default-filter.component';
import { DefaultFilteredQuickSearchComponent } from '@app/dcm/modules/upload/componenets/cleansing/filters/default-filters-quick-search/default-filtered-quick-search.component';
import { ImportNavbarComponent } from '@app/dcm/modules/upload/componenets/import/import-navbars/import-navbar.component';
import { SharedLocationUploadGridComponent } from './shared-location-grid/shared-location-upload-grid.component ';
import {MatExpansionModule} from '@angular/material/expansion';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { FilterPipe } from './pipes/filter.pipe';
import {POPUPS_COMPONENTS, POPUPS_PIPES} from '@app/shared/index';
import {GeneralLocationInfoPopupComponent} from '@app/shared/popups/general-location-info-popup/general-location-info-popup.component';
import {KeysPipe} from '@app/shared/popups/general-location-info-popup/pipes/keys.pipe';
import {CatAnalysisInfoComponent} from '@app/shared/popups/general-location-info-popup/cat-Analysis-Info/cat-Analysis-Info.component';
import {GeneralDetailsComponent} from '@app/shared/popups/general-location-info-popup/general-details/general-details.component';
import {GeographicalComponent} from '@app/shared/popups/general-location-info-popup/geographical/geographical.component';
import {InsurredValuesComponent} from '@app/shared/popups/general-location-info-popup/insurred-values/insurred-values.component';
import {MoreInfoComponent} from '@app/shared/popups/general-location-info-popup/more-info/more-info.component';
import {MplComponent} from '@app/shared/popups/general-location-info-popup/mpl/mpl.component';
import {PricingComponent} from '@app/shared/popups/general-location-info-popup/pricing/pricing.component';
import {TandCComponent} from '@app/shared/popups/general-location-info-popup/tand-C/tand-C.component';
import { DeductibleItemComponent } from './popups/general-location-info-popup/tand-C/deductible-item/deductible-item.component';
import { DeductibleCheckboxComponent } from './popups/general-location-info-popup/tand-C/deductible-checkbox/deductible-checkbox.component';
import { MondatoryPipe } from './popups/general-location-info-popup/pipes/mondatory.pipe';
import { ItemVisibilityPipe } from './popups/general-location-info-popup/pipes/item-visibility.pipe';
import { CustomTooltipComponent } from './shared-location-grid/custom-tooltip.component';
import { UnitPipePipe } from './popups/general-location-info-popup/pipes/unit-pipe.pipe';
import { NumericEditor } from '@app/dcm/modules/upload/componenets/cleansing/editor-by-type/numeric-editor.component';
import { DoublingEditor } from '@app/dcm/modules/upload/componenets/cleansing/editor-by-type/doubling-editor.component';
import { BjOnlyNumberDirective } from './popups/general-location-info-popup/directive/number-input.directive';
import { EditAllComponent } from '@app/dcm/modules/upload/componenets/cleansing/filters/edit-all/edit-all.component';


@NgModule({
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    NgxEchartsModule,
    MatButtonModule,
    MatSelectModule,
    KeyboardShortcutsModule,
    MatTabsModule,
    AgGridModule.withComponents([
      SortableHeaderComponent,
      HeaderGroupComponent,
      HeaderEditComponent,
      HeaderGeocodeComponent,
      HeaderSuppComponent,
      DropdownErrorFilterComponent,
      DivisionFilterComponent,
      TivFilterComponent,
      CustomizedSharedLocationGridComponent,
      EditAllComponent,
      PartialMatchFilterComponent,
      DefaultFilterComponent,
      CustomTooltipComponent,
      DefaultFilteredQuickSearchComponent,
      DoublingEditor,
      NumericEditor
    ]),
    MatInputModule,
    MatChipsModule,
    MatCardModule,
    MatCheckboxModule,
    MatListModule,
    MatIconModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTableModule,
    CdkTableModule,
    MatPaginatorModule,
    FileDropModule,
    FontAwesomeModule,

    FlexLayoutModule,

    TableModule,
    SliderModule,
    DropdownModule,
    MultiSelectModule,
    NgZorroAntdModule,
    ShContextMenuModule,
    PaginatorModule,
    MatExpansionModule,
    DragDropModule

  ],
  declarations: [
    GeneralLocationInfoPopupComponent, CatAnalysisInfoComponent, GeneralDetailsComponent, GeographicalComponent, InsurredValuesComponent, MoreInfoComponent, MplComponent, PricingComponent, TandCComponent, KeysPipe ,
    FormatDoublePipe, FocusDirectiveDirective,
    FocusDirective, BigInputComponent, BigInputActionComponent,
    GridComponent, PreviewGridComponent, SharedLocationGridComponent,
    SharedLocationUploadGridComponent,
    CustomizedSharedLocationGridComponent, LocationGridEditeComponent,EditAllComponent,
    ToggleHeaderButtonComponent,
    ImportNavbarComponent, BjOnlyNumberDirective,
    CustomizedSharedGridComponent, SortableHeaderComponent, HeaderGroupComponent,
    HeaderEditComponent, HeaderGeocodeComponent, HeaderSuppComponent, DropdownErrorFilterComponent, DivisionFilterComponent, TivFilterComponent, PartialMatchFilterComponent, DefaultFilterComponent, CustomTooltipComponent, DoublingEditor,
    NumericEditor, DefaultFilteredQuickSearchComponent, FilterPipe, DeductibleItemComponent, DeductibleCheckboxComponent, MondatoryPipe, ItemVisibilityPipe, UnitPipePipe ],
  providers: [GeoCodingService, UnitPipePipe],
  exports: [
    CommonModule,
    FormsModule,
    FileDropModule,
    ReactiveFormsModule,
    TranslateModule,
    FormatDoublePipe,
    TableModule,
    MultiSelectModule,
    SliderModule,
    DropdownModule,
    MatButtonModule,
    MatMenuModule,
    MatTabsModule,
    MatChipsModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatCardModule,
    MatSidenavModule,
    MatListModule,
    MatSelectModule,
    MatIconModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatStepperModule,
    MatBadgeModule,
    MatTableModule,
    CdkTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSortModule,
    MatExpansionModule,
    FontAwesomeModule,
    GridComponent,
    KeyboardShortcutsModule,
    FocusDirective,
    FlexLayoutModule,
    FocusDirectiveDirective,
    PreviewGridComponent,
    SharedLocationGridComponent,
    SharedLocationUploadGridComponent,
    ToggleHeaderButtonComponent,
    NgZorroAntdModule,
    CustomizedSharedGridComponent,
    ShContextMenuModule,
    PaginatorModule,
    ImportNavbarComponent,
    GeneralLocationInfoPopupComponent
  ],
  entryComponents: [GeneralLocationInfoPopupComponent]
})
export class SharedModule {
}
