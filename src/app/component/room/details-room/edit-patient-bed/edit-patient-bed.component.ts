import {Component, OnInit} from '@angular/core';
import {BaseAddOrUpdateDialogComponent, BaseAddOrUpdateDialogData} from "../../../../base/pms.base";
import {PatientBedModel} from "../../../../model/patient-bed.model";
import {MatSlideToggleChange} from "@angular/material/slide-toggle";

export interface AddOrUpdatePatientBedData extends BaseAddOrUpdateDialogData {
  patientBed: PatientBedModel;
}

@Component({
  selector: 'app-edit-patient-bed',
  templateUrl: './edit-patient-bed.component.html',
  styleUrls: ['./edit-patient-bed.component.scss']
})
export class EditPatientBedComponent
  extends BaseAddOrUpdateDialogComponent<AddOrUpdatePatientBedData>
  implements OnInit {

  checked?: MatSlideToggleChange;

  ngOnInit(): void {
  }

}
