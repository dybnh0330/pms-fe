import {Sort} from "../pagination/Sort";
import {PageableObject} from "../pagination/PageableObject";
import {AccountModel} from "../account.model";

export interface PageAccountResponse {
  totalPages?: number;
  totalElements: number;
  size?: number;
  content: AccountModel[];
  number?: number;
  sort?: Sort;
  first?: boolean;
  last?: boolean;
  numberOfElements?: number;
  pageable?: PageableObject;
  empty?: boolean;
}
