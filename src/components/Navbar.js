import React from 'react';
import { withRouter } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'

const Navbar = (props) => {
    const { location } = props;

    return (
        <Nav variant='tabs' defaultActiveKey="/home" className='navbar-margin' activeKey={location.pathname}>
            <Nav.Item>
                <Nav.Link href="/home">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/settings">Settings</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/about">About</Nav.Link>
            </Nav.Item>
        </Nav>
    )
}

export default withRouter(Navbar);