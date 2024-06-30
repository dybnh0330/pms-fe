import {Component, OnInit} from '@angular/core';
import {BaseAddOrUpdateDialogComponent, BaseAddOrUpdateDialogData} from "../../../../../base/pms.base";
import {MedicalRecordRequest} from "../../../../../model/request/medical-record.request";

export interface UpdatePatientRecordData extends BaseAddOrUpdateDialogData {
  medicalRecord: MedicalRecordRequest;
  titleRecord: string;
}
@Component({
  selector: 'app-update-patient-record',
  templateUrl: './update-patient-record.component.html',
  styleUrls: ['./update-patient-record.component.scss']
})
export class UpdatePatientRecordComponent
extends BaseAddOrUpdateDialogComponent<UpdatePatientRecordData>
implements OnInit{
  ngOnInit(): void {
  }

}
