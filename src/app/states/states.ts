import { AuthState } from './auth/auth.state';
import { PageState } from './pages/pages.state';
import { getMediaStates } from './media/states';
import { NavigationState } from './navigation/navigation.state';
import { UsersState } from './users/users.state';
import { UsersSecurityState } from './users-security/users-security.state';
import { PostState } from './posts/posts.state';

export function getRootStates() {
  return [
    AuthState,
    PageState,
    ...getMediaStates(),
    NavigationState,
    UsersState,
    UsersSecurityState,
    PostState
  ]
}
