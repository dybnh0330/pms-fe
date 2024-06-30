import {Component, OnInit} from '@angular/core';
import {PatientService} from "../../services/patient.service";
import {MessageService} from "primeng/api";
import {SearchSortModel} from "../../model/search-sort.model";
import {MatDialog} from "@angular/material/dialog";
import {PatientAdmissionResponse} from "../../model/response/patient-admission.response";
import {ReceivePatientRequest} from "../../model/request/receive-patient.request";
import {AddPatientComponent} from "./add-patient/add-patient.component";
import {OrderMedicalOrderComponent} from "./order-medical-order/order-medical-order.component";
import {OrderMedicalOrderRequest} from "../../model/request/order-medical-order.request";
import {OrderDepartmentRequest} from "../../model/request/order-department.request";
import {OrderDepartmentComponent} from "./order-department/order-department.component";
import {ROLE} from "../../constant";
import {RoleUtils} from "../../common/utils/RoleUtils";
import {AuthService} from "../../services/auth.service";


@Component({
  selector: 'app-receive-patients',
  templateUrl: './receive-patients.component.html',
  styleUrls: ['./receive-patients.component.scss']
})
export class ReceivePatientsComponent implements OnInit {

  patientsAdmission: PatientAdmissionResponse[] = []
  searchVo: SearchSortModel = {searchText: "", sortColumn: "", sortDirection: ""}
  data?: ReceivePatientRequest;
  orderMedicalOrderData?: OrderMedicalOrderRequest;
  orderDepartment?: OrderDepartmentRequest;
  roleAccepted: string[] = [ROLE.ROLE_NURSE, ROLE.ROLE_MEDICAL_STAFF]
  roleDoctorExam: string[] = [ROLE.ROLE_EXAM_DOCTOR]

  constructor(
    private dialog: MatDialog,
    private patientService: PatientService,
    private authService: AuthService,
    private toastService: MessageService
  ) {
  }

  ngOnInit(): void {
    this.searchVo.searchText = '';
    this.searchVo.sortColumn = 'updateTime';
    this.searchVo.sortDirection = 'desc';
    this.getAll()
  }

  isAuthor(): boolean {
    return RoleUtils.isAccepted(this.roleAccepted, this.authService.user);
  }

  isDoctorExam(): boolean {
    return RoleUtils.isAccepted(this.roleDoctorExam, this.authService.user);
  }

  search() {
    console.log("search", this.searchVo.searchText);
    this.getAll();
  }

  getAll(): void {
    this.patientService.findPatientsAdmission(this.searchVo)
      .subscribe({
        next: (response) => {
          this.patientsAdmission = response;
          console.log("PatientAdmission", response);
        },
        error: err => {
          console.log("error", err);
        }
      })
  }

  showCreate() {
    this.data = {
      reason: ''
    } as ReceivePatientRequest

    setTimeout(() => {

      const createDialog = this.dialog.open(AddPatientComponent, {
        data: {
          receivePatient: this.data,
          isCreate: true,
        },
        disableClose: true,
        width: '40%'
      })

      createDialog.afterClosed().subscribe((data: ReceivePatientRequest) => {
        if (data === undefined) return;

        console.log("data", data);

        this.patientService.receivePatient(data)
          .subscribe({
            next: (res) => {
              console.log("receivePatient", res);
              this.toastService.add({
                severity: 'success',
                summary: 'Thành công',
                detail: "Tiếp nhận bệnh nhân thành công",
                icon: "pi pi-check",
                life: 15000
              });
              this.getAll();
            },
            error: (error) => {
              this.toastService.add({
                severity: 'error',
                summary: 'Thất bại',
                detail: `Tiếp nhận bệnh nhân không thành công ${
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
      })
    }, 100)

  }

  showOrderMedicalOrder(id: number) {
    this.orderMedicalOrderData = {} as OrderMedicalOrderRequest
    setTimeout(() => {

      const orderMedicalDialog = this.dialog.open(OrderMedicalOrderComponent, {
        data: {
          orderMedicalOrder: this.orderMedicalOrderData,
          isCreate: true,
        },
        disableClose: true,
        width: '40%'
      })

      orderMedicalDialog.afterClosed().subscribe((data: OrderMedicalOrderRequest) => {

        if (data === undefined) return;

        console.log("dataRequest", data);

        this.patientService.orderMedicalOrder(id, data)
          .subscribe({
            next: (res) => {
              console.log("orderMedicalOrder", res);
              this.toastService.add({
                severity: 'success',
                summary: 'Thành công',
                detail: "Chỉ định y lệnh xét nghiệm thành công",
                icon: "pi pi-check",
                life: 15000
              });
            },
            error: (error) => {
              this.toastService.add({
                severity: 'error',
                summary: 'Thất bại',
                detail: `Chỉ định y lệnh xét nghiệm không thành công ${
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
      })

    }, 100)
  }

  showOrderDepartment(id: number) {
    this.orderDepartment = {} as OrderDepartmentRequest

    setTimeout(() => {
      const updateOrderDepartment = this.dialog.open(OrderDepartmentComponent, {
        data: {
          orderDepartment: this.orderDepartment,
          isCreate: true
        },
        disableClose: true,
        width: '40%'
      })

      updateOrderDepartment.afterClosed().subscribe((data: OrderDepartmentRequest) => {
        if (data === undefined) return;

        console.log("data", data)

        this.patientService.orderPatientInDepartment(id, data)
          .subscribe({
            next: (res) => {
              console.log("orderDepartment", res);
              this.toastService.add({
                severity: 'success',
                summary: 'Thành công',
                detail: "Chẩn đoán và chỉ định bệnh nhân vào khoa bệnh thành công",
                icon: "pi pi-check",
                life: 15000
              });
              this.getAll();
            },
            error: error => {
              this.toastService.add({
                severity: 'error',
                summary: 'Thất bại',
                detail: `Chẩn đoán và chỉ định bệnh nhân vào khoa bệnh không thành công ${
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
      })

    }, 100)
  }
}
