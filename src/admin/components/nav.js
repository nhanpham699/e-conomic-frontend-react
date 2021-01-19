import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"; 

const Example = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
      <Navbar color="light" light expand="md">
        <NavbarBrand >
          <Link to="/admin/products">Products</Link>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink>
                <Link to="/admin/orders">Orders</Link>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink> <Link to="/admin/statistics">Statistics</Link></NavLink>
            </NavItem>
            <NavItem>
              <NavLink> <Link to="/admin/messages">Messages</Link></NavLink>
            </NavItem>
          </Nav>
          <NavbarText>Hi Admin!</NavbarText>
        </Collapse>
      </Navbar>
  );
}

export default Example;