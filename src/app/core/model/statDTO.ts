import { BookStatDTO } from './bookStatDTO';
import { BookTypeStatDTO } from './bookTypeStatDTO';
import { EditorStatDTO } from './editorStatDTO';
import { SeriesStatDTO } from './seriesStatDTO';
import {Book} from './book';
export interface StatDTO {
    bookTypes?: BookTypeStatDTO;
    books?: BookStatDTO;
    editors?: EditorStatDTO;
    series?: SeriesStatDTO;
    recentlyAdded: Book[];
}
