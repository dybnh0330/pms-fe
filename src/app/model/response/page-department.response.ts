import {DepartmentModel} from "../department.model";
import {Sort} from "../pagination/Sort";
import {PageableObject} from "../pagination/PageableObject";

export interface PageDepartmentResponse {
  totalPages?: number;
  totalElements: number;
  size?: number;
  content: DepartmentModel[];
  number?: number;
  sort?: Sort;
  first?: boolean;
  last?: boolean;
  numberOfElements?: number;
  pageable?: PageableObject;
  empty?: boolean;

}
