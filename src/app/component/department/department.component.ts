import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {DepartmentModel} from "../../model/department.model";
import {AddOrEditDepartmentComponent} from "./add-or-edit-department/add-or-edit-department.component";
import {ConfirmDialogComponent, ConfirmDialogModel} from "../confirm-dialog/confirm-dialog.component";
import {DepartmentService} from "../../services/department.service";
import {SearchSortPageableModel} from "../../model/search-sort-pageable.model";
import {SortEvent} from "../../common/sort-header/sorter.directive";
import {DepartmentRequest} from "../../model/request/department.request";
import {HttpErrorResponse} from "@angular/common/http";
import {MessageService} from "primeng/api";
import {AuthService} from "../../services/auth.service";
import {RoleUtils} from "../../common/utils/RoleUtils";
import {ROLE} from "../../constant";

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {

  departments: DepartmentModel[] = [];
  data?: DepartmentModel;
  lsItemsPerPage = [10, 20, 30];
  totalElements = 0;
  page = 1;
  itemsPerPage = this.lsItemsPerPage[0];
  math: Math = Math;
  userScopes?: string[] = [];
  roleAccepted: string[] = [ROLE.ROLE_ADMIN]

  searchVo: SearchSortPageableModel = {
    currentPageNumber: 0,
    pageSize: 0,
    searchText: "",
    sortColumn: "",
    sortDirection: ""
  };
  dataRequest?: DepartmentRequest;

  constructor(
    private departmentService: DepartmentService,
    private authService: AuthService,
    private dialog: MatDialog,
    private toastService: MessageService
  ) {
  }

  ngOnInit(): void {
    this.searchVo.currentPageNumber = this.page - 1;
    this.searchVo.pageSize = this.itemsPerPage;
    this.searchVo.searchText = '';
    this.searchVo.sortColumn = 'updateTime';
    this.searchVo.sortDirection = 'desc';
    this.getAll();
  }

  isAuthor(): boolean {
    return RoleUtils.isAccepted(this.roleAccepted, this.authService.user);
  }

  search(): void {
    console.log("search", this.searchVo.searchText);
    this.page = 1;
    this.searchVo.currentPageNumber = this.page - 1;
    this.getAll();
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
    this.getAll();
  }

    getAll(): void {
    this.departmentService.findAllPageDepartment(this.searchVo)
      .subscribe({
        next: (res) => {
          this.departments = res.content;
          this.totalElements = res.totalElements

          if (this.departments.length == 0 && this.totalElements > 0 && this.page > 0) {
            this.page = 1;
            this.getAll();
          }

        }, error: (err) => {
          console.error("getAllDepartmentPage", err);
          this.toastService.add({
            severity: 'error',
            summary: "Thất bại",
            detail: 'Không thể lấy dữ liệu',
            life: 15000
          })

        }
      })
  }

  showCreate() {
    this.data = {
      name: '',
      description: ''
    } as DepartmentModel

    setTimeout(() => {
      const createDialog = this.dialog.open(AddOrEditDepartmentComponent, {
        data: {
          department: this.data,
          isCreate: true,
        },
        disableClose: true,
        width: '40%'
      });
      createDialog.afterClosed().subscribe((data: DepartmentModel) => {

        if (data === undefined) return

        console.log("data", data);

        this.dataRequest = {
          name: data.name,
          description: data.description
        }

        this.departmentService.createDepartment(this.dataRequest).subscribe(
          (res) => {
            console.log("createDepartment", res)
            this.toastService.add({
              severity: 'success',
              summary: 'Thành công',
              detail: "Thêm khoa bệnh thành công",
              icon: "pi pi-check",
              life: 15000
            });
            this.getAll();
          },
          (error) => {
            this.toastService.add({
              severity: 'error',
              summary: 'Thất bại',
              detail: `Thêm khoa bệnh không thành công ${
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
    }, 100);
  }

  showUpdate(id: number) {
    this.departmentService.findDepartmentById(id).subscribe(
      (res) => {
        this.data = res;
        setTimeout(() => {
          const updateDialog = this.dialog.open(AddOrEditDepartmentComponent, {
            data: {
              department: this.data,
              isCreate: false,
            },
            disableClose: true,
            width: '40%'
          });
          updateDialog.afterClosed().subscribe((data: DepartmentModel) => {

            if (data === undefined) return

            console.log("data", data);

            this.dataRequest = {
              id: data.id,
              name: data.name,
              description: data.description
            }

            this.departmentService.updateDepartment(id, this.dataRequest).subscribe(
              (res) => {
                console.log("updateDepartment", res)
                this.toastService.add({
                  severity: 'success',
                  summary: 'Thành công',
                  detail: "Cập nhật khoa bệnh thành công",
                  icon: "pi pi-check",
                  life: 15000
                });
                this.getAll();
              },
              (error) => {
                this.toastService.add({
                  severity: 'error',
                  summary: 'Thất bại',
                  detail: `Cập nhật khoa bệnh không thành công ${
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
      });
  }

  showDelete(item: DepartmentModel) {
    let message = `Bạn có chắc chắn muốn xoá khoa ` + item.name;

    let title = "Xác nhận xoá";
    let dialogData = new ConfirmDialogModel(title, message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "700px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.departmentService.deleteDepartment(item.id)
          .subscribe(
            (response) => {
              console.log(response);
              this.toastService.add({
                severity: 'success',
                summary: 'Thành công',
                detail: "Xoá khoa bệnh thành công",
                icon: "pi pi-check",
                life: 15000
              });
              this.getAll();
            },
            (error: HttpErrorResponse) => {
              this.toastService.add({
                severity: 'error',
                summary: 'Thất bại',
                detail: `Xoá khoa bệnh không thành công ${
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
