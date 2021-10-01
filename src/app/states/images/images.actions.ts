import { IImageFirebaseModel } from "@firebase-schemas/images/image.model";
import { IImagesRemoveRequest } from "./images.model";

export class ImagesLoading {
  static type = '[Images] Set As Working';
}

export class ImagesDone {
  static type = '[Images] Set As Done';
}

export class ImagesCreateRecordAction {
  static type = '[Images] Create Records';
  constructor(public request: IImageFirebaseModel) { }
}

export class ImagesLoadAction {
  static type = '[Images] Load Action';
}

export class ImagesLoadFirstPageAction {
  static type = '[Images] Load First page';
}

export class ImagesLoadNextPageAction {
  static type = '[Images] Load Next Page';
}

export class ImagesLoadPreviousPageAction {
  static type = '[Images] Load Previous Page';
}

export class ImagesRemoveAction {
  static type = '[Images] Remove Image';
  constructor(public request: IImagesRemoveRequest) { }
}

