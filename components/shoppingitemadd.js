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

class AddItem extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
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
			            onChange={this.props.handleChange} />
			        <br/>
			        <TextField
						style={styles.textbox}
						name="budgetedamount"
						type="number"
						min={0}
						hintText="budgeted amount"
						underlineFocusStyle={styles.text}
			            floatingLabelStyle={styles.text}
			            onChange={this.props.handleChange} />
			        <br/>
			        <FlatButton
			        	style={styles.title}
			        	label="Submit"
			        	onClick={this.props.handleSubmit} />
				</div> 
			</div>
			);
	}
}

export default AddItem;
