import {Component, Input, OnInit} from '@angular/core';
import {MedicalStaffModel} from "../../../../model/medical-staff.model";
import {MatDialog} from "@angular/material/dialog";
import {MessageService} from "primeng/api";
import {StaffRoomRequest} from "../../../../model/request/staff-room.request";
import {StaffRoomService} from "../../../../services/staff-room.service";
import {UpdateStaffRoomComponent} from "../update-staff-room/update-staff-room.component";
import {StaffRoomResponse} from "../../../../model/response/staff-room.response";
import {AuthService} from "../../../../services/auth.service";
import {ROLE} from "../../../../constant";
import {RoleUtils} from "../../../../common/utils/RoleUtils";

@Component({
  selector: 'app-staff-room',
  templateUrl: './staff-room.component.html',
  styleUrls: ['./staff-room.component.scss']
})
export class StaffRoomComponent implements OnInit {

  @Input() roomId: any;
  @Input() departmentId: any;
  @Input() roomNumber: any;

  roleAccepted: string[] = [ROLE.ROLE_SPECIALIST]

  staffRooms: MedicalStaffModel[] = [];

  data?: StaffRoomResponse;

  dataRequest: StaffRoomRequest = {medicalStaffIds: []}

  constructor(
    private dialog: MatDialog,
    private staffRoomService: StaffRoomService,
    private authService: AuthService,
    private toastService: MessageService,
  ) {
  }

  ngOnInit(): void {
    this.getAll();
    console.log("room", this.roomId);
  }

  isAuthor(scopes: string[]): boolean {
    return RoleUtils.isAccepted(scopes, this.authService.user);
  }

  getAll(): void {
    this.staffRoomService.findStaffInRoom(this.roomId)
      .subscribe({
        next: value => {
          this.staffRooms = value.staffs
          console.log("getAllStaffInRoom", value);
        },
        error: (err) => {
          console.log("error", err);
          this.toastService.add({
            severity: 'error',
            summary: "Thất bại",
            detail: 'Không thể lấy dữ liệu'
          })
        }
      });
  }

  showUpdate() {
    this.staffRoomService.findAllStaffInRoom(this.roomId)
      .subscribe({
        next: value => {
          this.data = value;
          this.data.roomNumber = this.roomNumber
          this.data.departmentId = this.departmentId


          console.log("updateStaffInRoom", value);
          setTimeout(() => {
            const updateDialog = this.dialog.open(UpdateStaffRoomComponent, {
              data: {
                staffRoom: this.data,
                isCreate: false
              },
              disableClose: true,
              width: '40%'
            })

            updateDialog.afterClosed().subscribe((data: StaffRoomResponse) => {
              if (data === undefined) return;

              console.log("data", data);

              this.dataRequest = {
                medicalStaffIds: data.medicalStaffIds
              }

              console.log("dataRequest", this.dataRequest);

              this.staffRoomService.updateStaffInRoom(this.roomId, this.dataRequest)
                .subscribe({
                  next: (res) => {
                    console.log("updateStaffInRoom", res);
                    this.toastService.add({
                      severity: 'success',
                      summary: 'Thành công',
                      detail: "Cập nhật nhân viên - phòng bệnh thành công",
                      icon: "pi pi-check",
                      life: 15000
                    });
                    this.getAll()
                  },
                  error: (error) => {
                    this.toastService.add({
                      severity: 'error',
                      summary: 'Thất bại',
                      detail: `Cập nhật nhân viên - phòng bệnh không thành công ${
                        error.error &&
                        error.error.pmsExceptionMsg &&
                        error.error.pmsExceptionMsg.messageDefault
                          ? error.error.pmsExceptionMsg.messageDefault
                          : ""
                      }`,
                      life: 15000
                    })
                  }
                })
            })
          }, 100)
        },
        error: (err) => {
          console.log("error", err);
        }
      });
  }
}
