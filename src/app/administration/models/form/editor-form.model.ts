import {FormControl} from '@angular/forms';
import {Editor} from '../../../core/model/editor';
export class EditorForm {
  name = new FormControl();
  constructor(
    editor: Editor = null
  ) {
    if (editor.name) {
      this.name.setValue(editor.name);
    }
  }
}
