import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AddOrEditRoomComponent} from "./add-or-edit-room/add-or-edit-room.component";
import {ConfirmDialogComponent, ConfirmDialogModel} from "../confirm-dialog/confirm-dialog.component";
import {DetailsRoomComponent} from "./details-room/details-room.component";
import {PatientRoomRequest} from "../../model/request/patient-room.request";
import {PatientRoomResponse} from "../../model/response/patient-room.response";
import {DepartmentModel} from "../../model/department.model";
import {SortEvent} from "../../common/sort-header/sorter.directive";
import {PatientRoomService} from "../../services/patient-room.service";
import {MessageService} from "primeng/api";
import {DepartmentService} from "../../services/department.service";
import {SearchSortPageableModel} from "../../model/search-sort-pageable.model";
import {AuthService} from "../../services/auth.service";
import {ROLE} from "../../constant";
import {RoleUtils} from "../../common/utils/RoleUtils";

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
  rooms: PatientRoomResponse[] = []
  departments: DepartmentModel[] = []
  data?: PatientRoomResponse;
  lsItemsPerPage = [10, 20, 30];
  totalElements = 0;
  page = 1;
  itemsPerPage = this.lsItemsPerPage[0];
  math: Math = Math;
  departmentId: any;
  departmentChange: boolean = false;
  departmentName?: string;
  roleAccepted: string[] = [ROLE.ROLE_ADMIN]

  searchVo: SearchSortPageableModel = {
    currentPageNumber: 0,
    pageSize: 0,
    searchText: "",
    sortColumn: "",
    sortDirection: ""
  }
  dataRequest: PatientRoomRequest = {
    patientBeds: [],
    departmentId: 0,
    roomNumber: '',
    totalBed: 0,
    status: false
  };

  constructor(
    private dialog: MatDialog,
    private patientRoomService: PatientRoomService,
    private departmentService: DepartmentService,
    private authService: AuthService,
    private toastService: MessageService
  ) {
  }

  ngOnInit(): void {
    this.searchVo.currentPageNumber = this.page - 1;
    this.searchVo.pageSize = this.itemsPerPage;
    this.searchVo.searchText = '';
    this.searchVo.sortColumn = 'updateTime';
    this.searchVo.sortDirection = 'desc';

    this.departmentId = this.authService.user?.departmentId;
    this.departmentName = this.authService.user?.department;

    this.getAll(this.departmentId);
    this.getDepartment()
  }

  search(): void {
    console.log("search", this.searchVo.searchText);
    this.page = 1;
    this.searchVo.currentPageNumber = this.page - 1;
    this.getAll(this.departmentId);
  }

  onItemPerPageChange($event: any) {
    this.itemsPerPage = $event;
    this.searchVo.pageSize = this.itemsPerPage;
    this.page = 1;
    this.searchVo.currentPageNumber = this.page - 1;
    this.getAll(this.departmentId);
  }

  onPageChange($event: any): void {
    this.page = $event;
    this.searchVo.currentPageNumber = this.page - 1;
    this.getAll(this.departmentId);
  }

  onDepartmentChange($event: any) {
    this.departmentId = $event;
    this.departmentChange = true;
    this.searchVo.sortColumn = 'updateTime';
    this.searchVo.sortDirection = 'desc';

    this.getAll(this.departmentId)
  }

  onSortChange($event: SortEvent) {
    if ($event.direction === "") {
      this.searchVo.sortColumn = "";
      this.searchVo.sortDirection = "";
    } else {
      this.searchVo.sortColumn = `${$event.field}`;
      this.searchVo.sortDirection = `${$event.direction}`;
    }

    this.getAll(this.departmentId);
  }

  isAuthor(): boolean {
    return RoleUtils.isAccepted(this.roleAccepted, this.authService.user);
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

  getAll(id: number): void {
    this.patientRoomService.findByDepartmentPage(id, this.searchVo)
      .subscribe({
        next: (res) => {
          this.rooms = res.content;
          this.totalElements = res.totalElements

          if (this.rooms.length === 0 && this.totalElements > 0 && this.page > 0) {
            this.page = 1;
            this.getAll(id);
          }
        },
        error: err => {
          console.error("getAllMedicalStaffPage", err)
          this.toastService.add({
            severity: 'error',
            summary: "Thất bại",
            detail: 'Không thể lấy dữ liệu'
          })
        }
      })
  }

  showCreate() {
    this.data = {
      departmentId: this.departmentId,
      status: true
    } as PatientRoomResponse

    setTimeout(() => {
      const createDialog = this.dialog.open(
        AddOrEditRoomComponent,
        {
          data: {
            room: this.data,
            isCreate: true,
          },
          disableClose: true,
          width: '40%'
        });

      createDialog.afterClosed().subscribe((data: PatientRoomRequest) => {
        if (data === undefined) return;

        if (data.totalBed === 0) {
          this.dataRequest = {
            departmentId: data.departmentId,
            roomNumber: data.roomNumber,
            totalBed: data.totalBed,
            patientBeds: [],
            status: true
          };
        } else {
          this.dataRequest = {
            departmentId: data.departmentId,
            roomNumber: data.roomNumber,
            totalBed: data.totalBed,
            patientBeds: data.patientBeds,
            status: true
          };
        }

        console.log('patientBed', data.patientBeds);
        console.log('dataRequest', this.dataRequest);

        this.patientRoomService.createPatientRoom(this.dataRequest)
          .subscribe({
            next: (res) => {
              console.log("createPatientRoom", res);
              this.toastService.add({
                severity: 'success',
                summary: 'Thành công',
                detail: "Thêm mới buồng bệnh thành công",
                icon: "pi pi-check",
                life: 15000
              })
              this.getAll(this.departmentId);
            },
            error: (error) => {
              console.log("error", error);
              this.toastService.add({
                severity: 'error',
                summary: 'Thất bại',
                detail: `Thêm mới buồng bệnh không thành công ${
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
      });
    }, 100)
  }

  showUpdate(id: number) {
    this.patientRoomService.findById(id)
      .subscribe({
        next: (res) => {
          this.data = res;
          console.log("findPatientRoomById", res);
          setTimeout(() => {
            const updateDialog = this.dialog.open(
              AddOrEditRoomComponent,
              {
                data: {
                  room: this.data,
                  isCreate: false,
                },
                disableClose: true,
                width: '40%'
              });

            updateDialog.afterClosed().subscribe((data: PatientRoomRequest) => {
              if (data === undefined) return;

              this.dataRequest = {
                departmentId: data.departmentId,
                roomNumber: data.roomNumber,
                totalBed: data.totalBed,
                patientBeds: data.patientBeds,
                status: data.status
              };

              console.log('dataRequest', this.dataRequest);

              this.patientRoomService.updatePatientRoom(id, this.dataRequest)
                .subscribe({
                  next: (res) => {
                    console.log("updateRoom", res);
                    this.toastService.add({
                      severity: 'success',
                      summary: 'Thành công',
                      detail: "Cập nhật buồng bệnh thành công",
                      icon: "pi pi-check",
                      life: 15000
                    });
                    this.getAll(this.departmentId)
                  },
                  error: (error) => {
                    console.log("error", error);
                    this.toastService.add({
                      severity: 'error',
                      summary: 'Thất bại',
                      detail: `Cập nhật buồng bệnh không thành công ${
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

            });
          }, 100)
        },
        error: (error) => {
          console.log("error", error);
          this.toastService.add({
            severity: 'error',
            summary: 'Thất bại',
            detail: `Không thể lấy dữ liệu buồng bệnh theo ID ${
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
  }

  showDelete(item: PatientRoomResponse) {
    let message = `Bạn có chắc chắn muốn xoá buồng bệnh tên: ` + item.roomNumber;

    let title = "Xác nhận xoá";
    let dialogData = new ConfirmDialogModel(title, message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "700px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.patientRoomService.deletePatientRoom(item.id)
          .subscribe({
            next: (res) => {
              console.log("deleteRoom", res);
              this.toastService.add({
                severity: 'success',
                summary: 'Thành công',
                detail: "Xoá buồng bệnh thành công",
                icon: "pi pi-check",
                life: 15000
              });
              this.getAll(this.departmentId)
            },
            error: (error) => {
              this.toastService.add({
                severity: 'error',
                summary: 'Thất bại',
                detail: `Xoá buồng bệnh không thành công ${
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
      } else {
        this.getAll(this.departmentId);
      }
    })

  }

  showDetails(id: number) {
    this.patientRoomService.findById(id)
      .subscribe({
        next: value => {
          this.data = value;
          console.log("findRoomById", value);
          this.dialog.open(DetailsRoomComponent, {
            data: {
              patientRoom: this.data
            },
            disableClose: true,
            width: '80%'
          });
        },
        error: err => {
          console.log("error", err);
        }
      })
  }

}
