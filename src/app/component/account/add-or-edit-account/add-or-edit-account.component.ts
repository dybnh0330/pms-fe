import {Component, Inject, OnInit} from '@angular/core';
import {BaseAddOrUpdateDialogComponent, BaseAddOrUpdateDialogData} from "../../../base/pms.base";
import {AccountModel} from "../../../model/account.model";
import {MedicalStaffModel} from "../../../model/medical-staff.model";
import {NgForm} from "@angular/forms";
import {MatSlideToggleChange} from "@angular/material/slide-toggle";
import {RoleModel} from "../../../model/role.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {RoleService} from "../../../services/role.service";
import {MedicalStaffService} from "../../../services/medical-staff.service";
import {DepartmentService} from "../../../services/department.service";
import {DepartmentModel} from "../../../model/department.model";

export interface AddOrUpdateAccountData extends BaseAddOrUpdateDialogData {
  account: AccountModel;
  medicalStaffs: MedicalStaffModel[];
}

@Component({
  selector: 'app-add-or-edit-account',
  templateUrl: './add-or-edit-account.component.html',
  styleUrls: ['./add-or-edit-account.component.scss']
})
export class AddOrEditAccountComponent
  extends BaseAddOrUpdateDialogComponent<AddOrUpdateAccountData>
  implements OnInit {

  checked?: MatSlideToggleChange;

  roles: RoleModel[] = [];

  medicalStaffs: MedicalStaffModel[] = [];

  departments: DepartmentModel[] = [];

  departmentId: any;

  medicalStaff?: MedicalStaffModel;

  constructor(public override dialogRef: MatDialogRef<typeof self>,
              @Inject(MAT_DIALOG_DATA) public override data: AddOrUpdateAccountData,
              private roleService: RoleService,
              private medicalStaffService: MedicalStaffService,
              private departmentService: DepartmentService
  ) {
    super(dialogRef, data);
  }

  ngOnInit(): void {
    this.getRole();
    this.getDepartments();

    if (this.data.account.medicalStaffId != null) {
      this.getDepartmentById();
    }
  }

  getRole(): void {
    this.roleService.findAllRole()
      .subscribe({
        next: (res) => {
          this.roles = res
        }, error: (err) => {
          console.log("roles", err);
        }
      });
  }

  getMedicalStaffs(id: number): void {
    this.medicalStaffService.findAllByDepartment(id)
      .subscribe({
        next: (res) => {
          this.medicalStaffs = res
          console.log("medicalStaffNoAccount", res);
        }, error: (err) => {
          console.log("roles", err);
        }
      });
  }

  getDepartmentById(): void {
    this.medicalStaffService.findMedicalStaffById(this.data.account.medicalStaffId)
      .subscribe({
        next: (res) => {
          this.departmentId = res.departmentId;
          this.getMedicalStaffs(this.departmentId)
        }
      })
  }

  getDepartments(): void {
    this.departmentService.findAllDepartment()
      .subscribe({
        next: (res) => {
          this.departments = res
          console.log("departments", res)
        },
        error: (err) => {
          console.log("error", err);
        }
      })
  }

  onDepartmentChange($event: any) {
    this.departmentId = $event;
    this.getMedicalStaffs(this.departmentId)
  }
}
