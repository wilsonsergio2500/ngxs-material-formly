import { AuthState } from './auth/auth.state';
import { PageState } from './pages/pages.state';
import { getMediaStates } from './media/states';

export function getRootStates() {
    return [
        AuthState,
        PageState,
        ...getMediaStates()
    ]
}
