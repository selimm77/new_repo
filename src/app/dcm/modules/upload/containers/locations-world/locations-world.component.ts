import {Component, OnInit} from '@angular/core';
import {LocationDataComponent} from "@app/dcm/modules/upload/componenets/location-data/location-data.component";
import {MatDialog} from "@angular/material/dialog";
import {Store} from "@ngrx/store";
import {AppState} from "@app/core";
import {selectFileData, selectFileSheet} from "@app/dcm/modules/upload/store/import/import.selectors";
import {CleansingService} from "@app/dcm/modules/upload/services/cleansing.service";
import {combineLatest} from "rxjs";

declare var echarts: any;

@Component({
  selector: 'anms-locations-world',
  templateUrl: './locations-world.component.html',
  styleUrls: ['./locations-world.component.css']
})
export class LocationsWorldComponent implements OnInit {

  color = '#de4c4f';

  mapData;
  countries;
  location: any;
  filedata;
  sheet

  constructor(public dialog: MatDialog, private store: Store<AppState>, private  cleansingService: CleansingService) {
  }

  ngOnInit() {
    combineLatest(
      this.store.select(selectFileData),
      this.store.select(selectFileSheet)
    ).subscribe(([fileData, sheet]) => {
      if (fileData   ) {
        this.filedata = fileData;
        this.sheet =sheet
        combineLatest(
          this.cleansingService.getMapData(fileData, sheet),
          this.cleansingService.countriesforExposure(fileData, sheet)
        ).subscribe(([data, countries]: any[]) => {
          this.mapData = data.coordinates;
          this.countries = [];
          countries.column.forEach(col => {
            this.countries.push({
              name: col,
              itemStyle: {
                areaColor: '#39A6B9',
              }
            })
          })
          this.drawMap()
        })
      }
    })
  }

  drawMap() {
    const dom = document.getElementById('container');
    let myChart = echarts.init(dom);
    let option = null;

    const max = -Infinity;
    const min = Infinity;


    option = {
      backgroundColor: '#FFFF',
      title: {
        text: 'DCM Locations',
        left: 'center',
        top: 'top',
        textStyle: {
          color: '#404a59'
        }
      },

      visualMap: {
        show: false,
        min: 0,
        max: 1000,
        inRange: {
          symbolSize: [6]
        }
      },
      geo: {
        name: 'DCMLocations',
        type: 'map',
        map: 'world',
        roam: true,

        regions: this.countries,
        label: {
          emphasis: {
            show: false
          }
        },
        itemStyle: {
          normal: {
            areaColor: '#fafafa',
            borderColor: '#0292AB',
          },
          emphasis: {
            areaColor: '#0292AB',
          }
        }
      },
      series: [
        {
          type: 'scatter',
          coordinateSystem: 'geo',
          data: this.mapData.map(function (itemOpt) {
            return {
              name: itemOpt.index,
              value: [
                itemOpt.longitude,
                itemOpt.latitude,
                1000
              ],
              label: {
                emphasis: {
                  position: 'right',
                  show: true
                }
              },
              itemStyle: {
                normal: {
                  color: '#006c85'
                }
              },


            };
          })
        }
      ]
    };
    myChart.on('click', function (params) {
      if (params.data) {
        console.log(params)
        document.getElementById("btnmodal").setAttribute('index',params.data.name)
        document.getElementById("btnmodal").click();
      }
    });
    if (option && typeof option === 'object') {
      myChart.setOption(option, true);
    }
  }


  showModal() {
    let index =   document.getElementById("btnmodal").getAttribute('index');
    console.log(     index  )
    this.cleansingService.getExposure(this.filedata,this.sheet,index).subscribe((data:any)=>{
      console.log(data);
      this.dialog.open(LocationDataComponent, {
        width: '35%',

        height: '50vh',
        data: {location: data.exposures[0]}
      })
    })



  }
}
