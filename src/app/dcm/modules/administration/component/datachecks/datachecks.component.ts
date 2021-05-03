import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {AppState} from "@app/core";
import {selectDatachecks} from "@app/dcm/modules/administration/store/configadmin.selectors";
import {ActionAddDatacheck, ActionValidateDatachecks} from "@app/dcm/modules/administration/store/configadmin.actions";
import {NzModalService} from "ng-zorro-antd";

@Component({
  selector: 'anms-datachecks',
  templateUrl: './datachecks.component.html',
  styleUrls: ['./datachecks.component.css']
})
export class DatachecksComponent implements OnInit {
  formDs: FormGroup;
  datacheckToAdd: any[] = [];

  constructor(private  fb: FormBuilder, private store: Store<AppState>, private cdrf: ChangeDetectorRef, private modalService: NzModalService) {
    this.formDs = this.fb.group({
      description: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.store.select(selectDatachecks).subscribe(liste => this.datacheckToAdd = [...liste])
  }

  adddescriptions() {
    this.datacheckToAdd.push({
      description: this.formDs.value.description
    });
    this.store.dispatch(new ActionAddDatacheck({datacheck: this.datacheckToAdd}))
    this.formDs.reset();
  }

  delete(datacheck) {
    this.modalService.confirm({
      nzTitle: ' delete Datacheck Description',
      nzContent: 'Are you sure to continue? ',
      nzOnOk: () => {
        this.datacheckToAdd = this.datacheckToAdd.filter(gr => gr.description !== datacheck.description);
        this.store.dispatch(new ActionAddDatacheck({datacheck: this.datacheckToAdd}));
        this.cdrf.detectChanges()
      }
    });

  }

  clearAll() {
    this.modalService.confirm({
      nzTitle: ' Clear Datacheck Description',
      nzContent: 'Are you sure to continue? ',
      nzOnOk: () => {
        this.datacheckToAdd = [];
        this.store.dispatch(new ActionAddDatacheck({datacheck: this.datacheckToAdd}));
        this.cdrf.detectChanges()
      }
    });
  }

  validateAll() {
    this.store.dispatch(new ActionValidateDatachecks())

  }
}
