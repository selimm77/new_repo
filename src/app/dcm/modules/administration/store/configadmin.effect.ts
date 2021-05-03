import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {Action, Store} from "@ngrx/store";
import {AppState} from "@app/core";
import {ConfigAdminService} from "@app/dcm/modules/administration/services/config.service";
import {map, withLatestFrom} from "rxjs/operators";
import {
  ActionAddDatacheck,
  ActionAddField,
  ActionAddGroup,
  ActionDoneGroup,
  ConfigActions,
  ConfigActionTypes
} from "@app/dcm/modules/administration/store/configadmin.actions";
import {
  selectDatachecks,
  selectFields,
  selectGroups,
  selectLob
} from "@app/dcm/modules/administration/store/configadmin.selectors";
import {NzMessageService} from "ng-zorro-antd";

@Injectable()
export class ConfigadminEffect {


  @Effect({dispatch: false})
  validateGroups = this.actions$.pipe(
    ofType<ConfigActions>(ConfigActionTypes.VALIDATE_GROUP),
    withLatestFrom(this.store$.select(selectGroups), this.store$.select(selectLob)),
    map(([action, groups, lob]) => {
      this.store$.dispatch(new ActionDoneGroup({done: false}))
      this.configService.saveGroups(groups, lob)
        .then(status => {
          this.store$.dispatch(new ActionAddGroup({group: []}));
          this.store$.dispatch(new ActionDoneGroup({done: true}))
          this.notif.info('Validation Group Done ')

        }, err => {
          this.store$.dispatch(new ActionAddGroup({group: []}));
          let message = "";
          if (err.error) {
            Object.keys(err.error.errors).forEach(key => message = message.concat(key).concat(':').concat(err.error.errors[key]))

          } else {
            message = 'ERROR while save '
          }
          this.notif.error(message)
        })


    })
  );

  @Effect({dispatch: false})
  validateFields = this.actions$.pipe(
    ofType<ConfigActions>(ConfigActionTypes.VALIDATE_FIELDS),
    withLatestFrom(this.store$.select(selectFields),
      this.store$.select(selectLob)),
    map(([action, fields, lob]) => {
      this.configService.saveFields(fields, lob)
        .then(status => {
          this.notif.info('Validation Fields Done ')
          this.store$.dispatch(new ActionAddField({field: []}))
        }, err => {
          let message = "";
          if (err.error.errors) Object.keys(err.error.errors).forEach(key => message = message.concat(key).concat(':').concat(err.error.errors[key]))
          else message = "ERROR while Save "
          this.notif.error(message)
        })
    })
  );
  @Effect({dispatch: false})
  validateDatachecks = this.actions$.pipe(
    ofType<ConfigActions>(ConfigActionTypes.VALIDATE_DATACHECKS),
    withLatestFrom(this.store$.select(selectDatachecks)),
    map(([action, ds]) => {
      this.store$.dispatch(new ActionAddDatacheck({datacheck: []}))
      this.notif.success('Datachecks Sent to IT  ')

    })
  );

  constructor(
    private actions$: Actions<Action>,
    private store$: Store<AppState>,
    private configService: ConfigAdminService,
    private notif: NzMessageService
  ) {
  }
}
