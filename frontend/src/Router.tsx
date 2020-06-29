import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

import { Home } from './pages/Home';
import { Register } from './pages/Register';
import { Login } from './pages/Login';

export const Router: React.FC = () => {
    return (
        <BrowserRouter>
        <div>
            <header>
                    <div>
                        <Link to="/">Home</Link>
                    </div>
                    <div>
                        <Link to="/login">Login</Link>
                    </div>
                    <div>
                        <Link to="/register">Register</Link>
                    </div>
            </header>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/login" component={Login} />
                </Switch>
        </div>
            
        </BrowserRouter>
    )
}