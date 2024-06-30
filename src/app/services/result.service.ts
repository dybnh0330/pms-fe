import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpContext, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {MedicalStaffModel} from "../model/medical-staff.model";
import {ResultResponse} from "../model/response/result.response";

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  private host = environment.APIUrl;
  private prefixAPI = environment.prefixAPI;

  public defaultHeaders = new HttpHeaders();

  constructor(private http: HttpClient) {
  }

  private canConsumeForm(consumes: string[]): boolean {
    const form = 'multipart/form-data';
    for (const consume of consumes) {
      if (form === consume) {
        return true;
      }
    }
    return false;
  }

  private addToHttpParams(httpParams: HttpParams, value: any, key?: string): HttpParams {
    if (typeof value === "object" && !(value instanceof Date)) {
      httpParams = this.addToHttpParamsRecursive(httpParams, value);
    } else {
      httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
    }
    return httpParams;
  }

  private addToHttpParamsRecursive(httpParams: HttpParams, value?: any, key?: string): HttpParams {
    if (value == null) {
      return httpParams;
    }

    if (typeof value === "object") {
      if (Array.isArray(value)) {
        (value as any[]).forEach(elem => httpParams = this.addToHttpParamsRecursive(httpParams, elem, key));
      } else if (value instanceof Date) {
        if (key != null) {
          httpParams = httpParams.append(key, (value as Date).toISOString().substr(0, 10));
        } else {
          throw Error("key may not be null if value is Date");
        }
      } else {
        Object.keys(value).forEach(k => httpParams = this.addToHttpParamsRecursive(
          httpParams, value[k], key != null ? `${key}.${k}` : k));
      }
    } else if (key != null) {
      httpParams = httpParams.append(key, value);
    } else {
      throw Error("key may not be null if value is not object or array");
    }
    return httpParams;
  }

  public addResult(id: number, files: Array<Blob>): Observable<string> {
    let localVarHeaders = this.defaultHeaders;

    const consumes: string[] = [
      'multipart/form-data'
    ];

    const canConsumeForm = this.canConsumeForm(consumes);

    let localVarFormParams: { append(param: string, value: any): any; };
    let localVarUseForm = false;
    // use FormData to transmit files using content-type "multipart/form-data"
    // see https://stackoverflow.com/questions/4007969/application-x-www-form-urlencoded-or-multipart-form-data
    localVarUseForm = canConsumeForm;
    if (localVarUseForm) {
      localVarFormParams = new FormData();
    } else {
      localVarFormParams = new HttpParams();
    }

    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling addResult.');
    }

    let localVarQueryParameters = new HttpParams();
    if (id !== undefined && id !== null) {
      localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
        <any>id, 'id');
    }


    if (files) {
      for (let element of files) {
        localVarFormParams = localVarFormParams.append('files', <any>element) as any || localVarFormParams;
      }
    }

    return this.http.post<string>(`${this.host}/${this.prefixAPI}/result/add`, localVarFormParams, {
      headers: localVarHeaders,
      params: localVarQueryParameters
    })
  }

  public findAllResult(id: number): Observable<ResultResponse[]> {

    let localVarHeaders = this.defaultHeaders;

    let localVarQueryParameters = new HttpParams();
    if (id !== undefined && id !== null) {
      localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
        <any>id, 'id');
    }

    return this.http.get<ResultResponse[]>(`${this.host}/${this.prefixAPI}/result/find-all`, {
      headers: localVarHeaders,
      params: localVarQueryParameters
    })
  }

  public findResultById(id: number): Observable<ResultResponse> {

    let localVarHeaders = this.defaultHeaders;

    let localVarQueryParameters = new HttpParams();
    if (id !== undefined && id !== null) {
      localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
        <any>id, 'id');
    }

    return this.http.get<ResultResponse>(`${this.host}/${this.prefixAPI}/result/find-by-id`, {
      headers: localVarHeaders,
      params: localVarQueryParameters
    })
  }

  public downloadFile(fileName: string) : Observable<HttpResponse<Blob>> {

    let localVarHeaders = this.defaultHeaders;

    return this.http.get(`${this.host}/${this.prefixAPI}/result/downloadFile/${fileName}`, {
      headers: localVarHeaders,
      observe: "response",
      responseType: "blob"
    })
  }

  public deleteFile(id: number) : Observable<string> {
    let localVarHeaders = this.defaultHeaders;

    let localVarQueryParameters = new HttpParams();
    if (id !== undefined && id !== null) {
      localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
        <any>id, 'id');
    }

    return this.http.delete<string>(`${this.host}/${this.prefixAPI}/result/delete`, {
      headers: localVarHeaders,
      params: localVarQueryParameters
    })
  }
}


