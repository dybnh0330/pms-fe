import {Component, OnInit} from '@angular/core';
import {AccountModel} from "../../model/account.model";
import {MatDialog} from "@angular/material/dialog";
import {AddOrEditAccountComponent} from "./add-or-edit-account/add-or-edit-account.component";
import {ConfirmDialogComponent, ConfirmDialogModel} from "../confirm-dialog/confirm-dialog.component";
import {SortEvent} from "../../common/sort-header/sorter.directive";
import {SearchSortPageableModel} from "../../model/search-sort-pageable.model";
import {AccountRequest} from "../../model/request/account.request";
import {AccountService} from "../../services/account.service";
import {HttpErrorResponse} from "@angular/common/http";
import {MessageService} from "primeng/api";
import {RoleUtils} from "../../common/utils/RoleUtils";
import {AuthService} from "../../services/auth.service";
import {ROLE} from "../../constant";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  accounts: AccountModel[] = []
  data?: AccountModel;
  lsItemsPerPage = [10, 20, 30];
  totalElements = this.accounts.length;
  page = 1;
  itemsPerPage = this.lsItemsPerPage[0];
  math: Math = Math;
  dataRequest?: AccountRequest;
  searchVo: SearchSortPageableModel = {
    currentPageNumber: 0,
    pageSize: 0,
    searchText: "",
    sortColumn: "",
    sortDirection: ""
  }
  roleAccepted: string[] = [ROLE.ROLE_ADMIN]


  constructor(
    private dialog: MatDialog,
    private accountService: AccountService,
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
    this.getAll();
  }

  isAuthor(): boolean {
    return RoleUtils.isAccepted(this.roleAccepted, this.authService.user);
  }

  search(): void {
    this.page = 1;
    this.searchVo.currentPageNumber = this.page - 1;
    this.getAll();
  }

  onItemPerPageChange($event: any) {
    this.itemsPerPage = $event;
    this.searchVo.pageSize = this.itemsPerPage;
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
    this.getAll()
  }

  getAll(): void {
    this.accountService.findAllAccountPage(this.searchVo)
      .subscribe({
        next: (res) => {
          this.accounts = res.content;
          this.totalElements = res.totalElements;

          if (this.accounts.length == 0 && this.totalElements > 0 && this.page > 0) {
            this.page = 1;
            this.getAll();
          }
        }, error: (err) => {
          console.log("getAllAccountPage", err)
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
      status: true
    } as AccountModel

    setTimeout(() => {
      const createDialog = this.dialog.open(
        AddOrEditAccountComponent,
        {
          data: {
            account: this.data,
            isCreate: true,
          },
          disableClose: true,
          width: '40%'
        });
      createDialog.afterClosed().subscribe((data: AccountModel) => {

        if (data === undefined) return;

        console.log("data", data);

        this.dataRequest = {
          username: data.username,
          medicalStaffId: data.medicalStaffId,
          roleIds: data.roleIds,
          status: true
        }

        console.log("dataRequest", this.dataRequest);

        this.accountService.createAccount(this.dataRequest)
          .subscribe((res) => {
            console.log("createAccount", res);
            this.toastService.add({
              severity: 'success',
              summary: 'Thành công',
              detail: "Thêm mới tài khoản thành công",
              icon: 'pi pi-check'
            });
            this.getAll();
          }, (error) => {
            this.toastService.add({
              severity: 'error',
              summary: 'Thất bại',
              detail: `Thêm mới tài khoản không thành công
              ${
                error.error &&
                error.error.pmsExceptionMsg &&
                error.error.pmsExceptionMsg.messageDefault
                  ? error.error.pmsExceptionMsg.messageDefault
                  : ""
              }`,
              life: 15000
            })
            console.log("error", error)
          })
      })
    }, 100)
  }

  showUpdate(id: number) {
    this.accountService.findAccountById(id)
      .subscribe((res) => {
        this.data = res;
        console.log("findAccountById", res);
        setTimeout(() => {
          const updateDialog = this.dialog.open(
            AddOrEditAccountComponent,
            {
              data: {
                account: this.data,
                isCreate: false,
              },
              disableClose: true,
              width: '40%'
            });
          updateDialog.afterClosed().subscribe((data: AccountModel) => {
            if (data === undefined) return;

            console.log("data", data);

            this.dataRequest = {
              username: data.username,
              roleIds: data.roleIds,
              medicalStaffId: data.medicalStaffId,
              status: data.status
            }

            console.log("dataRequest", this.dataRequest);

            this.accountService.updateAccount(id, this.dataRequest)
              .subscribe((res) => {
                console.log("updateAccount", res)
                this.toastService.add({
                  severity: 'success',
                  summary: 'Thành công',
                  detail: "Cập nhật tài khoản thành công",
                  icon: "pi pi-check"
                });
                this.getAll()
              }, (error) => {
                this.toastService.add({
                  severity: 'error',
                  summary: 'Thất bại',
                  detail: `Cập nhật tài khoản không thành công ${
                    error.error &&
                    error.error.pmsExceptionMsg &&
                    error.error.pmsExceptionMsg.messageDefault
                      ? error.error.pmsExceptionMsg.messageDefault
                      : ""
                  }`,
                  life: 15000
                })
              });
          })
        }, 100)
      })
  }

  showDelete(account: AccountModel) {
    let message = `Bạn có chắc chắn muốn xoá tài khoản ` + account.username;

    let title = "Xác nhận xoá";
    let dialogData = new ConfirmDialogModel(title, message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "700px",
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult == true) {
        this.accountService.deleteAccount(account.id)
          .subscribe(
            (response) => {
              console.log(response);
              this.toastService.add({
                severity: 'success',
                summary: 'Thành công',
                detail: "Xoá tài khoản thành công",
                icon: "pi pi-check",
                life: 15000
              });
              this.getAll();
            },
            (error: HttpErrorResponse) => {
              this.toastService.add({
                severity: 'error',
                summary: 'Thất bại',
                detail: `Xoá tài khoản không thành công ${
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

  showUnlock(account: AccountModel) {
    let message = `Bạn có chắc chắn muốn mở khoá tài khoản ` + account.username;

    let title = "Xác nhận mở khoá";
    let dialogData = new ConfirmDialogModel(title, message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "700px",
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult == true) {
        this.accountService.unlockAccount(account.id)
          .subscribe(
            (response) => {
              console.log(response);
              this.toastService.add({
                severity: 'success',
                summary: 'Thành công',
                detail: "Mở khoá tài khoản thành công",
                icon: "pi pi-check",
                life: 15000
              });
              this.getAll();
            },
            (error: HttpErrorResponse) => {
              this.toastService.add({
                severity: 'error',
                summary: 'Thất bại',
                detail: `Mở khoá tài khoản không thành công ${
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
