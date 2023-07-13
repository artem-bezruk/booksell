import {of} from 'rxjs';
import fn = jest.fn;
export const bookTypeAdministrationServiceMock = {
  list: of([]),
  getAll: fn(() => {}),
  delete: fn((bookType: any) => {})
}
