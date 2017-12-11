import React from 'react';
import SearchBar from 'material-ui-search-bar';
import AlertContainer from 'react-alert';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import _ from 'lodash';
import axios from 'axios';
import { Link } from "react-router-dom";
import { styles } from '../../styling';

import AddItem from "./shoppingitemadd";
import UpdateItem from "./shoppingitemedit";
import { SearchDisplayItem } from "../misc/searchdisplay";

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
        this.showAlert = this.showAlert.bind(this);
    }

    componentWillMount(){
        this.getShoppingItems()
    }

// method handling the opening of an add modal
    handleOpen() {
        this.setState({
            openAdd : true
        });
    }

// method handling the closing of all modals
    handleClose() {
        this.setState({
            openEdit: false,
            openAdd: false,
            openDelete: false
        });
    }

// handles react alert messages
    showAlert() {
        this.msg.show('message', {
            time: 2000
        })
    }

// handles saving the input value in state
    handleSearch(value) {
        this.setState({
            search: value
        });
    }

// handles change in state by adding the values in the form input
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
    });
    }

// handles change in state by replacing with the values in the form input
    handleEditItemModal(id, name, budgeted_amount){
        this.setState({
            openEdit : true,
            id: id,
            newbudgetedamount: budgeted_amount,
            newshoppingitemname : name,
        });
    }

// handles change in state
    handleDeleteItemModal(id) {
        this.setState({
            openDelete : true,
            id: id
        });
    }

// posts user input to the api to create a shoppinglist item
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
                this.msg.success(response.data.message)
            }
         ).catch(
            (error) => {
                this.msg.error(error.response.data.message)
            }
         )
    }

// puts user input to the api to update an existing shoppinglist item
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
                this.msg.success(response.data.message)
            }
         ).catch(
            (error) => {
                this.msg.error(error.response.data.message)
            }
         )
    }

// handles deletion of a shoppinglist item by connecting to the api 
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
                this.msg.success(response.data.message)
            }
         ).catch(
            (error) => {
                this.msg.error(error.response.data.message)
            }
         )
    }

// gets shoppinglist items from the api
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
        }).catch(
            (error) => {
                this.msg.error(error.response.data.message)
            }
         )
    }

// gets the shoppinglist item provided in search value
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
                this.setState({
                    searchedshoppingitem: [],
                });
                this.msg.error("shopping item does not exist")
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
                            <p style={styles.itemtext}> Your Shopping Items </p>
                          </TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false} >
                    
                    {_.map(shoppingitemsArr, (item) => {
                        return(
                                <TableRow key={item.id}>                    
                                <TableRowColumn style={styles.itemtext}> {item.name} </TableRowColumn>
                                <TableRowColumn style={styles.itemtext}> {item.budgeted_amount} ksh </TableRowColumn>
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
                        <Link to="/" style={styles.itemlink}> <ToolbarTitle text="Home" /> </Link>
                    </ToolbarGroup>

                    <ToolbarGroup>
                        <Link to="/logout" style={styles.itemlink}> <ToolbarTitle text="Logout" /> </Link>
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


