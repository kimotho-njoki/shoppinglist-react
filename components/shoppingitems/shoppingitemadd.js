import React from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { styles } from '../../styling';

const AddItem = props => (
			<div>
				<AppBar showMenuIconButton={false} title="shoppinglist item create" style={styles.title} />
				<div>
					<TextField
						style={styles.textbox}
						name="shoppingitemname"
						type="text"
						hintText="shoppinglist item name"
						underlineFocusStyle={styles.text}
			            floatingLabelStyle={styles.text}
			            onChange={props.handleChange} />
			        <br/>
			        <TextField
						style={styles.textbox}
						name="budgetedamount"
						type="number"
						min={0}
						hintText="budgeted amount"
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

export default AddItem;
