export interface PatientAdmissionResponse {
  id:number;
  patientName:string;
  gender: number;
  dob: string;
  address:string;
  medicalHistory: string;
  reason: string;
  admissionTime: string;
}
