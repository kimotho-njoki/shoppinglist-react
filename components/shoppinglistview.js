import React from 'react';
import SearchBar from 'material-ui-search-bar';
import {GridList, GridTile} from 'material-ui/GridList';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {blue700} from 'material-ui/styles/colors';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import _ from 'lodash';
import { Redirect, Link } from "react-router-dom";
import axios from 'axios';

import EditShoppinglist from "./shoppinglistedit";
import AddShoppinglist from "./shoppinglistadd";
import { SearchDisplay } from "./searchdisplay";


const styles = {
  text: {
    color: 'black',
  },
  title: {
  	backgroundColor: blue700,
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
  	justifyContent: 'space-around',
  },
  gridlist: {
  	paddingTop: 80,
  	width: 900,
  	overflowY: 'auto',
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
};


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
		  }
		).then(
		  (error) => {
		  	console.log(error)
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
		}).then(
		(error) => {
			console.log(error)
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
		}).then(
		(error) => {
			console.log(error)
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
		}).then(
		(error) => {
			console.log(error)
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
