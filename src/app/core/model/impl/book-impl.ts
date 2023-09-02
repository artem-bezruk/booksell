import {Book} from '../book';
import {Editor} from '../editor';
import {EditorImpl} from './editor-impl';
import {Series} from '../series';
import {SeriesImpl} from './series-impl';
import {Author} from '../author';
import {AuthorImpl} from './author-impl';
import {BookSearch} from '../../../administration/models/book-search';
export class BookImpl implements Book {
  public arkId: string;
  public collection: string;
  public cover: string;
  public isbn: string;
  public tome: string;
  public year: string;
  constructor(
    public title: string = '',
    public bookType: string = null,
    public editor: Editor = new EditorImpl(),
    public series: Series = new SeriesImpl(),
    public authors: Author[] = [],
    public status: Book.StatusEnum = 'UNREAD',
  ) {
  }
  static fromBookSearch(bookSearch: BookSearch): Book {
    const book = new BookImpl(
      bookSearch.title,
      null,
      EditorImpl.fromEditorSearch(bookSearch.editor),
      SeriesImpl.fromSeriesSearch(bookSearch.series),
      bookSearch.authors.map(authorSearch => AuthorImpl.fromAuthorSearch(authorSearch))
    );
    book.arkId = bookSearch.arkId;
    book.collection = bookSearch.collection;
    book.cover = bookSearch.cover;
    book.isbn = bookSearch.isbn;
    book.tome = bookSearch.tome;
    book.year = bookSearch.year;
    return book;
  }
}
