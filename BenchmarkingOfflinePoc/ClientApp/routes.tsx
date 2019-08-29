import * as React from 'react';
import {Route, Switch, Redirect} from 'react-router';
import { hot } from 'react-hot-loader/root'
import {ChannelList} from "./components/Channels";
import {Home} from "./components/Home";
import { Header } from './components/Header';

export const Routes = hot(() => <>
        <Header />
        <Switch>
            <Route exact path={'/'} component={Home} />
            <Route path={'/cases'} component={ChannelList} />
            <Redirect to={'/'} />
        </Switch>
    </>
);

