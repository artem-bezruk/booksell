import {of} from 'rxjs';
export const bookTypeServiceMock = {
  getAllBookType : jest.fn(() => []),
  bookTypes : of([])
}
