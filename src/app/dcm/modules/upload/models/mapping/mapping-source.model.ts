import { MappingTargetItem, MappingTargetItemTuple } from './mapping-target.model';

export class MappingSourceItemTuple{
  value: string
  viewValue: string

  constructor(obj){
    this.value = obj.value
    this.viewValue = obj.viewValue
  }
}

export class MappingSourceItem extends MappingSourceItemTuple{
    mapped = false

    taxonomies: any[] = []
    // taxonomies: MappingTargetItemTuple[] = []

    constructor(value, viewValue)
    {
        super({value: value, viewValue: viewValue})
        this.value = value
        this.viewValue = viewValue
    }


    addTex(e: MappingTargetItem)
    {
        if ( !this.hasTex(e))
        {
            this.taxonomies.push( new MappingTargetItemTuple(e) );
        }
    }

    removeTex(e: MappingTargetItem)
    {
        this.taxonomies = this.taxonomies.filter(i => e.value !== i.value)
    }

    hasTex(e: MappingTargetItem)
    {
        return (this.taxonomies.find(i => i.value === e.value))
    }
}
