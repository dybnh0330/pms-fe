import {Component, OnInit} from '@angular/core';
import {BaseAddOrUpdateDialogComponent, BaseAddOrUpdateDialogData} from "../../../base/pms.base";
import {DepartmentModel} from "../../../model/department.model";
import {NgForm} from "@angular/forms";

export interface AddOrUpdateDepartmentData extends BaseAddOrUpdateDialogData {
  department: DepartmentModel;
}

@Component({
  selector: 'app-add-or-edit-department',
  templateUrl: './add-or-edit-department.component.html',
  styleUrls: ['./add-or-edit-department.component.scss']
})
export class AddOrEditDepartmentComponent
  extends BaseAddOrUpdateDialogComponent<AddOrUpdateDepartmentData>
  implements OnInit {


  showValue(addForm: NgForm) {
    console.log(addForm.value)
  }

  ngOnInit(): void {
  }
}
