import {Author} from './author';
import {Editor} from './editor';
import {Series} from './series';
import {RestEntity} from './rest-entity';
export interface Book extends RestEntity {
  arkId?: string;
  authors: Author[];
  collection?: string;
  cover?: string;
  editor: Editor;
  isbn?: string;
  series: Series | null;
  status: Book.StatusEnum;
  title: string;
  tome?: string;
  year?: string;
  bookType: string;
}
export namespace Book {
  export type StatusEnum = 'UNREAD' | 'READ' | 'READING';
  export const StatusEnum = {
    UNREAD: 'UNREAD' as StatusEnum,
    READ: 'READ' as StatusEnum,
    READING: 'READING' as StatusEnum
  };
}
