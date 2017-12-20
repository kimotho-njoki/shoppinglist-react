import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import LoginScreen from '../../components/auth/loginscreen';

describe('<LoginScreen /> component tests', () => {
	let wrapper = null;

	beforeEach(() => {
		wrapper = shallow(<LoginScreen />);
	});

	it('renders a title', () => {
		expect(wrapper.find('h2').text()).to.contain('Your ShoppingList');
	});

	it('renders paragraph statements', () => {
		expect(wrapper.find('p').length).to.be.above(1);
	});

	it('renders encapsulating and child <div> elements', () => {
		expect(wrapper.find('div').length).to.be.equal(3)
	});

});