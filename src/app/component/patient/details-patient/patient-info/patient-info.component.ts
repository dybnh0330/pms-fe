import {Component, Input, OnInit} from '@angular/core';
import {PatientModel} from "../../../../model/patient.model";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-patient-info',
  templateUrl: './patient-info.component.html',
  styleUrls: ['./patient-info.component.scss']
})
export class PatientInfoComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<typeof self>) {
  }

  @Input() data: PatientModel = {
    departmentId: 0, roomId: 0,
    createTime: "",
    bhytCode: "",
    cccdNumber: "",
    address: "",
    departmentName: "",
    gender: 0,
    guardianPhone: "",
    id: 0,
    medicalStaffName: "",
    medicalStaffId: 0,
    patientName: "",
    bedNumber: "",
    patientCode: "",
    patientPhone: "",
    roomNumber: "",
    status: 0,
    dob: ""
  };

  patientStatus = '';

  ngOnInit(): void {

    if (this.data.status === 0) {
      this.patientStatus = 'Vào viện'
    } else if (this.data.status === 1) {
      this.patientStatus = 'Đang điều trị'
    } else {
      this.patientStatus = 'Đã xuất viện'
    }
  }

  close() {
    this.dialogRef.close();
  }
}
