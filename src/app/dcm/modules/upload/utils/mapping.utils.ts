import {MappingTargetItem} from './../models/mapping/mapping-target.model';
import {MappingSourceItem, MappingSourceItemTuple} from './../models/mapping/mapping-source.model';
import * as _ from 'lodash'

export default class MappingUtils {

  public static processAutomaticMapping(sources: MappingSourceItem[], targets/* : MappingTargetItem[] */, suggestions: any) {
    const mapping: {} = suggestions.mapping || {};
    const taxonomies: {} = suggestions.taxonomies;
    const transformSource = [];
    const transformTarget = [];
    const targetNoMappedItems = [];
    const souceNoMappedItems = [];
    const viewValueS = [];
    const viewValueT = [];

    const newSource = [];
    const newTarget = [];
    const mappAuto = [];
    const sourceAuto = [];

    // AUTOMATIC MAPPING
    Object.keys(mapping).forEach(targetId => {
      targets.forEach(t => {
        if (t.value === targetId) {
          mappAuto.push(t.value)
          t.mappedItems = [{
            value: targetId,
            viewValue: mapping[targetId]
          }]
          newTarget.push(t);
          transformTarget.push(t)
        }
      })
    })

    // SUGGESTIONS
    Object.keys(mapping).forEach(targetId => {
      
        sources.forEach(s => {
          if (s.value === mapping[targetId] && !sourceAuto.includes(s.value)) {
            sourceAuto.push(s.value);
            s.taxonomies = [{
              value: targetId,
              viewValue: mapping[targetId]
            }]
            newSource.push(s);
            transformSource.push(s)
          }
        });
    });


    targets.forEach(t => {
      if (!mappAuto.includes(t.value)) {
        // targetNoMappedItems.push(t)
        transformTarget.push(t)
      }
    })
    sources.forEach(s => {
      if (!sourceAuto.includes(s.value)) {
        transformSource.push(s)
        // souceNoMappedItems.push(s)
      }
    })
    return { sources: transformSource, targets: transformTarget/* , targetsNoItems: targetNoMappedItems, souceNoMappedItems: souceNoMappedItems */ }
  }

  public static copyTarget(target: MappingTargetItem): MappingTargetItem {
    const clonedObj: any = _.cloneDeep(target);
    return new MappingTargetItem(clonedObj.value, clonedObj.viewValue, {
      ...clonedObj,
      mappedItems: [...clonedObj.mappedItems]
    });
  }
}
