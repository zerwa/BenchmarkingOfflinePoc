/*  Imports from Redux:
 applyMiddleware: Applies middleware to the dispatch method of the Redux store
 combineReducers: Merges reducers into one
 createStore: Creates a Redux store that holds the state tree
 Store: The TS Type used for the store, or state tree
 */
import { applyMiddleware, combineReducers, createStore, Store, compose } from 'redux';
/*  Thunk
Redux Thunk middleware allows you to write action creators that return a function instead of an action. The thunk can be used to delay the dispatch of an action, or to dispatch only if a certain condition is met. The inner function receives the store methods dispatch and getState as parameters.
*/
import thunk from 'redux-thunk';
import { IAppState } from '../definitions/definitions';
import { routerMiddleware } from 'connected-react-router';
import { History } from "history";
import { createRootReducer } from '../reducers/reducer';
import { offline } from '@redux-offline/redux-offline';
import offlineConfig from '@redux-offline/redux-offline/lib/defaults';
import { OfflineAction } from '@redux-offline/redux-offline/lib/types';
import axios from 'axios';

const effect = (effect: any, _action: OfflineAction) => axios(effect);
const discard = (error: any, _action: OfflineAction, _retries: any) => {
    const { request, response } = error;
    if (!request) throw error; // There was an error creating the request
    if (!response) return false; // There was no response
    return 400 <= response.status && response.status < 500;
};

// Create a configure store function of type `IAppState`
// Configure store based on https://github.com/supasate/connected-react-router
//export default function configureStore(history: History): Store<IAppState> {
//    const store = createStore(createRootReducer(history),
//        compose(
//            applyMiddleware(
//                routerMiddleware(history),
//                thunk
//            ),
//            offline({
//                ...offlineConfig,
//                effect,
//                discard
//            }),
//            (window as any).__REDUX_DEVTOOLS_EXTENSION__ ? (window as any).__REDUX_DEVTOOLS_EXTENSION__() : (f: any) => f
//    ));
//    return store;
//}

export default function configureStore(history: History): Store<IAppState> {
    const store = createStore(createRootReducer(history),
        compose(
            applyMiddleware(
                routerMiddleware(history),
                thunk
            ),
            (window as any).__REDUX_DEVTOOLS_EXTENSION__ ? (window as any).__REDUX_DEVTOOLS_EXTENSION__() : (f: any) => f
        ));
    return store;
}