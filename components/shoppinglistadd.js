import React from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import {blue700} from 'material-ui/styles/colors';

const styles = {
  text: {
    borderColor: blue700,
  },
  title: {
  	backgroundColor: blue700,
  },
  textbox: {
  	paddingTop: 20,
  },
};

const AddShoppinglist = (props) => {
		return(
			<div>
				<AppBar showMenuIconButton={false} title="shoppinglist create" style={styles.title} />
				<div>
					<TextField 
					  style={styles.textbox}
					  name="shoppinglistname"
					  type="text"
					  hintText="shoppinglist name"
					  underlineFocusStyle={styles.text}
			          floatingLabelStyle={styles.text}
					  onChange={props.handleChange} />
					<br/>
					<FlatButton 
					  style={styles.title}
					  label="Submit"
					  onClick={props.handleSubmit} />
				</div>
			</div>
			);
}

export default AddShoppinglist;
