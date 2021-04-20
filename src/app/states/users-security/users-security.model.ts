import { IFirebasePaginationState } from '../../firebase/types/firabes-pagination';
import { IUserSecurityFirebaseModel } from '../../schemas/users/user.model';

export interface IUsersSecurityStateModel {
    working: boolean;
    userSecurities: IUserSecurityFirebaseModel[];
    size: number;
    paginationState: IFirebasePaginationState<IUserSecurityFirebaseModel>
  }
