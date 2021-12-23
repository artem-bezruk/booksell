import {AuthorSearch} from './author-search';
export interface BookSearch {
  arkId?: string;
  authors?: Array<AuthorSearch>;
  collection?: string;
  cover?: string;
  editor: string;
  isbn?: string;
  rolesByAuthors?: Array<string>;
  series?: string;
  title: string;
  tome?: string;
  year?: string;
}
