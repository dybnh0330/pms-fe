import {Claims} from "../token/claims";

export class RoleUtils {
  public static  isAccepted(role: string[], claims: Claims | null): boolean {
    if (claims == null || claims.scope == null) return false;

    const matchRole = role.filter((x) => {
      return claims.scope.indexOf(x) !== -1;
    });

    return matchRole !== null && matchRole.length > 0;
  }
}
