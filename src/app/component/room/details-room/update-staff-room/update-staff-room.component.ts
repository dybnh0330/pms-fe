import {Component, Inject, OnInit} from '@angular/core';
import {BaseAddOrUpdateDialogComponent, BaseAddOrUpdateDialogData} from "../../../../base/pms.base";
import {NgForm} from "@angular/forms";
import {MedicalStaffModel} from "../../../../model/medical-staff.model";
import {StaffRoomResponse} from "../../../../model/response/staff-room.response";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MedicalStaffService} from "../../../../services/medical-staff.service";
import {ROLE} from "../../../../constant";
import {AuthService} from "../../../../services/auth.service";
import {RoleUtils} from "../../../../common/utils/RoleUtils";

export interface AddOrUpdateStaffRoomData extends BaseAddOrUpdateDialogData {
  staffRoom: StaffRoomResponse;
}

@Component({
  selector: 'app-update-staff-room',
  templateUrl: './update-staff-room.component.html',
  styleUrls: ['./update-staff-room.component.scss']
})
export class UpdateStaffRoomComponent
  extends BaseAddOrUpdateDialogComponent<AddOrUpdateStaffRoomData>
  implements OnInit {

  roleAccepted: string[] = [ROLE.ROLE_ADMIN, ROLE.ROLE_SPECIALIST]

  showValue(addForm: NgForm) {
    console.log(addForm.value)
  }

  isAuthor(): boolean {
    return RoleUtils.isAccepted(this.roleAccepted, this.authService.user);
  }

  staffRooms: MedicalStaffModel[] = []

  constructor(public override dialogRef: MatDialogRef<typeof self>,
              private medicalStaffService: MedicalStaffService,
              private authService: AuthService,

              @Inject(MAT_DIALOG_DATA) public override data: AddOrUpdateStaffRoomData) {
    super(dialogRef, data);
  }

  ngOnInit(): void {
    console.log(this.data.staffRoom);
    this.getMedicalStaffInDepartment();
  }

  getMedicalStaffInDepartment() {
    this.medicalStaffService.findAllByDepartment(this.data.staffRoom.departmentId)
      .subscribe({
        next: (response) => {
          this.staffRooms = response;
          console.log("findAllStaffInDepartment", response);
        },
        error: (err) => {
          console.log("error", err);
        }
      })
  }
}

