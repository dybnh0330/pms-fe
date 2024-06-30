export interface MedicalRecordResponse {
  recordId: number;
  recordCode: string;
  patientId: number;
  patientName: string;
  reason: string;
  medicalHistory: string;
  diagnostic: string;
}
