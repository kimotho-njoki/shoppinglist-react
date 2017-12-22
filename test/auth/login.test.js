import React from 'react';
import { expect } from 'chai';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import PropTypes from 'prop-types';

configure({ adapter: new Adapter() });

import Login from '../../components/auth/login';

describe('<Login /> component tests', () => {
	let wrapper = null;
	// let methodCalled = false;

	// const props = {
	// 	onChange: () => { methodCalled = true; },
	// 	// prepareStyles: () => {}
	// };

	beforeEach(() => {
		wrapper = shallow(<Login />);
	});

	it('renders a <div>', () => {
		expect(wrapper.find('div').length).to.equal(2);
	});

	it('renders a paragraph', () => {
		expect(wrapper.find('p').text()).to.contain('Lost Your Password');
	});

	it('renders an <AlertContainer />', () => {
		expect(wrapper.find('AlertContainer').length).to.equal(1);
	});

	it('renders <TextField /> imported components', () => {
		expect(wrapper.find('TextField').length).to.equal(3);
	});

	// it('calls handleChange function', () => {
	// 	const wrap = mount(<Login />, 
	// 			{
	// 		        context: {
	// 		        	muiTheme: getMuiTheme(),
	// 	      		},
	// 	      		childContextTypes: {
	// 		         	muiTheme: PropTypes.object.isRequired,
	// 		       	}
	// 		    }
	// 	      );
	// 	let myInput = wrap.find('TextField').first().find('input');
	// 	// myInput.props().value = 'grace';
	// 	// console.log(myInput.props());
	// 	// expect(myInput.props().name).to.equal('');
	// 	// myInput.props.value = 'grace';
	// 	myInput.simulate('change', myInput);
	// 	expect(wrap.state().username).to.equal('grace');
	// });

});

