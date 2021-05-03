import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {CleansingService} from "@app/dcm/modules/upload/services/cleansing.service";
import {combineLatest} from "rxjs";
import {AppState} from "@app/core";
import {Store} from "@ngrx/store";
import {selectFileData, selectFileSheet} from "@app/dcm/modules/upload/store/import/import.selectors";
import {NzModalService} from "ng-zorro-antd";
import {DashboardParamsComponent} from "@app/dcm/modules/upload/componenets/dashboard-params/dashboard-params.component";
import {MatDialog} from "@angular/material/dialog";
import {first} from "rxjs/operators";

declare var echarts: any;

@Component({
  selector: 'anms-dashboard-exposures',
  templateUrl: './dashboard-exposures.component.html',
  styleUrls: ['./dashboard-exposures.component.css']
})
export class DashboardExposuresComponent implements OnInit {
  charts: any[];
  fileData
  sheet;
  index = 1;
  color = ['#8062c6', '#0da083', '#c64fbf', '#d8e13e','#2c80ad', '#51CDA0', '#E9A19B', '#75AB0A', '#8613AB','#C75C5A', '#C79F63', '#B5CE86', '#75AB0A', '#614E4E']

  constructor(private cleansingService: CleansingService, private store: Store<AppState>, private modal: MatDialog, private cdrf:ChangeDetectorRef) {
  }

  ngOnInit() {
    this.charts = [
      {index: 1, type: 'pie', axe_x: 'country', axe_y: 'tiv_amount', title: 'country/tiv_amount'},
      {index: 2, type: 'bar', axe_x: 'state', axe_y: 'tiv_amount', title: 'state/tiv_amount'},
      {index: 3, type: 'bar', axe_x: 'occupancy_code', axe_y: 'tiv_amount', title: 'occupancy_code/tiv_amount'},
      {index: 4, type: 'pie', axe_x: 'accuracy', axe_y: 'breakdown', title: 'Accuracy'}
    ]
    combineLatest(
      this.store.select(selectFileData),
      this.store.select(selectFileSheet)
    ).subscribe(([fileData, sheet]) => {
      this.fileData = fileData;
      this.sheet = sheet;
      combineLatest(
        this.cleansingService.getdashboard(this.fileData, this.sheet, 'country', '%', 'tiv_amount'),
        this.cleansingService.getdashboard(this.fileData, this.sheet, 'state', null, 'tiv_amount'),
        this.cleansingService.getdashboard(this.fileData, this.sheet, 'occupancy_code', null, 'tiv_amount'),
        this.cleansingService.getdashboard(this.fileData, this.sheet, 'accuracy', '%', null),
      ).subscribe((data: any[]) => {
        this.charts.forEach(chart => {
          this.draw(chart, data[this.index - 1]);
          this.index++
        })

      })
    })
  }


  draw(chart, data) {
    if (chart.type === 'pie') this.drawpie(chart, data)
    else this.drawbar(chart, data)
  }

  drawpie(chart, data) {
    console.log(chart)
    let data_IC = []

    data.arguments.forEach((arg, index) => {
      data_IC.push({value: data.values[index], name: arg})
    })

    /** The Chart */
    const dom = document.getElementById('charts_' + chart.index);
    const myChart = echarts.init(dom);

    const title = chart.title;
    const option = {
      title: {
        text: title,
        textVerticalAlign: 'top',
        left: '40%',
        textStyle: {
          fontFamily: 'Manjari',
          color: '#808080'
        }
      },

      legend: {
        type: 'scroll',
        bottom: 10,
        left: 'center',
        data: data.arguments,

        selected: data.selected
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      color: this.color,
      series: [
        {
          radius: '55%',

           name: chart.axe_x,
          type: chart.type,

          data: data_IC
        }
      ]
    };

    myChart.setOption(option, true);
  }

  drawbar(chart, data) {
    let cats = data.arguments;
    let values = data.values
    const dom = document.getElementById('charts_' + chart.index);
    const myChart = echarts.init(dom);
    const title = chart.title;

    const option = {
      title: {
        text: title,
        textVerticalAlign: 'top',
        left: '40%',
        textStyle: {
          color: '#808080'
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} '
      },
      xAxis: {
        type: 'category',
        data: cats,
        axisLabel: {
          show: true,
          rotate: 45,

        }
      },
      yAxis: {
        type: 'value'
      },
      color: this.color[chart.index % this.color.length],

      series: [
        {
          name: chart.axe_x,
          type: chart.type,
          left: 30,
          data: values
        }
      ]
    };

    myChart.setOption(option, true);
  }

  addNewGraphe() {
   const modalcreated= this.modal.open(DashboardParamsComponent,{
     width: '50%', })
    modalcreated.afterClosed().subscribe(data=>{
      let title=data.argument;
      if(data.image) title = title.concat('/',data.image)
      let newChart=  {index: this.index, type: data.type, axe_x: data.argument, axe_y: data.image, title:title }
      this.charts.push(newChart);
      this.cdrf.detectChanges()
      console.log(this.charts)
      this.cleansingService.getdashboard(this.fileData, this.sheet, data.argument, data.value?'%':null, data.image).pipe(first(data=>data!=undefined)).subscribe(data=>{
      this.createnewChild(newChart,data)
        this.index++;

      })
    })
  }
  createnewChild(newChart , data){
        this.draw(newChart,data);
  }
}
