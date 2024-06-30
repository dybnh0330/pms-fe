import {Sort} from "./Sort";

export interface PageableObject {
  offset?: number;
  sort?: Sort;
  pageNumber?: number;
  pageSize?: number;
  unpaged?: boolean;
  paged?: boolean;
}
