import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "../services/auth.service";
import {RoleUtils} from "../common/utils/RoleUtils";
import {MessageService} from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class HasRoleGuard implements CanActivate {

  constructor(private router: Router,
              private toastService: MessageService,
              private authService: AuthService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    if (!RoleUtils.isAccepted(route.data['role'], this.authService.user)) {

      this.toastService.add({
        severity: 'error',
        summary: 'Thất bại',
        detail: "Tài khoản không có quyền truy cập",
        life: 15000
      });

      this.router.navigate(['pms/dashboard'])
      return false;
    }

    return true;
  }

}
