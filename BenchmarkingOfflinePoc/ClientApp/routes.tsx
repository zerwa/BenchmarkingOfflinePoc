import * as React from 'react';
import {Route, Switch, Redirect} from 'react-router';
import { hot } from 'react-hot-loader/root'
import CaseList from "./components/CaseList";
import {Home} from "./components/Home";
import { Header } from './components/Header';
import { CaseUpload } from './components/CaseUpload';

export const Routes = hot(() => 
    <>
        <Header />
        <Switch>
            <Route exact path={'/'} component={Home} />
            <Route exact path={'/cases'} component={CaseList} />
            <Route path={'/cases/:caseId/upload'} component={CaseUpload} />
            <Redirect to={'/'} />
        </Switch>
    </>
);

