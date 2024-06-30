export interface AuthenticateResponse {
  access_token: string;
  expires_in: number;
  scopes: string[];
}
