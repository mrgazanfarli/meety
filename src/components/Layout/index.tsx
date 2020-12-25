import * as React from 'react';
import { Link } from 'react-router-dom';

import {
    Collapse,
    Nav,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';
import { useHistory } from 'react-router-dom';

import { logout } from 'utils';

const Layout: React.FC = (props) => {
    const history = useHistory();
    const [isOpen, setIsOpen] = React.useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div className="layout">
            <div className="layout__navbar">
                <Navbar color="dark" dark light expand="md">
                    <NavbarBrand className="cursor-pointer"
                                 onClick={() => history.push('/dashboard')}>meety</NavbarBrand>
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem>
                                <Link to="/events" className="nav-link">Events</Link>
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
