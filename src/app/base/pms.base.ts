import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Component, Inject} from "@angular/core";

export interface DialogAction {
  close(): void;
}
export interface BaseAddOrUpdateDialogData {
  isCreate: boolean;
  isCategoryType: boolean;
}

@Component({
  template: ``,
})
export class BaseDialogComponent implements DialogAction {
  constructor(public dialogRef: MatDialogRef<typeof self>) {}

  close(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: "app-base-add-or-update-dialog",
  template: ``,
  styles: [],
})
export class BaseAddOrUpdateDialogComponent<T> extends BaseDialogComponent {
  constructor(
    public override dialogRef: MatDialogRef<typeof self>,
    @Inject(MAT_DIALOG_DATA) public data: T
  ) {
    super(dialogRef);
  }
}
