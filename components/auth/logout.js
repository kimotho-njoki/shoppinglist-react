import React from "react";
import { Link } from "react-router-dom";
import { styles } from '../../styling';

class LogOut extends React.Component {
	constructor(props) {
		super(props);

		this.handleLogout = this.handleLogout.bind(this);
	}

// method handling removal of access token from local storage
	handleLogout() {
		localStorage.removeItem('token')
	}

	render() {
		return(
			<div>
				<h2 style={styles.logtext}> You are now logged out. </h2>
				<Link 
					to="/"                                                                                                       
					style={styles.link}
					onClick={() => this.handleLogout()} > 
					<h2> Click Me To Visit Us Again. </h2> 
				</Link>                                             
			</div>
		)
	}
} 

export default LogOut;
