import React from 'react';
import SearchBar from 'material-ui-search-bar';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {blue700, redA700} from 'material-ui/styles/colors';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import _ from 'lodash';
import axios from 'axios';
import { Link } from "react-router-dom";

import AddItem from "./shoppingitemadd";
import UpdateItem from "./shoppingitemedit";
import { SearchDisplayItem } from "./searchdisplay";

const styles = {
  text: {
    fontFamily: "verdana",
    fontSize: 19,
    color: blue700
  },
  title: {
  	backgroundColor: blue700,
  },
  del: {
  	backgroundColor: redA700,
  },
  para: {
    borderStyle: "solid",
    borderWidth: "medium",
    borderColor: blue700,
    backgroundColor: blue700,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    fontSize: 18,
    fontWeight: "bold",
  },
  root: {
   	display: 'flex',
  	flexWrap: 'wrap',
  	justifyContent: 'space-around'
  },
  link: {
  	color: blue700,
  	backgroundColor: "transparent",
  	textDecoration: 'none'
  },
  button: {
  	position: 'fixed',
  	bottom: "10%",
  	right: "7%",
  },
  bar: {
  	width: "40%",
  	margin: '1%',
  	position: 'absolute',
  	right: '1%'
  },
  table: {
  	margin: '10% 25% 0 25%',
  	width: '50%',
  	display: 'block',
  	justifyContent: 'center',
  	alignItem: 'center',
  },
};

class ViewItems extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			openEdit: false,
			openAdd: false,
			openDelete: false,
			value: 1,
			shoppingitems: [],
			searchedshoppingitem: []
		};

		this.handleOpen = this.handleOpen.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleEditItemModal = this.handleEditItemModal.bind(this);
		this.handleDeleteItemModal = this.handleDeleteItemModal.bind(this);
		this.handleAddItem = this.handleAddItem.bind(this);
		this.handleEditItem = this.handleEditItem.bind(this);
		this.handleDeleteItem = this.handleDeleteItem.bind(this);
		this.getShoppingItems = this.getShoppingItems.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
		this.handleSearchItem = this.handleSearchItem.bind(this);
	}

	componentWillMount(){
		this.getShoppingItems()
	}

	handleOpen() {
		this.setState({
			openAdd : true
		});
	}

	handleClose() {
		this.setState({
			openEdit: false,
			openAdd: false,
			openDelete: false
		});
	}

	handleSearch(value) {
		this.setState({
			search: value
		});
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
	});
	}

	handleEditItemModal(id, name, budgeted_amount){
		this.setState({
			openEdit : true,
			id: id,
			newbudgetedamount: budgeted_amount,
			newshoppingitemname : name,
		});
	}

	handleDeleteItemModal(id) {
		this.setState({
			openDelete : true,
			id: id
		});
	}

	handleAddItem(event) {
		axios({
			url: `http://127.0.0.1:5000/shoppinglists/${localStorage.getItem('shop_id')}/items`,
			method: 'POST',
			data: {
				name: this.state.shoppingitemname,
				budgeted_amount: this.state.budgetedamount
			},
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`
			},	
		}).then(
			(response) => {
				this.getShoppingItems()
				this.handleClose()
			}
		 ).then(
		 	(error) => {
		 		console.log(error)
		 	}
		 )
	}

	handleEditItem() {
		const { id } = this.state
		axios({
			url: `http://127.0.0.1:5000/shoppinglists/${localStorage.getItem('shop_id')}/items/${id}`,
			method: 'PUT',
			data: {
				name: this.state.newshoppingitemname,
				budgeted_amount: this.state.newbudgetedamount
			},
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`
			},
		}).then(
			(response) => {
				this.getShoppingItems()
				this.handleClose()
			}
		 ).then(
		 	(error) => {
		 		console.log(error)
		 	}
		 )
	}

	handleDeleteItem() {
		const { id } = this.state
		axios({
			url: `http://127.0.0.1:5000/shoppinglists/${localStorage.getItem('shop_id')}/items/${id}`,
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`
			},
		}).then(
			(response) => {
				this.getShoppingItems()
				this.handleClose()
			}
		 ).then(
		 	(error) => {
		 		console.log(error)
		 	}
		 )
	}

	getShoppingItems() {
		axios({
			url: `http://127.0.0.1:5000/shoppinglists/${localStorage.getItem('shop_id')}/items`,
			method: 'GET',
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`
			},
		}).then(
			(response) => {
				this.setState({
					shoppingitems: response.data.shoppingitems
				});
		}).then(
			(error) => {
				console.log(error)
			}
		 )
	}

	handleSearchItem() {
		const { search } = this.state
		axios({
			url:`http://127.0.0.1:5000/shoppinglists/${localStorage.getItem('shop_id')}/items?q=${search}`,
			method: 'GET',
			headers: {Authorization : `Bearer ${localStorage.getItem('token')}`}
		}).then(
			(response) => {
				this.setState({
					searchedshoppingitem: response.data,
				});
			}
		 ).catch(
			(error) => {
				console.log(error)
				this.setState({
					searchedshoppingitem: [],
				});
			}
		)
	}

	renderScreen() {
		const shoppingitemsArr = this.state.shoppingitems
		return (
				<div style={styles.table}>
				<Table 
					selectable={false}
					fixedHeader={true}
					>
					 <TableHeader displaySelectAll={false}>
						<TableRow>
			              <TableHeaderColumn colSpan="4" style={{textAlign: 'center'}}>
			                <p style={styles.text}> Your Shopping Items </p>
			              </TableHeaderColumn>
			            </TableRow>
    				</TableHeader>
    				<TableBody displayRowCheckbox={false} >
		    		
		    		{_.map(shoppingitemsArr, (item) => {
		    			return(
		    					<TableRow key={item.id}> 					
		    					<TableRowColumn style={styles.text}> {item.name} </TableRowColumn>
		    					<TableRowColumn style={styles.text}> {item.budgeted_amount} ksh </TableRowColumn>
		    					<TableRowColumn>
		    						<FlatButton
		    							style={styles.title}
		    						 	label="Edit"
		    						 	onClick={() => this.handleEditItemModal(item.id, item.name, item.budgeted_amount)}
		    						 	disabled={false}
		    						/>
		    					</TableRowColumn>
		    					<TableRowColumn>
		    						<FlatButton
		    							style={styles.del}
		    							label="Delete"
		    							onClick={() => this.handleDeleteItemModal(item.id)}
		    							disabled={false}
		    						/>
		    					</TableRowColumn> 
		    					</TableRow>                                                                                    
		    				)
		    		})}
		    		                                                         
		    		</TableBody>
		    		</Table>  
				</div>
			)
	}

	render() {
		const { newshoppingitemname, newbudgetedamount } = this.state
		const actions = [
			<FlatButton
			  style={styles.text}
			  label="Cancel"
			  primary={true}
			  disabled={false}
			  onClick={this.handleClose}
			/>
		];

		const delActions = [
		    <FlatButton
			  style={styles.text}
			  label="Yes"
			  primary={true}
			  disabled={false}
			  onClick={this.handleDeleteItem}
			/>,
			<FlatButton
			  style={styles.text}
			  label="No"
			  primary={true}
			  disabled={false}
			  onClick={this.handleClose}
			/>,
		];

		return(
			<div>
				<Toolbar>
					<ToolbarGroup >
						<Link to="/" style={styles.link}> <ToolbarTitle text="Home" /> </Link>
					</ToolbarGroup>

					<ToolbarGroup>
						<Link to="/logout" style={styles.link}> <ToolbarTitle text="Logout" /> </Link>
					</ToolbarGroup>
				</Toolbar>

				<FloatingActionButton 
					title="click to create"
					style={styles.button}> 
				   <ContentAdd onClick={this.handleOpen} />    
				</FloatingActionButton>

				<SearchBar
					style={styles.bar}
					onChange={this.handleSearch}
					onRequestSearch={this.handleSearchItem} />

				<Dialog	  
		  			actions={actions}
		  			modal={true}
		  			open={this.state.openAdd} >
		  			<AddItem 
						handleChange={this.handleChange}
						handleSubmit={this.handleAddItem} />
				</Dialog>

				{this.state.search ? 
					<SearchDisplayItem 
						styles={styles}
						data={this.state.searchedshoppingitem}
						handleEditItemModal={this.handleEditItemModal}
						handleDeleteItemModal={this.handleDeleteItemModal}
					/> : 
					this.renderScreen()}

				<Dialog	  
		  			actions={actions}
		 			modal={true}
		  			open={this.state.openEdit} >
		  			<UpdateItem 
		  				initialValues={{ newshoppingitemname, newbudgetedamount }}
						handleChange={this.handleChange}
						handleSubmit={this.handleEditItem} />
				</Dialog>

				<Dialog	 
		  			actions={delActions}
		 			modal={true}
		  			open={this.state.openDelete} >
					<p style={styles.para}> Permanently delete this item? </p>
				</Dialog>
			</div>
		)
	}

}

export default ViewItems;


