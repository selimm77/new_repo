import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NzMessageService} from "ng-zorro-antd";
import {ConfigAdminService} from "@app/dcm/modules/administration/services/config.service";
import {first} from "rxjs/operators";

@Component({
  selector: 'anms-datacheck-create',
  templateUrl: './datacheck-create.component.html',
  styleUrls: ['./datacheck-create.component.css']
})
export class DatacheckCreateComponent implements OnInit {

  inputValue: string = '';
  message: string;
  inputVisible: boolean = false;
  collections: any[];
  value: boolean = false
  formDatacheck: FormGroup;
  properties: any[] = [];
  reference: {
    source: string;
    values: string[];
  };
  checks: any;
  fieldstoCheck: any[];
  fieldRel: any[] = [];

  constructor(private fb: FormBuilder, private modalRef: MatDialogRef<DatacheckCreateComponent>,
              private cdrf: ChangeDetectorRef, private configService: ConfigAdminService,
              private msgService: NzMessageService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.formDatacheck = fb.group({
      type: [null, Validators.required],
      level: [null, Validators.required],
      message: [null],
      selectedrel: null
    })

  }

  ngOnInit() {
    this.checks = this.data.checks;
    this.configService.getCollections().pipe(first(res => res !== undefined)).subscribe(data => {
      if (data) {
        this.collections = data.references;
      }
    })

    this.formDatacheck.controls['type'].valueChanges.subscribe(type => {
      switch (type.code) {
        case 'REFDS':
          this.properties = []
          this.reference = {
            values: [],
            source: null
          }
          break;
        default :
          this.properties = [];
          if (type.properties) type.properties.forEach(ps => {
            this.properties.push({
              name: ps.name,
              type: ps.type,
              match: ps.match,
              description: ps.description,
              value: null,
              valid: !ps.match
            })
          });

          this.reference = null;
          break;
      }


    })
    this.formDatacheck.controls['selectedrel'].valueChanges.subscribe(
      line => this.search(line))
  }

  handleClose(removedTag): void {
    this.reference.values = this.reference.values.filter(tag => tag !== removedTag);
  }

  handleInputConfirm(): void {
    if (this.inputValue && this.reference.values.indexOf(this.inputValue) === -1) {
      this.reference.values = [...this.reference.values, this.inputValue];
    }
    this.inputValue = '';
    this.inputVisible = false;
  }

  updateMessage() {
    if (this.formDatacheck.value.type) {
      this.message = this.formDatacheck.value.type.description
    } else this.message = null
  }

  modifyData() {

    let checkProperties =
      this.properties.length > 0
      && (this.properties.filter(pr => !pr.valid).length > 0 || this.properties.filter(pr => pr.value !== null).length === 0);
    let checkReference = (this.reference && (
      (!this.value && !this.reference.source)
      || (this.reference.values.length == 0 && this.value)))
    if (checkProperties) {
      this.msgService.error('Please check the properties !')
    } else if (checkReference) {
      this.msgService.error('Please  complete the Reference !')
    } else {
      let propertiesCheck;
      if (this.properties.length > 0) {
        propertiesCheck = this.properties.filter(pr => pr.value !== null);

      }
      if (this.reference) {
        if (this.value) {
          this.reference.source = null
        } else {
          this.reference.values = []
        }
      }
      let rel = [];
      this.fieldRel.forEach(f => rel.push(f.code))
      let datacheck: any = {
        level: this.formDatacheck.value.level,
        message: this.formDatacheck.value.message ? this.formDatacheck.value.message : this.formDatacheck.value.type.defaultMessage,
        properties: propertiesCheck,
        code: this.formDatacheck.value.type.code,
        rel: rel
      }
      this.configService.validateDatcheck(datacheck).then(result => {
        if (result.ok) {
          let reference = {...this.reference}
          if (!this.value) {
            delete reference.values;
          } else
            delete reference.source
          datacheck.type = this.formDatacheck.value.type
          datacheck.ref = this.reference
          this.modalRef.close(datacheck)

        }

      }, (err) => {

        let message = ""
        if (err.error.errors) {
          Object.keys(err.error.errors).forEach(key => {
            message = message.concat(key).concat(':').concat(err.error.errors[key])
          })
        } else message = "ERROR while save "
        this.msgService.error(message)
      })
    }
  }

  close() {
    this.modalRef.close()
  }

  search(input) {
    if (input)
      this.fieldstoCheck = this.data.allFields.filter(fie => fie.name.includes(input))
    else this.fieldstoCheck = [];
  }

  relSelected(field) {
    let value = field.nzValue
    if (this.fieldRel.length == 0) {
      this.fieldRel.push(value)
      this.fieldstoCheck = [];
      this.cdrf.detectChanges()

    } else {
      if (this.fieldRel.filter(f => f.code === value.code).length === 0) {
        this.fieldRel.push(value);
        this.fieldstoCheck = [];
      } else {
        this.fieldstoCheck = [];
      }

    }
    setTimeout(() => this.reset(), 5);
  }

  reset() {
    this.formDatacheck.controls['selectedrel'].patchValue(null)
  }

  removeRel(field) {
    this.fieldRel = this.fieldRel.filter(f => f.code !== field.code)
  }

  checkPattern(data) {
    if (data.type === 'regex') {
      let regex = new RegExp(data.match);

      data.valid = regex.test(data.value)
    }

  }
}
