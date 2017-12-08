import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import {blue700} from 'material-ui/styles/colors';
import axios from 'axios';

const styles = {
  text: {
    borderColor: blue700,
  },
  back: {
    backgroundColor: blue700
  },
};

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      repassword: ''
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
      'http://127.0.0.1:5000/auth/register/',
      {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        repassword: this.state.repassword
      }
    ).then(
     (response) => {
      alert("Registration successful. Now please LogIn.")        
    }
    ).then(
      (error) => {
          console.log(error)
        }
    )
  }

  render() {
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
             underlineFocusStyle={styles.text}
                 floatingLabelStyle={styles.text}
                 type="password"
                 hintText= "password"
             onChange={this.handleChange} />
          <br/>
          <TextField
             name="repassword"
             underlineFocusStyle={styles.text}
                 floatingLabelStyle={styles.text}
                 type="password"
                 hintText= "password"
             onChange={this.handleChange} />
          <br/>
          <FlatButton 
             style={styles.back} 
             label="Register" 
             onClick={this.handleSubmit} />
        </div>
      </div>
      );
  }

}

export default Register;