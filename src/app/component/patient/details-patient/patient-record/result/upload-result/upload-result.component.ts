import {Component, Inject, OnInit} from '@angular/core';
import {BaseAddOrUpdateDialogComponent, BaseAddOrUpdateDialogData} from "../../../../../../base/pms.base";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ResultService} from "../../../../../../services/result.service";
import {MessageService} from "primeng/api";

export interface UploadFileResult extends BaseAddOrUpdateDialogData {
  files: Array<Blob>;
}

@Component({
  selector: 'app-upload-result',
  templateUrl: './upload-result.component.html',
  styleUrls: ['./upload-result.component.scss']
})
export class UploadResultComponent extends BaseAddOrUpdateDialogComponent<UploadFileResult> implements OnInit{

  constructor(public override dialogRef: MatDialogRef<typeof self>,
              @Inject(MAT_DIALOG_DATA) public override data: UploadFileResult) {
    super(dialogRef, data);
  }

  selectFiles(event: any) {
    this.data.files = event.target.files;
  }

  ngOnInit(): void {
  }

}
