import { shallow } from 'enzyme';
import React from 'react';
// import renderer from 'react-test-renderer';
import RoomPropertyItem from '../components/List_components/RoomPropertyItem'

describe('RoomPropertyItem tests', () => {
  it('When input Correct data, type should be in the content text ', () => {
    const wrapper = shallow(<RoomPropertyItem type='MasterRoom' nBeds='1'/>);
    expect(wrapper.find('#type').text()).toEqual('PropertyType: MasterRoom');
  });

  it('When input Correct data, number of beds string in the should be display ', () => {
    const wrapper = shallow(<RoomPropertyItem type='MasterRoom' nBeds='1'/>);
    expect(wrapper.find('#nBeds').text()).toEqual('Beds: 1');
  });

  it('When input no data, number of beds is 0', () => {
    const wrapper = shallow(<RoomPropertyItem />);
    expect(wrapper.find('#nBeds').text()).toEqual('Beds: 0');
  });
  it('When input no data, type is none', () => {
    const wrapper = shallow(<RoomPropertyItem />);
    expect(wrapper.find('#type').text()).toEqual('PropertyType: None');
  });
})
