import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {SearchSortPageableModel} from "../model/search-sort-pageable.model";
import {Observable} from "rxjs";
import {PageAccountResponse} from "../model/response/page-account.response";
import {AccountModel} from "../model/account.model";
import {AccountRequest} from "../model/request/account.request";
import {ChangePasswordRequest} from "../model/request/change-password.request";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

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

  public findAllAccountPage(searchVO: SearchSortPageableModel) : Observable<PageAccountResponse> {
    let localVarQueryParameters = new HttpParams();
    let localVarHeaders = this.defaultHeaders;

    if (searchVO !== undefined && searchVO !== null) {
      localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
        <any>searchVO, 'searchVO');
    }
    return this.http.get<PageAccountResponse>(`${this.host}/${this.prefixAPI}/account/page/find-all`, {
      params: localVarQueryParameters,
      headers: localVarHeaders
    })
  }

  public findAccountById(id: number) : Observable<AccountModel> {
    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling getAccountById.');
    }

    let localVarQueryParameters = new HttpParams();
    if (id !== undefined && id !== null) {
      localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
        <any>id, 'id');
    }

    let localVarHeaders = this.defaultHeaders;

    return this.http.get<AccountModel>(`${this.host}/${this.prefixAPI}/account/find-by-id`, {
      params: localVarQueryParameters,
      headers: localVarHeaders
    })
  }

  public createAccount(accountRequest: AccountRequest) : Observable<AccountModel> {
    let localVarHeaders = this.defaultHeaders;

    return this.http.post<AccountModel>(`${this.host}/${this.prefixAPI}/account/create`, accountRequest, {
      headers: localVarHeaders
    });
  }

  public updateAccount(id: number, accountRequest: AccountRequest) : Observable<AccountModel> {
    let localVarQueryParameters = new HttpParams();
    if (id !== undefined && id !== null) {
      localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
        <any>id, 'id');
    }

    let localVarHeaders = this.defaultHeaders;

    return this.http.put<AccountModel>(`${this.host}/${this.prefixAPI}/account/update`, accountRequest, {
      params: localVarQueryParameters,
      headers: localVarHeaders
    })
  }

  public deleteAccount(id: number) : Observable<string> {
    let localVarQueryParameters = new HttpParams();
    if (id !== undefined && id !== null) {
      localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
        <any>id, 'id');
    }

    let localVarHeaders = this.defaultHeaders;

    return this.http.delete<string>(`${this.host}/${this.prefixAPI}/account/delete`, {
      params: localVarQueryParameters,
      headers: localVarHeaders
    })
  }

  public unlockAccount(id: number) : Observable<string> {
    let localVarQueryParameters = new HttpParams();
    if (id !== undefined && id !== null) {
      localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
        <any>id, 'id');
    }

    let localVarHeaders = this.defaultHeaders;

    return this.http.put<string>(`${this.host}/${this.prefixAPI}/account/unlock`, null, {
      params: localVarQueryParameters,
      headers: localVarHeaders
    })
  }

  public resetPassword(id: number) : Observable<string> {
    let localVarQueryParameters = new HttpParams();
    if (id !== undefined && id !== null) {
      localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
        <any>id, 'id');
    }

    let localVarHeaders = this.defaultHeaders;

    return this.http.put<string>(`${this.host}/${this.prefixAPI}/account/reset-password`, null, {
      params: localVarQueryParameters,
      headers: localVarHeaders
    })
  }

  public changePassword(changePasswordRequest: ChangePasswordRequest) : Observable<string> {

    let localVarHeaders = this.defaultHeaders;

    return this.http.put<string>(`${this.host}/${this.prefixAPI}/account/change-password`, changePasswordRequest,{
      headers: localVarHeaders
    })
  }

}
