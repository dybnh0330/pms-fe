export interface MedicalOrderDetailResponse {
  id: number;
  orderName: string;
  unit: string;
  note: string;
  type: string;
  quantity: number;
  createTime: string;
  createBy: string;
}
