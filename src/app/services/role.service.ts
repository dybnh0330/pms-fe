import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {RoleModel} from "../model/role.model";

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private host = environment.APIUrl;
  private prefixAPI = environment.prefixAPI;

  public defaultHeaders = new HttpHeaders();


  constructor(private http: HttpClient) { }

  public findAllRole(): Observable<RoleModel[]> {
    let localVarHeaders = this.defaultHeaders;

    return this.http.get<RoleModel[]>(`${this.host}/${this.prefixAPI}/role/find-all`, {
      headers: localVarHeaders
    })
  }
}
