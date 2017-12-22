import React from "react";
import {GridList, GridTile} from 'material-ui/GridList';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import _ from 'lodash';
import FlatButton from 'material-ui/FlatButton';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

// presentational component handling shoppinglist search display
export const SearchDisplay = (props) => {
    const shoppinglistsArr = props.data
    return (
            <div style={props.styles.root}>
                <GridList
                   cellHeight={180}
                   style={props.styles.gridlist}
                   cols={2}
                >
                {_.map(shoppinglistsArr, (shop) => {
                    return(
                        <GridTile
                            key={shop.id}
                            title={shop.name}
                            actionIcon={
                                <DropDownMenu 
                                    value={props.value} 
                                    onChange={props.handleDropDown}>
                                    <MenuItem
                                        value={1}
                                        disabled={true}
                                        primaryText="Options" />
                                    <MenuItem 
                                        value={2} 
                                        onClick={() => props.handleEditModal(shop.id, shop.name)} 
                                        primaryText="Edit" />
                                    <MenuItem 
                                        value={3} 
                                        onClick={() => props.handleDeleteModal(shop.id)} 
                                        primaryText="Delete" />
                                    <MenuItem 
                                        value={4} 
                                        onClick={() => props.handleRedirect(shop.id)} 
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

// presentational component handling shoppinglist item search display
export const SearchDisplayItem = (props) => {
        const shoppingitemsArr = props.data
        return (
                <div style={props.styles.table}>
                <Table 
                    selectable={false}
                    fixedHeader={true}>
                    <TableHeader displaySelectAll={false}>
                       <TableRow>
                          <TableHeaderColumn colSpan="4" style={{textAlign: 'center'}}>
                            <p style={props.styles.text}> Your Shopping Items </p>
                          </TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false} >
                    
                    {_.map(shoppingitemsArr, (item) => {
                        return(
                                <TableRow key={item.id}>                        
                                <TableRowColumn style={props.styles.text}> {item.name} </TableRowColumn>
                                <TableRowColumn style={props.styles.text}> {item.budgeted_amount} ksh </TableRowColumn>
                                <TableRowColumn>
                                    <FlatButton
                                        style={props.styles.title}
                                        label="Edit"
                                        onClick={() => props.handleEditItemModal(item.id, item.name, item.budgeted_amount)}
                                        disabled={false}
                                    />
                                </TableRowColumn>
                                <TableRowColumn>
                                    <FlatButton
                                        style={props.styles.del}
                                        label="Delete"
                                        onClick={() => props.handleDeleteItemModal(item.id)}
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
