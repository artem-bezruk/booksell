import {Book} from './book';
export interface SeriesInfo {
    seriesBookCount: number;
    books: Book[];
}
export type SeriesByGroupContainer = Map<string, BookBySeriesContainer>;
export type BookBySeriesContainer = Map<string, SeriesInfo>;
