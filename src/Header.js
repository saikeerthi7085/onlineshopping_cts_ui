import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { useLocation } from "react-router-dom";

function Header() {

const location = useLocation();
    const { pathname } = location;
    const splitLocation = pathname.split("/");

    return(
<Navbar  expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href={(splitLocation[1]==="" ||splitLocation[1] === "Login" || splitLocation[1] === "Register")?"/Login":"/Products"}>Online Shopping Application</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        {(splitLocation[1]==="" ||splitLocation[1] === "Login" || splitLocation[1] === "Register")?
              <Nav>
            <Nav.Link href="/Register">Register</Nav.Link>
            <Nav.Link  href="/Login">
                Login
            </Nav.Link>
          </Nav>
          :
          <Nav>
          <Nav.Link href="/ResetPassword">Hello <span>{ localStorage.getItem("LoginId")} !</span></Nav.Link>
          <Nav.Link  href="/Login" >
              Logout
          </Nav.Link>
        </Nav>
}
      </Container>
    </Navbar>    
    );
}

export default Header