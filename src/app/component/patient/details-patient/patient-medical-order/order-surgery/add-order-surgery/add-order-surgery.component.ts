import {Component, Inject, OnInit} from '@angular/core';
import {BaseAddOrUpdateDialogComponent, BaseAddOrUpdateDialogData} from "../../../../../../base/pms.base";
import {NgForm} from "@angular/forms";
import {CategoryModel} from "../../../../../../model/category.model";
import {MedicalOrderDetailsRequest} from "../../../../../../model/request/medical-order-details.request";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MessageService} from "primeng/api";
import {CategoryService} from "../../../../../../services/category.service";
import {MedicalOrderService} from "../../../../../../services/medical-order.service";

export interface AddOrderSurgeryData extends BaseAddOrUpdateDialogData {
  orderSurgeries: MedicalOrderDetailsRequest[];
  medicalOrderId: number;
}
@Component({
  selector: 'app-add-order-surgery',
  templateUrl: './add-order-surgery.component.html',
  styleUrls: ['./add-order-surgery.component.scss']
})
export class AddOrderSurgeryComponent
  extends BaseAddOrUpdateDialogComponent<AddOrderSurgeryData>
implements OnInit{

  surgeries: CategoryModel[] = []

  orderSurgery: MedicalOrderDetailsRequest = {
    medicalOrderId: this.data.medicalOrderId, note: "", quantity: 1, type: 2, unit: "lần"

  }

  typeId: number = 6;

  dataArray: MedicalOrderDetailsRequest[] = []

  constructor(
    public override dialogRef: MatDialogRef<typeof self>,
    private toastService: MessageService,
    private categoryService: CategoryService,
    private medicalOrderService: MedicalOrderService,
    @Inject(MAT_DIALOG_DATA) public override data: AddOrderSurgeryData) {
    super(dialogRef, data);
  }

  onRemove(i: number) {
    this.dataArray.splice(i);

  }

  onAdd() {
    this.orderSurgery = {
      medicalOrderId: this.data.medicalOrderId, note: "", quantity: 1, type: 2, unit: "lần"
    }
    this.dataArray.push(this.orderSurgery);
  }

  ngOnInit(): void {

    this.getCategorySurgery();

    this.dataArray.push(this.orderSurgery);
    this.data.orderSurgeries = this.dataArray;
  }

  getCategorySurgery(): void {
    this.categoryService.findAllByType(this.typeId)
      .subscribe({
        next: value => {
          this.surgeries = value
          console.log("findAllCategoryByType", value);
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

  showValue(addForm: NgForm) {
    console.log(addForm.value)
  }
}
