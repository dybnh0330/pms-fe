import {Sort} from "../pagination/Sort";
import {PageableObject} from "../pagination/PageableObject";
import {CategoryModel} from "../category.model";

export interface PageCategoryResponse {
  totalPages?: number;
  totalElements: number;
  size?: number;
  content: CategoryModel[];
  number?: number;
  sort?: Sort;
  first?: boolean;
  last?: boolean;
  numberOfElements?: number;
  pageable?: PageableObject;
  empty?: boolean;
}
