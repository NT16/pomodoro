import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter, Router } from 'react-router-dom'
import { createMemoryHistory } from 'history';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

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

function renderWithRouter(
  ui,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] })
  } = {}
) {
  const Wrapper = ({ children }) => (
    <Router history={history}>{children}</Router>
  )

  return {
    ...render(ui, { wrapper: Wrapper }),
    history
  }
}

describe('test full app rendering', () => {
  test('navigating to Settings Tab', () => {
    const { container } = renderWithRouter( <App />, { route: 'settings'});

    //expect( container.innerHTML).toMatch('')

    //fireEvent.click(getByText(/settings/i));
    expect(container.innerHTML).toMatch('Set your own timers');

  })
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
})
*/