import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NzMessageService, NzModalService} from "ng-zorro-antd";
import {Field, LOB} from "@app/dcm/modules/administration/store/configadmin.model";
import {AppState} from "@app/core";
import {Store} from "@ngrx/store";
import {selectFields, selectLob} from "@app/dcm/modules/administration/store/configadmin.selectors";
import {first} from "rxjs/operators";
import {ActionAddField, ActionValidateFields} from "@app/dcm/modules/administration/store/configadmin.actions";
import {DatacheckCreateComponent} from "@app/dcm/modules/administration/component/datacheck-create/datacheck-create.component";
import {MatDialog} from "@angular/material/dialog";
import {ConfigAdminService} from "@app/dcm/modules/administration/services/config.service";

@Component({
  selector: 'anms-fields',
  templateUrl: './fields.component.html',
  styleUrls: ['./fields.component.css']
})
export class FieldsComponent implements OnInit {
  formFields: FormGroup;
  fields: Field[] = [];
  columns: any[] = [];
  datachecks: any [] = [];
  types: any[] = [];
  currentLob: LOB
  datachecksValidate: any[]
  allfields: any[];
  loadingadd: boolean = false
showDigit = false;
  constructor(private fb: FormBuilder, private message: NzMessageService,
              private store: Store<AppState>, public dialog: MatDialog,
              private configService: ConfigAdminService,
              private msg: NzMessageService,
              private cdrf: ChangeDetectorRef, private modalService: NzModalService) {
    this.formFields = this.fb.group({
      name: ['', Validators.required],
      shortName: ['', Validators.required],
      dataType: [null, Validators.required],
      isEditable: true,
      showInCollapsed: false,
      isMappable: true,
      skipDigits : false,
      necessity: 'mandatory',
      category: [null, Validators.required],
      inCategoryOrder: [1, Validators.required]
    })
  }

  ngOnInit() {
    this.store.select(selectLob).pipe(first(data => data != undefined)).subscribe(lob => {
      this.currentLob = lob;
      this.configService.getCategories(this.currentLob).subscribe((liste: any) => this.columns = liste.categories);
      this.configService.getFields(this.currentLob).subscribe((liste: any) => this.allfields = liste.fields)

    })

    this.configService.getDatatypes().subscribe((liste: any) => this.types = liste.datatypes)
    this.formFields.controls['dataType'].valueChanges.subscribe(type => {
      this.getdatachecks(type)
    })
    this.store.select(selectFields).subscribe(fields => {
      this.fields = [...fields];
      this.cdrf.detectChanges()
    })
  }

  getdatachecks(type) {
    this.configService.getDatacheckforType(type).subscribe(data => this.datachecksValidate = data.checkRules);
    if(type==='DOUBLEDT'){
      this.showDigit = true
    }
    else {
      this.showDigit = false
    }
  }

  delete(field) {

    this.modalService.confirm({
      nzTitle: ' delete Field',
      nzContent: 'Are you sure to continue? ',
      nzOnOk: () => {
        this.fields = this.fields.filter(f => {
          return f.name !== field.name
        });
        this.store.dispatch(new ActionAddField({field: this.fields}))
        this.cdrf.detectChanges();
      }
    })
  }

  addField() {

    if (this.checkFieldsAdded()) {
      this.message.create('error', 'this Field ' + this.formFields.value.name + 'Already Existe ');

    } else {
      this.loadingadd = true;
      let newDatacheck = [...this.datachecks]

      let newField :any = {
        checkRules: newDatacheck,
        lob: this.currentLob,
        name: this.formFields.value.name,
        shortName: this.formFields.value.shortName,
        code: this.formFields.value.name.trim().split(" ").join("_").toLowerCase(),
        dataType: this.formFields.value.dataType,
        necessity: this.formFields.value.necessity,
        isEditable: this.formFields.value.isEditable,
        showInCollapsed: this.formFields.value.showInCollapsed,
        isMappable: this.formFields.value.isMappable,
        category: this.formFields.value.category,
        inCategoryOrder: Number(this.formFields.value.inCategoryOrder),
        createdAt: new Date(),
        updatedAt: new Date()

      }
      if(newField.dataType ==='DOUBLEDT'){
        newField.skipDecimalDigits = this.formFields.value.skipDigits;
      }
      this.configService.validate(newField).then(data => {
        if (data.ok) {
          this.fields.push(newField)
          this.store.dispatch(new ActionAddField({field: this.fields}))
          this.datachecks = [];
          this.formFields.reset(
            {
              name: null,
              shortName: null,
              dataType: null,
              isEditable: true,
              showInCollapsed: false,
              isMappable: true,
              necessity: 'mandatory',
              category: null,
              inCategoryOrder: 1
            }
          );
          this.cdrf.detectChanges()
          this.loadingadd = false
        } else {
          if (data.error.errors) this.msg.error(data.error.errors)
          else this.msg.error('ERROR While Validation')
          this.loadingadd = false;
        }
      }, (err) => {

        if (err.error.errors) {
          this.msg.error(err.error.errors)
          this.loadingadd = false;
          this.cdrf.detectChanges()

        }
      })

    }
  }

  checkFieldsAdded() {
    return this.fields.filter(f => f.name.toLowerCase() === this.formFields.value.name.toLowerCase()).length > 0
  }

  newDatacheck() {
    const modal = this.dialog.open(DatacheckCreateComponent, {
      width: '60%',
      data: {checks: this.datachecksValidate, allFields: this.allfields}
    })


    modal.afterClosed().subscribe(result => {
      if (result) {
        this.datachecks = this.datachecks.filter(ds => ds.code !== result.code)
        this.datachecks.push(result)
        this.datachecks = [...this.datachecks];
        this.cdrf.detectChanges()
      }
    });

  }

  clearAll() {
    this.modalService.confirm({
      nzTitle: ' Clear Fields',
      nzContent: 'Are you sure to continue? ',
      nzOnOk: () => {
        this.fields = [];
        this.store.dispatch(new ActionAddField({field: this.fields}))
        this.cdrf.detectChanges()
      }
    });
  }

  validateAll() {
    this.store.dispatch(new ActionValidateFields())
  }

  resetDatachecks() {
    this.datachecks = [];
  }

  deletedatachek(ds) {
    this.datachecks = this.datachecks.filter(datacheck => datacheck.type.code !== ds.type.code)
  }

  changeCategory() {
    if (this.formFields.value.category)
      this.formFields.controls['inCategoryOrder'].patchValue(this.formFields.value.category.fieldsCount + 1)
    else {
      this.formFields.controls['inCategoryOrder'].patchValue(1)

    }
  }
}
