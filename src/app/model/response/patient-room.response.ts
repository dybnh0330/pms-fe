export interface PatientRoomResponse {
  id: number;
  roomCode: string;
  roomNumber: string;
  totalBed: number;
  status: boolean;
  departmentId: number;
  departmentName: string;
  bedIds: Array<string>;
  bedNumbers: Array<string>;
  createTime?: string;
  updateTime?: string;
  createBy?: string
  updateBy?: string;
}
