import {Component, OnInit} from '@angular/core';
import {BaseAddOrUpdateDialogComponent, BaseAddOrUpdateDialogData} from "../../../base/pms.base";
import {PatientModel} from "../../../model/patient.model";

export interface UpdatePatientData extends BaseAddOrUpdateDialogData {
  patient: PatientModel;
}
@Component({
  selector: 'app-update-patient',
  templateUrl: './update-patient.component.html',
  styleUrls: ['./update-patient.component.scss']
})
export class UpdatePatientComponent
  extends BaseAddOrUpdateDialogComponent<UpdatePatientData>
implements OnInit{

  date = this.data.patient.dob;
  parseDate = new Date(parseInt(this.date, 10));
  genders = [
    {id: 0, name: 'Nam'},
    {id: 1, name: 'Nữ'},
  ]
  ngOnInit(): void {
    this.data.patient.dob = this.parseDate.toISOString().split('T')[0];
  }

}
