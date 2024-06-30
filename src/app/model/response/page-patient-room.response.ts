import {Sort} from "../pagination/Sort";
import {PageableObject} from "../pagination/PageableObject";
import {PatientRoomResponse} from "./patient-room.response";

export interface PagePatientRoomResponse {
  totalPages?: number;
  totalElements: number;
  size?: number;
  content: PatientRoomResponse[];
  number?: number;
  sort?: Sort;
  first?: boolean;
  last?: boolean;
  numberOfElements?: number;
  pageable?: PageableObject;
  empty?: boolean;
}
