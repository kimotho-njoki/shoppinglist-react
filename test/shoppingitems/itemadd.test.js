import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import AddItem from '../../components/shoppingitems/shoppingitemadd';

describe('<AddItem /> component tests', () => {
	let wrapper = null;

	beforeEach(() => {
		wrapper = shallow(<AddItem />);
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