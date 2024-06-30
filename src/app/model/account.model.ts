export interface AccountModel {
  id: number;
  username: string;
  status: boolean;
  roleIds: Array<number>;
  roleNames:Array<string>;
  medicalStaffId: number;
  medicalStaffName: string;
  createTime: string;
  updateTime: string;
  createBy: string;
  updateBy: string;
  staffName: string;
}
