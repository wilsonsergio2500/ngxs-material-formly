import { IFirebasePaginationState } from "../../firebase/types/firabes-pagination";
import { IImageFirebaseModel } from "@firebase-schemas/images/image.model";

export interface IImagesStateModel {
  loading: boolean;
  paginationState: IFirebasePaginationState<IImageFirebaseModel>;
}

export interface IImagesRemoveRequest {
  id: string;
  path: string;
}
