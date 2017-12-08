import React from "react";
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";

import LoginScreen from "./components/loginscreen";
import ViewShoppinglist from "./components/shoppinglistview";
import ViewItems from "./components/shoppingitemview";
import Reset from "./components/passwordreset";
import NotFound from "./components/notfound";
import LogOut from "./components/logout";
import { isAuthenticated } from "./helper";


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
