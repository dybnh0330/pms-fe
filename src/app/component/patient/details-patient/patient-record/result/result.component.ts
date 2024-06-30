import {Component, Inject, OnInit} from '@angular/core';
import {ResultResponse} from "../../../../../model/response/result.response";
import {MessageService} from "primeng/api";
import {ResultService} from "../../../../../services/result.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {BaseAddOrUpdateDialogComponent, BaseAddOrUpdateDialogData} from "../../../../../base/pms.base";
import {ConfirmDialogComponent, ConfirmDialogModel} from "../../../../confirm-dialog/confirm-dialog.component";
import {UploadResultComponent} from "./upload-result/upload-result.component";
import {ViewResultComponent} from "./view-result/view-result.component";

export interface ViewResultData extends BaseAddOrUpdateDialogData {
  recordId: number;
}

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent extends BaseAddOrUpdateDialogComponent<ViewResultData>
  implements OnInit {

  files: ResultResponse[] = []

  src: string = '';

  constructor(private toastService: MessageService,
              private dialog: MatDialog,
              public override dialogRef: MatDialogRef<typeof self>,
              @Inject(MAT_DIALOG_DATA) public override data: ViewResultData,
              private resultService: ResultService) {
    super(dialogRef, data);
  }

  ngOnInit(): void {
    console.log(this.data.recordId);
    this.getAll();
  }

  getAll(): void {
    this.resultService.findAllResult(this.data.recordId).subscribe({
      next: value => {
        console.log("findAllResult", value);
        this.files = value
      },
      error: err => {
        console.log("error", err);
        this.toastService.add({
          severity: 'error',
          summary: "Thất bại",
          detail: 'Không thể lấy dữ liệu'
        })
      }
    })
  }

  viewResult(item: ResultResponse) {
    this.resultService.findResultById(item.id).subscribe({
      next: (res) => {
        console.log("findDocById", res);

        this.resultService.downloadFile(item.fileName).subscribe({
          next: value => {
            let blob: Blob = value.body as Blob
            this.src = URL.createObjectURL(blob)
          }
        })

        this.dialog.open(ViewResultComponent, {
          data: {
            file: res,
            maxWidth: "1000px",
            src: this.src
          }
        });
      },
    })
  }

  downloadResult(fileName: string) {
    this.resultService.downloadFile(fileName).subscribe({
      next: value => {
        let content = value.headers.get('content-disposition');

        console.log("content-disposition", content)

        if (content) {
          let fileName = content.split(';')[1].split('"')[1]

          console.log("fileName", fileName);
          let blob: Blob = value.body as Blob
          let a = document.createElement('a');
          a.download = fileName;
          a.href = window.URL.createObjectURL(blob)
          a.click();
        }
      },
      error: error => {
        this.toastService.add({
          severity: 'error',
          summary: 'Thất bại',
          detail: `Download file kết quả không thành công ${
            error.error &&
            error.error.pmsExceptionMsg &&
            error.error.pmsExceptionMsg.messageDefault
              ? error.error.pmsExceptionMsg.messageDefault
              : ""
          }`
        })
      }
    })
  }

  showCreate() {
    setTimeout(() => {
      const createDialog = this.dialog.open(UploadResultComponent, {
        data: {
          recordId: this.data.recordId
        },
        width: '50%',
        disableClose: true
      })

      createDialog.afterClosed().subscribe((data) => {
        if (data === undefined) return;

        console.log("dataAfterClose", data);

        this.resultService.addResult(this.data.recordId, data).subscribe({
          next: value => {
            console.log("addResult", value);
            this.toastService.add({
              severity: 'success',
              summary: 'Thành công',
              detail: "Tải lên file kết quả thành công",
              icon: "pi pi-check",
              life: 15000
            });
            this.getAll()
          },
          error: error => {
            console.log("error", error)
            this.toastService.add({
              severity: 'error',
              summary: 'Thất bại',
              detail: `Tải lên file kết quả không thành công ${
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
  }

  showDelete(item: ResultResponse) {

    let message = `Bạn có chắc chắn muốn xoá file đã chọn?`;

    let title = "Xác nhận xoá";
    let dialogData = new ConfirmDialogModel(title, message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "700px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result == true) {
        this.resultService.deleteFile(item.id).subscribe({
          next: value => {
            console.log("deleteFile", value);
            this.toastService.add({
              severity: 'success',
              summary: 'Thành công',
              detail: "Xoá file kết quả thành công",
              icon: "pi pi-check",
              life: 15000
            });
            this.getAll();
          },
          error: error => {
            console.log("error", error);
            this.toastService.add({
              severity: 'error',
              summary: 'Thất bại',
              detail: `Cập nhật thông tin bệnh không thành công ${
                error.error &&
                error.error.pmsExceptionMsg &&
                error.error.pmsExceptionMsg.messageDefault
                  ? error.error.pmsExceptionMsg.messageDefault
                  : ""
              }`
            })
          }
        })
      }
    })

  }

}
