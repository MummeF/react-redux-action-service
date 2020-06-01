import { Action, BasicAction } from "./Model";
import { Provider } from "react-redux";
import { Store, createStore, Reducer } from "redux";
import React from "react";


export class ReduxRepository<T> {
    private actions: Action<BasicAction, T>[];
    private initialState: T;
    constructor(actions: Action<BasicAction, T>[], initialState: T) {
        this.actions = actions;
        this.initialState = initialState;
    }

    getActionCreater(type: string): (() => (BasicAction)) | undefined {
        for (let action of this.actions) {
            if (action.type === type) {
                return action.actionCreater;
            }
        }
        return undefined;
    }

    createAction(type: string, ...params: any): BasicAction | undefined {
        for (let action of this.actions) {
            if (action.type === type) {
                return action.actionCreater(...params);
            }
        }
        return undefined;
    }

    createReducer(state: T = this.initialState, action: BasicAction): T {
        for (let possibleAction of this.actions) {
            if (possibleAction.type === action.type) {
                return possibleAction.dispatchAction(state, action);
            }
        }
        return state;
    }
    exportReducer(): Reducer<T, BasicAction> {
        return this.createReducer.bind(this);
    }
    exportStore(): Store {
        return createStore(this.exportReducer());
    }

    useProvider(children: JSX.Element): JSX.Element {
        return <Provider store={this.exportStore()}> {children} </Provider>
    }

}