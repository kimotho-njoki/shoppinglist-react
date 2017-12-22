import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Register from '../../components/auth/register';

describe('<Register /> component tests', () => {
	let wrapper = null;

	beforeEach(() => {
		 wrapper = shallow(<Register />);
	});
	
	it('renders <div> elements', () => {
		expect(wrapper.find('div').length).to.equal(2);
	});

	it('renders <TextField /> imported components', () => {
		expect(wrapper.find('TextField').length).to.be.above(1);
	});

	it('renders a paragraph statement', () => {
		expect(wrapper.find('p')).to.exist;
	});

});