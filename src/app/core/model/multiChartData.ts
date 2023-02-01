import {SimpleChartData} from './simpleChartData';
export interface MultiChartData {
  name?: string;
  series?: Array<SimpleChartData>;
}
