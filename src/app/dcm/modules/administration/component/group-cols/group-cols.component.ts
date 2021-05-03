import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NzMessageService, NzModalService} from "ng-zorro-antd";
import {Store} from "@ngrx/store";
import {AppState} from "@app/core";
import {selectDone, selectGroups, selectLob} from "@app/dcm/modules/administration/store/configadmin.selectors";
import {Category} from "@app/dcm/modules/administration/store/configadmin.model";
import {ActionAddGroup, ActionValidateGroups} from "@app/dcm/modules/administration/store/configadmin.actions";
import {ConfigAdminService} from "@app/dcm/modules/administration/services/config.service";

@Component({
  selector: 'anms-group-cols',
  templateUrl: './group-cols.component.html',
  styleUrls: ['./group-cols.component.css']
})
export class GroupColsComponent implements OnInit {
  groups: Category[];
  groupForm: FormGroup;
  newGroups: Category[] = [];
  currentLob;

  constructor(private fb: FormBuilder, private message: NzMessageService,
              private store: Store<AppState>, private configService: ConfigAdminService,
              private modalService: NzModalService, private cdrf: ChangeDetectorRef) {
    this.groupForm = this.fb.group({
      label: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.store.select(selectGroups).subscribe(liste => {
      this.newGroups = [...liste];
      this.cdrf.detectChanges()
    });
    this.store.select(selectLob).subscribe(lob => {
      this.currentLob = lob
      this.configService.getCategories(lob).subscribe((liste: any) => {
        if (liste)
          this.groups = liste.categories
      })

    })
    this.store.select(selectDone).subscribe(done => {
      if (done) {
        this.configService.getCategories(this.currentLob).subscribe((liste: any) => {
          if (liste)
            this.groups = liste.categories
          this.cdrf.detectChanges()
        })

      }
    })
  }


  addGroup() {
    let group = {
      code: this.groupForm.value.label.trim().split(" ").join("_").toLowerCase(),
      label: this.groupForm.value.label,
      name: this.groupForm.value.label
    }

    this.configService.validateGroup(this.currentLob.id, group).then(result => {
      if (result.ok) {
        this.newGroups.push(group)
        this.store.dispatch(new ActionAddGroup({group: this.newGroups}))
        this.groupForm.reset();
      }
    }, (err) => {
      let message = ""
      if (err.error.errors) {
           message = err.error.errors
       } else message = "ERROR with Input  "
      this.message.error(message)
    })


  }

  delete(group) {
    this.modalService.confirm({
      nzTitle: ' delete Group Column',
      nzContent: 'Are you sure to continue? ',
      nzOnOk: () => {
        this.newGroups = this.newGroups.filter(gr => gr.label !== group.label);
        this.store.dispatch(new ActionAddGroup({group: this.newGroups}))
        this.cdrf.detectChanges()
      }
    });

  }

  clearAll() {
    this.modalService.confirm({
      nzTitle: ' Clear group Columns',
      nzContent: 'Are you sure to continue? ',
      nzOnOk: () => {
        this.newGroups = [];
        this.store.dispatch(new ActionAddGroup({group: this.newGroups}))
        this.cdrf.detectChanges()
      }
    });
  }

  ValidateAll() {
    this.store.dispatch(new ActionValidateGroups())
    this.cdrf.detectChanges()

  }
}
