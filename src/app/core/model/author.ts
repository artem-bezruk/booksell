import {RestEntity} from './rest-entity';
export interface Author extends RestEntity {
  name: string;
  role: Array<string>;
}
