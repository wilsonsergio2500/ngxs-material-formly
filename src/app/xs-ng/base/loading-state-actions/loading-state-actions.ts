import { Select, StateContext } from '@ngxs/store';

export interface ILoadingStateAction {
    loading: boolean;
}

export abstract class LoadingStateActions<T extends ILoadingStateAction> {

    @Select()
    static getIsLoading(state: ILoadingStateAction) {
        return state.loading;
    }

    onSetAsLoading(ctx: StateContext<T>) {
        const state = <T>{ loading: true };
        ctx.patchState(state);
    }

    onSetAsDone(ctx: StateContext<T>) {
        const state = <T>{ loading: false };
        ctx.patchState(state);
    }

    public abstract OnLoading(ctx: StateContext<T>);
    public abstract OnDone(ctx: StateContext<T>);
}
