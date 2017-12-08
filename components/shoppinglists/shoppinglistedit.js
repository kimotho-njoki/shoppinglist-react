import React from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { styles } from '../../styling';

const EditShoppinglist = props => (
			<div>
				<AppBar showMenuIconButton={false} title="shoppinglist update" style={styles.title} />
				<div>
					<TextField
					  style={styles.textbox}
					  name= "newshoppinglistname"
					  type="text"
					  defaultValue={props.initialValue}
					  underlineFocusStyle={styles.text}
			          floatingLabelStyle={styles.text}
			          onChange={props.handleChange}
					   />
					<br/>
					<FlatButton
					  style={styles.title}
					  label="Submit"
					  onClick={props.handleSubmit}
					   />
				</div>
			</div>
			)

export default EditShoppinglist;
