import * as React from 'react';
import { useSelector } from 'react-redux';

import { IAppState } from 'models';

import {
    Collapse,
    Nav,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText,
} from 'reactstrap';
import { useHistory } from 'react-router-dom';

import { logout } from 'utils';

const Layout: React.FC = (props) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const history = useHistory();

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div className="layout">
            <div className="layout__navbar">
                <Navbar color="dark" dark light expand="md">
                    <NavbarBrand onClick={() => history.push('/dashboard')}>reactstrap</NavbarBrand>
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem>
                                <NavLink href="/components/">Components</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
                            </NavItem>
                        </Nav>
                        <div>
                            <UncontrolledDropdown inNavbar>
                                <DropdownToggle nav caret className="text-light">
                                    Gazanfar Gazanfarli
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem onClick={() => logout(history)}>
                                        Logout
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </div>
                    </Collapse>
                </Navbar>
            </div>
            <div className="layout__content">
                {props.children}
            </div>
        </div>
    );
};

Layout.displayName = 'Layout';

export default Layout;
