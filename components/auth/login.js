import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import AlertContainer from 'react-alert';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import axios from 'axios';
import { Redirect, Link } from "react-router-dom";
import { styles } from '../../styling';

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      isLoggedIn: false
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

// posts user input to the api to log them in
  handleSubmit(event) {
    axios.post(
      'https://shopreact.herokuapp.com/auth/login/',
      {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password
      }
    ).then(
      (response) => {
        const token = response.data.access_token
        localStorage.setItem('token', token)
        const id = response.data.user_id
        localStorage.setItem('id', id)
        const username = response.data.username
        localStorage.setItem('username', username)
        this.setState({
          isLoggedIn: true
        })
        localStorage.setItem('isLoggedIn', this.state.isLoggedIn)
      }
    ).catch(
      (error) => {
        this.msg.error(error.response.data.message)
      }
    )
  }

  render() {
    if(this.state.isLoggedIn){
      return (
        <Redirect to="/shoppinglists" />
        )
    }

    return(
      <div>
          <AlertContainer ref={a => this.msg = a} style={styles.alertOPtions} />
          <div>
          <TextField 
            name="username"
            underlineFocusStyle={styles.text}
            floatingLabelStyle={styles.text}
            type="text"
            hintText= "username"
            onChange={this.handleChange} />
          <br/>
          <TextField 
            name="email"
            underlineFocusStyle={styles.text}
            floatingLabelStyle={styles.text}
            type="email"
            hintText= "email"
            onChange={this.handleChange} />
          <br/>
          <TextField
            name="password"
            type="password"
            underlineFocusStyle={styles.text}
            floatingLabelStyle={styles.text}
            hintText= "password" 
            onChange={this.handleChange} />
          <br/>
          <FlatButton 
             style={styles.back} 
             label="login" 
             onClick={this.handleSubmit} />
          </div>
          <p> Lost Your Password? <Link to='/reset' style={styles.p}> Reset Password </Link></p>
      </div>
      );
  }
}

export default Login;
