import {Component, Inject, OnInit} from '@angular/core';
import {BaseAddOrUpdateDialogComponent, BaseAddOrUpdateDialogData} from "../../../base/pms.base";
import {OrderDepartmentRequest} from "../../../model/request/order-department.request";
import {DepartmentModel} from "../../../model/department.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DepartmentService} from "../../../services/department.service";
import {MessageService} from "primeng/api";


export interface OrderDepartmentData extends BaseAddOrUpdateDialogData {
  orderDepartment: OrderDepartmentRequest
}

@Component({
  selector: 'app-order-department',
  templateUrl: './order-department.component.html',
  styleUrls: ['./order-department.component.scss']
})
export class OrderDepartmentComponent extends BaseAddOrUpdateDialogComponent<OrderDepartmentData>
  implements OnInit {

  departments: DepartmentModel[] = []

  constructor(public override dialogRef: MatDialogRef<typeof self>,
              private departmentService: DepartmentService,
              private toastService: MessageService,
              @Inject(MAT_DIALOG_DATA) public override data: OrderDepartmentData) {
    super(dialogRef, data);
  }

  ngOnInit(): void {
    this.getDepartments();
  }

  getDepartments(): void {
    this.departmentService.findAllDepartment()
      .subscribe({
        next: value => {
          console.log("findAllDepartment", value);
          this.departments = value;
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

}
