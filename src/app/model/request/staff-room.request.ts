export interface StaffRoomRequest {
  departmentId?: number;
  roomNumber?: string;
  medicalStaffIds: Array<number>;
}
