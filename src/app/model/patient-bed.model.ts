export interface PatientBedModel {
  id: number;
  bedCode: string;
  bedNumber: string;
  roomId: number;
  status: boolean;
  createTime?: string;
  updateTime?: string;
  createBy?:string;
  updateBy?:string;
}
