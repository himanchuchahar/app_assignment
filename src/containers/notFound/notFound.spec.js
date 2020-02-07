import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NotFound from './notFound.container';

configure({ adapter: new Adapter() });

describe('<NotFound />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<NotFound />);
    });

    it('not found should render properly', () => {
        expect(wrapper).toMatchSnapshot();
    });
});