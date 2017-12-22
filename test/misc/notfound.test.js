import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import NotFound from '../../components/misc/notfound';

describe('<NotFound /> component tests', () => {
	let wrapper = null;

	beforeEach(() => {
		wrapper = shallow(<NotFound />);
	});

	it('renders a <div> container element', () => {
		expect(wrapper.find('div').length).to.equal(1);
	});

	it('renders descriptive <h2> statements', () => {
		expect(wrapper.find('h2')).exist;
	});

});