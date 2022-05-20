import {Book} from './book';
export interface SeriesInfo {
    seriesBookCount: number;
    books: Book[];
}
export interface BookBySeriesContainer {
  [series: string]: SeriesInfo;
}
export interface SeriesByGroupContainer {
  [group: string]: BookBySeriesContainer[];
}
