import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import { styles } from '../../styling';

// component handling pagination in both shopping lists and items
const Pagination = props => (
	<div style={styles.root}>

		<FlatButton
            style={props.prevpage === "None" ? 
                styles.hidden : 
                styles.flatprev}
            label="Prev Page"
            primary={true}
            disabled={false}
            onClick={() => props.handlePagination(props.prevpage)}
        />
        <FlatButton
            style={props.nextpage === "None" ? 
                styles.hidden : 
                styles.flatnext}
            label="Next Page"
            primary={true}
            disabled={false}
            onClick={() => props.handlePagination(props.nextpage)}
        />
	</div>
)

export default Pagination;