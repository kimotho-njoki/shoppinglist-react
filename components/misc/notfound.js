import React from "react";
import { Link } from 'react-router-dom';
import { styles } from '../../styling';

const NotFound = () => (
	
		<div>
		<h2 style={styles.nottext}> Oops! This page seems to be missing </h2>
		<h2 align='center'> Head back to <Link to="/" style={styles.link}> Home </Link>                                                                       
		  to Login and continue viewing the amazing features </h2>
		</div>
		
	);

export default NotFound;
