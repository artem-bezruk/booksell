import {of} from 'rxjs';
export const statisticServiceMock = {
  searchResult: of({
    booksStatus: [],
    seriesStats: [],
    editorsStats: [],
    bookTypesStats: [],
    recentlyAddedBooks: []
  }),
  getAllStats: jest.fn(() => of())
};
