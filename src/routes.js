import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom"

import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile'

const Routes = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/register" component={Signup} />
                <Route path="/profile" component={Profile}/> 
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;