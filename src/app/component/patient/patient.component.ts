import {Component, OnInit} from '@angular/core';
import {PatientModel} from "../../model/patient.model";
import {MatDialog} from "@angular/material/dialog";
import {AssignPatientRequest} from "../../model/request/assign-patient.request";
import {AssignPatientComponent} from "./assign-patient/assign-patient.component";
import {UpdatePatientComponent} from "./update-patient/update-patient.component";
import {UpdatePatientRequest} from "../../model/request/update-patient.request";
import {ConfirmDialogComponent, ConfirmDialogModel} from "../confirm-dialog/confirm-dialog.component";
import {DetailsPatientComponent} from "./details-patient/details-patient.component";
import {PatientService} from "../../services/patient.service";
import {DepartmentService} from "../../services/department.service";
import {MessageService} from "primeng/api";
import {DepartmentModel} from "../../model/department.model";
import {SearchSortPageableModel} from "../../model/search-sort-pageable.model";
import {AuthService} from "../../services/auth.service";
import {RoleUtils} from "../../common/utils/RoleUtils";
import {ROLE} from "../../constant";

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {

  patients: PatientModel[] = [];

  patientsAdmission: PatientModel[] = []

  assignPatient?: AssignPatientRequest;
  updatePatient?: UpdatePatientRequest;

  data?: PatientModel;
  lsItemsPerPage = [10, 20, 30];
  totalElements = 0;
  page = 1;
  itemsPerPage = this.lsItemsPerPage[0];
  math: Math = Math;
  departmentId?: any;
  departments: DepartmentModel[] = [];
  roleAccepted: string[] = [ROLE.ROLE_NURSE, ROLE.ROLE_SPECIALIST, ROLE.ROLE_ADMIN]
  roleNurseAndSpecialist: string[] = [ROLE.ROLE_NURSE, ROLE.ROLE_SPECIALIST]
  roleSpecialist: string[] = [ROLE.ROLE_SPECIALIST]
  roleAdmin: string[] = [ROLE.ROLE_ADMIN]

  searchVo: SearchSortPageableModel = {
    currentPageNumber: 0,
    pageSize: 0,
    searchText: "",
    sortColumn: "",
    sortDirection: ""
  }
  departmentChange: boolean = false;

  dataAssignPatientRequest: AssignPatientRequest = {
    departmentId: 0,
    medicalStaffId: 0, patientBedId: 0, roomId: 0
  }

  dataUpdatePatientRequest: UpdatePatientRequest = {
    address: "",
    bhytCode: "", cccdNumber: "", gender: 0, guardianPhone: "", patientName: "", patientPhone: "", dob: ""
  }

  constructor(
    private dialog: MatDialog,
    private patientService: PatientService,
    private departmentService: DepartmentService,
    private toastService: MessageService,
    private authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.searchVo.currentPageNumber = this.page - 1;
    this.searchVo.pageSize = this.itemsPerPage;
    this.searchVo.searchText = '';
    this.searchVo.sortColumn = 'updateTime';
    this.searchVo.sortDirection = 'desc';

    this.departmentId = this.authService.user?.departmentId;

    this.getAllPatients(this.departmentId);
    this.getAllPatientAdmissionDepartment(this.departmentId);
    this.getAllDepartment();
  }

  isAuthor(scopes: string[]): boolean {
    return RoleUtils.isAccepted(scopes, this.authService.user);
  }


  getAllPatients(id: number): void {
    this.patientService.findAllPageByDepartment(this.departmentId, this.searchVo)
      .subscribe({
        next: value => {
          this.patients = value.content;
          this.totalElements = value.totalElements
          console.log("patients", value);
        },
        error: (error) => {
          console.log("error", error);
        }
      })
  }

  getAllDepartment(): void {
    this.departmentService.findAllDepartment()
      .subscribe({
        next: value => {
          this.departments = value;
          console.log("getAllDepartment", value);
        },
        error: err => {
          console.log("error", err);
        }
      })
  }

  getAllPatientAdmissionDepartment(id: number): void {
    this.patientService.findAllPatientsAdmissionDepartment(id).subscribe({
      next: value => {
        this.patientsAdmission = value;
        console.log("patientAdmission", value);
      },
      error: err => {
        console.log("error", err);
      }
    })
  }

  onDepartmentChange($event: any) {
    this.departmentId = $event;
    this.departmentChange = true;
    this.searchVo.sortColumn = 'updateTime';
    this.searchVo.sortDirection = 'desc';

    this.getAllPatients(this.departmentId);
    this.getAllPatientAdmissionDepartment(this.departmentId);
  }

  search() {
    console.log("search", this.searchVo.searchText);
    this.page = 1;
    this.searchVo.currentPageNumber = this.page - 1;
    this.getAllPatients(this.departmentId);
  }

  onItemPerPageChange($event: any) {
    this.itemsPerPage = $event;
    this.searchVo.pageSize = this.itemsPerPage;
    this.page = 1;
    this.searchVo.currentPageNumber = this.page - 1;

    this.getAllPatients(this.departmentId);
  }

  onPageChange($event: any): void {
    this.page = $event;
    this.searchVo.currentPageNumber = this.page - 1;
    this.getAllPatients(this.departmentId);
  }

  showUpdate(id: number) {
    this.patientService.findPatientById(id)
      .subscribe({
        next: value => {
          this.data = value;
          console.log("patientById", value);
          setTimeout(() => {
            const assignDialog = this.dialog.open(
              UpdatePatientComponent,
              {
                data: {
                  patient: this.data,
                  isCreate: false,
                },
                disableClose: true,
                width: '40%'
              }
            );
            assignDialog.afterClosed().subscribe((data: PatientModel) => {
              if (data === undefined) return;

              console.log('data', data);

              this.dataUpdatePatientRequest = {
                gender: data.gender,
                patientName: data.patientName,
                address: data.address,
                dob: data.dob,
                bhytCode: data.bhytCode,
                cccdNumber: data.cccdNumber,
                guardianPhone: data.guardianPhone,
                patientPhone: data.patientPhone,
              };

              console.log('data request', this.dataUpdatePatientRequest);

              this.patientService.updateInfoPatient(id, this.dataUpdatePatientRequest)
                .subscribe({
                  next: value => {
                    console.log("updateInfoPatient", value);
                    this.toastService.add({
                      severity: 'success',
                      summary: 'Thành công',
                      detail: "Cập nhật thông tin bệnh nhân thành công",
                      icon: "pi pi-check",
                      life: 15000
                    });
                    this.getAllPatients(this.departmentId);
                  },
                  error: error => {
                    this.toastService.add({
                      severity: 'error',
                      summary: 'Thất bại',
                      detail: `Cập nhật thông tin bệnh không thành công ${
                        error.error &&
                        error.error.pmsExceptionMsg &&
                        error.error.pmsExceptionMsg.messageDefault
                          ? error.error.pmsExceptionMsg.messageDefault
                          : ""
                      }`,
                      life: 15000
                    })

                  }
                })
            });
          }, 100)
        },
        error: err => {
          console.log("error", err);
        }
      })
  }

  showDetails(id: number) {
    this.patientService.findPatientById(id)
      .subscribe({
        next: value => {
          this.data = value;
          console.log("findPatientById", value);
          setTimeout(() => {
            this.dialog.open(
              DetailsPatientComponent,
              {
                data: {
                  patient: this.data,
                  isCreate: false,
                },
                disableClose: true,
                width: '100%'
              }
            );
          }, 100)
        }
      });
  }

  showAssign(id: number) {
    this.assignPatient = {
      departmentId: this.departmentId
    } as AssignPatientRequest

    setTimeout(() => {
      const assignDialog = this.dialog.open(
        AssignPatientComponent,
        {
          data: {
            assignPatient: this.assignPatient,
            isCreate: false,
          },
          disableClose: true,
          width: '40%'
        }
      );
      assignDialog.afterClosed().subscribe((data: AssignPatientRequest) => {
        if (data === undefined) return;

        console.log(data);

        this.dataAssignPatientRequest = {
          departmentId: data.departmentId,
          medicalStaffId: data.medicalStaffId,
          patientBedId: data.patientBedId,
          roomId: data.roomId,
        };

        console.log("dataRequest", this.dataAssignPatientRequest);

        this.patientService.updateInDepartment(id, this.dataAssignPatientRequest).subscribe({
          next: value => {
            console.log("updatePatientInDepartment", value);
            this.toastService.add({
              severity: 'success',
              summary: 'Thành công',
              detail: "Chỉ định bệnh nhân vào khoa thành công",
              icon: "pi pi-check",
              life: 15000
            });
            this.getAllPatientAdmissionDepartment(this.departmentId);
            this.getAllPatients(this.departmentId);
          },
          error: error => {
            this.toastService.add({
              severity: 'error',
              summary: 'Thất bại',
              detail: `Chỉ định bệnh nhân vào khoa không thành công ${
                error.error &&
                error.error.pmsExceptionMsg &&
                error.error.pmsExceptionMsg.messageDefault
                  ? error.error.pmsExceptionMsg.messageDefault
                  : ""
              }`,
              life: 15000
            })
          }
        })
      });
    }, 100)
  }

  showDelete(number: number) {
    let message = `Bạn có chắc chắn muốn xoá thông tin bệnh nhân đã chọn?`;

    let title = "Xác nhận xoá";
    let dialogData = new ConfirmDialogModel(title, message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "700px",
      data: dialogData
    });
  }
}
