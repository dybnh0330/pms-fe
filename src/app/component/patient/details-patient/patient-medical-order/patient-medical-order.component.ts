import {Component, Input} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-patient-medical-order',
  templateUrl: './patient-medical-order.component.html',
  styleUrls: ['./patient-medical-order.component.scss']
})
export class PatientMedicalOrderComponent {

  @Input() patientId: any;

  constructor(
    public dialogRef: MatDialogRef<typeof self>) {
  }

  close() {
    this.dialogRef.close();
  }
}
