import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import { blue700 } from 'material-ui/styles/colors';

import Login from "./login";
import Register from "./register";
import ViewShoppinglist from "./shoppinglistview";

const styles = {
  title: {
    backgroundColor: blue700,
  },
  slide: {
    paddingTop: 70,
    paddingLeft: 370,
    paddingRight: 370,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  text: {
    color: blue700,
  },
};

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
        <h2 align='center' style={styles.text}> 
        <u> Create Your ShoppingList With Ease </u>
        </h2> <br/>
        <p align='center'> 
        Already have an account? Click on <span 
          style={styles.text}>Login</span> tab 
        </p>
        <p align='center'> 
        Visiting us for the first time? Click on <span 
          style={styles.text}>Register</span> tab to Sign Up
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