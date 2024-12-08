import React from 'react';
import { Navbar } from 'react-bootstrap';

const LOGO = require('../assets/logo.ico');
import { getPaddingStyle } from './utils/style';

const TITLE = 'React Games';

export default function Header() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="/">
        <span style={getPaddingStyle(5)} />
        <img
          alt=""
          src={LOGO}
          width="30"
          height="30"
          className="d-inline-block align-top"
        />
        <span style={getPaddingStyle(5)} />
        {TITLE}
      </Navbar.Brand>
    </Navbar>
  );
}
