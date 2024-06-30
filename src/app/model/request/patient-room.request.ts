import {BedNumberRequest} from "./bed-number.request";

export interface PatientRoomRequest {
  roomNumber: string,
  totalBed: number,
  patientBeds: Array<BedNumberRequest>,
  status: boolean
  departmentId: number;
}
