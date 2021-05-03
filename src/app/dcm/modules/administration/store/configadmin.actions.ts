import {Action} from "@ngrx/store";
import {Category, Field, LOB} from "@app/dcm/modules/administration/store/configadmin.model";

export enum ConfigActionTypes {
  ADD_GROUP = '[Config] Add group',
  ADD_FIELD = '[Config] Add field',
  SELECT_LOB = '[Config] Select Lob',
  ADD_DATACHECK = '[Config] Add Datacheck',
  RESET = '[Config] Reset data ',
  VALIDATE_GROUP = '[Config] Validate Group added',
  VALIDATE_FIELDS = '[Config] Validate Fields added',
  VALIDATE_DATACHECKS = '[Config] Validate Datachecks added',
  DONE_GROUP = '[Config] done validation ',
}

export class ActionAddGroup implements Action {
  readonly type = ConfigActionTypes.ADD_GROUP;

  constructor(readonly payload: { group: Category[] }) {
  }
}
export class ActionDoneGroup implements Action {
  readonly type = ConfigActionTypes.DONE_GROUP;

  constructor(readonly payload: { done:boolean }) {
  }
}

export class ActionAddField implements Action {
  readonly type = ConfigActionTypes.ADD_FIELD;

  constructor(readonly payload: { field: Field[] }) {
  }
}

export class ActionAddDatacheck implements Action {
  readonly type = ConfigActionTypes.ADD_DATACHECK;

  constructor(readonly payload: { datacheck: any[] }) {
  }
}

export class ActionSelectLob implements Action {
  readonly type = ConfigActionTypes.SELECT_LOB;

  constructor(readonly payload: { lob: LOB}) {
  }
}

export class ActionReset implements Action {
  readonly type = ConfigActionTypes.RESET;

}

export class ActionValidateGroups implements Action {
  readonly type = ConfigActionTypes.VALIDATE_GROUP;


}
export class ActionValidateFields implements Action {
  readonly type = ConfigActionTypes.VALIDATE_FIELDS;

}
export class ActionValidateDatachecks implements Action {
  readonly type = ConfigActionTypes.VALIDATE_DATACHECKS;

}

export type ConfigActions = ActionAddDatacheck | ActionAddField | ActionSelectLob | ActionAddGroup |ActionReset |ActionDoneGroup
