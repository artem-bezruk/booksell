import {of} from 'rxjs';
import fn = jest.fn;
export const seriesAdministrationServiceMock = {
  list: of([]),
  getAll: fn(() => {})
}
