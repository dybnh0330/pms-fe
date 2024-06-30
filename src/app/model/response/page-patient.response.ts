import {Sort} from "../pagination/Sort";
import {PageableObject} from "../pagination/PageableObject";
import {PatientModel} from "../patient.model";

export interface PagePatientResponse {
  totalPages?: number;
  totalElements: number;
  size?: number;
  content: PatientModel[];
  number?: number;
  sort?: Sort;
  first?: boolean;
  last?: boolean;
  numberOfElements?: number;
  pageable?: PageableObject;
  empty?: boolean;
}
