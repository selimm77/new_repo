import {
  CleansingService
} from './../../services/cleansing.service';
import {
  NotificationService
} from '@app/core/notifications/notification.service';
import {
  AppState
} from '@app/core';
import {
  Injectable
} from '@angular/core';
import {
  Action,
  Store
} from '@ngrx/store';
import {
  Actions,
  Effect,
  ofType
} from '@ngrx/effects';
import {
  withLatestFrom,
  map
} from 'rxjs/operators';
import {
  selectCleansingStage,
  selectCleansingFlowId,
  selectOldFileId,
  selectCleansingData
} from './cleansing.selectors';
import {
  CleansingActionTypes,
  ActionCleansingStart,
  ActionCleansingNextStep,
  ActionCleansingFinishCurrent,
  ActionCleansingReset,
  ActionCleansingFinish,
  ActionLoadJobId,
  ActionColumnState,
  ActionColumnStructure,
  ActionLoadAllLocations,
  ActionLoadAllData
} from './cleansing.actions';
import {
  selectMappingParameters,
  selectMappingTarget,
  selectMappingId,
  selectAllMappings
} from '../mapping/mapping.selectors';
import {
  selectToken,
  selectImportObjectState,
  selectFileId
} from '../import/import.selectors';
import {
  combineLatest
} from 'rxjs';
import {
  MappingTargetItem
} from '@app/dcm/modules/upload/models/mapping/mapping-target.model';
import { ActionUpdateFileId } from '../import/import.actions';


 @Injectable()
export class CleansingEffects {
  public jobId;
  private tokenFile: string;
  constructor(
    private actions$: Actions < Action > ,
    private store$: Store < AppState > ,
    private cleansingService: CleansingService,
    private notif: NotificationService
  ) {}

  @Effect({
    dispatch: false
  })
  startCleansing = this.actions$.pipe(
    ofType < ActionCleansingStart > (CleansingActionTypes.START_PROCESS),
    map((action) => {
      this.store$.dispatch(new ActionCleansingNextStep())
    })
  );

  @Effect({
    dispatch: false
  })
  nextCleansingStep = this.actions$.pipe(
    ofType < ActionCleansingNextStep > (CleansingActionTypes.GO_TO_NEXT),
    withLatestFrom(
      this.store$.select(selectFileId),
      this.store$.select(selectAllMappings),
      this.store$.select(selectImportObjectState),
      this.store$.select(selectMappingTarget),
      this.store$.select(selectMappingId),
      this.store$.select(selectCleansingStage),
      // this.store$.select(selectCleansingFlowId),
      this.store$.select(selectMappingParameters),
      this.store$.select(selectOldFileId),
      this.store$.select(selectCleansingData)
    ),
    map(([action, fileId, mappings, importData, mapping, mappingId, stage, /* currentflowId , */ params, oldFileId, data]) => {
      if (importData && mapping && stage && importData.fileData ) {
        const fileData = importData.fileData;
        const selectedSheet = importData.selectedSheet;
        const fileIds = mappings.sheetIds;
        const mappingIds = mappings.mappingIds;
        const targets = mappings.targets;
        
        const lobId = 1;
        // console.log('=======>>>>>>> mappings : sheetIds, mappingIds, targets, all ');
        // console.log(mappings.sheetIds)
        // console.log(mappings.mappingIds)
        // console.log(mappings.targets)
        // console.log(mappings);
        switch (stage) {
          case 'MAPPING':
            combineLatest(
              this.cleansingService.saveMapping(mappingIds, fileIds, targets),
              // this.cleansingService.applyMapping(mapping, mappingId, fileData, selectedSheet),
              this.cleansingService.applyTopPanelMapping(params, mappingId),
            ).subscribe(res => {
              // console.log('===> save mapping et topPanel : ');
              // console.log(res)
                this.store$.dispatch(new ActionCleansingFinishCurrent())
              }, this.handleError(stage));

            break;
          case 'TRANSFORM':
            this.cleansingService.applyMapping(mappingIds, fileIds, lobId).subscribe((uniqueFileId) => {
              // console.log('===> apply mapping : ');
              // console.log(uniqueFileId)
              this.tokenFile = uniqueFileId['file_id'];
              this.store$.dispatch(new ActionUpdateFileId({fileId: uniqueFileId['file_id']}))
              this.store$.dispatch(new ActionCleansingFinishCurrent());

            }, this.handleError(stage))
            break;
          case 'CLEANSING':
            /* this.store$.select(selectMappingTarget).subscribe((target: MappingTargetItem[]) => {
              target.forEach((e: MappingTargetItem) => {
              });
              this.store$.dispatch(new ActionCleansingFinishCurrent());
            }, () => {}, () => {}); */
            this.cleansingService.transform(this.tokenFile, mappingIds, lobId).subscribe(jobid => {
            // console.log('===> jobId : ');
            // console.log(jobid)
              const jobId = jobid['job_id'];
              if (jobId !== undefined) {
                this.cleansingService.getCsMetadata(jobId).subscribe(metadata => {
                this.store$.dispatch(new ActionLoadJobId({ jobId: jobId }));
              });
              }
              this.store$.dispatch(new ActionCleansingFinishCurrent());
            }, this.handleError(stage));
            break;

            case 'EDIT':
              this.cleansingService.transform(fileData.fileId, mappingIds, lobId).subscribe(jobid => {
                // console.log('===> jobId : ');
                // console.log(jobid)
                  const jobId = jobid['job_id'];
                  if (jobId !== undefined) {
                    this.store$.dispatch(new ActionCleansingFinish())
                    this.cleansingService.getCsMetadata(jobId).subscribe(metadata => {
                    this.store$.dispatch(new ActionLoadJobId({ jobId: jobId }));
                    this.cleansingService.getDatacheck(fileData, selectedSheet).subscribe(check => {
                      this.cleansingService.getExposuresByPage(fileData, selectedSheet).subscribe(exposures => {
                      
                      });

                    });

                 

                  });
                  }
                  this.store$.dispatch(new ActionCleansingFinishCurrent());
                });
                break;
          
 
          case 'SNAPSHOT':
            /* this.cleansingService.snapshot(fileData, selectedSheet).subscribe(res => {
              }); */

            this.cleansingService.getHeaders(lobId).subscribe((headers: any[]) => {
              
            });

            this.cleansingService.getExposures(fileData, selectedSheet).subscribe(exposures => {
              // this.store$.dispatch(new ActionLoadAllData({ data: exposures }));
            });
            if (oldFileId) {
              this.cleansingService.getAllLocations(this.tokenFile, oldFileId).subscribe(locations => {
                // console.log('locations => ')
                // console.log(locations)
                this.store$.dispatch(new ActionLoadAllLocations({locationsLoaded: locations}))
              });
            }
            /* // get all locations
            this.cleansingService.getAllLocations().subscribe(locations => {
              // console.log('############### effect locations loaded => ');
              // console.log(locations)
              this.store$.dispatch(new ActionLoadAllLocations({locationsLoaded: locations}))
            }); */

            this.cleansingService.getDatacheck(fileData, selectedSheet).subscribe(check => {
              this.store$.dispatch(new ActionCleansingFinish())
            });
            break;
        }
       }

    })
  );

  @Effect({
    dispatch: false
  })
  finishStep = this.actions$.pipe(
    ofType < ActionCleansingFinishCurrent > (CleansingActionTypes.FINISH_STEP),
    map((action) => {
      this.store$.dispatch(new ActionCleansingNextStep())
    })
  );

  private handleError(stage: string): (error: any) => void {
    return err => {
      this.notif.error('Error at ' + stage);
      this.store$.dispatch(new ActionCleansingReset());
    };
  }
}
