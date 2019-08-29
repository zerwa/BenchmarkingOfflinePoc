import * as React from 'react';
import { Navbar, NavItem, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

export class Header extends React.Component<{}, {}> {
    public render() {
        return <Navbar>
            <Navbar.Header>
                <Navbar.Brand>
                    <Link to={'/'}>Offline Upload</Link>
                </Navbar.Brand>
            </Navbar.Header>
            <Nav>
                <LinkContainer
                    to={'/cases'}
                    activeClassName='active'
                >
                    <NavItem>Cases TEST</NavItem>
                </LinkContainer>
            </Nav>
        </Navbar>;
    }
}
