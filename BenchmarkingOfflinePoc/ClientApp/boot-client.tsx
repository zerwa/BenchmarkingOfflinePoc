import * as React from 'react';
import * as ReactDOM from 'react-dom'
import { createBrowserHistory } from 'history'
import {createRootReducer} from "./reducers/reducer";
import {applyMiddleware, compose, createStore, AnyAction} from "redux";
import {Provider} from 'react-redux';
import {ConnectedRouter, routerMiddleware} from "connected-react-router";
import {Routes} from "./routes";

//polyfills for IE
import './util/polyfills';
import 'es6-promise/auto';

//styles
import 'bootstrap/dist/css/bootstrap.css'
import configureStore from './store/Store';
import { getAllCases } from './actions/CaseActions';
import { getAllSurveyTemplates, getAllSurveyMetrics } from './actions/SurveyActions';

const message: string = "this is the client";
console.log(message);

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("sw.js")
            .then(function (registration) {
                console.log('Service worker successfully registered on scope', registration.scope);
            })
            .catch(function (error) {
                console.log(error);
                console.log('Service workers are not supported.');
            });
    })
}

const history = createBrowserHistory();

//configure store based on https://github.com/supasate/connected-react-router
const store = configureStore(history);
store.dispatch<any>(getAllCases());
store.dispatch<any>(getAllSurveyTemplates());
store.dispatch<any>(getAllSurveyMetrics());

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Routes/>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);
