export class Utils {
  static orderStringList = (strings: string[], order: 'ASC' | 'DESC' = 'ASC'): string[] => {
    switch (order) {
      case 'DESC':
        strings.sort((one, two) => (one.toLocaleLowerCase() > two.toLocaleLowerCase() ? -1 : 1));
        break;
      case 'ASC':
        strings.sort((one, two) => (one.toLocaleLowerCase() < two.toLocaleLowerCase() ? -1 : 1));
    }
    return strings;
  };
}
