import React from 'react';
import { MemoryRouter, Route, Switch } from 'react-router-dom';
import { render, fireEvent, screen, cleanup, waitForElement, getByTestId, getByLabelText, getAllByLabelText } from '@testing-library/react';
import Ticker from './Ticker';

let locationData = {
    work: '10',
    shortBreak: '4',
    break2: '2',
    save: true
}

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLocation: (locationData) => ({
        data : locationData
    })
}))

describe('<Ticker/>', () => {
    test('on start click, displays timer and hides start button', () => {
        const { getByRole, debug , getByTestId, queryByRole} = render(<Ticker />);
        expect( getByRole('button', { name : /start/i})).toBeInTheDocument();
        expect( getByRole('button', { name : /favourites/i})).toBeInTheDocument();

        fireEvent.click( getByRole('button', { name : /start/i}));
        expect( getByTestId('timer')).toBeInTheDocument();
        expect( queryByRole('button', { name : /start/i})).toBeNull();
        // as getBy* will throw error if not found. queryBy* will return null 
        debug();
    });

    test('delete an entry from favourites, on selecting YES in modal', async () => {
        const { getByRole, getAllByLabelText, queryAllByLabelText, queryByRole, debug } = render(<Ticker/>);
        fireEvent.click( getByRole('button', { name : /favourites/i}));
        await waitForElement(() => getAllByLabelText(/close/i) );
        fireEvent.click( getAllByLabelText(/close/i)[0]);

        //Modal opens, Confirm deletion for the first option in favourites menu
        fireEvent.click( getByRole('button', { name: /yes, delete/i}))

        fireEvent.click( getByRole('button', { name : /favourites/i}));
        await waitForElement(() => queryAllByLabelText(/close/i) );
        expect(queryAllByLabelText(/close/i)).toHaveLength(0);
        
        //Modal is closed
        expect(queryByRole('button', { name: /yes, delete/i})).toBeNull();
        //debug();
    });

    test("doesn't delete from favourites, on selecting No in modal", async () => {
        const { getByRole, getAllByLabelText, queryAllByLabelText, queryByRole, debug } = render(<Ticker/>);
        fireEvent.click( getByRole('button', { name : /favourites/i}));
        await waitForElement(() => getAllByLabelText(/close/i) );
        fireEvent.click( getAllByLabelText(/close/i)[0]);

         //Modal opens, decline deletion for the first option in favourites menu
        fireEvent.click( getByRole('button', { name: /no, don't/i}))

        fireEvent.click( getByRole('button', { name : /favourites/i}));
        await waitForElement(() => queryAllByLabelText(/close/i) );
        expect(queryAllByLabelText(/close/i)).toHaveLength(1);
        
        //Modal is closed
        expect(queryByRole('button', { name: /no, don't/i})).toBeNull();
        //debug();
    });

    //integration
    //changes time on the timer, on selecting one from favourites menu
});