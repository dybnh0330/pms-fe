import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {SearchSortPageableModel} from "../model/search-sort-pageable.model";
import {Observable} from "rxjs";
import {PagePatientRoomResponse} from "../model/response/page-patient-room.response";
import {PatientRoomRequest} from "../model/request/patient-room.request";
import {PatientRoomResponse} from "../model/response/patient-room.response";
import {MedicalStaffModel} from "../model/medical-staff.model";

@Injectable({
  providedIn: 'root'
})
export class PatientRoomService {

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

  public findByDepartmentPage(id: number, searchVO: SearchSortPageableModel): Observable<PagePatientRoomResponse> {
    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling getAccountById.');
    }

    let localVarQueryParameters = new HttpParams();
    if (id !== undefined && id !== null) {
      localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
        <any>id, 'id');
    }
    if (searchVO !== undefined && searchVO !== null) {
      localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
        <any>searchVO, 'searchVO');
    }

    let localVarHeaders = this.defaultHeaders;

    return this.http.get<PagePatientRoomResponse>(`${this.host}/${this.prefixAPI}/patient-room/page/find-by-department`, {
      params: localVarQueryParameters,
      headers: localVarHeaders
    })
  }

  public findEmptyByDepartment(id: number): Observable<PatientRoomResponse[]> {
    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling getAccountById.');
    }

    let localVarQueryParameters = new HttpParams();
    if (id !== undefined && id !== null) {
      localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
        <any>id, 'id');
    }
    let localVarHeaders = this.defaultHeaders;

    return this.http.get<PatientRoomResponse[]>(`${this.host}/${this.prefixAPI}/patient-room/find-room-empty-by-department`, {
      params: localVarQueryParameters,
      headers: localVarHeaders
    })
  }

  public findById(id: number) : Observable<PatientRoomResponse> {
    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling getAccountById.');
    }

    let localVarQueryParameters = new HttpParams();
    if (id !== undefined && id !== null) {
      localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
        <any>id, 'id');
    }
    let localVarHeaders = this.defaultHeaders;
    return this.http.get<PatientRoomResponse>(`${this.host}/${this.prefixAPI}/patient-room/find-by-id`, {
      params: localVarQueryParameters,
      headers: localVarHeaders
    })
  }

  public findByDepartment(id: number) : Observable<PatientRoomResponse[]> {
    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling getAccountById.');
    }

    let localVarQueryParameters = new HttpParams();
    if (id !== undefined && id !== null) {
      localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
        <any>id, 'id');
    }
    let localVarHeaders = this.defaultHeaders;
    return this.http.get<PatientRoomResponse[]>(`${this.host}/${this.prefixAPI}/patient-room/find-by-department`, {
      params: localVarQueryParameters,
      headers: localVarHeaders
    })
  }

  public createPatientRoom(patientRoomRequest: PatientRoomRequest): Observable<PatientRoomResponse> {
    let localVarHeaders = this.defaultHeaders;
    return this.http.post<PatientRoomResponse>(`${this.host}/${this.prefixAPI}/patient-room/create`, patientRoomRequest, {
      headers: localVarHeaders
    });
  }

  public updatePatientRoom(id: number, patientRoomRequest: PatientRoomRequest) : Observable<PatientRoomResponse> {
    let localVarQueryParameters = new HttpParams();
    if (id !== undefined && id !== null) {
      localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
        <any>id, 'id');
    }

    let localVarHeaders = this.defaultHeaders;

    return this.http.put<PatientRoomResponse>(`${this.host}/${this.prefixAPI}/patient-room/update`, patientRoomRequest, {
      params: localVarQueryParameters,
      headers: localVarHeaders
    })
  }

  public deletePatientRoom(id: number) : Observable<string> {
    let localVarQueryParameters = new HttpParams();
    if (id !== undefined && id !== null) {
      localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
        <any>id, 'id');
    }

    let localVarHeaders = this.defaultHeaders;

    return this.http.delete<string>(`${this.host}/${this.prefixAPI}/patient-room/delete`, {
      params: localVarQueryParameters,
      headers: localVarHeaders
    })
  }

}
