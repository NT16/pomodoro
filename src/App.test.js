import React from 'react';
import { mount } from 'enzyme';
import {MemoryRouter} from 'react-router-dom'
import App from './App';
import Settings from './components/Settings'
import About from './components/About'
import Ticker from './components/Ticker'

test('default Home', () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={['/home']}>
      <App />
    </MemoryRouter>
  )

  expect(wrapper.find(Ticker)).toHaveLength(1)
  expect(wrapper.find(About)).toHaveLength(0)
  expect(wrapper.find(Settings)).toHaveLength(0)
  
})

test('navigate to Settings', () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={['/settings']}>
      <App />
    </MemoryRouter>
  )

  expect(wrapper.find(Settings)).toHaveLength(1)
  expect(wrapper.find(About)).toHaveLength(0)
})
test('navigate to About', () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={['/about']}>
      <App />
    </MemoryRouter>
  )

  expect(wrapper.find(About)).toHaveLength(1)
  expect(wrapper.find(Settings)).toHaveLength(0)
  
})


/*
describe( '<App />', () => {
  test('renders <h1> tag', () => {
    const component = render( <App />)
    const h1 = component.container.querySelector('h1')
    expect(h1).toHaveTextContent('Pomodoro')
  })

  test('renders Navigation Bar', () => {
    const component = render( <App />)
    expect(component.container).toHaveTextContent('Home')
    expect(component.container).toHaveTextContent('Settings')
    expect(component.container).toHaveTextContent('About')
    expect(component.container).not.toHaveTextContent('Customise')
  })

  test('renders by default Home', () => {
    const component = render( <App />)
    expect(screen.getByText('Start')).toBeDefined()
    expect(screen.getByText('Logs')).toBeDefined()
  })  
})
*/