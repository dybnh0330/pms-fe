import {Component, Inject, OnInit} from '@angular/core';
import {BaseAddOrUpdateDialogComponent, BaseAddOrUpdateDialogData} from "../../../base/pms.base";
import {CategoryModel} from "../../../model/category.model";
import {NgForm} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CategoryService} from "../../../services/category.service";
import {MessageService} from "primeng/api";
import {SearchSortModel} from "../../../model/search-sort.model";

export interface AddOrUpdateCategoryData extends BaseAddOrUpdateDialogData {
  category: CategoryModel;
  parentCategories: CategoryModel[];
}

@Component({
  selector: 'app-add-or-edit-category',
  templateUrl: './add-or-edit-category.component.html',
  styleUrls: ['./add-or-edit-category.component.scss']
})
export class AddOrEditCategoryComponent
  extends BaseAddOrUpdateDialogComponent<AddOrUpdateCategoryData>
  implements OnInit {

  constructor(public override dialogRef: MatDialogRef<typeof self>,
              private categoryService: CategoryService,
              private toastService: MessageService,
              @Inject(MAT_DIALOG_DATA) public override data: AddOrUpdateCategoryData) {
    super(dialogRef, data);
  }

  searchSortVO: SearchSortModel = {searchText: "", sortColumn: "", sortDirection: ""}

  ngOnInit(): void {
    this.getAllCategoryType();
  }

  categoryTypes: CategoryModel[] = []

  showValue(addForm: NgForm) {
    console.log(addForm.value)
  }

  private getAllCategoryType(): void {
    this.categoryService.findAllType(this.searchSortVO)
      .subscribe({
        next: (res) => {
          this.categoryTypes = res
        },

        error: err => {
          console.log("error", err);
          this.toastService.add({
            severity: 'error',
            summary: "Thất bại",
            detail: 'Không thể lấy dữ liệu loại danh mục',
            life: 15000
          })
        }
      })
  }
}
