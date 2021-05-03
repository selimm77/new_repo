export interface ConfigadminState {
  lob: LOB;
  groupsAdded: Category[];
  fieldsAdded: Field[];
  datachecksAdded: any[];
  doneGroup :boolean

}

export interface Field {
  shortName: string;
  name: string;
  code: string;
  category: any;
  createdAt: Date;
  updatedAt: Date;
  dataType: string;
  checkRules: RuleDatacheck[];
  inCategoryOrder: number;
  isEditable: boolean;
  isMappable: boolean;
  lob: LOB
  necessity: string;
  showInCollapsed: boolean;
}

export interface Category {
  code: string;
  label: string;
  name:string
}
export interface Datacheck {
  rules  :RuleDatacheck[]
}
export interface RuleDatacheck {
  type: string;
  level: string;
  message: string;
  reference: Reference;
  properties: any[];
  rel:any[]

}

export interface Reference {

  collection: string;
  values: string[];

}

export interface LOB {
  id: number;
  name: string;
}
