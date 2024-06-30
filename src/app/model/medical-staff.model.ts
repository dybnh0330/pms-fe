export interface MedicalStaffModel {
  id: number;
  name: string;
  gender: number;
  dob: string;
  certificate: string;
  specialize: string;
  address: string;
  cccd: string;
  phoneNumber: string;
  email: string;
  createTime?: string;
  updateTime?: string;
  createBy?: string;
  updateBy?: string;
  departmentId: number;
  departmentName: string;
}
