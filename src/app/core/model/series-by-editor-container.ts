import {Book} from './book';
export interface BookBySeriesContainer {
  [series: string]: Book[];
}
export interface SeriesByEditorContainer {
  [editor: string]: BookBySeriesContainer[];
}
