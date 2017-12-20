import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import UpdateItem from '../../components/shoppingitems/shoppingitemedit';

describe('<UpdateItem /> component tests', () => {
	let wrapper = null;

	beforeEach(() => {
		const obj = {newshoppingitemname: "name", newbudgetedamount: "name"}
		wrapper = shallow(<UpdateItem initialValues={obj} />);
	});

	it('renders input fields', () => {
		expect(wrapper.find('TextField').length).to.equal(2);
	});

	it('renders encapsulating and child <div> elements', () => {
		expect(wrapper.find('div').length).to.exist;
	});

	it('renders an <AppBar />', () => {
		expect(wrapper.find('AppBar').length).to.equal(1);
	});
});