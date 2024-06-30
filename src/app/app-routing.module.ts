import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from "./admin/admin.component";
import {LoginComponent} from "./login/login.component";
import {DepartmentComponent} from "./component/department/department.component";
import {DashboardComponent} from "./component/dashboard/dashboard.component";
import {PatientComponent} from "./component/patient/patient.component";
import {MedicalStaffComponent} from "./component/medical-staff/medical-staff.component";
import {AccountComponent} from "./component/account/account.component";
import {RoomComponent} from "./component/room/room.component";
import {CategoryComponent} from "./component/category/category.component";
import {ChangePasswordComponent} from "./change-password/change-password.component";
import {ReceivePatientsComponent} from "./component/receive-patients/receive-patients.component";
import {IsAuthenticatedGuard} from "./guard/is-authenticated.guard";
import {HasRoleGuard} from "./guard/has-role.guard";
import {ROLE} from "./constant";

const routes: Routes = [

  {
    path: "login",
    component: LoginComponent,
    pathMatch: "full"
  },
  {
    path: "change-password",
    component: ChangePasswordComponent,
    canActivate: [IsAuthenticatedGuard]
  },
  {
    path: "pms",
    component: AdminComponent,
    children: [
      {
        path: "",
        redirectTo: "dashboard",
        pathMatch: "full",
      },
      {
        path: "dashboard",
        component: DashboardComponent,
        canActivate: [IsAuthenticatedGuard],
      },
      {
        path: "patient",
        component: PatientComponent,
        canActivate: [IsAuthenticatedGuard, HasRoleGuard],
        data: {
          role: [
            ROLE.ROLE_ADMIN,
            ROLE.ROLE_SPECIALIST,
            ROLE.ROLE_NURSE,
          ]
        }
      },
      {
        path: "medical-staff",
        component: MedicalStaffComponent,
        canActivate: [IsAuthenticatedGuard, HasRoleGuard],
        data: {
          role: [
            ROLE.ROLE_ADMIN,
            ROLE.ROLE_SPECIALIST,
            ROLE.ROLE_EXAM_DOCTOR,
            ROLE.ROLE_NURSE,
          ]
        }
      },
      {
        path: "account",
        component: AccountComponent,
        canActivate: [IsAuthenticatedGuard, HasRoleGuard],
        data: {
          role: [
            ROLE.ROLE_ADMIN,
          ]
        }
      },
      {
        path: "department",
        component: DepartmentComponent,
        canActivate: [IsAuthenticatedGuard, HasRoleGuard],
        data: {
          role: [
            ROLE.ROLE_ADMIN,
            ROLE.ROLE_SPECIALIST,
            ROLE.ROLE_EXAM_DOCTOR,
            ROLE.ROLE_NURSE,
          ]
        }
      },
      {
        path: "room",
        component: RoomComponent,
        canActivate: [IsAuthenticatedGuard, HasRoleGuard],
        data: {
          role: [
            ROLE.ROLE_ADMIN,
            ROLE.ROLE_SPECIALIST,
            ROLE.ROLE_NURSE,
          ]
        }
      },
      {
        path: "category",
        component: CategoryComponent,
        canActivate: [IsAuthenticatedGuard, HasRoleGuard],
        data: {
          role: [
            ROLE.ROLE_ADMIN,
            ROLE.ROLE_SPECIALIST,
            ROLE.ROLE_EXAM_DOCTOR,
            ROLE.ROLE_NURSE,
          ]
        }
      },
      {
        path: "receive-patients",
        component: ReceivePatientsComponent,
        canActivate: [IsAuthenticatedGuard, HasRoleGuard],
        data: {
          role: [
            ROLE.ROLE_ADMIN,
            ROLE.ROLE_EXAM_DOCTOR,
            ROLE.ROLE_NURSE,
            ROLE.ROLE_MEDICAL_STAFF
          ]
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
