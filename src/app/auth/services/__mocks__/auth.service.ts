import {of} from 'rxjs';
export const authServiceMock = {
  isAuthenticated: jest.fn(() => of(false))
}
