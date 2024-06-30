export interface MedicalOrderDetailsRequest {
  medicalOrderId: number;
  categoryId?: number;
  note: string;
  type: number;
  unit: string;
  quantity: number;
}
