import { IFirebasePaginationInMemoryState } from '../../firebase/types/firebase-pagination-inmemory';
import { IPageFirebaseModel } from '../../schemas/pages/page.model';

export interface IPageStateModel {
  loading: boolean;
  paginationState: IFirebasePaginationInMemoryState<IPageFirebaseModel>
  currentPage: IPageFirebaseModel;
  currentId: string;
  selected: IPageFirebaseModel;
  pageFilterByTitle: IPageFirebaseModel[]
}


