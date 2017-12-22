import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import LogOut from '../../components/auth/logout';

describe('<LogOut /> component tests', () => {
	let wrapper = null;

	beforeEach(() => {
		wrapper = shallow(<LogOut />);
	});

	it('renders an encapsulating <div> element', () => {
		expect(wrapper.find('div').length).to.equal(1);
	});

	it('renders <h2> statements once logged out', () => {
		expect(wrapper.find('h2')).to.exist;
	});
});