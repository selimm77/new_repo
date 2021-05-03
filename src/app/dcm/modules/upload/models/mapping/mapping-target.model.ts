import { MappingSourceItem, MappingSourceItemTuple } from './mapping-source.model';
import { MappingTaxonomy } from './mapping-txonomy';

export class MappingTargetItemTuple{
  value: string
  viewValue: string

  constructor(obj){
    this.value = obj.value
    this.viewValue = obj.viewValue
  }
}

export class MappingTargetItem extends MappingTargetItemTuple{
  mappedItems: any[] = []
  // mappedItems: MappingSourceItemTuple[] = []
    mandatory: boolean
    mappingMandatory: boolean
    property: any
    group: any
    mappable: any
    editable: any
    format: any
    length: any
    defaultValue: any
    necessity: any
    mappingRules: any
    test: any
    formula: string
    isMandatoryByRule: boolean
    isNotMandatoryByRule: boolean
    isDisabled: boolean
    canBeMappedByDragItem: boolean

    constructor(value, viewValue, obj?: any)
    {
        super({value: value, viewValue: viewValue})

        this.value = value
        this.viewValue = viewValue        

      if (obj) {
        this.mappedItems = obj.mappedItems || this.mappedItems
        if (obj.necessity === 'mandatory') {
          this.mandatory = true
        }
        
        this.property = obj.property
        this.group = obj.group
        this.mappable = obj.mappable
        this.editable = obj.editable
        this.format = obj.format
        this.defaultValue = obj.defaultValue
        this.mappingRules = obj.mappingRules
        this.necessity = obj.necessity
        this.test = obj.test
        
        this.formula = obj.formula
        this.length = obj.length
        this.canBeMappedByDragItem = obj.canBeMappedByDragItem
        this.isMandatoryByRule = obj.isMandatoryByRule
        this.isNotMandatoryByRule = obj.isNotMandatoryByRule
        this.isDisabled = obj.isDisabled
      }
    }

    addSource(e: MappingSourceItem)
    {
        if ( this.canAddSource() && !this.hasSource(e))
        {
            this.mappedItems.push( new MappingSourceItemTuple(e) );
        }
    }

    removeSource(e: MappingSourceItem)
    {
        this.mappedItems = this.mappedItems.filter(i => e.value !== i.value)
    }

    canAddSource()
    {
        return (this.mappedItems.length < MAX_MAPPING_ITEMS)
    }

    hasSource(e: MappingSourceItem)
    {
        return (this.mappedItems.find(i => i.value === e.value))
    }

    setMandatoryRules(isMandatoryByRule, isNotMandatoryByRule, isDisabled?)
    {
      this.isMandatoryByRule = isMandatoryByRule;
      this.isNotMandatoryByRule = isNotMandatoryByRule;
      this.isDisabled = isDisabled || false
    }
}

export class MappingTargetItemTaxonomies extends MappingTargetItemTuple{
  taxonomies: MappingTaxonomy[] = [];

  loading: boolean;
  loaded: boolean;
  isSuggestion: boolean;

  constructor(obj)
  {
    super(obj);
    this.taxonomies = obj.taxonomies || []
  }
}

export const MAX_MAPPING_ITEMS = 1;
// export const MAX_MAPPING_ITEMS = 3;
