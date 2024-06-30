import {Component, Inject, OnInit} from '@angular/core';
import {BaseAddOrUpdateDialogComponent, BaseAddOrUpdateDialogData} from "../../../../../../base/pms.base";
import {NgForm} from "@angular/forms";
import {MedicalOrderDetailsRequest} from "../../../../../../model/request/medical-order-details.request";
import {CategoryModel} from "../../../../../../model/category.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MessageService} from "primeng/api";
import {CategoryService} from "../../../../../../services/category.service";
import {MedicalOrderService} from "../../../../../../services/medical-order.service";

export interface AddOrderTestData extends BaseAddOrUpdateDialogData {
  orderTests: MedicalOrderDetailsRequest[];
  medicalOrderId: number;
}

@Component({
  selector: 'app-add-order-test',
  templateUrl: './add-order-test.component.html',
  styleUrls: ['./add-order-test.component.scss']
})
export class AddOrderTestComponent
  extends BaseAddOrUpdateDialogComponent<AddOrderTestData>
  implements OnInit {

  tests: CategoryModel[] = []

  orderTest: MedicalOrderDetailsRequest = {
    categoryId: 0, medicalOrderId: this.data.medicalOrderId, note: "", quantity: 1, type: 1, unit: "lần"
  }

  typeId: number = 5;

  dataArray: MedicalOrderDetailsRequest[] = []

  constructor(
    public override dialogRef: MatDialogRef<typeof self>,
    private toastService: MessageService,
    private categoryService: CategoryService,
    private medicalOrderService: MedicalOrderService,
    @Inject(MAT_DIALOG_DATA) public override data: AddOrderTestData) {
    super(dialogRef, data);
  }

  ngOnInit(): void {

    this.getCategoryTest();

    this.dataArray.push(this.orderTest);
    this.data.orderTests = this.dataArray;
  }

  getCategoryTest(): void {
    this.categoryService.findAllByType(this.typeId)
      .subscribe({
        next: value => {
          this.tests = value
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

  onRemove(i: number) {
    this.dataArray.splice(i);
  }

  onAdd() {
    this.orderTest = {
      categoryId: 0, medicalOrderId: this.data.medicalOrderId, note: "", quantity: 1, type: 1, unit: "lần"
    }
    this.dataArray.push(this.orderTest);
  }

  showValue(addForm: NgForm) {
    console.log(addForm.value)
  }
}
