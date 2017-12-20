import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import AddShoppinglist from '../../components/shoppinglists/shoppinglistadd';

describe('<AddShoppinglist /> component tests', () => {
	let wrapper = null;

	beforeEach(() => {
		wrapper = shallow(<AddShoppinglist />);
	});

	it('renders container <div> elements', () => {
		expect(wrapper.find('div').length).to.be.at.least(1);
	});

	it('renders an appbar at the top', () => {
		expect(wrapper.find('AppBar').length).to.equal(1);
	});

	it('renders an input field', () => {
		expect(wrapper.find('TextField').length).to.equal(1);
	});

});