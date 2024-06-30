import {Component, Inject, OnInit} from '@angular/core';
import {BaseAddOrUpdateDialogComponent, BaseAddOrUpdateDialogData} from "../../../base/pms.base";
import {OrderMedicalOrderRequest} from "../../../model/request/order-medical-order.request";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CategoryService} from "../../../services/category.service";
import {CategoryModel} from "../../../model/category.model";
import {SearchSortPageableModel} from "../../../model/search-sort-pageable.model";

export interface OrderMedicalOrderData extends BaseAddOrUpdateDialogData {
  orderMedicalOrder: OrderMedicalOrderRequest
}

@Component({
  selector: 'app-order-medical-order',
  templateUrl: './order-medical-order.component.html',
  styleUrls: ['./order-medical-order.component.scss']
})
export class OrderMedicalOrderComponent extends BaseAddOrUpdateDialogComponent<OrderMedicalOrderData>
  implements OnInit {

  medicalOrders: CategoryModel[] = []

  categoryType: number = 1;

  searchVo: SearchSortPageableModel = {
    currentPageNumber: 0, pageSize: 0, searchText: "", sortColumn: "", sortDirection: ""
  }

  constructor(public override dialogRef: MatDialogRef<typeof self>,
              private categoryService: CategoryService,
              @Inject(MAT_DIALOG_DATA) public override data: OrderMedicalOrderData) {
    super(dialogRef, data);
  }

  ngOnInit(): void {
    this.searchVo.currentPageNumber = 0;
    this.searchVo.pageSize = 100000;
    this.searchVo.searchText = '';
    this.searchVo.sortColumn = '';
    this.searchVo.sortDirection = '';
    this.getMedicalOrder();
  }

  getMedicalOrder(): void {
    this.categoryService.findAllPageByType(this.categoryType, this.searchVo)
      .subscribe({
        next: value => {
          this.medicalOrders = value.content;
          console.log("getMedicalOrder", value.content);
        },
        error: err => {
          console.log("error", err);
        }
      })
  }

}
