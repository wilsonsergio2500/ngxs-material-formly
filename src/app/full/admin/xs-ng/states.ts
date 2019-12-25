import { PostState } from './posts/posts.state';
import { PageState } from './pages/pages.state';

export function getAdminStates() {
    return [
        PostState,
        PageState
    ]
}
