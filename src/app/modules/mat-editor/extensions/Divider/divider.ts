import * as Quill from 'quill';

const BlockEmbed = Quill.import('blots/block/embed');

export class DividerBlot extends BlockEmbed {
  static blotName = 'divider';
  static tagName = 'hr';
}
