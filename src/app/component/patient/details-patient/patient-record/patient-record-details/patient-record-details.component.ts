import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {
  AddOrEditPatientRecordDetailsComponent
} from "./add-or-edit-patient-record-details/add-or-edit-patient-record-details.component";
import {ConfirmDialogComponent, ConfirmDialogModel} from "../../../../confirm-dialog/confirm-dialog.component";
import {MedicalRecordService} from "../../../../../services/medical-record.service";
import {MedicalRecordDetailResponse} from "../../../../../model/response/medical-record-detail.response";
import {MessageService} from "primeng/api";
import {MedicalRecordResponse} from "../../../../../model/response/medical-record.response";
import {MedicalRecordDetailsRequest} from "../../../../../model/request/medical-record-details.request";

@Component({
  selector: 'app-patient-record-details',
  templateUrl: './patient-record-details.component.html',
  styleUrls: ['./patient-record-details.component.scss']
})
export class PatientRecordDetailsComponent implements OnInit {

  @Input() patientId: any;

  patientRecordDetails: MedicalRecordDetailResponse[] = [];

  medicalRecord: MedicalRecordResponse = {
    diagnostic: "",
    medicalHistory: "",
    patientId: 0,
    patientName: "",
    reason: "",
    recordCode: "",
    recordId: 0
  };

  data: MedicalRecordDetailsRequest = {description: "", recordId: 0, title: ""};

  dataRecordDetailResponse: MedicalRecordDetailResponse = {
    createBy: "",
    createTime: "",
    description: "",
    id: 0,
    title: "",
    updateBy: "",
    updateTime: ""
  }

  constructor(
    private dialog: MatDialog,
    private toastService: MessageService,
    private medicalRecordService: MedicalRecordService,
  ) {
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.medicalRecordService.findRecordByPatient(this.patientId).subscribe({
      next: value => {
        this.medicalRecord = value;
        console.log("medicalRecordByPatient", value);

        this.medicalRecordService.findAllDetail(this.medicalRecord.recordId).subscribe({
          next: value => {
            this.patientRecordDetails = value;
            console.log("findAllRecordDetail", value);
          },
          error: err => {
            console.log("error", err);
            this.toastService.add({
              severity: 'error',
              summary: "Thất bại",
              detail: 'Không thể lấy dữ liệu'
            })
          }
        })
      },
      error: err => {
        console.log("error", err);
        this.toastService.add({
          severity: 'error',
          summary: "Thất bại",
          detail: 'Không thể lấy dữ liệu'
        })
      }
    })
  }

  showUpdate(id: number) {
    this.medicalRecordService.findRecordDetailById(id).subscribe({
      next: value => {
        console.log("findRecordDetailById", value);
        this.dataRecordDetailResponse = value

        this.data.title = value.title;
        this.data.description = value.description;
        this.data.recordId = this.medicalRecord.recordId;

      }
    })
    setTimeout(() => {
      const update = this.dialog.open(AddOrEditPatientRecordDetailsComponent, {
        data: {
          recordDetail: this.data,
          isCreate: false,
        },
        disableClose: true,
        width: '40%'
      });

      update.afterClosed().subscribe((data: MedicalRecordDetailsRequest) => {
        if (data === undefined) return;

        console.log("dataRequest", data);

        this.medicalRecordService.updateRecordDetail(id, data).subscribe({
          next: value => {
            console.log("updateMedicalRecordDetail", value);
            this.toastService.add({
              severity: 'success',
              summary: 'Thành công',
              detail: "Cập nhật chi tiết bệnh án thành công",
              icon: "pi pi-check",
              life: 15000
            });
            this.getAll();
          },
          error: error => {
            console.log("error", error);
            this.toastService.add({
              severity: 'error',
              summary: 'Thất bại',
              detail: `Cập nhật tài khoản không thành công ${
                error.error &&
                error.error.pmsExceptionMsg &&
                error.error.pmsExceptionMsg.messageDefault
                  ? error.error.pmsExceptionMsg.messageDefault
                  : ""
              }`,
              life: 15000
            })
            this.getAll();
          }
        })
      })
    }, 100)
  }

  showCreate() {
    this.data = {
      title: '',
      description: '',
      recordId: this.medicalRecord.recordId
    } as MedicalRecordDetailsRequest

    setTimeout(() => {
      const createRecordDetail = this.dialog.open(AddOrEditPatientRecordDetailsComponent, {
        data: {
          recordDetail: this.data,
          isCreate: true,
        },
        disableClose: true,
        width: '40%'
      });
      createRecordDetail.afterClosed().subscribe((data: MedicalRecordDetailsRequest) => {
        if (data === undefined) return;

        console.log("data", data);

        this.medicalRecordService.createRecordDetails(data).subscribe({
          next: value => {
            console.log("createRecorđetail", value);
            this.toastService.add({
              severity: 'success',
              summary: 'Thành công',
              detail: "Thêm mới chi tiết bệnh án thành công",
              icon: "pi pi-check"
            });
            this.getAll();
          },
          error: error => {
            console.log("error", error);
            this.toastService.add({
              severity: 'error',
              summary: 'Thất bại',
              detail: `Thêm mới chi tiết bệnh án không thành công ${
                error.error &&
                error.error.pmsExceptionMsg &&
                error.error.pmsExceptionMsg.messageDefault
                  ? error.error.pmsExceptionMsg.messageDefault
                  : ""
              }`
            })
          }
        })
      })
    }, 100)
  }

  showDelete(item: MedicalRecordDetailResponse) {
    let message = `Bạn có chắc chắn muốn xoá chi tiết bệnh án đã chọn?`;

    let title = "Xác nhận xoá";
    let dialogData = new ConfirmDialogModel(title, message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "700px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult == true) {
        this.medicalRecordService.deleteRecordDetail(item.id).subscribe({
          next: (response) => {
            console.log(response);
            this.toastService.add({
              severity: 'success',
              summary: 'Thành công',
              detail: "Xoá chi tiết bệnh án thành công",
              icon: "pi pi-check",
              life: 15000
            });
            this.getAll();
          },
          error: error => {
            this.toastService.add({
              severity: 'error',
              summary: 'Thất bại',
              detail: `Xoá chi tiết bệnh án không thành công ${
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
      } else {
        this.getAll();
      }
    });
  }
  showResult(number: number) {

  }
}
