import React from "react";
import ReactDOM from "react-dom";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import LoginScreen from "./components/loginscreen";
import ViewShoppinglist from "./components/shoppinglistview";

class App extends React.Component {
	render() {
		return (
			<div>
				<ViewShoppinglist />		
			</div>
			);
	}
}

ReactDOM.render(<MuiThemeProvider>
			<App />
			</MuiThemeProvider>, document.getElementById('app'));
