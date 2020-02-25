import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { prettyDOM } from '@testing-library/dom'
import About from './About'

describe('<About />' , () => {
    test('Renders Page', () => {
        const component = render(<About />)
        console.log(prettyDOM(component.container))
        const h3 = component.container.querySelector('h3')
        expect(h3).toHaveTextContent('About')

        expect(component.container.querySelectorAll('li').length).toBe(2)
    })
})