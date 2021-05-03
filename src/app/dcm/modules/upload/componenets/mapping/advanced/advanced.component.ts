import { Component, OnInit } from '@angular/core';
import {AppState} from "@app/core";
import {Store} from "@ngrx/store";
import {selectMappingTarget} from "@app/dcm/modules/upload/store/mapping/mapping.selectors";
import {ActionMappingUpdateOneTarget} from "@app/dcm/modules/upload/store/mapping/mapping.actions";
import {NzMessageService} from "ng-zorro-antd";

@Component({
  selector: 'anms-advanced',
  templateUrl: './advanced.component.html',
  styleUrls: ['./advanced.component.css']
})
export class AdvancedComponent implements OnInit {
private listFields;
selectedField ;
  constructor(private store:Store<AppState>, private msg :NzMessageService) { }

  ngOnInit() {
    this.store.select(selectMappingTarget).subscribe(data=>{
      this.listFields = data.filter(target=>target.mappedItems.length>0 && (target.format ==='double'|| target.format ==='integer'))
    })
  }
updateOperation(event){
this.selectedField = event
}
  update(event){
    this.store.dispatch(new ActionMappingUpdateOneTarget({target: event}))
this.msg.success("Field Updated Successfuly")
  }
}
