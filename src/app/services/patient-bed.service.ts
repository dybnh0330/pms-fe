import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {PatientBedModel} from "../model/patient-bed.model";
import {PatientBedRequest} from "../model/request/patient-bed.request";

@Injectable({
  providedIn: 'root'
})
export class PatientBedService {

  private host = environment.APIUrl;
  private prefixAPI = environment.prefixAPI;

  public defaultHeaders = new HttpHeaders();

  constructor(private http: HttpClient) {
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

  public findAllByRoom(id: number): Observable<PatientBedModel[]> {
    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling getAccountById.');
    }

    let localVarQueryParameters = new HttpParams();
    if (id !== undefined && id !== null) {
      localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
        <any>id, 'id');
    }

    let localVarHeaders = this.defaultHeaders;

    return this.http.get<PatientBedModel[]>(`${this.host}/${this.prefixAPI}/patient-bed/find-by-room`, {
      params: localVarQueryParameters,
      headers: localVarHeaders
    })
  }

  public findAllBedEmptyByRoom(id: number): Observable<PatientBedModel[]> {
    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling getAccountById.');
    }

    let localVarQueryParameters = new HttpParams();
    if (id !== undefined && id !== null) {
      localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
        <any>id, 'id');
    }

    let localVarHeaders = this.defaultHeaders;

    return this.http.get<PatientBedModel[]>(`${this.host}/${this.prefixAPI}/patient-bed/find-bed-empty-by-room`, {
      params: localVarQueryParameters,
      headers: localVarHeaders
    })
  }

  public findById(id: number): Observable<PatientBedModel> {
    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling getAccountById.');
    }

    let localVarQueryParameters = new HttpParams();
    if (id !== undefined && id !== null) {
      localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
        <any>id, 'id');
    }

    let localVarHeaders = this.defaultHeaders;

    return this.http.get<PatientBedModel>(`${this.host}/${this.prefixAPI}/patient-bed/find-by-id`, {
      params: localVarQueryParameters,
      headers: localVarHeaders
    })
  }

  public createBed(patientBedRequest: PatientBedRequest): Observable<PatientBedModel> {
    let localVarHeaders = this.defaultHeaders;

    return this.http.post<PatientBedModel>(`${this.host}/${this.prefixAPI}/patient-bed/create`, patientBedRequest, {
      headers: localVarHeaders
    });
  }

  public updatePatientBed(id: number, patientBedRequest: PatientBedRequest): Observable<PatientBedModel> {
    let localVarQueryParameters = new HttpParams();
    if (id !== undefined && id !== null) {
      localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
        <any>id, 'id');
    }

    let localVarHeaders = this.defaultHeaders;

    return this.http.put<PatientBedModel>(`${this.host}/${this.prefixAPI}/patient-bed/update`, patientBedRequest, {
      params: localVarQueryParameters,
      headers: localVarHeaders
    })
  }

  public deletePatientBed(id: number): Observable<string> {
    let localVarQueryParameters = new HttpParams();
    if (id !== undefined && id !== null) {
      localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
        <any>id, 'id');
    }

    let localVarHeaders = this.defaultHeaders;

    return this.http.delete<string>(`${this.host}/${this.prefixAPI}/patient-bed/delete`, {
      params: localVarQueryParameters,
      headers: localVarHeaders
    })
  }

  public deleteAllPatientBed(id: number): Observable<string> {
    let localVarQueryParameters = new HttpParams();
    if (id !== undefined && id !== null) {
      localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
        <any>id, 'id');
    }

    let localVarHeaders = this.defaultHeaders;

    return this.http.delete<string>(`${this.host}/${this.prefixAPI}/patient-bed/delete-all`, {
      params: localVarQueryParameters,
      headers: localVarHeaders
    })
  }
}
