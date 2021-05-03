import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CleansingService} from "@app/dcm/modules/upload/services/cleansing.service";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'anms-dashboard-params',
  templateUrl: './dashboard-params.component.html',
  styleUrls: ['./dashboard-params.component.css']
})
export class DashboardParamsComponent implements OnInit {
  formChart:FormGroup;
  fields;
  numericFields;
  constructor(private fb:FormBuilder, private cleansingService:CleansingService, private modalRef: MatDialogRef<DashboardParamsComponent>,) {
    this.formChart = this.fb.group({
      'argument': [null,Validators.required],
      'image': [null ],
      value:[false],
      type:[null, Validators.required]
    })
  }

  ngOnInit() {
    this.cleansingService.getHeaders(1).subscribe((liste:any[])=>{
      this.fields = liste;
      this.numericFields = liste.filter(f=>f.dataType==='double' || f.dataType==='integer')
    })
  }
  save(){

    this.modalRef.close(this.formChart.value)
  }
  close(){
this.modalRef.close()
  }
}
