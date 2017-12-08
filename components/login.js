import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import {blue700} from 'material-ui/styles/colors';
import Dialog from 'material-ui/Dialog';
import axios from 'axios';
import { Redirect, Link } from "react-router-dom";


const styles = {
  text: {
    borderColor: blue700,
  },
  back: {
    backgroundColor: blue700
  },
  p: {
    paddingTop: 20,
    color: blue700
  },
};

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
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    axios.post(
      'http://127.0.0.1:5000/auth/login/',
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
        this.setState({
          isLoggedIn: true
        })
        localStorage.setItem('isLoggedIn', this.state.isLoggedIn)
        console.log("login successful")
      }
    ).then(
      (error) => {
        console.log(error)
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
