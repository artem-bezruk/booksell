import {RestEntity} from './rest-entity';
export interface Series extends RestEntity {
  seriesBookCount: number;
  displayName: string;
  name?: string;
  editor?: string;
}
