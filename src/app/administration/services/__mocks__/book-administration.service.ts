import {of} from 'rxjs';
import fn = jest.fn;
export const bookAdministrationServiceMock = {
  searchResult: of({}),
  list: of([]),
  getAll: fn(() => {})
}
