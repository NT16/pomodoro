import React from 'react';
import { MemoryRouter, Route, Switch } from 'react-router-dom';
import { render, fireEvent, screen, cleanup, waitForElement } from '@testing-library/react';
import { prettyDOM, getByRole } from '@testing-library/dom'
import Settings from './Settings';

afterEach(cleanup);

const inputData = {
  work: 9,
  shortBreak: 2,
  break2: 3,
  save: false
};

describe('<Settings />', () => {
  // needed to mock useHistory()
  const mockHistoryPush = jest.fn();
  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
      push: mockHistoryPush
    })
  }));

  test('Renders Page', () => {
    const component = render(<Settings />);
    console.log(prettyDOM(component.container));
    const h3 = component.container.querySelector('h3');
    expect(h3).toHaveTextContent('Set your own timers');

    const inputs = component.container.querySelectorAll('input');
    //console.log(prettyDOM(inputs));
    expect(inputs.length).toBe(4);
  });

  test('inputing number updates state', () => {
    const inputValue = '3';
    const { getByLabelText, debug } = render(<Settings />);
    expect(getByLabelText('Work').value).toBe('');
    fireEvent.change(getByLabelText('Work'), { target: { value: inputValue } });
    //firing 'change' event to test whether value changed
    expect(getByLabelText('Work').value).toBe(inputValue);
  });
  // Since an empty input element does not have text, we will use a getByLabelText() function to get the input node. This will still be keeping with our guiding principle, since the label text is what the user will read before inputting text.

  test('inputing text does NOT update work state', () => {
    const inputValue = 'hello';
    const { getByLabelText, debug } = render(<Settings />);
    expect(getByLabelText('Work').value).toBe('');
    fireEvent.change(getByLabelText('Work'), { target: { value: inputValue } });
    //firing 'change' event to test whether value changed

    //debug();
    expect(getByLabelText('Work').value).not.toBe(inputValue);
  });
});

test('submitting a form works correctly', async () => {
  const FakeHome = () => <div data-testid='home' />;
  const { getByRole, getByTestId, debug } = render(<MemoryRouter initialEntries={['/settings']}>
    <Switch>
      <Route path='/home' component={FakeHome} />
      <Route path='/settings' component={Settings} />
    </Switch>
  </MemoryRouter>
  );

  fireEvent.submit(getByRole('button', { name: /go/i }), {
    target: {
      work: { value: 3 },
      shortBreak: { value: 2 },
      break2: { value: 1 },
      save: { checked: true }
    }
  });
  await waitForElement(() => getByTestId('home'));
  expect(getByTestId('home')).toBeInTheDocument();
  debug();
});
/*
   fireEvent.change(getByLabelText(/work/i), {
    target: { value: inputData.work }
  });
  fireEvent.change(getByLabelText(/short break/i), {
    target:  { value: inputData.shortBreak }
  });
  fireEvent.change(getByLabelText('Break'), {
    target: { value: inputData.break2 }
  });
  fireEvent.change(getByLabelText(/add to favourites/i), {
    target: { checked: inputData.save }
  });

    debug();
    //fireEvent.click(getByText(/go/i));
    fireEvent.click( getByRole('button', { name: /go/i}));

    expect(onFormSubmit).toHaveBeenCalledTimes(1);
    expect(onFormSubmit).toHaveBeenCalledWith(inputData);
    */