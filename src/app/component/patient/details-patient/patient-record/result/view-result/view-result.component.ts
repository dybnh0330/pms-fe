import {Component, Inject, OnInit} from '@angular/core';
import {BaseDialogComponent} from "../../../../../../base/pms.base";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ResultService} from "../../../../../../services/result.service";
import {ResultResponse} from "../../../../../../model/response/result.response";


interface ResultDialogData {
  file: ResultResponse;
  src: string;
}

@Component({
  selector: 'app-view-result',
  templateUrl: './view-result.component.html',
  styleUrls: ['./view-result.component.scss']
})
export class ViewResultComponent extends BaseDialogComponent implements OnInit {

  file: ResultResponse = {createBy: "", createTime: "", fileDownloadUri: "", fileName: "", fileType: "", id: 0}
  src: string = ''

  constructor(
    public override dialogRef: MatDialogRef<typeof self>,
    private resultService: ResultService,
    @Inject(MAT_DIALOG_DATA) public data: ResultDialogData
  ) {
    super(dialogRef);
    if (this.data.file != null) {
      this.file = this.data.file;
      this.selectFile(this.file);
    }
  }

  ngOnInit(): void {

  }

  selectFile(item: ResultResponse) {
    this.resultService.downloadFile(item.fileName).subscribe({
      next: value => {
        let blob: Blob = value.body as Blob
        this.src = URL.createObjectURL(blob)
        console.log("src", this.src)
      }
    })
  }
}
