import {SortOrder} from '../core/model/sort-order.enum';
import {Book} from '../core/model/book';
import {Series} from '../core/model/series';
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
  static getMapKeysAsArray(map: Map<string, any>): string [] {
    return Array.from(map.keys());
  }
  static compareTomes(one: Book, two: Book) {
    if (one.tome && two.tome) {
      return (one.tome < two.tome ? -1 : 1);
    }
    return 0;
  }
  static compareNames(one: Series, two: Series) {
    if (one.name && two.name) {
      return (one.name.toLocaleLowerCase() < two.name.toLocaleLowerCase() ? -1 : 1);
    }
    return 0;
  }
}
