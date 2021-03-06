import { IImageResizerFirebaseModel } from '../../../schemas/images/image-resizer.model';
import { IImagesOnResizerRemoveRequest } from './images-on-resizer.model';

export class ImagesOnResizerLoadingAction {
  static type = '[Images On Resizer] Set As Working';
}

export class ImagesOnResizerDoneAction {
  static type = '[Images On Resizer] Set As Done';
}

export class ImagesOnResizerCreateAction {
    static type = '[Images On Resizer] Create';
    constructor(public request: IImageResizerFirebaseModel) { }
}

export class ImagesOnResizerLoadAction {
    static type = '[Images On Resizer] Load';
}
export class ImagesOnResizerFirstPageAction {
    static type = '[Images On Resizer] Load first page';
}

export class ImagesOnResizerNextPageAction {
    static type = '[Images On Resizer] Load next page';
}

export class ImagesOnResizerPreviousPageAction {
    static type = '[Images On Resizer] Load previous page';
}

export class ImagesOnResizerLookupTagChangeAction {
    static type = '[Images On Resizer] Add LookUp Tags';
    constructor(public tags: string[]) { }
}

export class ImagesOnResizerSetAsSearchingAction {
    static type = '[Images On Resizer] Set As Searching';
}

export class ImagesOnResizerSetSearchingAsDoneAction {
    static type = '[Images On Resizer] Set Searching As Done';
}

export class ImagesOnResizerSearchAction {
    static type = '[Images On Resizer] Search';
}

export class ImagesOnResizerRemoveImageAction {
    static type = '[Images On Resizer] Remove Image';
    constructor(public request: IImagesOnResizerRemoveRequest) { }
}



