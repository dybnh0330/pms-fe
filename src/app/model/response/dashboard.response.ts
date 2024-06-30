import {StaffPerDepartmentResponse} from "./staff-per-department.response";

export interface DashboardResponse {
  countPatient: number;
  countMedicalStaff: number;
  countDepartment: number;
  countAccount: number;
  patientBeingTreated: number;
  patientBeenDischarged: number;
  percentBeingTreated: number;
  percentBeenDischarged: number;
  staffPerDepartments: Array<StaffPerDepartmentResponse>;
}
