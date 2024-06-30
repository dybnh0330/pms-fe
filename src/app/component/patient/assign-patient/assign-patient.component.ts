import {Component, Inject, OnInit} from '@angular/core';
import {BaseAddOrUpdateDialogComponent, BaseAddOrUpdateDialogData} from "../../../base/pms.base";
import {AssignPatientRequest} from "../../../model/request/assign-patient.request";
import {DepartmentModel} from "../../../model/department.model";
import {MedicalStaffModel} from "../../../model/medical-staff.model";
import {PatientBedModel} from "../../../model/patient-bed.model";
import {PatientRoomResponse} from "../../../model/response/patient-room.response";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DepartmentService} from "../../../services/department.service";
import {MedicalStaffService} from "../../../services/medical-staff.service";
import {PatientBedService} from "../../../services/patient-bed.service";
import {PatientRoomService} from "../../../services/patient-room.service";

export interface AssignPatientData extends BaseAddOrUpdateDialogData {
  assignPatient: AssignPatientRequest;
}

@Component({
  selector: 'app-assign-patient',
  templateUrl: './assign-patient.component.html',
  styleUrls: ['./assign-patient.component.scss']
})
export class AssignPatientComponent
  extends BaseAddOrUpdateDialogComponent<AssignPatientData>
  implements OnInit {

  rooms: PatientRoomResponse[] = []

  patientBeds: PatientBedModel[] = []

  doctors: MedicalStaffModel[] = []

  departments: DepartmentModel[] = []
  private roomId: any;

  constructor(public override dialogRef: MatDialogRef<typeof self>,
              private departmentService: DepartmentService,
              private medicalStaffService: MedicalStaffService,
              private patientBedService: PatientBedService,
              private patientRoomService: PatientRoomService,
              @Inject(MAT_DIALOG_DATA) public override data: AssignPatientData) {

    super(dialogRef, data);
  }

  ngOnInit(): void {
    this.getDepartments();
    this.getAllMedicalStaff(this.data.assignPatient.departmentId);
    this.getAllPatientRoom(this.data.assignPatient.departmentId);
  }

  getDepartments(): void {
    this.departmentService.findAllDepartment().subscribe({
      next: value => {
        this.departments = value;
        console.log("getAllDepartment", value);
      },
      error: err => {
        console.log("error", err)
      }
    })
  }

  getAllMedicalStaff(id: number): void {
    this.medicalStaffService.findAllDoctorByDepartment(id).subscribe({
      next: value => {
        this.doctors = value;
        console.log("getAllDoctorByDepartment", value);
      },
      error: err => {
        console.log("error", err);
      }
    })
  }

  getAllPatientRoom(id: number): void {
    this.patientRoomService.findEmptyByDepartment(id).subscribe({
      next: value => {
        this.rooms = value;
        console.log("getAllRoomByDepartment", value);
      },
      error: err => {
        console.log("error", err);
      }
    })
  }

  getAllPatientBedEmpty(id: number): void {
    this.patientBedService.findAllBedEmptyByRoom(id).subscribe({
      next: value => {
        this.patientBeds = value;
        console.log("getAllPatientBedEmpty", value)
      },
      error: err => {
        console.log("error", err);
      }
    })
  }


  onRoomChange($event: any) {
    this.roomId = $event;
    this.getAllPatientBedEmpty(this.roomId);
  }
}
