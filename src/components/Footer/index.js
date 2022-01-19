import React from "react";
import { useHistory } from "react-router-dom";
import { logout as logoutApi } from "../../api";
import {
  Navbar,
  Container,
  Offcanvas,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Nav,
} from "react-bootstrap";
import styles from "./style.module.css";

export default function Footer() {
  let history = useHistory();
  // home push
  const home = (e) => {
    e.preventDefault();
    history.push("/home");
  };
  // login push
  const login = (e) => {
    e.preventDefault();
    history.push("/login");
  };
  // sign up push
  const signup = (e) => {
    e.preventDefault();
    history.push("/register");
  };
  // logout push
  const logout = (e) => {
    e.preventDefault();
    logoutApi();
    history.push("/login");
  };
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className={`${styles.nav} fixed-top`}
      variant="dark"
    >
      <div className="container-fluid">
        <Navbar.Brand
          onClick={home}
          className={styles.brand}
          style={{ cursor: "pointer" }}
        >
          Topics
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* 
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
            */}
          </Nav>

          <Nav>
            {localStorage.getItem("auth_token") && (
              <>
                <Nav.Link onClick={logout}>Logout</Nav.Link>
              </>
            )}
            {!localStorage.getItem("auth_token") && (
              <>
                <Nav.Link onClick={login}>Login</Nav.Link>
                <Nav.Link eventKey={2} onClick={signup}>
                  Sign up
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}
