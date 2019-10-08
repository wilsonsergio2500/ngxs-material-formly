import { AuthenticatedGuard } from './auth.guard';
export function getRootGuards() {
    return [
        AuthenticatedGuard
    ]
}
