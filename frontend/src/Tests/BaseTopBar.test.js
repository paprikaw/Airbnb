import { shallow } from 'enzyme';
import React from 'react';
// import renderer from 'react-test-renderer';
import BaseTopBar from '../components/BaseTopBar';

describe('BaseTopBar tests', () => {
  it('When one left user component have passed to basetopbar, The toolbar component should consist that component', () => {
    const wrapper = shallow(<BaseTopBar />);
    expect(wrapper.find('#toolbar').children()).toHaveLength(3);
  })

  it('When one left user component have passed to basetopbar, The toolbar component should consist that component', () => {
    const wrapper = shallow(<BaseTopBar leftComponents={<h1>This is a Heading</h1>}/>);
    expect(wrapper.find('#toolbar').children()).toHaveLength(4);
  })
  it('When one right user component have passed to basetopbar, The toolbar component should consist that component', () => {
    const wrapper = shallow(<BaseTopBar rightComponents={<h1>This is a Heading</h1>}/>);
    expect(wrapper.find('#toolbar').children()).toHaveLength(4);
  })
  it('When two user components have passed to basetopbar, The toolbar component should consist that component', () => {
    const wrapper = shallow(<BaseTopBar leftComponents={<h1>This is a Heading</h1>} rightComponents={<h1>This is a Heading</h1>}/>);
    expect(wrapper.find('#toolbar').children()).toHaveLength(5);
  })
})
