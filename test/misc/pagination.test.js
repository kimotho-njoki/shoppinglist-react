import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Pagination from '../../components/misc/pagination';

describe('<Pagination /> component tests', () => {
	let wrapper = null;

	beforeEach(() => {
		wrapper = shallow(<Pagination />);
	});

	it('renders a <div> container element', () => {
		expect(wrapper.find('div').length).to.equal(1);
	});

	it('renders a <flatbutton> container element', () => {
		expect(wrapper.find('FlatButton').length).to.equal(2);
	});

});