import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {CategoryModel} from "../../model/category.model";
import {AddOrEditCategoryComponent} from "./add-or-edit-category/add-or-edit-category.component";
import {ConfirmDialogComponent, ConfirmDialogModel} from "../confirm-dialog/confirm-dialog.component";
import {CategoryService} from "../../services/category.service";
import {MessageService} from "primeng/api";
import {SearchSortPageableModel} from "../../model/search-sort-pageable.model";
import {CategoryRequest} from "../../model/request/category.request";
import {SortEvent} from "../../common/sort-header/sorter.directive";
import {SearchSortModel} from "../../model/search-sort.model";
import {Claims} from "../../common/token/claims";
import {AuthService} from "../../services/auth.service";
import {RoleUtils} from "../../common/utils/RoleUtils";
import {ROLE} from "../../constant";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  categoryTypes: CategoryModel[] = []
  categories: CategoryModel[] = []
  data?: CategoryModel;
  lsItemsPerPage = [10, 20, 30];
  totalElements = 0;
  page = 1;
  itemsPerPage = this.lsItemsPerPage[0];
  math: Math = Math;
  userScopes?: string[] = [];
  searchVo: SearchSortPageableModel = {
    currentPageNumber: 0,
    pageSize: 0,
    searchText: "",
    sortColumn: "",
    sortDirection: ""
  }
  searchSortVO: SearchSortModel = {searchText: "", sortColumn: "", sortDirection: ""}
  dataRequest?: CategoryRequest;
  typeId: any;
  typeChange: boolean = false;
  roleAccepted: string[] = [ROLE.ROLE_ADMIN]


  constructor(
    private dialog: MatDialog,
    private categoryService: CategoryService,
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

    this.userScopes = this.authService.user?.scope;

    this.getAllCategory();
    this.getAllCategoryType();
  }

  searchCategory(): void {
    console.log("search", this.searchVo.searchText);
    this.page = 1;
    this.searchVo.currentPageNumber = this.page - 1;
    this.getAllCategory();
  }

  searchCategoryType(): void {
    console.log("search", this.searchSortVO.searchText);
    this.page = 1;
    this.getAllCategoryType();
  }

  onSortCategoryChange($event: SortEvent) {
    if ($event.direction === "") {
      this.searchVo.sortColumn = "";
      this.searchVo.sortDirection = "";
    } else {
      this.searchVo.sortColumn = `${$event.field}`;
      this.searchVo.sortDirection = `${$event.direction}`;
    }

    if (this.typeChange && this.typeId !== null) {
      this.getAllCategoryByType(this.typeId);
    } else {
      this.getAllCategory()
    }
  }

  isAuthor(): boolean {
    return RoleUtils.isAccepted(this.roleAccepted, this.authService.user);
  }

  onSortTypeChange($event: SortEvent) {
    if ($event.direction === "") {
      this.searchSortVO.sortColumn = "";
      this.searchSortVO.sortDirection = "";
    } else {
      this.searchSortVO.sortColumn = `${$event.field}`;
      this.searchSortVO.sortDirection = `${$event.direction}`;
    }

    this.getAllCategoryType();
  }

  onItemPerPageChange($event: any) {
    this.itemsPerPage = $event;
    this.searchVo.pageSize = this.itemsPerPage;
    this.page = 1;
    this.searchVo.currentPageNumber = this.page - 1;
    this.getAllCategory();
  }

  onPageChange($event: any): void {
    this.page = $event;
    this.searchVo.currentPageNumber = this.page - 1
    this.getAllCategory();
  }

  onTypeChange($event: any) {
    this.typeId = $event;
    this.typeChange = true;
    this.searchVo.sortColumn = 'updateTime';
    this.searchVo.sortDirection = 'desc';

    if (this.typeId === null) {
      this.getAllCategory();
    } else {
      this.getAllCategoryByType(this.typeId);
    }

    console.log("typeId", this.typeId);
  }

  private getAllCategoryType(): void {
    this.categoryService.findAllType(this.searchSortVO)
      .subscribe({
        next: (res) => {
          this.categoryTypes = res
        }, error: err => {
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

  showCreateCategoryType() {
    this.data = {
      name: '',
      description: '',
    } as CategoryModel

    setTimeout(() => {
      const createType = this.dialog.open(AddOrEditCategoryComponent, {
        data: {
          category: this.data,
          isCreate: true,
          isCategoryType: true
        },
        disableClose: true,
        width: '40%'
      });
      createType.afterClosed().subscribe((data: CategoryModel) => {
        if (data === undefined) return;

        console.log("data", data);

        this.dataRequest = {
          name: data.name,
          parentId: 0,
          description: data.description
        }
        console.log("dataRequest", this.dataRequest);

        this.categoryService.createCategory(this.dataRequest)
          .subscribe({
            next: (res) => {
              console.log("createCategory", res);
              this.toastService.add({
                severity: 'success',
                summary: 'Thành công',
                detail: "Thêm mới loại danh mục thành công",
                icon: "pi pi-check",
                life: 15000
              });
              this.getAllCategoryType();
            }, error: error => {
              this.toastService.add({
                severity: 'error',
                summary: 'Thất bại',
                detail: `Thêm mới loại danh mục không thành công ${
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

  showUpdateCategoryType(id: number) {
    this.categoryService.findCategoryById(id)
      .subscribe((res) => {
        this.data = res;
        console.log("findCategortById", res);

        setTimeout(() => {
          const updateDialog = this.dialog.open(AddOrEditCategoryComponent, {
            data: {
              category: this.data,
              isCreate: false,
              isCategoryType: true
            },
            disableClose: true,
            width: '40%'
          });
          updateDialog.afterClosed().subscribe((data: CategoryModel) => {
            if (data === undefined) return;

            console.log("data", data);

            this.dataRequest = {
              id: data.id,
              name: data.name,
              description: data.description,
              parentId: 0
            }

            console.log("dataRequest", this.dataRequest);

            this.categoryService.updateCategory(id, this.dataRequest)
              .subscribe((res) => {
                console.log("updateCategory", res);
                this.toastService.add({
                  severity: 'success',
                  summary: 'Thành công',
                  detail: "Cập nhật loại danh mục thành công",
                  icon: "pi pi-check",
                  life: 15000
                });
                this.getAllCategoryType();
              }, (error) => {
                this.toastService.add({
                  severity: 'error',
                  summary: 'Thất bại',
                  detail: `Cập nhật loại danh mục không thành công ${
                    error.error &&
                    error.error.pmsExceptionMsg &&
                    error.error.pmsExceptionMsg.messageDefault
                      ? error.error.pmsExceptionMsg.messageDefault
                      : ""
                  }`,
                  life: 15000
                })
                console.log("error", error);
              })
          })
        }, 100)
      })
  }

  showDeleteCategoryType(item: CategoryModel) {
    let message = `Bạn có chắc chắn muốn xoá loại danh mục ` + item.name;

    let title = "Xác nhận xoá";
    let dialogData = new ConfirmDialogModel(title, message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "700px",
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult == true) {
        this.categoryService.deleteCategory(item.id)
          .subscribe({
            next: (res) => {
              console.log("res", res);
              this.toastService.add({
                severity: 'success',
                summary: 'Thành công',
                detail: "Xoá loại thành công",
                icon: "pi pi-check",
                life: 15000
              });
              this.getAllCategoryType();
            },
            error: (error) => {
              console.log("error", error);
              this.toastService.add({
                severity: 'error',
                summary: 'Thất bại',
                detail: `Xoá loại danh mục không thành công ${
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
        this.getAllCategoryType();
      }
    })
  }

  private getAllCategoryByType(type: number): void {
    this.categoryService.findAllPageByType(type, this.searchVo)
      .subscribe({
        next: (res) => {
          this.categories = res.content;
          this.totalElements = res.totalElements

          if (this.categories.length == 0 && this.totalElements > 0 && this.page > 0) {
            this.page = 1;
            this.getAllCategoryByType(type);
          }
        }, error: (err) => {
          console.log("error", err);
          this.toastService.add({
            severity: 'error',
            summary: "Thất bại",
            detail: 'Không thể lấy dữ liệu danh mục theo loại',
            life: 15000
          })
        }
      })
  }

  private getAllCategory(): void {
    this.categoryService.findAllCategoryPage(this.searchVo)
      .subscribe({
        next: (res) => {
          this.categories = res.content;
          this.totalElements = res.totalElements;

          if (this.categories.length == 0 && this.totalElements > 0 && this.page > 0) {
            this.page = 1;
            this.getAllCategory();
          }
        }, error: (err) => {
          console.log("error", err);
          this.toastService.add({
            severity: 'error',
            summary: "Thất bại",
            detail: 'Không thể lấy dữ liệu danh mục',
            life: 15000
          })
        }
      })
  }

  showCreateCategory() {
    this.data = {
      name: '',
      description: ''
    } as CategoryModel

    setTimeout(() => {
      const createDialog = this.dialog.open(AddOrEditCategoryComponent, {
        data: {
          category: this.data,
          isCreate: true,
          isCategoryType: false
        },
        disableClose: true,
        width: '40%'
      });
      createDialog.afterClosed().subscribe((data: CategoryModel) => {
        if (data === null) return;

        console.log("data", data);

        this.dataRequest = {
          name: data.name,
          description: data.description,
          parentId: data.parentId
        }

        console.log("dataRequest", this.dataRequest);

        this.categoryService.createCategory(this.dataRequest)
          .subscribe({
            next: (res) => {
              console.log("createCategory", res);
              this.toastService.add({
                severity: 'success',
                summary: 'Thành công',
                detail: "Thêm mới danh mục thành công",
                icon: "pi pi-check",
                life: 15000
              });
              this.getAllCategory();
            },
            error: (error) => {
              console.log("error", error);
              this.toastService.add({
                severity: 'error',
                summary: 'Thất bại',
                detail: `Thêm mới danh mục không thành công ${
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

  showUpdateCategory(id: number) {
    this.categoryService.findCategoryById(id)
      .subscribe({
        next: (res) => {
          this.data = res;
          console.log("findCategoryById", res);
          setTimeout(() => {
            const updateDialog = this.dialog.open(AddOrEditCategoryComponent, {
              data: {
                category: this.data,
                isCreate: true,
                isCategoryType: false
              },
              disableClose: true,
              width: '40%'
            });
            updateDialog.afterClosed().subscribe((data: CategoryModel) => {
              if (data === null) return;

              console.log("data", data)

              this.dataRequest = {
                id: data.id,
                name: data.name,
                description: data.description,
                parentId: data.parentId
              }

              console.log("dataRequest", this.dataRequest)

              this.categoryService.updateCategory(id, this.dataRequest)
                .subscribe({
                  next: (res) => {
                    console.log("updateCategory", res);
                    this.toastService.add({
                      severity: 'success',
                      summary: 'Thành công',
                      detail: "Cập nhật danh mục thành công",
                      icon: "pi pi-check",
                      life: 15000
                    })
                  },
                  error: (error) => {
                    console.log("error", error);
                    this.toastService.add({
                      severity: 'error',
                      summary: 'Thất bại',
                      detail: `Cập nhật không thành công ${
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
        error: (error) => {
          console.log('error', error);
          this.toastService.add({
            severity: 'error',
            summary: "Thất bại",
            detail: 'Không thể lấy dữ liệu'
          })
        }

      })


  }

  showDeleteCategory(item: CategoryModel) {
    let message = `Bạn có chắc chắn muốn xoá danh mục ` + item.name;

    let title = "Xác nhận xoá";
    let dialogData = new ConfirmDialogModel(title, message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "700px",
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.categoryService.deleteCategory(item.id)
          .subscribe({
            next: (res) => {
              console.log("deleteCategory", res);
              this.toastService.add({
                severity: 'success',
                summary: 'Thành công',
                detail: "Xoá danh mục thành công",
                icon: "pi pi-check",
                life: 15000
              })
              this.getAllCategory()
            },
            error: (error) => {
              console.log("error", error);
              this.toastService.add({
                severity: 'error',
                summary: 'Thất bại',
                detail: `Xoá danh mục không thành công ${
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
        this.getAllCategory()
      }
    })
  }
}
