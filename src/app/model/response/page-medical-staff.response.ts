import {Sort} from "../pagination/Sort";
import {PageableObject} from "../pagination/PageableObject";
import {MedicalStaffModel} from "../medical-staff.model";

export interface PageMedicalStaffResponse {
  totalPages?: number;
  totalElements: number;
  size?: number;
  content: MedicalStaffModel[];
  number?: number;
  sort?: Sort;
  first?: boolean;
  last?: boolean;
  numberOfElements?: number;
  pageable?: PageableObject;
  empty?: boolean;
}
