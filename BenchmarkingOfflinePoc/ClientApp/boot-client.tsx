import * as React from 'react';
import * as ReactDOM from 'react-dom'
import { createBrowserHistory } from 'history'
import {createRootReducer} from "./reducers/reducer";
import {applyMiddleware, compose, createStore} from "redux";
import {Provider} from 'react-redux';
import {ConnectedRouter, routerMiddleware} from "connected-react-router";
import {Routes} from "./routes";

//polyfills for IE
import './util/polyfills';
import 'es6-promise/auto';

//styles
import 'bootstrap/dist/css/bootstrap.css'

const message: string = "this is the client";
console.log(message);

const history = createBrowserHistory();

//configure store based on https://github.com/supasate/connected-react-router
const store = createStore(
    createRootReducer(history),
    compose(
        applyMiddleware(
            routerMiddleware(history)
        ),
        (window as any).__REDUX_DEVTOOLS_EXTENSION__ ? (window as any).__REDUX_DEVTOOLS_EXTENSION__() : (f: any) => f
    )
);

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("dist/sw.js")
            .catch(function () {
                console.info('Service workers are not supported.');
            });
    })
}

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Routes/>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);
