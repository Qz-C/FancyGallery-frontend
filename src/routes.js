import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom"

import Login from './pages/Login';
import Signup from './pages/Signup';

const Routes = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/register" component={Signup} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;