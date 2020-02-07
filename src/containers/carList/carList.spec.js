import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import CarList from './carList.container';

configure({ adapter: new Adapter() });

describe('<CarList />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<CarList />);
    });

    it('car list should render properly', () => {
        expect(wrapper).toMatchSnapshot();
    });
});