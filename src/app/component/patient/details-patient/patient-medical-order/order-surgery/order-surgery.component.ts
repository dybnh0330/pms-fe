import {Component, Input, OnInit} from '@angular/core';
import {ConfirmDialogComponent, ConfirmDialogModel} from "../../../../confirm-dialog/confirm-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {MedicalOrderDetailsRequest} from "../../../../../model/request/medical-order-details.request";
import {AddOrderSurgeryComponent} from "./add-order-surgery/add-order-surgery.component";
import {MedicalOrderDetailResponse} from "../../../../../model/response/medical-order-detail.response";
import {MedicalOrderResponse} from "../../../../../model/response/medical-order.response";
import {MessageService} from "primeng/api";
import {MedicalOrderService} from "../../../../../services/medical-order.service";
import {HttpErrorResponse} from "@angular/common/http";
import {AuthService} from "../../../../../services/auth.service";
import {RoleUtils} from "../../../../../common/utils/RoleUtils";
import {ROLE} from "../../../../../constant";

@Component({
  selector: 'app-order-surgery',
  templateUrl: './order-surgery.component.html',
  styleUrls: ['./order-surgery.component.scss']
})
export class OrderSurgeryComponent implements OnInit {

  @Input() patientId: any;

  roleAccepted: string[] = [ROLE.ROLE_SPECIALIST]

  orderSurgeries: MedicalOrderDetailResponse[] = []
  data: MedicalOrderDetailsRequest[] = [];

  medicalOrderByPatient: MedicalOrderResponse = {createTime: "", id: 0, patientId: 0, patientName: "", title: ""}

  constructor(
    private toastService: MessageService,
    private medicalOrderService: MedicalOrderService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.getAllOrderSurgery();

  }

  isAuthor(scopes: string[]): boolean {
    return RoleUtils.isAccepted(scopes, this.authService.user);
  }

  showCreate() {
    this.data = [
      {
      } as MedicalOrderDetailsRequest
    ]

    setTimeout(() => {
      const createDialog = this.dialog.open(
        AddOrderSurgeryComponent,
        {
          data: {
            orderSurgeries: this.data,
            medicalOrderId: this.medicalOrderByPatient.id,
            isCreate: true,
          },
          disableClose: true,
          width: '80%'
        }
      );
      createDialog.afterClosed().subscribe((data: MedicalOrderDetailsRequest[]) => {
        if (data === undefined) return;

        console.log('dataRequest', data);

        this.medicalOrderService.addMedicalOrderDetail(data)
          .subscribe({
            next: value => {
              console.log("addMedicalOrderDetail", value);
              this.toastService.add({
                severity: 'success',
                summary: 'Thành công',
                detail: "Thêm phẫu thuật/thủ thuật thành công",
                icon: "pi pi-check"
              });
              this.getAllOrderSurgery();
            },
            error: error => {
              this.toastService.add({
                severity: 'error',
                summary: 'Thất bại',
                detail: `Thêm y lệnh phẫu thuật/thủ thuật không thành công ${
                  error.error &&
                  error.error.pmsExceptionMsg &&
                  error.error.pmsExceptionMsg.messageDefault
                    ? error.error.pmsExceptionMsg.messageDefault
                    : ""
                }`
              })
              console.log("error", error);
            }
          })
      });
    }, 100)
  }

  showCancel(item: MedicalOrderDetailResponse) {
    let message = `Bạn có chắc chắn muốn huỷ y lệnh ` + item.orderName;

    let title = "Xác nhận xoá";
    let dialogData = new ConfirmDialogModel(title, message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "700px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult == true) {
        this.medicalOrderService.cancelMedicalDetail(item.id)
          .subscribe(
            (response) => {
              console.log(response);
              this.toastService.add({
                severity: 'success',
                summary: 'Thành công',
                detail: "Huỷ bỏ phẫu thuật/thủ thuật thành công",
                icon: "pi pi-check",
                life: 15000
              });
              this.getAllOrderSurgery();
            },
            (error: HttpErrorResponse) => {
              this.toastService.add({
                severity: 'error',
                summary: 'Thất bại',
                detail: `Huỷ bỏ phẫu thuật/thủ thuật không thành công ${
                  error.error &&
                  error.error.pmsExceptionMsg &&
                  error.error.pmsExceptionMsg.messageDefault
                    ? error.error.pmsExceptionMsg.messageDefault
                    : ""
                }`,
                life: 15000
              })

            }
          )
      } else {
        this.getAllOrderSurgery();
      }
    });
  }

  private getAllOrderSurgery() {
    this.medicalOrderService.findMedicalOrderByPatient(this.patientId)
      .subscribe({
        next: value => {
          console.log("medicalOrderByPatient", value);
          this.medicalOrderByPatient = value;

          this.medicalOrderService.findAllMedicalOrder(this.medicalOrderByPatient.id, 2)
            .subscribe({
              next: value => {
                this.orderSurgeries = value
                console.log("findAllOrderTest", value)
              },
              error: error => {
                console.log("error", error);
                this.toastService.add({
                  severity: 'error',
                  summary: "Thất bại",
                  detail: 'Không thể lấy dữ liệu'
                })
              }
            })
        },
        error: error => {
          console.log("error", error);
          this.toastService.add({
            severity: 'error',
            summary: "Thất bại",
            detail: 'Không thể lấy dữ liệu'
          })
        }
      })
  }
}
