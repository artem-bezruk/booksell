import {BookSearch} from '../book-search';
import {Book} from '../../../core/model/book';
import {AuthorImpl} from '../../../core/model/impl/author-impl';
import {SeriesImpl} from '../../../core/model/impl/series-impl';
export class BookMapper {
  static mapBook(bookSearch: BookSearch, bookType: string): Book {
    return {
      arkId: bookSearch.arkId,
      authors: bookSearch.authors.map(a => AuthorImpl.fromAuthorSearch(a)),
      collection: bookSearch.collection,
      cover: bookSearch.cover,
      editor: {name: bookSearch.editor},
      isbn: bookSearch.isbn,
      title: bookSearch.title,
      series: new SeriesImpl(bookSearch.series, bookSearch.editor),
      tome: bookSearch.tome,
      year: bookSearch.year,
      status: 'UNREAD',
      bookType
    };
  }
}
