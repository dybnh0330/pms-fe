import {Component, OnInit} from '@angular/core';
import {MedicalStaffModel} from "../../model/medical-staff.model";
import {MatDialog} from "@angular/material/dialog";
import {AddOrEditMedicalStaffComponent} from "./add-or-edit-medical-staff/add-or-edit-medical-staff.component";
import {ConfirmDialogComponent, ConfirmDialogModel} from "../confirm-dialog/confirm-dialog.component";
import {DepartmentModel} from "../../model/department.model";
import {SearchSortPageableModel} from "../../model/search-sort-pageable.model";
import {MedicalStaffRequest} from "../../model/request/medical-staff.request";
import {DepartmentService} from "../../services/department.service";
import {MedicalStaffService} from "../../services/medical-staff.service";
import {SortEvent} from "../../common/sort-header/sorter.directive";
import {HttpErrorResponse} from "@angular/common/http";
import {MessageService} from "primeng/api";
import {AuthService} from "../../services/auth.service";
import {ROLE} from "../../constant";
import {RoleUtils} from "../../common/utils/RoleUtils";

@Component({
  selector: 'app-medical-staff',
  templateUrl: './medical-staff.component.html',
  styleUrls: ['./medical-staff.component.scss']
})

export class MedicalStaffComponent implements OnInit {

  medicalStaffs: MedicalStaffModel[] = []
  departments: DepartmentModel[] = []
  data?: MedicalStaffModel;
  lsItemsPerPage = [10, 20, 30];
  totalElements = 0;
  page = 1;
  itemsPerPage = this.lsItemsPerPage[0];
  math: Math = Math;
  searchVo: SearchSortPageableModel = {
    currentPageNumber: 0,
    pageSize: 0,
    searchText: "",
    sortColumn: "",
    sortDirection: ""
  }
  roleAccepted: string[] = [ROLE.ROLE_ADMIN]
  dataRequest ?: MedicalStaffRequest;
  departmentId: any;
  departmentChange: boolean = false;
  username?: string;

  constructor(
    private dialog: MatDialog,
    private departmentService: DepartmentService,
    private medicalStaffService: MedicalStaffService,
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

    this.username = this.authService.user?.username;

    this.getDepartment();

    if (this.departmentId === null || this.departmentId === undefined) {
      this.getAll();
    }

    console.log("departmentId", this.departmentId)

    this.getAllByDepartment(this.departmentId);
  }

  search(): void {
    console.log("search", this.searchVo.searchText);
    this.page = 1;
    this.searchVo.currentPageNumber = this.page - 1;
    this.getAll();
  }

  isAuthor(): boolean {
    return RoleUtils.isAccepted(this.roleAccepted, this.authService.user);
  }

  onItemPerPageChange($event: any) {
    this.itemsPerPage = $event;
    this.searchVo.pageSize = this.itemsPerPage
    this.page = 1;
    this.searchVo.currentPageNumber = this.page - 1;
    this.getAll();
  }

  onPageChange($event: any): void {
    this.page = $event;
    this.searchVo.currentPageNumber = this.page - 1;
    this.getAll();
  }

  onSortChange($event: SortEvent) {
    if ($event.direction === "") {
      this.searchVo.sortColumn = "";
      this.searchVo.sortDirection = "";
    } else {
      this.searchVo.sortColumn = `${$event.field}`;
      this.searchVo.sortDirection = `${$event.direction}`;
    }

    if (this.departmentChange && this.departmentId !== null) {
      this.getAllByDepartment(this.departmentId);
    } else {
      this.getAll()
    }
  }

  onDepartmentChange($event: any) {

    this.departmentId = $event;
    this.departmentChange = true;
    this.searchVo.sortColumn = 'updateTime';
    this.searchVo.sortDirection = 'desc';

    if (this.departmentId === null) {
      this.getAll()
    } else {
      this.getAllByDepartment(this.departmentId);
    }

    console.log("departmentId", this.departmentId)

  }

  getAll(): void {
    this.medicalStaffService.findAllMedicalStaffPage(this.searchVo)
      .subscribe({
        next: (res) => {
          this.medicalStaffs = res.content
          this.totalElements = res.totalElements

          if (this.medicalStaffs.length == 0 && this.totalElements > 0 && this.page > 0) {
            this.page = 1;
            this.getAll();
          }
        }, error: (err) => {
          console.error("getAllMedicalStaffPage", err)
          this.toastService.add({
            severity: 'error',
            summary: "Thất bại",
            detail: 'Không thể lấy dữ liệu'
          })

        }
      })
  }

  getAllByDepartment(id: number): void {
    this.medicalStaffService.findAllPageByDepartment(id, this.searchVo)
      .subscribe({
        next: (res) => {
          this.medicalStaffs = res.content;
          this.totalElements = res.totalElements

          if (this.medicalStaffs.length == 0 && this.totalElements > 0 && this.page > 0) {
            this.page = 1;
            this.getAllByDepartment(id);
          }
        }, error: (err) => {
          console.error("getAllByDepartment", err);
          this.toastService.add({
            severity: 'error',
            summary: "Thất bại",
            detail: 'Không thể lấy dữ liệu nhân viên theo khoa bệnh'
          })

        }
      })
  }

  getDepartment(): void {
    this.departmentService.findAllDepartment()
      .subscribe({
        next: (res) => {
          this.departments = res
        }, error: (err) => {
          console.error("departments", err)
          this.toastService.add({
            severity: 'error',
            summary: "Thất bại",
            detail: 'Không thể lấy dữ liệu khoa bệnh'
          })

        }
      })
  }

  showCreate() {
    this.data = {
      name: "",
      address: "",
      cccd: "",
      phoneNumber: "",
      email: "",
    } as MedicalStaffModel

    setTimeout(() => {
      const createDialog = this.dialog.open(
        AddOrEditMedicalStaffComponent,
        {
          data: {
            medicalStaff: this.data,
            isCreate: true,
          },
          disableClose: true,
          width: '40%'
        });
      createDialog.afterClosed().subscribe((data: MedicalStaffModel) => {
        if (data === undefined) return;

        console.log("data", data)

        this.dataRequest = {
          name: data.name,
          gender: data.gender,
          dob: data.dob,
          address: data.address,
          cccd: data.cccd,
          phoneNumber: data.phoneNumber,
          email: data.email,
          certificate: data.certificate,
          specialize: data.specialize,
          departmentId: data.departmentId
        }

        console.log("dataRequest", this.dataRequest);

        this.medicalStaffService.createMedicalStaff(this.dataRequest)
          .subscribe((res) => {
              console.log("createMedicalStaff", res);
              this.toastService.add({
                severity: 'success',
                summary: 'Thành công',
                detail: "Thêm nhân viên y tế thành công",
                icon: "pi pi-check",
                life: 15000
              });
              if (this.departmentId === null || this.departmentId === undefined) {
                this.getAll();
              } else {
                this.getAllByDepartment(data.departmentId)
              }
            },
            (error) => {
              this.toastService.add({
                severity: 'error',
                summary: 'Thất bại',
                detail: `Thêm mới nhân viên y tế không thành công ${
                  error.error &&
                  error.error.pmsExceptionMsg &&
                  error.error.pmsExceptionMsg.messageDefault
                    ? error.error.pmsExceptionMsg.messageDefault
                    : ""
                }`,
                life: 15000
              })
            });
      });
    }, 100)
  }

  showUpdate(id: number) {
    this.medicalStaffService.findMedicalStaffById(id)
      .subscribe((res) => {
        this.data = res;
        console.log("findMedicalStaffById", res);
        setTimeout(() => {
          const updateDialog = this.dialog.open(
            AddOrEditMedicalStaffComponent,
            {
              data: {
                medicalStaff: this.data,
                isCreate: false,
              },
              disableClose: true,
              width: '40%'
            });
          updateDialog.afterClosed().subscribe((data: MedicalStaffModel) => {
            if (data === undefined) return;

            console.log("data", data);

            this.dataRequest = {
              name: data.name,
              gender: data.gender,
              dob: data.dob,
              address: data.address,
              cccd: data.cccd,
              phoneNumber: data.phoneNumber,
              email: data.email,
              certificate: data.certificate,
              specialize: data.specialize,
              departmentId: data.departmentId
            }

            this.medicalStaffService.updateMedicalStaff(id, this.dataRequest)
              .subscribe((res) => {
                console.log("updateMedicalStaff", res)
                this.toastService.add({
                  severity: 'success',
                  summary: 'Thành công',
                  detail: "Cập nhật nhân viên thành công",
                  icon: "pi pi-check",
                  life: 15000
                });
                if (this.departmentId === null || this.departmentId === undefined) {
                  this.getAll();
                } else {
                  this.getAllByDepartment(data.departmentId)
                }
              }, error => {
                this.toastService.add({
                  severity: 'error',
                  summary: 'Thất bại',
                  detail: `Cập nhật nhân viên không thành công ${
                    error.error &&
                    error.error.pmsExceptionMsg &&
                    error.error.pmsExceptionMsg.messageDefault
                      ? error.error.pmsExceptionMsg.messageDefault
                      : ""
                  }`,
                  life: 15000
                })
                console.log("error", error)
              });
          });
        }, 100)
      });
  }

  showDelete(medicalStaff: MedicalStaffModel) {
    let message = `Bạn có chắc chắn muốn xoá nhân viên ` + medicalStaff.name;

    let title = "Xác nhận xoá";
    let dialogData = new ConfirmDialogModel(title, message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "700px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult == true) {
        this.medicalStaffService.deleteMedicalStaff(medicalStaff.id)
          .subscribe(
            (response) => {
              console.log(response);
              this.toastService.add({
                severity: 'success',
                summary: 'Thành công',
                detail: "Xoá nhân viên thành công",
                icon: "pi pi-check",
                life: 15000
              });
              this.getAll();
            },
            (error: HttpErrorResponse) => {
              this.toastService.add({
                severity: 'error',
                summary: 'Thất bại',
                detail: `Xoá nhân viên không thành công ${
                  error.error &&
                  error.error.pmsExceptionMsg &&
                  error.error.pmsExceptionMsg.messageDefault
                    ? error.error.pmsExceptionMsg.messageDefault
                    : ""
                }`,
                life: 15000
              })

            }
          )
      } else {
        this.getAll();
      }
    });
  }

}
