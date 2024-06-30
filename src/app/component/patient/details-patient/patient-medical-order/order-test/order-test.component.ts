import {Component, Input} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent, ConfirmDialogModel} from "../../../../confirm-dialog/confirm-dialog.component";
import {AddOrderTestComponent} from "./add-order-test/add-order-test.component";
import {MedicalOrderDetailResponse} from "../../../../../model/response/medical-order-detail.response";
import {MedicalOrderDetailsRequest} from "../../../../../model/request/medical-order-details.request";
import {MedicalOrderService} from "../../../../../services/medical-order.service";
import {MedicalOrderResponse} from "../../../../../model/response/medical-order.response";
import {MessageService} from "primeng/api";
import {HttpErrorResponse} from "@angular/common/http";
import {AuthService} from "../../../../../services/auth.service";
import {RoleUtils} from "../../../../../common/utils/RoleUtils";
import {ROLE} from "../../../../../constant";

@Component({
  selector: 'app-order-test',
  templateUrl: './order-test.component.html',
  styleUrls: ['./order-test.component.scss']
})
export class OrderTestComponent {

  @Input() patientId: any;

  roleAccepted: string[] = [ROLE.ROLE_SPECIALIST]

  orderTests: MedicalOrderDetailResponse[] = []

  data: MedicalOrderDetailsRequest[] = [];

  medicalOrderByPatient: MedicalOrderResponse = {createTime: "", id: 0, patientId: 0, patientName: "", title: ""}

  constructor(
    private dialog: MatDialog,
    private toastService: MessageService,
    private authService: AuthService,

    private medicalOrderService: MedicalOrderService
  ) {
  }

  isAuthor(scopes: string[]): boolean {
    return RoleUtils.isAccepted(scopes, this.authService.user);
  }

  ngOnInit(): void {
    this.getAllOrderTest();

  }

  getAllOrderTest(): void {

    this.medicalOrderService.findMedicalOrderByPatient(this.patientId)
      .subscribe({
        next: value => {
          console.log("medicalOrderByPatient", value);
          this.medicalOrderByPatient = value;

          this.medicalOrderService.findAllMedicalOrder(this.medicalOrderByPatient.id, 1)
            .subscribe({
              next: value => {
                this.orderTests = value
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

  showCreate() {
    this.data = [
      {
      } as MedicalOrderDetailsRequest
    ]

    setTimeout(() => {
      const createDialog = this.dialog.open(
        AddOrderTestComponent,
        {
          data: {
            orderTests: this.data,
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
                detail: "Thêm y lệnh xét nghiệm thành công",
                icon: "pi pi-check"
              });
              this.getAllOrderTest();
            },
            error: error => {
              this.toastService.add({
                severity: 'error',
                summary: 'Thất bại',
                detail: `Thêm y lệnh xét nghiệm không thành công ${
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
    let message = `Bạn có chắc chắn muốn huỷ xét nghiệm ` + item.orderName;

    let title = "Xác nhận huỷ bỏ";
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
                detail: "Huỷ bỏ xét nghiệm thành công",
                icon: "pi pi-check",
                life: 15000
              });
              this.getAllOrderTest();
            },
            (error: HttpErrorResponse) => {
              this.toastService.add({
                severity: 'error',
                summary: 'Thất bại',
                detail: `Huỷ bỏ xét nghiệm không thành công ${
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
        this.getAllOrderTest();
      }
    });
  }
}
