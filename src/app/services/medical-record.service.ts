import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {MedicalRecordRequest} from "../model/request/medical-record.request";
import {Observable} from "rxjs";
import {MedicalRecordResponse} from "../model/response/medical-record.response";
import {MedicalRecordDetailsRequest} from "../model/request/medical-record-details.request";
import {MedicalRecordDetailResponse} from "../model/response/medical-record-detail.response";

@Injectable({
  providedIn: 'root'
})
export class MedicalRecordService {

  private host = environment.APIUrl;
  private prefixAPI = environment.prefixAPI;

  public defaultHeaders = new HttpHeaders();

  constructor(private http: HttpClient) { }

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

  public updateInfoRecord(id: number, request: MedicalRecordRequest) : Observable<MedicalRecordResponse> {
    let localVarQueryParameters = new HttpParams();
    if (id !== undefined && id !== null) {
      localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
        <any>id, 'id');
    }

    let localVarHeaders = this.defaultHeaders;

    return this.http.put<MedicalRecordResponse>(`${this.host}/${this.prefixAPI}/medical-record/update`, request, {
      params: localVarQueryParameters,
      headers: localVarHeaders
    })
  }

  public createRecordDetails(request: MedicalRecordDetailsRequest) : Observable<string> {
    let localVarHeaders = this.defaultHeaders;

    return this.http.post<string>(`${this.host}/${this.prefixAPI}/medical-record/create-detail`, request, {
      headers: localVarHeaders
    });
  }

  public updateRecordDetail(id: number, request: MedicalRecordDetailsRequest): Observable<string> {
    let localVarQueryParameters = new HttpParams();
    if (id !== undefined && id !== null) {
      localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
        <any>id, 'id');
    }

    let localVarHeaders = this.defaultHeaders;

    return this.http.put<string>(`${this.host}/${this.prefixAPI}/medical-record/update-detail`, request, {
      params: localVarQueryParameters,
      headers: localVarHeaders
    })
  }

  public deleteRecordDetail(id: number) : Observable<string> {
    let localVarQueryParameters = new HttpParams();
    if (id !== undefined && id !== null) {
      localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
        <any>id, 'id');
    }

    let localVarHeaders = this.defaultHeaders;

    return this.http.delete<string>(`${this.host}/${this.prefixAPI}/medical-record/delete-detail`, {
      params: localVarQueryParameters,
      headers: localVarHeaders
    })
  }

  public findRecordByPatient(id: number): Observable<MedicalRecordResponse> {
    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling findRecordByPatient.');
    }

    let localVarQueryParameters = new HttpParams();
    if (id !== undefined && id !== null) {
      localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
        <any>id, 'id');
    }

    let localVarHeaders = this.defaultHeaders;

    return this.http.get<MedicalRecordResponse>(`${this.host}/${this.prefixAPI}/medical-record/find-by-patient`, {
      params: localVarQueryParameters,
      headers: localVarHeaders
    })
  }

  public findRecordById(id: number): Observable<MedicalRecordResponse> {
    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling findRecordByPatient.');
    }

    let localVarQueryParameters = new HttpParams();
    if (id !== undefined && id !== null) {
      localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
        <any>id, 'id');
    }

    let localVarHeaders = this.defaultHeaders;

    return this.http.get<MedicalRecordResponse>(`${this.host}/${this.prefixAPI}/medical-record/find-by-id`, {
      params: localVarQueryParameters,
      headers: localVarHeaders
    })
  }

  public findRecordDetailById(id: number): Observable<MedicalRecordDetailResponse> {
    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling findRecordDetailById.');
    }

    let localVarQueryParameters = new HttpParams();
    if (id !== undefined && id !== null) {
      localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
        <any>id, 'id');
    }

    let localVarHeaders = this.defaultHeaders;

    return this.http.get<MedicalRecordDetailResponse>(`${this.host}/${this.prefixAPI}/medical-record/find-detail-by-id`, {
      params: localVarQueryParameters,
      headers: localVarHeaders
    })
  }

  public findAllDetail(id: number): Observable<MedicalRecordDetailResponse[]> {
    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling findAllDetail.');
    }

    let localVarQueryParameters = new HttpParams();
    if (id !== undefined && id !== null) {
      localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
        <any>id, 'id');
    }

    let localVarHeaders = this.defaultHeaders;

    return this.http.get<MedicalRecordDetailResponse[]>(`${this.host}/${this.prefixAPI}/medical-record/find-all-detail`, {
      params: localVarQueryParameters,
      headers: localVarHeaders
    })
  }

}
