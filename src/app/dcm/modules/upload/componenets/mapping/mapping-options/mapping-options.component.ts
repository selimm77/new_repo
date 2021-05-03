import {MappingParamaters} from './../../../models/mapping/mapping-paramaters.model';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {DIVISIONS} from '../../../models/mapping/mapping-paramaters.model';
import {MappingService} from '@app/dcm/modules/upload/services/mapping.service';
import {combineLatest} from 'rxjs';

@Component({
  selector: 'anms-mapping-options',
  templateUrl: './mapping-options.component.html',
  styleUrls: ['./mapping-options.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MappingOptionsComponent implements OnInit {
  demoValue: any = 0;
  declarationPeriodChoice  ;
  tivChoice ;
  centvalue

  constructor(private mappingService : MappingService, private cdrf: ChangeDetectorRef) {
  }

  divisonsOptions = DIVISIONS
  currencyOptions
   countriesOptions

  @Output()
  mappingParamatersChanged: EventEmitter<MappingParamaters> = new EventEmitter<any>()
  @Input()
  mappingParamaters: MappingParamaters = new MappingParamaters()


  ngOnInit() {
    combineLatest(this.mappingService.getCountries(), this.mappingService.getCurrencies())
      .subscribe(data => {
        this.countriesOptions = this.sortByCountry(data[0])
        this.currencyOptions = this.sortByCurrency(data[1]);
        this.cdrf.detectChanges()
    })
 this.onParamaterChanged()
  }

  onParamaterChanged(input?) {
    if (!this.mappingParamaters.declaration) {
      this.mappingParamaters.bi_declaration_period = null;
      this.declarationPeriodChoice = null;
    }
    else {
      if (!this.declarationPeriodChoice)
        this.declarationPeriodChoice = 0;

      this.mappingParamaters.bi_declaration_period = this.declarationPeriodChoice;
    }
    if (!this.mappingParamaters.for_interest){
      this.mappingParamaters.interest = null ;
      this.tivChoice = null;
      this.centvalue = null
    }
    else {
      if (this.mappingParamaters.for_interest === '100'){
        this.mappingParamaters.interest = this.centvalue ;
        this.tivChoice = null;
       }
      else {
        this.mappingParamaters.interest = this.tivChoice ;
         this.centvalue = null
      }
    }
    this.mappingParamatersChanged.emit({...this.mappingParamaters});

  }
  onRefParamaterChanged() {
  
    this.mappingParamatersChanged.emit({...this.mappingParamaters});

  }

  avoidClick(e) {
    e.stopPropagation();
  }

  onEvent(event) {
    event.stopPropagation();
  }

  onChange(monthNumber: any) {
    let input: string = monthNumber.value;
    if (input.length > 0 && input[0] === '0')
      input = input.slice(1, input.length);
    const val: any = input.valueOf();
    val === '' ?   this.mappingParamaters.bi_declaration_period = 0 : val > 999 ?   this.mappingParamaters.bi_declaration_period = 999 :  this.mappingParamaters.bi_declaration_period = val;
  }

updateValue( value){
  value > 100 ? value = 100 : value < 0 ? value = 0 : true;
}

  sortByCountry(items) {
    let itemsSorted;
    if (items === undefined) {
      itemsSorted = [];
    }
    else {
      itemsSorted = items.slice().sort((a, b) => a.name > b.name ? 1 : -1)
    }
    return itemsSorted;
  }

  sortByCurrency(items) {
    let itemsSorted;
    if (items === undefined) {
      itemsSorted = [];
    }
    else {
      itemsSorted = items.slice().sort((a, b) => a > b ? 1 : -1)
    }
    return itemsSorted;
  }

}
