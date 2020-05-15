import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const Routes = () => {
    
    return (
        <Router>
            <Switch>
                <Route path="/login">
                    <h1>Login</h1>
                </Route>
                <Route path="/auth">
                    <h1>Auth</h1>
                </Route>
                <Route path="/">
                    <h1>Home.</h1>
                </Route>
            </Switch>
        </Router>
    )
}

export default Routes;