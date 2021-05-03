import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MappingTargetItemTaxonomies } from '../models/mapping/mapping-target.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { environment } from '@env/environment';
import { MappingTaxonomy } from '../models/mapping/mapping-txonomy';

@Injectable({
  providedIn: 'root'
})
export class TaxonomiesService {

  constructor(private http: HttpClient) { }

  public getTargetFields(): Observable< MappingTargetItemTaxonomies[] >
  {
    return this.http.get(environment.endPoints.fields + `all`).pipe(map( (res: any[]) =>
      res.map( e => new MappingTargetItemTaxonomies({ value: e.id, viewValue: e.label}) )
    ))
  }

  public getTargetTaxonomies(targetId: number | string )
  {
    return this.http.get(environment.endPoints.fields + `${targetId}/taxonomy`).pipe(map( (res: any[]) =>
      res.map( e => new MappingTaxonomy( e.id, e.alternativeLabel ) )
    ))
  }
}
