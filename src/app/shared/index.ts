import {GeneralLocationInfoPopupComponent} from '@app/shared/popups/general-location-info-popup/general-location-info-popup.component';
import {CatAnalysisInfoComponent} from '@app/shared/popups/general-location-info-popup/cat-Analysis-Info/cat-Analysis-Info.component';
import {GeneralDetailsComponent} from '@app/shared/popups/general-location-info-popup/general-details/general-details.component';
import {GeographicalComponent} from '@app/shared/popups/general-location-info-popup/geographical/geographical.component';
import {MoreInfoComponent} from '@app/shared/popups/general-location-info-popup/more-info/more-info.component';
import {MplComponent} from '@app/shared/popups/general-location-info-popup/mpl/mpl.component';
import {PricingComponent} from '@app/shared/popups/general-location-info-popup/pricing/pricing.component';
import {TandCComponent} from '@app/shared/popups/general-location-info-popup/tand-C/tand-C.component';
import {InsurredValuesComponent} from '@app/shared/popups/general-location-info-popup/insurred-values/insurred-values.component';
import {KeysPipe} from '@app/shared/popups/general-location-info-popup/pipes/keys.pipe';

export * from './shared.module';

export const POPUPS_COMPONENTS = [GeneralLocationInfoPopupComponent, CatAnalysisInfoComponent, GeneralDetailsComponent, GeographicalComponent, InsurredValuesComponent, MoreInfoComponent, MplComponent, PricingComponent, TandCComponent];
export const POPUPS_PIPES = [KeysPipe];
