import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { logout as logoutApi } from "../../API/api";
import { Navbar, Nav } from "react-bootstrap";
import styles from "./style.module.css";
import { AuthContext } from "../../AuthContext";

export default function Footer() {
  const authContext = useContext(AuthContext);

  let history = useHistory();

  function logout() {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_name");
    localStorage.removeItem("id");
    authContext.setAuth({});
    history.push("/login");
  }

  // home push
  const home = (e) => {
    e.preventDefault();
    history.push("/home");
  };
  // login push
  const login = (e) => {
    e.preventDefault();
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_name");
    localStorage.removeItem("id");
    authContext.setAuth({});
    history.push("/login");
  };
  // sign up push
  const signup = (e) => {
    e.preventDefault();
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_name");
    localStorage.removeItem("id");
    authContext.setAuth({});
    history.push("/register");
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
          <Nav className="me-auto"></Nav>

          <Nav>
            {authContext.auth.token && (
              <>
                <Nav.Link onClick={logout}>Logout</Nav.Link>
              </>
            )}
            {!authContext.auth.token && (
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
