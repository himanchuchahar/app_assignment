import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import car from './car.component';

configure({ adapter: new Adapter() });

describe('<car />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<car />);
    });

    it('car should render properly', () => {
        expect(wrapper).toMatchSnapshot();
    });
});