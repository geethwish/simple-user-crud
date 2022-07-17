import { useState } from 'react'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import classNames from 'classnames';

import styles from './Navbar.module.scss';

const NavbarComponent = () => {

    const [collapsed, setCollapsed] = useState(true);

    const toggleNavbar = () => setCollapsed(!collapsed);

    // get pathname
    const pathname = window.location.pathname;

    return (
        <div className={styles.nav}>

            <Navbar expand="md" className={classNames("container")}>

                <NavbarBrand href="/" className="mr-auto">Simple CRUD</NavbarBrand>

                <NavbarToggler onClick={toggleNavbar} className="mr-2" />

                <Collapse isOpen={!collapsed} navbar style={{ justifyContent: 'flex-end' }}>

                    <Nav navbar >

                        <NavItem>

                            <NavLink href="/" className={pathname === "/" ? styles.active : ''}>Home</NavLink>

                        </NavItem>

                        <NavItem>

                            <NavLink href="/clients" className={pathname === "/clients" ? styles.active : ''}>Clients</NavLink>

                        </NavItem>

                    </Nav>

                </Collapse>

            </Navbar>

        </div>
    )
}

export default NavbarComponent