import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {ReceivePatientRequest} from "../model/request/receive-patient.request";
import {Observable} from "rxjs";
import {OrderDepartmentRequest} from "../model/request/order-department.request";
import {OrderMedicalOrderRequest} from "../model/request/order-medical-order.request";
import {SearchSortModel} from "../model/search-sort.model";
import {PatientModel} from "../model/patient.model";
import {SearchSortPageableModel} from "../model/search-sort-pageable.model";
import {PagePatientResponse} from "../model/response/page-patient.response";
import {UpdatePatientRequest} from "../model/request/update-patient.request";
import {PatientAdmissionResponse} from "../model/response/patient-admission.response";
import {AssignPatientRequest} from "../model/request/assign-patient.request";

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private host = environment.APIUrl;
  private prefixAPI = environment.prefixAPI

  public defaultHeaders = new HttpHeaders();

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

  constructor(private http: HttpClient) { }

  public receivePatient(receivePatientRequest: ReceivePatientRequest) : Observable<string> {
    let localVarHeaders = this.defaultHeaders;

    return this.http.post<string>(`${this.host}/${this.prefixAPI}/receive-patient/create`, receivePatientRequest, {
      headers: localVarHeaders
    })
  }

  public orderPatientInDepartment(id: number, request: OrderDepartmentRequest) : Observable<string> {
    let localVarQueryParameters = new HttpParams();
    if (id !== undefined && id !== null) {
      localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
        <any>id, 'id');
    }

    let localVarHeaders = this.defaultHeaders;

    return this.http.put<string>(`${this.host}/${this.prefixAPI}/receive-patient/order-department`, request, {
      params: localVarQueryParameters,
      headers: localVarHeaders
    })
  }

  public orderMedicalOrder(id: number, request: OrderMedicalOrderRequest) : Observable<string> {
    let localVarQueryParameters = new HttpParams();
    if (id !== undefined && id !== null) {
      localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
        <any>id, 'id');
    }

    let localVarHeaders = this.defaultHeaders;

    return this.http.put<string>(`${this.host}/${this.prefixAPI}/receive-patient/order-medical-order`, request, {
      params: localVarQueryParameters,
      headers: localVarHeaders
    })
  }

  public findPatientsAdmission(searchVO: SearchSortModel) : Observable<PatientAdmissionResponse[]> {
    let localVarQueryParameters = new HttpParams();
    let localVarHeaders = this.defaultHeaders;


    if (searchVO !== undefined && searchVO !== null) {
      localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
        <any>searchVO, 'searchVO');
    }

    return this.http.get<PatientAdmissionResponse[]>(`${this.host}/${this.prefixAPI}/patient/find-patients-admission`, {
      params: localVarQueryParameters,
      headers: localVarHeaders
    })
  }

  public findAllPageByDepartment(id: number, searchVO: SearchSortPageableModel) : Observable<PagePatientResponse> {
    let localVarQueryParameters = new HttpParams();
    let localVarHeaders = this.defaultHeaders;

    if (id !== undefined && id !== null) {
      localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
        <any>id, 'id');
    }
    if (searchVO !== undefined && searchVO !== null) {
      localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
        <any>searchVO, 'searchVO');
    }

    return this.http.get<PagePatientResponse>(`${this.host}/${this.prefixAPI}/patient/page/find-by-department`, {
      params: localVarQueryParameters,
      headers: localVarHeaders
    })
  }

  public findAllByDepartment(id: number) : Observable<PatientModel[]> {
    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling findAllByDepartment.');
    }

    let localVarQueryParameters = new HttpParams();
    if (id !== undefined && id !== null) {
      localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
        <any>id, 'id');
    }

    let localVarHeaders = this.defaultHeaders;

    return this.http.get<PatientModel[]>(`${this.host}/${this.prefixAPI}/patient/find-by-department`, {
      params: localVarQueryParameters,
      headers: localVarHeaders
    })
  }

  public findPatientById(id: number) : Observable<PatientModel> {
    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling findPatientById.');
    }

    let localVarQueryParameters = new HttpParams();
    if (id !== undefined && id !== null) {
      localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
        <any>id, 'id');
    }

    let localVarHeaders = this.defaultHeaders;

    return this.http.get<PatientModel>(`${this.host}/${this.prefixAPI}/patient/find-by-id`, {
      params: localVarQueryParameters,
      headers: localVarHeaders
    })
  }

  public findAllPatientsAdmissionDepartment(id: number) : Observable<PatientModel[]> {
    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling findAllPatientsAdmissionDepartment.');
    }

    let localVarQueryParameters = new HttpParams();
    if (id !== undefined && id !== null) {
      localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
        <any>id, 'id');
    }

    let localVarHeaders = this.defaultHeaders;

    return this.http.get<PatientModel[]>(`${this.host}/${this.prefixAPI}/patient/find-patients-admission-department`, {
      params: localVarQueryParameters,
      headers: localVarHeaders
    })
  }

  public updateInfoPatient(id: number, patientInfoRequest: UpdatePatientRequest): Observable<PatientModel> {
    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling getAccountById.');
    }

    let localVarQueryParameters = new HttpParams();
    if (id !== undefined && id !== null) {
      localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
        <any>id, 'id');
    }

    let localVarHeaders = this.defaultHeaders;

    return this.http.put<PatientModel>(`${this.host}/${this.prefixAPI}/patient/update-info`, patientInfoRequest, {
      params: localVarQueryParameters,
      headers: localVarHeaders
    })
  }

  public updateInDepartment(id: number, request: AssignPatientRequest) : Observable<PatientModel> {
    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling getAccountById.');
    }

    let localVarQueryParameters = new HttpParams();
    if (id !== undefined && id !== null) {
      localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
        <any>id, 'id');
    }

    let localVarHeaders = this.defaultHeaders;

    return this.http.put<PatientModel>(`${this.host}/${this.prefixAPI}/patient/update-in-department`, request, {
      params: localVarQueryParameters,
      headers: localVarHeaders
    })
  }
}
