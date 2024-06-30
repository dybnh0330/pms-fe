export interface Claims {

  // [claim: string]: unknown;

  username: string;
  name: string;
  department: string;
  departmentId: number;
  scope: string[];
  iat: number;
  exp: number;
}
