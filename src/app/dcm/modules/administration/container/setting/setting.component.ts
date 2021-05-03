import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "@app/core";
import {selectLob} from "@app/dcm/modules/administration/store/configadmin.selectors";

@Component({
  selector: 'anms-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit, OnDestroy {
  lobSelected: boolean

  constructor(private store: Store<AppState>) {

  }

  ngOnInit() {
    this.store.select(selectLob).subscribe(data=>{
      this.lobSelected = data!== null && data !== undefined
    })
  }

  ngOnDestroy(): void {

  }

}
