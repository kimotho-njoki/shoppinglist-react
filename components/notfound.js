import React from "react";
import {blue700} from 'material-ui/styles/colors';
import { Link } from 'react-router-dom';

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

const NotFound = () => (
	
		<div>
		<h2 style={styles.text}> Oops! This page seems to be missing </h2>
		<h2 align='center'> Head back to <Link to="/" style={styles.link}> Home </Link>                                       
		  to Login and continue viewing the amazing features </h2>
		</div>
		
	);

export default NotFound;
