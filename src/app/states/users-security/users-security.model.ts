import { IFirebasePaginationState } from '../../firebase/types/firabes-pagination';
import { IUserSecurityFirebaseModel } from '../../schemas/users/user.model';

export interface IUsersSecurityStateModel {
  working: boolean;
  updating: boolean;
  userSecurities: IUserSecurityFirebaseModel[];
  size: number;
  paginationState: IFirebasePaginationState<IUserSecurityFirebaseModel>;

}

export interface IUsersSecurityTogglesOnly {
  admin?: boolean;
  editor?: boolean;
  blogger?: boolean;
  Id?: string;
}
