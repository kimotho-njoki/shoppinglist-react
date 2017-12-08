import React from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { styles } from '../../styling';

// presentational component housing the update item form
const UpdateItem = props => (
			<div>
				<AppBar showMenuIconButton={false} title="shoppinglist item update" style={styles.title} />
				<div>
					<TextField
						style={styles.textbox}
						name="newshoppingitemname"
						type="text"
						defaultValue={props.initialValues.newshoppingitemname}
						underlineFocusStyle={styles.text}
			            floatingLabelStyle={styles.text}
			            onChange={props.handleChange} />
			        <br/>
			        <TextField
						style={styles.textbox}
						name="newbudgetedamount"
						type="number"
						min={0}
						defaultValue={props.initialValues.newbudgetedamount}
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
			)

export default UpdateItem;
