import {Component, Inject, OnInit} from '@angular/core';
import {BaseAddOrUpdateDialogComponent, BaseAddOrUpdateDialogData} from "../../../base/pms.base";
import {MedicalStaffModel} from "../../../model/medical-staff.model";
import {DepartmentModel} from "../../../model/department.model";
import {NgForm} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DepartmentService} from "../../../services/department.service";

export interface AddOrUpdateMedicalStaffData extends BaseAddOrUpdateDialogData {
  medicalStaff: MedicalStaffModel;
  departments: DepartmentModel[];
}

@Component({
  selector: 'app-add-or-edit-medical-staff',
  templateUrl: './add-or-edit-medical-staff.component.html',
  styleUrls: ['./add-or-edit-medical-staff.component.scss']
})
export class AddOrEditMedicalStaffComponent
  extends BaseAddOrUpdateDialogComponent<AddOrUpdateMedicalStaffData>
  implements OnInit {

  date = this.data.medicalStaff.dob;
  parseDate = new Date(parseInt(this.date, 10));

  constructor(
    public override dialogRef: MatDialogRef<typeof self>,
    private departmentService: DepartmentService,
    @Inject(MAT_DIALOG_DATA) public override data: AddOrUpdateMedicalStaffData) {

    super(dialogRef, data);
  }

  ngOnInit(): void {
    if (!this.data.isCreate) {
      this.data.medicalStaff.dob = this.parseDate.toISOString().split('T')[0];
    }
    this.getDepartment();
  }

  departments: DepartmentModel[] = []

  specializes = [
    {id: 1, name: 'Bác sĩ'},
    {id: 2, name: 'Điều dưỡng'},
    {id: 3, name: 'Y tá'},
    {id: 3, name: 'Nhân viên hành chính'},
  ]

  genders = [
    {id: 0, name: 'Nam'},
    {id: 1, name: 'Nữ'}
  ]

  showValue(addForm: NgForm) {
    console.log(addForm.value)
  }

  getDepartment(): void {
    this.departmentService.findAllDepartment()
      .subscribe({
        next: (res) => {
          this.departments = res
        }, error: (err) => {
          console.error("departments", err)
        }
      })
  }
}
