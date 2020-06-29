import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

export const Router: React.FC = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" render={() => <div>heyy</div>} />
            </Switch>
        </BrowserRouter>
    )
}