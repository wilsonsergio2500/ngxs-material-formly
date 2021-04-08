import { IFireBaseEntity } from '../../firebase/types/firebase-entity';

export interface IUserFirebaseModel extends IFireBaseEntity {
    name: string;
    lastName: string;
    email: string;
    pic: string;
    bio: string;
}

export interface IUserSecurityFirebaseModel extends IFireBaseEntity, ISecurityTypeInUserSecurityFirebaseModel  {
    email: string; 

}

export interface ISecurityTypeInUserSecurityFirebaseModel {
    superuser: boolean;
    admin: boolean;
    editor: boolean;
    blogger: boolean;
    moderator: boolean;
}
