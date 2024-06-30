import {Component, Inject, OnInit} from '@angular/core';
import {BaseAddOrUpdateDialogComponent, BaseAddOrUpdateDialogData} from "../../../base/pms.base";
import {PatientModel} from "../../../model/patient.model";
import {ROLE} from "../../../constant";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AuthService} from "../../../services/auth.service";
import {RoleUtils} from "../../../common/utils/RoleUtils";

export interface InfoPatientData extends BaseAddOrUpdateDialogData {
  patient: PatientModel;
}

@Component({
  selector: 'app-details-patient',
  templateUrl: './details-patient.component.html',
  styleUrls: ['./details-patient.component.scss']
})
export class DetailsPatientComponent
  extends BaseAddOrUpdateDialogComponent<InfoPatientData> implements OnInit{

  constructor(public override dialogRef: MatDialogRef<typeof self>,
              private authService: AuthService,
              @Inject(MAT_DIALOG_DATA) public override data: InfoPatientData) {
    super(dialogRef, data);
  }

  roleAccepted: string[] = [ROLE.ROLE_NURSE, ROLE.ROLE_SPECIALIST]

  date = this.data.patient.dob;
  parseDate = new Date(parseInt(this.date, 10));
  yob = ''

  ngOnInit(): void {
    this.yob = this.parseDate.toISOString().split("T")[0];
  }

  isAuthor(scopes: string[]): boolean {
    return RoleUtils.isAccepted(scopes, this.authService.user);
  }
}
