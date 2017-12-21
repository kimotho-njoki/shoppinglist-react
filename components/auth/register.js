import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import AlertContainer from 'react-alert';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import { styles } from '../../styling';

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
      time: 2000,
    })
  }

// posts user input to the api to register them
  handleSubmit(event) {
    axios.post(
      'https://shopreact.herokuapp.com/auth/register/',
      {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        repassword: this.state.repassword
      }
    ).then(
     (response) => {
      this.msg.success(response.data.message)   
    }
    ).catch(
      (error) => {
          this.msg.error(error.response.data.message)
        }
    )
  }

  render() {
    return(
      <div>
      <AlertContainer ref={a => this.msg = a} {...styles.alertOptions} />
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