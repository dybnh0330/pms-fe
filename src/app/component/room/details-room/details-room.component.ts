import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {BaseAddOrUpdateDialogComponent, BaseAddOrUpdateDialogData} from "../../../base/pms.base";
import {PatientRoomResponse} from "../../../model/response/patient-room.response";
import {ROLE} from "../../../constant";
import {RoleUtils} from "../../../common/utils/RoleUtils";
import {AuthService} from "../../../services/auth.service";

export interface InfoPatientRoomData extends BaseAddOrUpdateDialogData {
  patientRoom: PatientRoomResponse;
}

@Component({
  selector: 'app-details-room',
  templateUrl: './details-room.component.html',
  styleUrls: ['./details-room.component.scss']
})
export class DetailsRoomComponent extends BaseAddOrUpdateDialogComponent<InfoPatientRoomData>
  implements OnInit {

  roleAccepted: string[] = [ROLE.ROLE_ADMIN]

  ngOnInit(): void {
    console.log("patientRoom", this.data.patientRoom);
  }

  constructor(
    public override dialogRef: MatDialogRef<typeof self>,
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public override data: InfoPatientRoomData) {
    super(dialogRef, data);
  }

  isAuthor(): boolean {
    return RoleUtils.isAccepted(this.roleAccepted, this.authService.user);
  }

  override close() {
    this.dialogRef.close();
  }
}
