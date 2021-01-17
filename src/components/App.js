import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import Nav from './Nav';
import SignIn from './pages/SignIn';
import Register from './pages/Register';
import Settings from './pages/Settings';
import Dashboard from './pages/Dashboard';
import Chat from './pages/Chat';
import history from '../history';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const App = () => {
    return (
        <div>
            <Router history={history}>
                <div>
                    <Nav />
                    <Switch>
                        <PrivateRoute path="/" exact component={Dashboard} />
                        <PublicRoute path="/sign-in" component={SignIn} />
                        <PublicRoute path="/register" component={Register} />
                        <PrivateRoute path="/settings" component={Settings} />
                        <PrivateRoute path="/chat/:chatId" exact component={Chat} />
                    </Switch>
                </div>
            </Router>
        </div>
    );
};

export default App;
