import React from "react";
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";

import LoginScreen from "./components/auth/loginscreen";
import ViewShoppinglist from "./components/shoppinglists/shoppinglistview";
import ViewItems from "./components/shoppingitems/shoppingitemview";
import Reset from "./components/auth/passwordreset";
import NotFound from "./components/misc/notfound";
import LogOut from "./components/auth/logout";
import { isAuthenticated } from "./components/auth/helper";

// with a PrivateRoute a user can only navigate to a certain page only if they are logged in
const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        isAuthenticated ? (
            <Component {...props} />
            ) : (
              <Redirect to={{
                pathname:'/',
                state: {from: props.location}
              }}/>
            ) 
        )}/>
    )

// presentational component handling routes matching different components
const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={LoginScreen} />
            <PrivateRoute path="/shoppinglists" component={ViewShoppinglist} />                                                                                      
            <PrivateRoute path="/items" component={ViewItems} />
            <Route path="/reset" component={Reset} />                                                                                                                  
            <PrivateRoute path="/logout" component={LogOut} />                                                                  
            <Route path="*" component={NotFound} />
        </Switch>
    </BrowserRouter>
    )

export default Routes;