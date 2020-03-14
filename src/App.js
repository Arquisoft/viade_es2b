import React, { Fragment, Suspense } from 'react';
import { toast, Slide } from 'react-toastify';
import { Loader } from '@util-components';
import { ThemeProvider } from 'styled-components';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import Routes from './routes';
import theme from './utils/theme';
import 'react-toastify/dist/ReactToastify.css';
import 'flag-icon-css/css/flag-icon.min.css';
import 'normalize.css';
import './index.css';
import '@inrupt/solid-style-guide';
import { Toaster } from './App.styled';

<<<<<<< HEAD
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
=======
library.add(fas);
library.add(faGithub);

const App = () => (
  <Suspense fallback={<Loader />}>
    <ThemeProvider theme={theme}>
      <Fragment>
        <Routes />
        <Toaster
          {...{
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
            newestOnTop: true,
            closeOnClick: true,
            pauseOnVisibilityChange: true,
            draggable: true,
            className: 'solid-toaster-container',
            toastClassName: 'solid-toaster',
            bodyClassName: 'solid-toaster-body',
            transition: Slide
          }}
        />
      </Fragment>
    </ThemeProvider>
  </Suspense>
);
>>>>>>> af37ac2a44e313f55f26f61480b07909a6f9baec

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
