import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {SearchSortPageableModel} from "../model/search-sort-pageable.model";
import {PageDepartmentResponse} from "../model/response/page-department.response";
import {DepartmentRequest} from "../model/request/department.request";
import {DepartmentModel} from "../model/department.model";

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private host = environment.APIUrl;
  private prefixAPI = environment.prefixAPI

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

  public findAllPageDepartment(searchVO: SearchSortPageableModel): Observable<PageDepartmentResponse> {

    let localVarQueryParameters = new HttpParams();
    let localVarHeaders = this.defaultHeaders;


    if (searchVO !== undefined && searchVO !== null) {
      localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
        <any>searchVO, 'searchVO');
    }

    return this.http.get<PageDepartmentResponse>(`${this.host}/${this.prefixAPI}/department/page/find-all`, {
      params: localVarQueryParameters,
      headers: localVarHeaders
    })
  }

  public findAllDepartment() : Observable<DepartmentModel[]> {
    let localVarHeaders = this.defaultHeaders;

    return this.http.get<DepartmentModel[]>(`${this.host}/${this.prefixAPI}/department/find-all`, {
      headers: localVarHeaders
    })
  }

  public findDepartmentById(id: number): Observable<DepartmentModel> {
    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling getAccountById.');
    }

    let localVarQueryParameters = new HttpParams();
    if (id !== undefined && id !== null) {
      localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
        <any>id, 'id');
    }

    let localVarHeaders = this.defaultHeaders;

    return this.http.get<DepartmentModel>(`${this.host}/${this.prefixAPI}/department/find-by-id`,
      {
        params: localVarQueryParameters,
        headers: localVarHeaders
      });
  }

  public createDepartment(departmentRequest: DepartmentRequest): Observable<DepartmentModel> {

    let localVarHeaders = this.defaultHeaders;

    return this.http.post<DepartmentModel>(`${this.host}/${this.prefixAPI}/department/create`, departmentRequest, {
      headers: localVarHeaders
    })
  }

  public updateDepartment(id: number, departmentRequest: DepartmentRequest) : Observable<DepartmentModel> {

    let localVarQueryParameters = new HttpParams();
    if (id !== undefined && id !== null) {
      localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
        <any>id, 'id');
    }

    let localVarHeaders = this.defaultHeaders;

    return this.http.put<DepartmentModel>(`${this.host}/${this.prefixAPI}/department/update`, departmentRequest, {
      params: localVarQueryParameters,
      headers: localVarHeaders
    })
  }

  public deleteDepartment(id: number): Observable<string> {

    let localVarQueryParameters = new HttpParams();
    if (id !== undefined && id !== null) {
      localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
        <any>id, 'id');
    }

    let localVarHeaders = this.defaultHeaders;

    return this.http.delete<string>(`${this.host}/${this.prefixAPI}/department/delete`, {
      params: localVarQueryParameters,
      headers: localVarHeaders
    });
  }
}
