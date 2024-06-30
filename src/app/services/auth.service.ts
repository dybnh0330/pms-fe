import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {AuthenticateRequest} from "../model/request/authenticate.request";
import {AuthenticateResponse} from "../model/response/authenticate.response";
import {Claims} from "../common/token/claims";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private host = environment.APIUrl;
  private prefixAPI = environment.prefixAPI;

  public defaultHeaders = new HttpHeaders();
  user : Claims | null;
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  private readonly TOKEN_NAME = 'PMS_token'
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  get token(): any {
    return localStorage.getItem(this.TOKEN_NAME);
  }

  constructor(private http: HttpClient) {
    this._isLoggedIn$.next(!!this.token);
    this.user = this.getUser(this.token);
  }

  public login(request: AuthenticateRequest): Observable<AuthenticateResponse> {
    let localVarHeaders = this.defaultHeaders;

    return this.http.post<AuthenticateResponse>(`${this.host}/${this.prefixAPI}/login`, request, {
      headers: localVarHeaders
    }).pipe(
      tap({
        next: response => {
          localStorage.setItem(this.TOKEN_NAME, response.access_token);
          this._isLoggedIn$.next(true);
          this.user = this.getUser(response.access_token);
        }
      })
    )
  }

  public refresh(authorization: string): Observable<AuthenticateResponse> {
    if (authorization === null || authorization === undefined) {
      throw new Error('Required parameter authorization was null or undefined when calling refreshToken.');
    }

    let localVarHeaders = this.defaultHeaders;
    if (authorization !== undefined && authorization !== null) {
      localVarHeaders = localVarHeaders.set('Authorization', String(authorization));
    }

    return this.http.post<AuthenticateResponse>(`${this.host}/${this.prefixAPI}/refresh-token`, {}, {
      withCredentials: true,
      headers: localVarHeaders
    })
  }

  public logout() {
    localStorage.clear();
    this._isLoggedIn$.next(false);
  }

  private getUser(token: string): Claims | null {
    if (token == null) return null;

    const tokenParts = token.split('.');
    if (tokenParts.length !== 3) return null;

    return JSON.parse(
      decodeURIComponent(
        window.escape(
          window.atob(tokenParts[1].replace(/-/g, '+').replace(/_/g, '/'))
        )
      )
    ) as Claims;
  }

}
