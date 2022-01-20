import "./App.css";
import { useContext } from "react";
import Comments from "./pages/Comments";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Row, Col } from "react-bootstrap";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";
import { AuthProvider, AuthContext } from "./AuthContext";

//axios
axios.defaults.baseURL = "http://127.0.0.1/backend";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Accept"] = "application/json";
axios.defaults.withCredentials = true;

function App() {
  const authContext = useContext(AuthContext);
  const routePermission = localStorage.getItem("auth_token");

  return (
    <Router>
      <div style={{ overflowX: "hidden" }}>
        <Navbar />
        <div className="app">
          <Row style={{ minHeight: "100vh" }}>
            <Col className="left-side d-none d-md-block"></Col>
            <Col
              xs={12}
              lg={6}
              className="p-5"
              style={{ backgroundColor: "var(--main-color-3)" }}
            >
              <Switch>
                <Route exact path="/">
                  {routePermission ? (
                    <Comments currentUserId={localStorage.getItem("id")} />
                  ) : (
                    <Login />
                  )}
                </Route>

                <Route path="/home">
                  {routePermission ? (
                    <Comments currentUserId={localStorage.getItem("id")} />
                  ) : (
                    <Login />
                  )}
                </Route>
                <Route path="/register">
                  {routePermission ? (
                    <Comments currentUserId={localStorage.getItem("id")} />
                  ) : (
                    <Register />
                  )}
                </Route>
                <Route path="/login">
                  {routePermission ? (
                    <Comments currentUserId={localStorage.getItem("id")} />
                  ) : (
                    <Login />
                  )}
                </Route>
              </Switch>
            </Col>
            <Col className="right-side  d-none d-md-block"></Col>
          </Row>
        </div>
      </div>
    </Router>
  );
}

function App2() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}

export default App2;
