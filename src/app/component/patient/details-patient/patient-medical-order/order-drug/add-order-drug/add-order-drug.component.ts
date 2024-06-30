import {Component, Inject, OnInit} from '@angular/core';
import {BaseAddOrUpdateDialogComponent, BaseAddOrUpdateDialogData} from "../../../../../../base/pms.base";
import {NgForm} from "@angular/forms";
import {CategoryModel} from "../../../../../../model/category.model";
import {MedicalOrderDetailsRequest} from "../../../../../../model/request/medical-order-details.request";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MessageService} from "primeng/api";
import {CategoryService} from "../../../../../../services/category.service";
import {MedicalOrderService} from "../../../../../../services/medical-order.service";

export interface AddOrderDrugData extends BaseAddOrUpdateDialogData {
  orderDrugs: MedicalOrderDetailsRequest[];
  medicalOrderId: number;
}

@Component({
  selector: 'app-add-order-drug',
  templateUrl: './add-order-drug.component.html',
  styleUrls: ['./add-order-drug.component.scss']
})
export class AddOrderDrugComponent
  extends BaseAddOrUpdateDialogComponent<AddOrderDrugData>
  implements OnInit {

  typeId: number = 7;

  drugs: CategoryModel[] = []

  orderDrug: MedicalOrderDetailsRequest = {
    medicalOrderId: this.data.medicalOrderId, note: "", quantity: 0, type: 0, unit: ""
  }

  units = [
    "viên", "gói"
  ]

  dataArray: MedicalOrderDetailsRequest[] = []

  constructor(
    public override dialogRef: MatDialogRef<typeof self>,
    private toastService: MessageService,
    private categoryService: CategoryService,
    private medicalOrderService: MedicalOrderService,
    @Inject(MAT_DIALOG_DATA) public override data: AddOrderDrugData) {
    super(dialogRef, data);
  }

  ngOnInit(): void {

    this.getCategoryDrugs();

    this.dataArray.push(this.orderDrug);
    this.data.orderDrugs = this.dataArray;
  }

  getCategoryDrugs(): void {
    this.categoryService.findAllByType(this.typeId)
      .subscribe({
        next: value => {
          this.drugs = value
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


  onAdd() {
    this.orderDrug = {
      medicalOrderId: this.data.medicalOrderId, note: "", quantity: 0, type: 0, unit: ""
    }
    this.dataArray.push(this.orderDrug);
  }

  onRemove(i: number) {
    this.dataArray.splice(i);
  }

  showValue(addForm: NgForm) {
    console.log(addForm.value)
  }
}
