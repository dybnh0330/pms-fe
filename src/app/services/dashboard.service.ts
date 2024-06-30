import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {DashboardResponse} from "../model/response/dashboard.response";
import {CategoryModel} from "../model/category.model";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private host = environment.APIUrl;
  private prefixAPI = environment.prefixAPI;

  public defaultHeaders = new HttpHeaders();

  constructor(private http: HttpClient) { }

  public findDashboardInfo() : Observable<DashboardResponse> {
    let localVarHeaders = this.defaultHeaders;

    return this.http.get<DashboardResponse>(`${this.host}/${this.prefixAPI}/dashboard/find-info`, {
      headers: localVarHeaders
    })
  }
}
