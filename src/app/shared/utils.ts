import {SortOrder} from '../core/model/sort-order.enum';
export class Utils {
  static orderStringList(strings: string[], order: SortOrder = SortOrder.DESC): string[] {
    switch (order) {
      case SortOrder.DESC:
        strings.sort((one, two) => (one.toLocaleLowerCase() < two.toLocaleLowerCase() ? -1 : 1));
        break;
      case SortOrder.ASC:
        strings.sort((one, two) => (one.toLocaleLowerCase() > two.toLocaleLowerCase() ? -1 : 1));
    }
    return strings;
  }
  static getMapKeysAsArray(map: Map<string, any>): string []{
    return Array.from(map.keys());
  }
}
