import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {HttpRequest, HttpEventType, HttpResponse, HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {environment} from '@env/environment';
import {Observable} from 'rxjs';
import {FileData} from '../store/import/import.model';
@Injectable({
  providedIn: 'root'
})
export class FileImportService {

  constructor(private http: HttpClient) {
  }
  
  public upload(file: File []): Observable<{} | number> {
    const body = new FormData()

    // console.log('== upload')
    // console.log(file)
    for (let i = 0; i < file.length; i++) {
      body.append('filename', file[i]);
    }
    
    const uploadRequest = new HttpRequest('POST', environment.endPoints.upload1, body, {
      reportProgress: true,
    })

    return Observable.create(observer => {
      this.http.request(uploadRequest).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          
          const percentDone = Math.round(100 * event.loaded / event.total);
          observer.next(percentDone)
        } else if (event instanceof HttpResponse) {
          observer.next({done: true, file: event.body })
        } else if (event instanceof HttpErrorResponse) {
          observer.next({error: true, event: event})
        }
      });
    });
  }

  public getFileMetaData(fileData: any, worksheetSelected: string): Observable<FileData> {
    const params = new HttpParams()
      .set('page', fileData.page.toString())
      .set('nrows', fileData.nrows.toString())
      .set('lob', fileData.lobId.toString());
    
     return this.http.get(environment.endPoints.upload1 + 'data/' + worksheetSelected, { params: params }).pipe(map((res: any) => ({
      filename: fileData.filename,
      filetype: fileData.filetype,
      fileId: fileData.fileId,
      worksheetId: fileData.worksheetId,
      page: res.current_page,
      worksheet: fileData.worksheet,
      totalRows: res.total,
      nrows: res.count,
      lobId: fileData.lobId,
      isExcel: fileData.isExcel,
      document: res
    })))
    }


  public getFileData(fileData: any, worksheetSelected: string): Observable<any> {
    let lobId;
    let page;
    let nrows;
    if (fileData.lobId && fileData.page && fileData.nrows) {
      lobId = fileData.lobId.toString();
      page = fileData.page.toString();
      nrows = fileData.nrows.toString();
    }
    else {
      lobId = '1';
      page = '1';
      nrows = '50';
    }

    const params = new HttpParams()
      .set('page', page)
      .set('nrows', nrows)
      .set('lob', lobId);

    return this.http.get(environment.endPoints.upload1 + 'data/' + worksheetSelected, { params: params })
  }

  public getDataChangedPage(link) {
    return this.http.get(link).pipe(map(res => {
      return res;
    }));
  }

  public updateRow(worksheetIdSelected: string, num: number[], lines: string[]) {

      return this.http.post(environment.endPoints.upload1 + 'data', {
        file: worksheetIdSelected,
        index: num,
        content: lines
      })
  }


  public modifyRow(row) {
    return this.http.put(environment.endPoints.flow + 'edit-rows', row, {params: {flowId: '4f34a4ab58a94b3eaf981587fa2a2166'}});
  }

  public deleteRow(row) {
   return  this.http.delete(environment.endPoints.flow + 'delete-row', {
      params: {
        flowId: '4f34a4ab58a94b3eaf981587fa2a2166'
        , rowId: row.Id
      }
    });
  }

}

