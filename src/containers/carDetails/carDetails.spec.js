import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import CarDetails from './carDetails.container';

configure({ adapter: new Adapter() });

describe('<CarDetails />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<CarDetails />);
    });

    it('car details should render properly', () => {
        expect(wrapper).toMatchSnapshot();
    });
});