import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {MedicalStaffModel} from "../model/medical-staff.model";
import {SearchSortPageableModel} from "../model/search-sort-pageable.model";
import {PageMedicalStaffResponse} from "../model/response/page-medical-staff.response";
import {MedicalStaffRequest} from "../model/request/medical-staff.request";

@Injectable({
  providedIn: 'root'
})
export class MedicalStaffService {

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

  public findAllMedicalStaff(): Observable<MedicalStaffModel[]> {
    let localVarHeaders = this.defaultHeaders;

    return this.http.get<MedicalStaffModel[]>(`${this.host}/${this.prefixAPI}/medical-staff/find-all`, {
      headers: localVarHeaders
    })
  }

  public findMedicalStaffByAccountIsNull(): Observable<MedicalStaffModel[]> {
    let localVarHeaders = this.defaultHeaders;

    return this.http.get<MedicalStaffModel[]>(`${this.host}/${this.prefixAPI}/medical-staff/find-all-no-account`, {
      headers: localVarHeaders
    })
  }

  public findAllByDepartment(id: number): Observable<MedicalStaffModel[]> {
    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling getAccountById.');
    }

    let localVarQueryParameters = new HttpParams();
    if (id !== undefined && id !== null) {
      localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
        <any>id, 'id');
    }

    let localVarHeaders = this.defaultHeaders;

    return this.http.get<MedicalStaffModel[]>(`${this.host}/${this.prefixAPI}/medical-staff/find-by-department`, {
      params: localVarQueryParameters,
      headers: localVarHeaders
    })
  }

  public findAllDoctorByDepartment(id: number): Observable<MedicalStaffModel[]> {
    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling findAllDoctorByDepartment.');
    }

    let localVarQueryParameters = new HttpParams();
    if (id !== undefined && id !== null) {
      localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
        <any>id, 'id');
    }

    let localVarHeaders = this.defaultHeaders;

    return this.http.get<MedicalStaffModel[]>(`${this.host}/${this.prefixAPI}/medical-staff/find-all-doctor`, {
      params: localVarQueryParameters,
      headers: localVarHeaders
    })
  }


  public findMedicalStaffById(id: number): Observable<MedicalStaffModel> {
    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling getAccountById.');
    }

    let localVarQueryParameters = new HttpParams();
    if (id !== undefined && id !== null) {
      localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
        <any>id, 'id');
    }

    let localVarHeaders = this.defaultHeaders;

    return this.http.get<MedicalStaffModel>(`${this.host}/${this.prefixAPI}/medical-staff/find-by-id`, {
      params: localVarQueryParameters,
      headers: localVarHeaders
    })
  }

  public findAllMedicalStaffPage(searchVO: SearchSortPageableModel): Observable<PageMedicalStaffResponse> {
    let localVarQueryParameters = new HttpParams();
    let localVarHeaders = this.defaultHeaders;


    if (searchVO !== undefined && searchVO !== null) {
      localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
        <any>searchVO, 'searchVO');
    }

    return this.http.get<PageMedicalStaffResponse>(`${this.host}/${this.prefixAPI}/medical-staff/page/find-all`, {
      params: localVarQueryParameters,
      headers: localVarHeaders
    })
  }

  public findAllPageByDepartment(id: number, searchVO: SearchSortPageableModel): Observable<PageMedicalStaffResponse> {
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

    return this.http.get<PageMedicalStaffResponse>(`${this.host}/${this.prefixAPI}/medical-staff/page/find-by-department`, {
      params: localVarQueryParameters,
      headers: localVarHeaders
    })
  }

  public createMedicalStaff(medicalStaffRequest: MedicalStaffRequest): Observable<MedicalStaffModel> {
    let localVarHeaders = this.defaultHeaders;

    return this.http.post<MedicalStaffModel>(`${this.host}/${this.prefixAPI}/medical-staff/create`, medicalStaffRequest, {
      headers: localVarHeaders
    });
  }

  public updateMedicalStaff(id: number, medicalStaffRequest: MedicalStaffRequest): Observable<MedicalStaffModel> {
    let localVarQueryParameters = new HttpParams();
    if (id !== undefined && id !== null) {
      localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
        <any>id, 'id');
    }

    let localVarHeaders = this.defaultHeaders;

    return this.http.put<MedicalStaffModel>(`${this.host}/${this.prefixAPI}/medical-staff/update`, medicalStaffRequest, {
      params: localVarQueryParameters,
      headers: localVarHeaders
    })
  }

  public deleteMedicalStaff(id: number): Observable<string> {
    let localVarQueryParameters = new HttpParams();
    if (id !== undefined && id !== null) {
      localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
        <any>id, 'id');
    }

    let localVarHeaders = this.defaultHeaders;

    return this.http.delete<string>(`${this.host}/${this.prefixAPI}/medical-staff/delete`, {
      params: localVarQueryParameters,
      headers: localVarHeaders
    })
  }
}
