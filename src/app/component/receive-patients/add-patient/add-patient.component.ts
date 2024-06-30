import {Component, OnInit} from '@angular/core';
import {BaseAddOrUpdateDialogComponent, BaseAddOrUpdateDialogData} from "../../../base/pms.base";
import {ReceivePatientRequest} from "../../../model/request/receive-patient.request";

export interface AddPatientData extends BaseAddOrUpdateDialogData {
  receivePatient: ReceivePatientRequest
}

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.scss']
})
export class AddPatientComponent extends BaseAddOrUpdateDialogComponent<AddPatientData>
  implements OnInit {

  date = this.data.receivePatient.dob;
  parseDate = new Date(parseInt(this.date, 10));

  genders = [
    {id: 0, name: 'Nam'},
    {id: 1, name: 'Nữ'}
  ]

  ngOnInit(): void {
    if (!this.data.isCreate) {
      this.data.receivePatient.dob = this.parseDate.toISOString().split('T')[0];
    }
  }

}
