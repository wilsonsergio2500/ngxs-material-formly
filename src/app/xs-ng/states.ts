import { AuthState } from './auth/auth.state';
import { PageState } from './pages/pages.state';

export function getRootStates() {
    return [
        AuthState,
        PageState
    ]
}
