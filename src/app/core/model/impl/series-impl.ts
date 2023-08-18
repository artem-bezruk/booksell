import {Series} from '../series';
export class SeriesImpl implements Series {
  id?: number;
  seriesBookCount: number;
  constructor(public name: string = '', public editor = null, public displayName: string = null) {
    this.id = 0;
    this.seriesBookCount = 0;
    this.displayName = displayName === null ? this.name : displayName;
  }
  static fromSeriesSearch(seriesSearch: string): Series {
    return new SeriesImpl(seriesSearch);
  }
  static fromSeries(series: Series): SeriesImpl {
    const seriesImpl = new SeriesImpl(series.name, series.editor, series.displayName);
    seriesImpl.seriesBookCount = series.seriesBookCount;
    return seriesImpl;
  }
  isOneShot(): boolean {
    return this.name === 'One-shot';
  }
}
