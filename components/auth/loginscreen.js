import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';

import Login from "./login";
import Register from "./register";
import ViewShoppinglist from "../shoppinglists/shoppinglistview";
import { styles } from '../../styling';

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.setState({
      slideIndex: value,
    });
  }

  render() {
    return(
      <div>
        <h2 align='center' style={styles.regtext}> 
        <u> Create Your ShoppingList With Ease </u>
        </h2> <br/>
        <p align='center'> 
        Already have an account? Click on <span 
          style={styles.regtext}>Login</span> tab 
        </p>
        <p align='center'> 
        Visiting us for the first time? Click on <span 
          style={styles.regtext}>Register</span> tab to Sign Up
        </p>

        <Tabs style={styles.slide}
          onChange={this.handleChange}
          value={this.state.slideIndex}
        >
          <Tab style={styles.title} label="Login" value={0} />
          <Tab style={styles.title} label="Register" value={1} />
        </Tabs>
        <SwipeableViews 
          index={this.state.slideIndex}
          onChangeIndex={this.handleChange}
        >
          <div style={styles.slide} >
            <Login />
          </div>
          <div style={styles.slide} >
            <Register />
          </div>
        </SwipeableViews>
      </div>
      );
  }

}

export default LoginScreen;