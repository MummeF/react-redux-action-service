export interface Action<T extends BasicAction, R> {
    type: string;
    actionCreater(...params: any[]): T;
    dispatchAction(state: R, action: T): R;
}


export interface BasicAction {
    type: string;
}
