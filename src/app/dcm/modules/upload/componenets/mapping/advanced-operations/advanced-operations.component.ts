import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'anms-advanced-operations',
  templateUrl: './advanced-operations.component.html',
  styleUrls: ['./advanced-operations.component.css']
})
export class AdvancedOperationsComponent implements OnInit {
 field ;
 @Output() updateOperation =new EventEmitter();
  @Input('selectedField')
  set value(val) {
    // console.log(val)
    if(val){
      this.field = {...val};
      this.formOperation.reset()// <-- do your logic here!
    }

  }
formOperation : FormGroup;
  constructor(private fb:FormBuilder) {
    this.formOperation = this.fb.group({
      operand:['', Validators.required],
      operation :['', Validators.required],
      beforeOperand : null,
      after : null
    })
  }

  ngOnInit() {
    console.log('called')
  }
  reset(){
    this.formOperation.reset();
  }
  update(){
    this.field ={...this.field}
    let formula= this.formOperation.value.operation;
    if(this.formOperation.value.beforeOperand)
      formula = formula.concat(this.formOperation.value.beforeOperand);
    formula=formula.concat(this.formOperation.value.operand);
    if(this.formOperation.value.after)
      formula =formula.concat(this.formOperation.value.after) ;
    this.field.formula=formula;
    this.updateOperation.emit(this.field)
  }
}
