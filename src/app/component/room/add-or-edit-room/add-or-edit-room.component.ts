import {Component, Inject, OnInit} from '@angular/core';
import {BaseAddOrUpdateDialogComponent, BaseAddOrUpdateDialogData} from "../../../base/pms.base";
import {DepartmentModel} from "../../../model/department.model";
import {NgForm} from "@angular/forms";
import {MatSlideToggleChange} from "@angular/material/slide-toggle";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DepartmentService} from "../../../services/department.service";
import {BedNumberRequest} from "../../../model/request/bed-number.request";
import {PatientRoomRequest} from "../../../model/request/patient-room.request";

export interface AddOrUpdateRoomData extends BaseAddOrUpdateDialogData {
  room: PatientRoomRequest;
}

@Component({
  selector: 'app-add-or-edit-room',
  templateUrl: './add-or-edit-room.component.html',
  styleUrls: ['./add-or-edit-room.component.scss']
})
export class AddOrEditRoomComponent
  extends BaseAddOrUpdateDialogComponent<AddOrUpdateRoomData>
  implements OnInit {

  departments: DepartmentModel[] = []
  patientBed: BedNumberRequest = {bedNumber: ""};
  dataArray: BedNumberRequest[] = [];
  checked?: MatSlideToggleChange;

  constructor(public override dialogRef: MatDialogRef<typeof self>,
              private departmentService: DepartmentService,
              @Inject(MAT_DIALOG_DATA) public override data: AddOrUpdateRoomData) {
    super(dialogRef, data);
  }

  ngOnInit(): void {
    if (this.data.isCreate) {
      this.dataArray.push(this.patientBed);
    } else {
      this.dataArray = this.data.room.patientBeds;
      console.log('dataArray', this.dataArray);
    }
    this.getDepartment();
  }

  obSubmit() {
    this.data.room.patientBeds = this.dataArray;
    if (this.data.room.totalBed === 0) {
      this.data.room.patientBeds = [];
    }
  }

  showValue(addForm: NgForm) {
    console.log(addForm.value)
  }

  onAdd() {
    this.data.room.patientBeds = [];
    if(this.data.room.totalBed) {
      for (let i = 1; i <= this.data.room.totalBed; i++) {
        this.data.room.patientBeds.push({bedNumber: i.toString()});
      }
      console.log("this.data.room.patientBeds: " + this.data.room.patientBeds);
    }
  }

  onRemove(i: number) {
    this.dataArray.splice(i);
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
