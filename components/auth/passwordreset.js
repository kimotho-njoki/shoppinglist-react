import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import AlertContainer from 'react-alert';
import { Tabs, Tab } from 'material-ui/Tabs';
import AppBar from 'material-ui/AppBar';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import axios from 'axios';
import { Link, Redirect } from "react-router-dom";
import { styles } from '../../styling';

class Reset extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      isReset: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showAlert = this.showAlert.bind(this);
  }

// method for handling change in state once user inputs a value
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

// handles react alert messages
  showAlert() {
    this.msg.show('message', {
      time: 2000
    })
  }

// method for handling password update by connecting to API
  handleSubmit(event) {
    axios({
      url: 'http://127.0.0.1:5000/auth/reset',
      method: 'PUT',
      data:
      {
        email: this.state.email,
        password: this.state.password
      },
    }).then(
      (response) => {
        this.setState({
        	isReset: true
        })
      }
    ).catch(
      (error) => {
        this.msg.error(error.response.data.message)
      }
    )
  }


  render() {
  	if(this.state.isReset){
  		return(
  		<Redirect to="/" />
  		)
  	}
  	return(
  			<div style={styles.container}>
				<AppBar title="Password Reset" style={styles.appbar} showMenuIconButton={false} />
        <AlertContainer ref={a => this.msg = a} style={styles.alertOPtions} />
				<p align='center' style={styles.resettext}> Please provide a valid email to be able to reset your password </p>
				<p align='center' style={styles.resettext}> Upon successful Reset you will be redirected to Login page </p>
				<br/><br/><br/><br/><br/><br/>
				<TextField 
					paddingLeft='50%'
            		name="email"
            		underlineFocusStyle={styles.resettext}
            		floatingLabelStyle={styles.resettext}
            		type="email"
           	 		hintText= "your email"
            		onChange={this.handleChange} />
            	<br/><br/>
            	<TextField 
            		name="password"
            		underlineFocusStyle={styles.resettext}
            		floatingLabelStyle={styles.resettext}
            		type="password"
            		hintText= "new password"
            		onChange={this.handleChange} />
            	<br/><br/>
            	<FlatButton 
             		style={styles.back} 
             		label="Submit" 
             		onClick={this.handleSubmit} /><br/><br/><br/>
              <p > Head Back <Link to="/" style={styles.resetlink}> Home </Link> </p>                                                         
			</div>
			);
		}
}

export default Reset;
