import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {environment} from "@env/environment";

@Injectable({
  providedIn: 'root'
})
export class ConfigAdminService {
  constructor(private http: HttpClient) {
  }

  public getCategories(lob) {
    return this.http.get(environment.endPoints.setting + '/lobs/' + lob.id + '/categories')
  }

  public getFields(lob) {
    return this.http.get(environment.endPoints.setting + '/lobs/' + lob.id + '/fields')

  }

  public getDatacheckforType(type): Observable<any> {
    return this.http.get(environment.endPoints.setting + '/datatypes/' + type + '/checkrules')

  }

  public getLobs() {
    return this.http.get(environment.endPoints.setting + '/lobs')
  }

  public getCollections(): Observable<any> {
    return this.http.get(environment.endPoints.setting + '/references')
  }

  public getDatatypes() {
    return this.http.get(environment.endPoints.setting + '/datatypes')
  }

  public validate(field): Promise<any> {
    return this.http.post(environment.endPoints.validate + '/lobs/' + field.lob.id + '/fields', field, {observe: 'response'})
      .toPromise().then(function (response) {
        if (response.status === 400 || response.status === 200) {
          return response
        }
      })

  }

  public validateDatcheck(ds) {
    return this.http.post(environment.endPoints.validate + '/checkrule', ds, {observe: 'response'})
      .toPromise().then(function (response) {
        if (response.status === 400 || response.status === 200) {
          return response
        }
      })
  }

  public validateGroup(lob, group) {
    return this.http.post(environment.endPoints.validate + '/lobs/' + lob + '/categories', group, {observe: 'response'})
      .toPromise().then(function (response) {
        if (response.status === 400 || response.status === 200) {
          return response
        }
      })
  }

  public saveGroups(groups, lob) {
    return this.http.post(environment.endPoints.setting + '/lobs/' + lob.id + '/bulk/categories', {
      categories:groups
    }, {observe: 'response'})
      .toPromise().then(function (response) {
        if (response.status === 400 || response.status === 200) {
          return response
        }
      })
  }

  public saveFields(field, lob) {
    return this.http.post(environment.endPoints.setting + '/lobs/' + lob.id + '/fields', {
      "fields": field
    }, {observe: 'response'})
      .toPromise().then(function (response) {
        if (response.status === 400 || response.status === 200) {
          return response
        }
      })
  }

  public saveDatachecks(groups) {
    return of(true)
  }
}
