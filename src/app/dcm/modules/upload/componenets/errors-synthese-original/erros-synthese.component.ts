import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'anms-erros-synthese',
  templateUrl: './erros-synthese.component.html',
  styleUrls: ['./erros-synthese.component.css']
})
export class ErrosSyntheseComponent implements OnInit {
  @Input() res=null ;

  constructor() {
  }

  ngOnInit() {
    console.log(this.res);
  }

}
