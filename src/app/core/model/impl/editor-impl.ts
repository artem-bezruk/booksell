import {Editor} from '../editor';
export class EditorImpl implements Editor {
  constructor(
    public name: string = ''
  ) {
  }
  static fromEditorSearch(editorSearch: string): Editor {
    return new EditorImpl(editorSearch);
  }
}
