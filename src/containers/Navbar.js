import React from 'react';
import logo from './logo.svg';
import './App.css';

import { Fragment } from 'react';
import {
  Container,Row, Col,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button
} from 'reactstrap';

const gestorPODS = require('./persistanceManagement');

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return <Fragment>
      <Navbar sticky="top" color="dark" dark expand="md">
        <NavbarBrand href="/">Viade 2b</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="/about/">About</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/Arquisoft/viade_es2b">GitHub</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/Arquisoft/viade_es2b">Login</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      <Container className="body">
      <Row>
        <Col xs="4">
          <Button onClick={() => gestorPODS.login()} color="dark" className="test">Login</Button>
        </Col>
        <Col xs="4" >
          <Button onClick={() => gestorPODS.logout()}>Log Out</Button>
        </Col>
        <Col xs="4" >
          <Button onClick= {() => gestorPODS.showPerson()}>Show person (Console)</Button>
        </Col>
      </Row>
    </Container>
    </Fragment>
 
  }
}
