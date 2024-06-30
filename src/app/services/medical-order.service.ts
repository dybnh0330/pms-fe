import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {MedicalOrderDetailResponse} from "../model/response/medical-order-detail.response";
import {MedicalOrderResponse} from "../model/response/medical-order.response";
import {MedicalOrderDetailsRequest} from "../model/request/medical-order-details.request";

@Injectable({
  providedIn: 'root'
})
export class MedicalOrderService {

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

  public findAllMedicalOrder(id: number, type: number): Observable<MedicalOrderDetailResponse[]> {
    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling findAllMedicalOrder.');
    }

    let localVarQueryParameters = new HttpParams();
    if (id !== undefined && id !== null) {
      localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
        <any>id, 'id');
    }

    if (type !== undefined && type !== null) {
      localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
        <any>type, 'type');
    }

    let localVarHeaders = this.defaultHeaders;

    return this.http.get<MedicalOrderDetailResponse[]>(`${this.host}/${this.prefixAPI}/medical-order/find-all`, {
      params: localVarQueryParameters,
      headers: localVarHeaders
    })
  }

  public findMedicalOrderByPatient(id: number): Observable<MedicalOrderResponse> {
    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling getAccountById.');
    }

    let localVarQueryParameters = new HttpParams();
    if (id !== undefined && id !== null) {
      localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
        <any>id, 'id');
    }

    let localVarHeaders = this.defaultHeaders;

    return this.http.get<MedicalOrderResponse>(`${this.host}/${this.prefixAPI}/medical-order/find-by-patient`, {
      params: localVarQueryParameters,
      headers: localVarHeaders
    })
  }

  public addMedicalOrderDetail(request: MedicalOrderDetailsRequest[]): Observable<string> {
    let localVarHeaders = this.defaultHeaders;

    return this.http.post<string>(`${this.host}/${this.prefixAPI}/medical-order/add-detail`, request, {
      headers: localVarHeaders
    });
  }

  public cancelMedicalDetail(id: number): Observable<string> {
    let localVarQueryParameters = new HttpParams();
    if (id !== undefined && id !== null) {
      localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
        <any>id, 'id');
    }

    let localVarHeaders = this.defaultHeaders;

    return this.http.delete<string>(`${this.host}/${this.prefixAPI}/medical-order/cancel-order`, {
      params: localVarQueryParameters,
      headers: localVarHeaders
    })
  }
}
