import {of} from 'rxjs';
export const bookDetailsServiceMock = {
  bookToDisplay: of({book: {series: {}, editor: {}}})
};
