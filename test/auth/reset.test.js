import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Reset from '../../components/auth/passwordreset';

describe('<Reset /> component tests', () => {
	let wrapper = null;

	beforeEach(() => {
		wrapper = shallow(<Reset />);
	});

	it('renders an <AppBar /> at the top', () => {
		expect(wrapper.find('AppBar').length).to.equal(1);
	});

	it('renders a <div> element', () => {
		expect(wrapper.find('div').length).to.be.at.least(1);
	});

	it('renders detailed paragraph statements', () => {
		expect(wrapper.find('p').length).to.be.above(1);
	});

	it('renders <TextField /> components', () => {
		expect(wrapper.find('TextField').length).to.equal(2);
	});
});