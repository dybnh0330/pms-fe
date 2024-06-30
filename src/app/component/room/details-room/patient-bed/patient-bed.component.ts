import {Component, Input, OnInit} from '@angular/core';
import {PatientBedModel} from "../../../../model/patient-bed.model";
import {PatientBedService} from "../../../../services/patient-bed.service";
import {MessageService} from "primeng/api";
import {MatDialog} from "@angular/material/dialog";
import {EditPatientBedComponent} from "../edit-patient-bed/edit-patient-bed.component";
import {PatientBedRequest} from "../../../../model/request/patient-bed.request";
import {ConfirmDialogComponent, ConfirmDialogModel} from "../../../confirm-dialog/confirm-dialog.component";
import {AuthService} from "../../../../services/auth.service";
import {ROLE} from "../../../../constant";
import {RoleUtils} from "../../../../common/utils/RoleUtils";

@Component({
  selector: 'app-patient-bed',
  templateUrl: './patient-bed.component.html',
  styleUrls: ['./patient-bed.component.scss']
})
export class PatientBedComponent implements OnInit {

  @Input() roomId: any

  patientBeds: PatientBedModel[] = [];
  roleAccepted: string[] = [ROLE.ROLE_ADMIN]
  data: PatientBedModel = {bedCode: "", bedNumber: "", id: 0, roomId: 0, status: false}
  dataRequest: PatientBedRequest = {bedNumber: "", roomId: 0, status: false}

  constructor(
    private dialog: MatDialog,
    private patientBedService: PatientBedService,
    private authService: AuthService,

    private toastService: MessageService,
  ) {
  }

  ngOnInit(): void {
    this.getAll();
  }

  isAuthor(): boolean {
    return RoleUtils.isAccepted(this.roleAccepted, this.authService.user);
  }

  getAll() {
    this.patientBedService.findAllByRoom(this.roomId)
      .subscribe({
        next: value => {
          console.log("value", value);
          this.patientBeds = value;
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

  showCreate() {
    this.data = {
      bedNumber: ''
    } as PatientBedModel
    
    setTimeout(() => {
      const createDialog = this.dialog.open(EditPatientBedComponent, {
        data: {
          patientBed: this.data,
          isCreate: true
        },
        disableClose: true,
        width: '40%'
      })

      console.log('patientBed', this.data)

      createDialog.afterClosed().subscribe((data: PatientBedModel) => {
        if (data === undefined) return;

        console.log("data", data);

        this.dataRequest = {
          bedNumber: data.bedNumber,
          status: true,
          roomId: this.roomId
        }

        console.log("dataRequest", this.dataRequest)

        this.patientBedService.createBed(this.dataRequest)
          .subscribe({
            next: (value) => {
              console.log("createPatientBed", value);
              this.toastService.add({
                severity: 'success',
                summary: 'Thành công',
                detail: "Thêm mới giường bệnh thành công",
                icon: "pi pi-check",
                life: 15000
              })
              this.getAll();
            },
            error: (error) => {
              console.log("error", error);
              this.toastService.add({
                severity: 'error',
                summary: 'Thất bại',
                detail: `Thêm mới giường bệnh không thành công ${
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

  showUpdate(id: number) {
    this.patientBedService.findById(id)
      .subscribe({
        next: (value) => {
          this.data = value;
          console.log("findPatientBedById", value);
          setTimeout(() => {
            const updateDialog = this.dialog.open(EditPatientBedComponent, {
              data: {
                patientBed: this.data,
                isCreate: false
              },
              disableClose: true,
              width: '40%'
            });
            updateDialog.afterClosed().subscribe((data: PatientBedModel) => {
              if (data === undefined) return;

              this.dataRequest = {
                roomId: this.roomId,
                bedNumber: data.bedNumber,
                status: data.status
              }

              console.log("dataRequest", this.dataRequest);

              this.patientBedService.updatePatientBed(id, this.dataRequest)
                .subscribe({
                  next: (value) => {
                    console.log("updatePatientBed", value);
                    this.toastService.add({
                      severity: 'success',
                      summary: 'Thành công',
                      detail: "Cập nhật giường bệnh thành công",
                      icon: "pi pi-check",
                      life: 15000
                    })
                    this.getAll();
                  },
                  error: (error) => {
                    console.log("error", error)
                    this.toastService.add({
                      severity: 'error',
                      summary: 'Thất bại',
                      detail: `Cập nhật giường bệnh không thành công ${
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
          })
        },
        error: (error) => {
          console.log("error", error);
          this.toastService.add({
            severity: 'error',
            summary: 'Thất bại',
            detail: `Không thể lấy dữ liệu giường bệnh theo ID ${
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
  }

  showDelete(item: PatientBedModel) {
    let message = `Bạn có chắc chắn muốn xoá giường bệnh: ` + item.bedNumber;

    let title = "Xác nhận xoá";
    let dialogData = new ConfirmDialogModel(title, message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "700px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.patientBedService.deletePatientBed(item.id)
          .subscribe({
            next: (res) => {
              console.log("deleteRoom", res);
              this.toastService.add({
                severity: 'success',
                summary: 'Thành công',
                detail: "Xoá giường bệnh thành công",
                icon: "pi pi-check",
                life: 15000
              });
              this.getAll()
            },
            error: (error) => {
              this.toastService.add({
                severity: 'error',
                summary: 'Thất bại',
                detail: `Xoá giường bệnh không thành công ${
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
    })
  }

  showDeleteAll() {
    let message = `Bạn có chắc chắn muốn xoá tất cả giường bệnh của buồng bệnh này?`;

    let title = "Xác nhận xoá";
    let dialogData = new ConfirmDialogModel(title, message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "700px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.patientBedService.deleteAllPatientBed(this.roomId)
          .subscribe({
            next: (res) => {
              console.log("deleteRoom", res);
              this.toastService.add({
                severity: 'success',
                summary: 'Thành công',
                detail: "Xoá tất cả giường bệnh thành công",
                icon: "pi pi-check",
                life: 15000
              });
              this.getAll()
            },
            error: (error) => {
              this.toastService.add({
                severity: 'error',
                summary: 'Thất bại',
                detail: `Xoá tất cả giường bệnh không thành công ${
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
    })
  }


}
