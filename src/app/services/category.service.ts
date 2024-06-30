import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {CategoryModel} from "../model/category.model";
import {SearchSortPageableModel} from "../model/search-sort-pageable.model";
import {PageCategoryResponse} from "../model/response/page-category.response";
import {CategoryRequest} from "../model/request/category.request";
import {SearchSortModel} from "../model/search-sort.model";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

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

  public findAllCategoryPage(searchVO: SearchSortPageableModel) : Observable<PageCategoryResponse> {
    let localVarQueryParameters = new HttpParams();
    let localVarHeaders = this.defaultHeaders;


    if (searchVO !== undefined && searchVO !== null) {
      localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
        <any>searchVO, 'searchVO');
    }
    return this.http.get<PageCategoryResponse>(`${this.host}/${this.prefixAPI}/category/page/find-all`, {
      params: localVarQueryParameters,
      headers: localVarHeaders
    })
  }

  public findAllByType(type: number) : Observable<CategoryModel[]> {

    let localVarQueryParameters = new HttpParams();
    if (type !== undefined && type !== null) {
      localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
        <any>type, 'type');
    }

    let localVarHeaders = this.defaultHeaders;
    return this.http.get<CategoryModel[]>(`${this.host}/${this.prefixAPI}/category/find-by-type`, {
      params: localVarQueryParameters,
      headers: localVarHeaders
    })
  }

  public findAllPageByType(type: number, searchVO: SearchSortPageableModel) : Observable<PageCategoryResponse> {
    if (type === null || type === undefined) {
      throw new Error('Required parameter id was null or undefined when calling getAccountById.');
    }

    let localVarQueryParameters = new HttpParams();
    if (type !== undefined && type !== null) {
      localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
        <any>type, 'id');
    }
    if (searchVO !== undefined && searchVO !== null) {
      localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
        <any>searchVO, 'searchVO');
    }

    let localVarHeaders = this.defaultHeaders;

    return this.http.get<PageCategoryResponse>(`${this.host}/${this.prefixAPI}/category/page/find-by-type`, {
      params: localVarQueryParameters,
      headers: localVarHeaders
    })
  }

  public findAllType(searchVO: SearchSortModel) : Observable<CategoryModel[]> {
    let localVarHeaders = this.defaultHeaders;
    let localVarQueryParameters = new HttpParams();
    if (searchVO !== undefined && searchVO !== null) {
      localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
        <any>searchVO, 'searchVO');
    }

    return this.http.get<CategoryModel[]>(`${this.host}/${this.prefixAPI}/category/type/find-all`, {
      params: localVarQueryParameters,
      headers: localVarHeaders
    })
  }

  public findCategoryById(id: number) : Observable<CategoryModel> {
    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling getAccountById.');
    }

    let localVarQueryParameters = new HttpParams();
    if (id !== undefined && id !== null) {
      localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
        <any>id, 'id');
    }
    let localVarHeaders = this.defaultHeaders;

    return this.http.get<CategoryModel>(`${this.host}/${this.prefixAPI}/category/find-by-id`, {
      params: localVarQueryParameters,
      headers: localVarHeaders
    })
  }

  public createCategory(categoryRequest: CategoryRequest) : Observable<CategoryModel> {
    let localVarHeaders = this.defaultHeaders;

    return this.http.post<CategoryModel>(`${this.host}/${this.prefixAPI}/category/create`, categoryRequest, {
      headers: localVarHeaders
    })
  }

  public updateCategory(id: number, categoryRequest: CategoryRequest) : Observable<CategoryModel> {
    let localVarQueryParameters = new HttpParams();
    if (id !== undefined && id !== null) {
      localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
        <any>id, 'id');
    }

    let localVarHeaders = this.defaultHeaders;

    return this.http.put<CategoryModel>(`${this.host}/${this.prefixAPI}/category/update`, categoryRequest, {
      params: localVarQueryParameters,
      headers: localVarHeaders
    })
  }

  public deleteCategory(id: number) : Observable<string> {
    let localVarQueryParameters = new HttpParams();
    if (id !== undefined && id !== null) {
      localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
        <any>id, 'id');
    }

    let localVarHeaders = this.defaultHeaders;
    return this.http.delete<string>(`${this.host}/${this.prefixAPI}/category/delete`, {
      params: localVarQueryParameters,
      headers: localVarHeaders
    })
  }
}
