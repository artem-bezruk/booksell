import { BookStatDTO } from './bookStatDTO';
import { BookTypeStatDTO } from './bookTypeStatDTO';
import { EditorStatDTO } from './editorStatDTO';
import { SeriesStatDTO } from './seriesStatDTO';
export interface StatDTO { 
    bookTypes?: BookTypeStatDTO;
    books?: BookStatDTO;
    editors?: EditorStatDTO;
    series?: SeriesStatDTO;
}
