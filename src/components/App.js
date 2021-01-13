import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import Nav from './Nav';
import SignIn from './pages/SignIn';
import Register from './pages/Register';
import Settings from './pages/Settings';
import Dashboard from './pages/Dashboard';
import Chat from './pages/Chat';
import history from '../history';

const App = () => {
    return (
        <div>
            <Router history={history}>
                <div>
                    <Nav />
                    <Switch>
                        <Route path="/" exact component={Dashboard} />
                        <Route path="/sign-in" component={SignIn} />
                        <Route path="/register" component={Register} />
                        <Route path="/settings" component={Settings} />
                        <Route path="/chat/:chatId" exact component={Chat} />
                    </Switch>
                </div>
            </Router>
        </div>
    );
};

export default App;
