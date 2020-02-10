import { IFirebasePaginationState } from '../../../firebase/types/firabes-pagination';
import { IImageResizerFirebaseModel } from '../../../schemas/images/image-resizer.model';

export interface IImagesOnResizerStateModel {
    loading: boolean;
    paginationState: IFirebasePaginationState<IImageResizerFirebaseModel>;
    lookUpTags: string[];
    searching: boolean;
  
  }
