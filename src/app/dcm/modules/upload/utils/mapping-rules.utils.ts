import {MappingParamaters} from './../models/mapping/mapping-paramaters.model';
import {MappingTargetItem} from './../models/mapping/mapping-target.model';
import {MappingSourceItem} from './../models/mapping/mapping-source.model';

export default class MappingRulesUtils {

  // Mapped
  public static LangOrLatMapped(targets: MappingTargetItem[]) {
    return (this.LangMapped(targets) || this.LatMapped(targets))
  }

  public static LangMapped(targets: MappingTargetItem[]) {
    const newLocal = 'longitude';
    return MappingRulesUtils.isFiledMapped(targets, newLocal);
  }

  public static LatMapped(targets: MappingTargetItem[]) {
    const newLocal = 'latitude';
    return MappingRulesUtils.isFiledMapped(targets, newLocal);
  }

  public static BiValueMapped(targets: MappingTargetItem[]){
    const newLocal = 'biValue';
    return MappingRulesUtils.isFiledMapped(targets, newLocal);
  }

  public static pdValueMapped(targets: MappingTargetItem[]){
    const newLocal = 'pbValue';
    return MappingRulesUtils.isFiledMapped(targets, newLocal);
  }

  public static CountryMapped(targets: MappingTargetItem[]) {
    const newLocal = 'country';
    return MappingRulesUtils.isFiledMapped(targets, newLocal);
  }

  public static ContentValueMapped(targets: MappingTargetItem[]) {
    const newLocal = 'content';
    return MappingRulesUtils.isFiledMapped(targets, newLocal);
  }

  public static declarationPeriodMapped(targets: MappingTargetItem[]) {
    const newLocal = 'bi_declaration_period';
    return MappingRulesUtils.isFiledMapped(targets, newLocal);
  }

  // new mapped
  public static MplpdValueMapped(targets: MappingTargetItem[]) {
    const newLocal = 'mpl_pd_value';
    return MappingRulesUtils.isFiledMapped(targets, newLocal);
  }

  public static MplpdPercentageMapped(targets: MappingTargetItem[]) {
    const newLocal = 'mpl_pd_percentage';
    return MappingRulesUtils.isFiledMapped(targets, newLocal);
  }

  public static MplbiValueMapped(targets: MappingTargetItem[]) {
    const newLocal = 'mpl_bi_value';
    return MappingRulesUtils.isFiledMapped(targets, newLocal);
  }

  public static MplbiPercentageMapped(targets: MappingTargetItem[]) {
      const newLocal = 'mpl_bi_percentage';
      return MappingRulesUtils.isFiledMapped(targets, newLocal);
    }

    public static PdMapped(targets: MappingTargetItem[]) {
      const newLocal = 'pd_value';
      return MappingRulesUtils.isFiledMapped(targets, newLocal);
    }

    public static BiMapped(targets: MappingTargetItem[]) {
      const newLocal = 'bi_value';
      return MappingRulesUtils.isFiledMapped(targets, newLocal);
    }


    public static CleansedCountryMapped(targets: MappingTargetItem[]) {
      const newLocal = 'cleansed_country';
      return MappingRulesUtils.isFiledMapped(targets, newLocal);
    }

    
    public static CleansedLatitudeMapped(targets: MappingTargetItem[]) {
      const newLocal = 'cleansed_latitude';
      return MappingRulesUtils.isFiledMapped(targets, newLocal);
    }

    public static CleansedLongitudeMapped(targets: MappingTargetItem[]) {
      const newLocal = 'cleansed_longitude';
      return MappingRulesUtils.isFiledMapped(targets, newLocal);
    }
    
    public static CleansedIso2Mapped(targets: MappingTargetItem[]) {
      const newLocal = 'cleansed_iso2';
      return MappingRulesUtils.isFiledMapped(targets, newLocal);
    }

    public static CleansedIso3Mapped(targets: MappingTargetItem[]) {
      const newLocal = 'cleansed_iso3';
      return MappingRulesUtils.isFiledMapped(targets, newLocal);
    }

  private static isFiledMapped(targets: MappingTargetItem[], newLocal: string) {
    const filed = targets.find(t => t.property === newLocal);
    return ((filed && filed.mappedItems.length > 0));
  }

  public static isMissMandatory(targets: any[]) {
    for (let i = 0; i < targets.length; i++) {
      const t = targets[i];
      if (t.mandatory === true && t.mappedItems.length === 0) {
        return true;
      }
    }
    return false;
  }
  public static numberMissMandatory(targets: MappingTargetItem[]) {
    let nbMandatory = 0;
    for (let i = 0; i < targets.length; i++) {
      const t = targets[i];
      if (t.mandatory === true && t.mappedItems.length === 0) {
        nbMandatory +=1;
      }
    }
    return nbMandatory;
  }

  public static missMandatory(targets: MappingTargetItem[]) {
    let nbMandatory = 0;
    for (let i = 0; i < targets.length; i++) {
      const t = targets[i];
      
      if (this.isFieldMandatoryInit(t, targets)) {
        nbMandatory +=1;
      }
    }
    return nbMandatory;
  }

  // Top Panel
  public static isCountrySetOnPanel(parameters: MappingParamaters) {
    return (parameters && parameters.country !== 'sch');
  }

  public static isDeclarationPeriodSetOnPanel(parameters: MappingParamaters) {
    return (parameters && parameters.declaration  );
  }

  // general
  public static isCountryNotMandatory(targets: MappingTargetItem[], parameters: MappingParamaters) {
    return this.CountryMapped(targets) || this.isCountrySetOnPanel(parameters)
  }


  // Mandatory processing
  // mei4 new version
  public static isFieldMandatory(t: MappingTargetItem) {
    return t.mandatory
  }

  public static resetAllMappings(targets: MappingTargetItem[]) {
    let targetsOut = [];
    const targetTemp = Object.assign([], targets);
    for (let i = 0; i < targetTemp.length; i++) {
    const targetsTemp = Object.assign({}, targetTemp[i]);
    targetsTemp.mappedItems = []
    targetsOut.push(targetsTemp);
    }

    return targetsOut;
  }

  public static isFieldMandatoryInit(ct: MappingTargetItem, targets: MappingTargetItem[] ) {
    switch (ct.property) {
      case 'mpl_pd_value':
        if (MappingRulesUtils.MplpdPercentageMapped(targets)) {
          return false;
        }
        break;
        case 'mpl_pd_percentage':
          if (MappingRulesUtils.MplpdValueMapped(targets)) {
            return false;
          }
          break;
          case 'mpl_bi_value':
        if (MappingRulesUtils.MplbiPercentageMapped(targets)) {
          return false;
        }
        break;
        case 'mpl_bi_percentage':
        if (MappingRulesUtils.MplbiValueMapped(targets)) {
          return false;
        }
        break;
        case 'tiv_amount':
        if (MappingRulesUtils.PdMapped(targets) || MappingRulesUtils.BiMapped(targets)) {
          return false;
        }
        break;
        default:
          return ct.mandatory;
    }
    
    }

  public static isFieldMissMandatory(t: MappingTargetItem[]) {
    for (let i = 0; i < t.length; i++) {
      const elmt = t[i];
      if (elmt.mandatory && elmt.mappedItems.length === 0) {
        return true;
      }
    }
    return false;
  }

  public static missMandatoryByFile(t: MappingTargetItem[]) {
    let number = 0;
    for (let i = 0; i < t.length; i++) {
      const elmt = t[i];
      if (elmt.mandatory && elmt.mappedItems.length === 0) {
        number++;
      }
    }
    return number;
  }
  /* // mei4 old version
  public static isFieldMandatory(t: MappingTargetItem) {
    return t.mandatory && !t.isDisabled && t.mappable && (
      !t.isNotMandatoryByRule || t.isMandatoryByRule
    )
  } */
}
