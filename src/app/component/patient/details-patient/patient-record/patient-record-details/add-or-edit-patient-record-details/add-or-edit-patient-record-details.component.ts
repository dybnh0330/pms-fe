import {Component, Inject, OnInit} from '@angular/core';
import {BaseAddOrUpdateDialogComponent, BaseAddOrUpdateDialogData} from "../../../../../../base/pms.base";
import {NgForm} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MedicalRecordDetailResponse} from "../../../../../../model/response/medical-record-detail.response";

export interface AddOrEditPatientRecordDetailData extends BaseAddOrUpdateDialogData {
  recordDetail: MedicalRecordDetailResponse;
}

@Component({
  selector: 'app-add-or-edit-patient-record-details',
  templateUrl: './add-or-edit-patient-record-details.component.html',
  styleUrls: ['./add-or-edit-patient-record-details.component.scss']
})
export class AddOrEditPatientRecordDetailsComponent
  extends BaseAddOrUpdateDialogComponent<AddOrEditPatientRecordDetailData>
  implements OnInit {

  constructor(
    public override dialogRef: MatDialogRef<typeof self>,
    @Inject(MAT_DIALOG_DATA) public override data: AddOrEditPatientRecordDetailData
  ) {
    super(dialogRef, data);
  }

  ngOnInit(): void {

  }

  showValue(addForm: NgForm) {
    console.log(addForm.value)
  }
}
