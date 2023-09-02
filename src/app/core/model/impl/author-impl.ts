import {Author} from '../author';
import {AuthorSearch} from '../../../administration/models/author-search';
export class AuthorImpl implements Author {
  constructor(
    public name: string = '',
    public role: string[] = []) {
  }
  static fromAuthorSearch(authorSearch: AuthorSearch): Author {
    return new AuthorImpl(
      authorSearch.name,
      authorSearch.role
    );
  }
}
