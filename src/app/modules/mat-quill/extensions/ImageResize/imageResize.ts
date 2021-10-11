import DefaultOptions from './defaultOptions'
import { DisplaySize } from './modules/displaysize';
import { Toolbar } from './modules/Toolbar';
import { Resize } from './modules/Resize';

import * as Quill from 'quill';

export function MergeObject(...args: any[]) {
  const newObj = {};
  for (const obj of args) {
    for (const key in obj) {

      (newObj as any)[key] = obj[key];
    }
  }
  return newObj;
}


const knownModules: any = { DisplaySize, Toolbar, Resize };
/*const knownModules: any = { Resize };*/

/**
 * Custom module for quilljs to allow user to resize <img> elements
 * (Works on Chrome, Edge, Safari and replaces Firefox's native resize behavior) 
 * @see https://quilljs.com/blog/building-a-custom-module/
 */
export class ImageResize {
  quill: any;
  options: any;
  modules: any[];
  moduleClasses: any[];
  img: any;
  overlay: any;


  constructor(quill: Quill.Quill, options: any = {}) {
    // save the quill reference and options
    this.quill = quill;

    // Apply the options to our defaults, and stash them for later
    // defaultsDeep doesn't do arrays as you'd expect, so we'll need to apply the classes array from options separately
    let moduleClasses = false;
    if (options.modules) {
      moduleClasses = options.modules.slice();
    }

    // Apply options to default options
    this.options = MergeObject(options, DefaultOptions); //defaultsDeep({}, options, DefaultOptions);

    // (see above about moduleClasses)
    if (moduleClasses !== false) {
      this.options.modules = moduleClasses;
    }

    // disable native image resizing on firefox
    document.execCommand('enableObjectResizing', false, 'false');

    // respond to clicks inside the editor
    this.quill.root.addEventListener('click', this.handleClick, false);

    this.quill.root.parentNode.style.position = this.quill.root.parentNode.style.position || 'relative';

    // setup modules
    this.moduleClasses = this.options.modules;

    this.modules = [];
  }

  initializeModules = () => {
    this.removeModules();

    this.modules = this.moduleClasses.map(
      ModuleClass => new (knownModules[ModuleClass] || ModuleClass)(this),
    );

    this.modules.forEach(
      (module) => {
        module.onCreate();
      },
    );

    this.onUpdate();
  };

  onUpdate = () => {
    this.repositionElements();
    this.modules.forEach(
      (module) => {
        module.onUpdate();
      },
    );
  };

  removeModules = () => {
    this.modules.forEach(
      (module) => {
        module.onDestroy();
      },
    );

    this.modules = [];
  };

  handleClick = (evt: any) => {
    if (evt.target && evt.target.tagName && evt.target.tagName.toUpperCase() === 'IMG') {
      if (this.img === evt.target) {
        // we are already focused on this image
        return;
      }
      if (this.img) {
        // we were just focused on another image
        this.hide();
      }
      // clicked on an image inside the editor
      this.show(evt.target);
    } else if (this.img) {
      // clicked on a non image
      this.hide();
    }
  };

  show = (img: any) => {
    // keep track of this img element
    this.img = img;

    this.showOverlay();

    this.initializeModules();
  };

  showOverlay = () => {
    if (this.overlay) {
      this.hideOverlay();
    }

    this.quill.setSelection(null);

    // prevent spurious text selection
    this.setUserSelect('none');

    // listen for the image being deleted or moved
    document.addEventListener('keyup', this.checkImage, true);
    this.quill.root.addEventListener('input', this.checkImage, true);

    // Create and add the overlay
    this.overlay = document.createElement('div');
    Object.assign(this.overlay.style, this.options.overlayStyles);

    this.quill.root.parentNode.appendChild(this.overlay);

    this.repositionElements();
  };

  hideOverlay = () => {
    if (!this.overlay) {
      return;
    }

    // Remove the overlay
    this.quill.root.parentNode.removeChild(this.overlay);
    this.overlay = undefined;

    // stop listening for image deletion or movement
    document.removeEventListener('keyup', this.checkImage);
    this.quill.root.removeEventListener('input', this.checkImage);

    // reset user-select
    this.setUserSelect('');
  };

  repositionElements = () => {
    if (!this.overlay || !this.img) {
      return;
    }

    // position the overlay over the image
    const parent = this.quill.root.parentNode;
    const imgRect = this.img.getBoundingClientRect();
    const containerRect = parent.getBoundingClientRect();

    Object.assign(this.overlay.style, {
      left: `${imgRect.left - containerRect.left - 1 + parent.scrollLeft}px`,
      top: `${imgRect.top - containerRect.top + parent.scrollTop}px`,
      width: `${imgRect.width}px`,
      height: `${imgRect.height}px`,
    });
  };

  hide = () => {
    this.hideOverlay();
    this.removeModules();
    this.img = undefined;
  };

  setUserSelect = (value: any) => {
    [
      'userSelect',
      'mozUserSelect',
      'webkitUserSelect',
      'msUserSelect',
    ].forEach((prop) => {
      // set on contenteditable element and <html>
      this.quill.root.style[prop] = value;
      (document as any).documentElement.style[prop] = value;
    });
  };

  checkImage = (evt: any) => {
    if (this.img) {
      if (evt.keyCode == 46 || evt.keyCode == 8) {
        (Quill as any).find(this.img).deleteAt(0);
      }
      this.hide();
    }
  };
}