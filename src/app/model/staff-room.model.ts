import {MedicalStaffModel} from "./medical-staff.model";

export interface StaffRoomModel {
  roomId: number;
  roomNumber: string;
  staffs: Array<MedicalStaffModel>;
  createTime: string;
  createBy: string;
}
