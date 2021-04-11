import { IFirebasePaginationInMemoryState } from '../../firebase/types/firebase-pagination-inmemory';
import { INavigationFirebaseModel } from '../../schemas/navigations/navigation.model';

export interface INavigationStateModel {
    loading: boolean;
    paginationState: IFirebasePaginationInMemoryState<INavigationFirebaseModel>
    current: INavigationFirebaseModel;
  
  }
