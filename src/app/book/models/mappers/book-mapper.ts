import {BookSearch} from '../book-search';
import {Book} from '../book';
export class BookMapper {
  static mapBook(bookSearch: BookSearch): Book {
    return {
      arkId: bookSearch.arkId,
      authors: bookSearch.authors,
      collection: bookSearch.collection,
      cover: bookSearch.cover,
      editor: {name: bookSearch.editor},
      isbn: bookSearch.isbn,
      title: bookSearch.title,
      series: bookSearch.series,
      tome: bookSearch.tome,
      year: bookSearch.year,
      status: 'UNREAD',
    };
  }
}
