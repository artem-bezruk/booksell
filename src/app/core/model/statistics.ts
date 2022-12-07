import { MultiChartData } from './multiChartData';
import { SimpleChartData } from './simpleChartData';
import {Book} from './book';
export interface Statistics {
    booksStatus?: Array<SimpleChartData>;
    seriesStats?: Array<MultiChartData>;
    editorsStats?: Array<SimpleChartData>;
    bookTypesStats?: Array<SimpleChartData>;
    recentlyAddedBooks?: Array<Book>;
}
