export interface StaffRoomResponse {
  roomId: number;
  roomNumber: string;
  departmentId: number;
  medicalStaffIds: Array<number>
  medicalStaffNames: Array<string>;
}
