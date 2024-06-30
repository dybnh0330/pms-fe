import {Component, Input, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {UpdatePatientRecordComponent} from "./update-patient-record/update-patient-record.component";
import {MedicalRecordRequest} from "../../../../model/request/medical-record.request";
import {MedicalRecordResponse} from "../../../../model/response/medical-record.response";
import {MedicalRecordService} from "../../../../services/medical-record.service";
import {MessageService} from "primeng/api";
import {ResultComponent} from "./result/result.component";

@Component({
  selector: 'app-patient-record',
  templateUrl: './patient-record.component.html',
  styleUrls: ['./patient-record.component.scss']
})
export class PatientRecordComponent implements OnInit{
  @Input() patientId: any;

  dataRequest: MedicalRecordRequest = {diagnostic: "", medicalHistory: "", reason: ""}

  data: MedicalRecordResponse = {
    recordId: 0,
    diagnostic: "", medicalHistory: "", patientId: 0, patientName: "", reason: "", recordCode: ""
  };

  constructor(
    private dialog: MatDialog,
    private medicalRecordService: MedicalRecordService,
    private toastService: MessageService,
    public dialogRef: MatDialogRef<typeof self>) {
  }

  ngOnInit(): void {
    this.getMedicalRecord();
  }

  getMedicalRecord(): void {
    this.medicalRecordService.findRecordByPatient(this.patientId).subscribe({
      next: value => {
        console.log("findMedicalRecordByPatient", value);
        this.data = value;
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

  close() {
    this.dialogRef.close();
  }

  showUpdate(item: MedicalRecordResponse) {
    this.medicalRecordService.findRecordByPatient(item.patientId).subscribe({
      next: value => {
        this.data = value;
        console.log("findMedicalRecordByPatient", value);
        setTimeout(() => {
          const updateDialog = this.dialog.open(
            UpdatePatientRecordComponent,
            {
              data: {
                medicalRecord: this.data,
                isCreate: false,
              },
              disableClose: true,
              width: '40%'
            }
          );
          updateDialog.afterClosed().subscribe((data: MedicalRecordResponse) => {
            if (data === undefined) return;

            console.log("data", data);

            this.dataRequest = {
              diagnostic: data.diagnostic,
              medicalHistory: data.medicalHistory,
              reason: data.reason
            }

            console.log("dataRequest", this.dataRequest)

            this.medicalRecordService.updateInfoRecord(item.recordId, this.dataRequest)
              .subscribe({
                next: value => {
                  console.log("updateMedicalRecord", value);
                  this.toastService.add({
                    severity: 'success',
                    summary: 'Thành công',
                    detail: "Cập nhật bệnh án thành công",
                    icon: "pi pi-check",
                    life: 15000
                  });
                },
                error: error => {
                  console.log("error", error);
                  this.toastService.add({
                    severity: 'error',
                    summary: 'Thất bại',
                    detail: `Cập nhật bệnh án không thành công ${
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
        this.toastService.add({
          severity: 'error',
          summary: "Thất bại",
          detail: 'Không thể lấy dữ liệu'
        })
      }
    })

  }

  showResult(recordId: number) {
    setTimeout(() => {
      const resultDialog = this.dialog.open(
        ResultComponent,
        {
          data: {
            recordId: recordId
          },
          disableClose: true,
          width: '100%'
        }
      );
    }, 100)
  }
}
