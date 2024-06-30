import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AddOrderDrugComponent} from "./add-order-drug/add-order-drug.component";
import {ConfirmDialogComponent, ConfirmDialogModel} from "../../../../confirm-dialog/confirm-dialog.component";
import {MessageService} from "primeng/api";
import {MedicalOrderService} from "../../../../../services/medical-order.service";
import {MedicalOrderDetailResponse} from "../../../../../model/response/medical-order-detail.response";
import {MedicalOrderDetailsRequest} from "../../../../../model/request/medical-order-details.request";
import {HttpErrorResponse} from "@angular/common/http";
import {MedicalOrderResponse} from "../../../../../model/response/medical-order.response";
import {AuthService} from "../../../../../services/auth.service";
import {RoleUtils} from "../../../../../common/utils/RoleUtils";
import {ROLE} from "../../../../../constant";

@Component({
  selector: 'app-order-drug',
  templateUrl: './order-drug.component.html',
  styleUrls: ['./order-drug.component.scss']
})
export class OrderDrugComponent implements OnInit {

  @Input() patientId: any;

  roleAccepted: string[] = [ROLE.ROLE_SPECIALIST]
  data: MedicalOrderDetailsRequest[] = [];

  orderDrugs: MedicalOrderDetailResponse[] = []
  medicalOrderByPatient: MedicalOrderResponse = {createTime: "", id: 0, patientId: 0, patientName: "", title: ""}


  constructor
  (
    private toastService: MessageService,
    private medicalOrderService: MedicalOrderService,
    private authService: AuthService,

    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.getAllDrugs();
  }

  isAuthor(scopes: string[]): boolean {
    return RoleUtils.isAccepted(scopes, this.authService.user);
  }

  showCancel(item: MedicalOrderDetailResponse) {
    let message = `Bạn có chắc chắn muốn huỷ thuốc điều trị ` + item.orderName;

    let title = "Xác nhận huỷ";
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
                detail: "Huỷ bỏ thuốc điều trị thành công",
                icon: "pi pi-check",
                life: 15000
              });
              this.getAllDrugs();
            },
            (error: HttpErrorResponse) => {
              this.toastService.add({
                severity: 'error',
                summary: 'Thất bại',
                detail: `Huỷ bỏ thuốc điều trị không thành công ${
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
        this.getAllDrugs();
      }
    });
  }

  showCreate() {
    this.data = [
      {} as MedicalOrderDetailsRequest
    ]

    setTimeout(() => {
      const createDialog = this.dialog.open(
        AddOrderDrugComponent,
        {
          data: {
            orderDrugs: this.data,
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
                detail: "Thêm y lệnh thuốc điều trị thành công",
                icon: "pi pi-check"
              });
              this.getAllDrugs();
            },
            error: error => {
              this.toastService.add({
                severity: 'error',
                summary: 'Thất bại',
                detail: `Thêm y lệnh thuốc điều trị không thành công ${
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

  private getAllDrugs(): void {
    this.medicalOrderService.findMedicalOrderByPatient(this.patientId)
      .subscribe({
        next: value => {
          console.log("medicalOrderByPatient", value);
          this.medicalOrderByPatient = value;

          this.medicalOrderService.findAllMedicalOrder(this.medicalOrderByPatient.id, 0)
            .subscribe({
              next: value => {
                this.orderDrugs = value
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
