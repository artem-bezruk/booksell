import {Author} from './author';
import {Editor} from './editor';
export interface Book {
  arkId?: string;
  authors?: Array<Author>;
  collection?: string;
  cover?: string;
  editor: Editor;
  id?: number;
  isbn?: string;
  series?: string;
  status?: Book.StatusEnum;
  title: string;
  tome?: string;
  year?: string;
}
export namespace Book {
  export type StatusEnum = 'UNREAD' | 'READ' | 'READING';
  export const StatusEnum = {
    UNREAD: 'UNREAD' as StatusEnum,
    READ: 'READ' as StatusEnum,
    READING: 'READING' as StatusEnum
  };
}
