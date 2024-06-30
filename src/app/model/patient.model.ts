export interface PatientModel {
  id: number;
  patientCode: string;
  patientName: string;
  gender: number;
  address: string;
  dob: string;
  bhytCode: string;
  cccdNumber: string;
  patientPhone: string;
  guardianPhone: string;
  status: number;
  createTime: string;
  departmentId: number;
  departmentName: string;
  medicalStaffId: number;
  medicalStaffName: string;
  roomId: number;
  roomNumber: string;
  bedNumber: string;
  updateBy?: string;
  createBy?: string;
  updateTime?: string;
  dischargeTime?: string;
}
