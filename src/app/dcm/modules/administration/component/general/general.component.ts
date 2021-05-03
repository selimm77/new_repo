import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "@app/core";
import {selectLob} from "@app/dcm/modules/administration/store/configadmin.selectors";
import {ActionReset, ActionSelectLob} from "@app/dcm/modules/administration/store/configadmin.actions";
import {ConfigAdminService} from "@app/dcm/modules/administration/services/config.service";

@Component({
  selector: 'anms-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class GeneralComponent implements OnInit {
  lobs: any[] = [];
  lobSelected: any;

  constructor(private store: Store<AppState>, private cdrf: ChangeDetectorRef,
              private configService: ConfigAdminService) {
  }

  ngOnInit() {
    this.configService.getLobs().subscribe((liste: any) => {
      this.lobs = liste.lobs;
      this.cdrf.detectChanges();
    })
    this.store.select(selectLob).subscribe(data => {
      if (data) this.lobSelected = data;
      this.cdrf.detectChanges();

    })
  }

  selectLob() {
    this.store.dispatch(new ActionReset())
    this.store.dispatch(new ActionSelectLob({lob: this.lobSelected}))
  }

  compareFn(o1: any, o2: any) {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }
}
