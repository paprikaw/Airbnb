import { shallow } from 'enzyme';
import React from 'react';
// import renderer from 'react-test-renderer';
import ChanableButton from '../components/Buttons/ChanableButton';

describe('ChanableButton with click event', () => {
  const noop = () => {};
  it('triggers onclick event', () => {
    const onClick = jest.fn();
    shallow(<ChanableButton onClick={onClick} />).simulate('click')
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('User inner text', () => {
    const innerText = 'Publish';
    const button = shallow(<ChanableButton onClick={noop} innerText={innerText} />)
    expect(button.text()).toBe(innerText);
  })

  it('No inner text provided', () => {
    const button = shallow(<ChanableButton onClick={noop} />)
    expect(button.text()).toBe('Click me');
  })
})
