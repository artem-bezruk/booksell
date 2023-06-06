import {of} from 'rxjs';
export const coreServiceMock = {
  isLoading: of(false),
  updateLoadingState : jest.fn((next: boolean) => {})
}
