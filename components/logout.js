import React from "react";
import {blue700} from 'material-ui/styles/colors';
import { Link } from "react-router-dom";

const styles = {
  link: {
  	color: blue700,
  	backgroundColor: "transparent",
  	textDecoration: 'none',
  	display: 'flex',
  	flexWrap: 'wrap',
  	justifyContent: 'space-around'
  },
  text: {
  	paddingTop: 200,
  	display: 'flex',
  	flexWrap: 'wrap',
  	justifyContent: 'space-around'
  },
};

class LogOut extends React.Component {
	constructor(props) {
		super(props);

		this.handleLogout = this.handleLogout.bind(this);
	};

	handleLogout() {
		localStorage.removeItem('token')
	}

	render() {
		return(
			<div>
				<h2 style={styles.text}> You are now logged out. </h2>
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
