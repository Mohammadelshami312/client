import "./App.css";
import Comments from "./Comments";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Container, Row, Grid, Col } from "react-bootstrap";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Accept"] = "application/json";
axios.defaults.withCredentials = true;

function App() {
  return (
    <Router>
      <div style={{ overflowX: "hidden" }}>
        <Footer />
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
                  {localStorage.getItem("auth_token") ? (
                    <Comments />
                  ) : (
                    <Login />
                  )}
                </Route>

                <Route path="/home">
                  <Comments currentUserId={localStorage.getItem("id")} />
                </Route>
                <Route path="/register">
                  <Register />
                  {/*
                  localStorage.getItem("auth_token") ? (
                    <Comments />
                  ) : (
                    <Register />
                  )
                  */}
                </Route>
                <Route path="/login">
                  <Login />
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

export default App;
