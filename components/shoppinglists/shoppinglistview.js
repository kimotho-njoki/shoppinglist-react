import React from 'react';
import SearchBar from 'material-ui-search-bar';
import AlertContainer from 'react-alert';
import {GridList, GridTile} from 'material-ui/GridList';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { styles } from '../../styling';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import _ from 'lodash';
import { Redirect, Link } from "react-router-dom";
import axios from 'axios';

import EditShoppinglist from "./shoppinglistedit";
import AddShoppinglist from "./shoppinglistadd";
import { SearchDisplay } from "../misc/searchdisplay";

class ViewShoppinglist extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			openEdit: false,
			openAdd: false,
			openDelete: false,
			value: 1,
			redirect: false,
			shoppinglists : [],
			searchedshoppinglist: []
		};

		this.handleOpen = this.handleOpen.bind(this);
		this.handleEdit = this.handleEdit.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleAdd = this.handleAdd.bind(this);
		this.handleDropDown = this.handleDropDown.bind(this);
		this.handleRedirect = this.handleRedirect.bind(this);
		this.handleEditModal = this.handleEditModal.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
		this.handleSearchList = this.handleSearchList.bind(this);
		this.showAlert = this.showAlert.bind(this);
	}

	componentWillMount(){
		this.getShoppinglists()
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

	showAlert() {
		this.msg.show('message', {
			time: 2000
		})
	}

	handleRedirect(id) {
		localStorage.setItem('shop_id', id)
		this.setState({
			redirect: true
		})
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
	});
	}

	handleEditModal(id, name) {
		this.setState({
			openEdit : true,
			id: id,
			newshoppinglistname : name
		});
	}

	handleDeleteModal(id) {
		this.setState({
			openDelete : true,
			id: id
		});
	}

	handleAdd(event) {
		axios({
			url :'http://127.0.0.1:5000/shoppinglists/',
			method : 'POST',
			data : {
				name: this.state.shoppinglistname
			},
			headers : {
				Authorization : `Bearer ${localStorage.getItem('token')}`
			},
		}).then(
		  (response) => {
		  	console.log(response.data)
		  	const id = response.data.list_id
		  	localStorage.setItem('id', id)
		  	this.getShoppinglists()
		  	this.handleClose()
		  	this.msg.success("shoppinglist created")
		  }
		).catch(
		  (error) => {
		  	this.msg.error(error.response.data.message)
		  }
		)
	}

	handleEdit() {
		const { id } = this.state
		axios({
			url:`http://127.0.0.1:5000/shoppinglists/${id}`,
			data : {
				name : this.state.newshoppinglistname
			},
			method: 'PUT',
			headers: {Authorization : `Bearer ${localStorage.getItem('token')}`}
		}).then((response) => {
			this.getShoppinglists()
			this.handleClose()
			this.msg.success("shoppinglist updated")
		}).catch(
		(error) => {
			this.msg.error(error.response.data.message)
			}
		)
	}

	handleDelete() {
		const { id } = this.state
		axios({
			url:`http://127.0.0.1:5000/shoppinglists/${id}`,
			method: 'DELETE',
			headers: {Authorization : `Bearer ${localStorage.getItem('token')}`}
		}).then((response) => {
			this.getShoppinglists()
			this.handleClose()
			this.msg.success("shoppinglist deleted")
		}).catch(
		(error) => {
			this.msg.error(error.response.data.message)
			}
		)
	}

	getShoppinglists() {
		axios({
			url :'http://127.0.0.1:5000/shoppinglists/',
			method: 'GET',
			headers: {Authorization : `Bearer ${localStorage.getItem('token')}`}
		}).then((response) => {
			this.setState({
				shoppinglists: response.data.shoppinglists
			});
		}).catch(
		(error) => {
			this.msg.error(error.response.data.message)
		  }
		)
	}

	handleSearchList() {
		const { search } = this.state
		axios({
			url:`http://127.0.0.1:5000/shoppinglists/?q=${search}`,
			method: 'GET',
			headers: {Authorization : `Bearer ${localStorage.getItem('token')}`}
		}).then(
			(response) => {
				this.setState({
					searchedshoppinglist: response.data,
				});
			}
		 ).catch(
			(error) => {
				console.log(error)
				this.setState({
					searchedshoppinglist: [],
				});
				this.msg.error('Shoppinglist does not exist')
			}
		)
	}

	handleDropDown(event, index, value) {
		this.setState({
			value
		});
	}

	renderScreen(){
	const shoppinglistsArr = this.state.shoppinglists
	return (
		    <div style={styles.root}>
		    	<GridList
		    	   cellHeight={180}
		    	   style={styles.gridlist}
		    	   cols={2}
		    	>
		    	{_.map(shoppinglistsArr, (shop) => {
		    		return(
		    			<GridTile
		    				key={shop.id}
		    				title={shop.name}
		    				actionIcon={
		    					<DropDownMenu 
		    						value={this.state.value} 
		    						onChange={this.handleDropDown}>
		    						<MenuItem
		    							value={1}
		    							disabled={true}
		    							primaryText="Options" />
		    						<MenuItem 
		    							value={2} 
		    							onClick={() => this.handleEditModal(shop.id, shop.name)} 
		    							primaryText="Edit" />
		    						<MenuItem 
		    							value={3} 
		    							onClick={() => this.handleDeleteModal(shop.id)} 
		    							primaryText="Delete" />
		    						<MenuItem 
		    							value={4} 
		    							onClick={() => this.handleRedirect(shop.id)} 
		    							primaryText="View Items" />
		    					</DropDownMenu>
		    					}
		    			>
		    			 <img src={'../images/cart.jpg'} />                                                                                       
		    			</GridTile>
		    			)})
		    	}
		    	</GridList>
		    </div>
		)
	}

	render(){
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
			  onClick={this.handleDelete}
			/>,
			<FlatButton
			  style={styles.text}
			  label="No"
			  primary={true}
			  disabled={false}
			  onClick={this.handleClose}
			/>,
		];

		if(this.state.redirect){
			return(
				<Redirect to="/items" />
			)
		}

		return(
			<div>
				<Toolbar>
					<ToolbarGroup >
						<Link to="/" style={styles.listlink}> <ToolbarTitle text="Home" /> </Link>
					</ToolbarGroup>
					<ToolbarGroup>
						<Link to="/logout" style={styles.listlink}> <ToolbarTitle text="Logout" /> </Link>
					</ToolbarGroup>
				</Toolbar>

				<AlertContainer ref={a => this.msg = a} style={styles.alertOPtions} />

				<FloatingActionButton 
						title="click to create"
						style={styles.button}> 
				   <ContentAdd onClick={this.handleOpen} />    
				</FloatingActionButton>

				<SearchBar
					style={styles.bar}
					onChange={this.handleSearch}
					onRequestSearch={this.handleSearchList} />

				<Dialog	  
		  			actions={actions}
		  			modal={true}
		  			open={this.state.openAdd} >
		  			<AddShoppinglist 
						handleChange={this.handleChange}
						handleSubmit={this.handleAdd} />
				</Dialog>
				
				{this.state.search ?
				 <SearchDisplay
				 	value={this.state.value}
				 	styles={styles}
				 	data={this.state.searchedshoppinglist}
				 	handleEditModal={this.handleEditModal}
				 	handleDeleteModal={this.handleDeleteModal}
				 	handleRedirect={this.handleRedirect}
				 	handleDropDown={this.handleDropDown}
				  />
				 : this.renderScreen()}

				<Dialog	  
		  			actions={actions}
		 			modal={true}
		  			open={this.state.openEdit} >
		  			<EditShoppinglist 
		  				initialValue={this.state.newshoppinglistname}
						handleChange={this.handleChange}
						handleSubmit={this.handleEdit} />
				</Dialog>

				<Dialog	 
		  			actions={delActions}
		 			modal={true}
		  			open={this.state.openDelete} >
					<p style={styles.para}> Permanently delete this shoppinglist? </p>
				</Dialog>
			</div>
		)
	}
}


export default ViewShoppinglist;
