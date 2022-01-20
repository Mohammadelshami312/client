import React, { useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { Formik, ErrorMessage } from "formik";
import { loginSchema } from "../../Validations/LoginValidation";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../../AuthContext";

export default function Login({ setLoggedIn }) {
  let history = useHistory();
  const authContext = useContext(AuthContext);

  const onSubmit = (values) => {
    const { userName, password } = values;

    //inputs values
    const data = {
      userName,
      password,
    };

    //login request
    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios
        .post("/api/login", data)
        .then((resp) => {
          if (resp.data.status === 200) {
            // token and username
            const token = resp.data.token;
            const userName = resp.data.username;
            localStorage.setItem("auth_token", token);
            localStorage.setItem("auth_name", userName);
            localStorage.setItem("id", resp.data.userId);
            authContext.setAuth({token, userName});
            
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener("mouseenter", Swal.stopTimer);
                toast.addEventListener("mouseleave", Swal.resumeTimer);
              },
            });
            Toast.fire({
              icon: "success",
              title: "Signed in successfully",
            }).then((resp1) => {
              console.log(authContext);
              history.push("/home");
            });
          } else {
            if (resp.data.status === 401)
              Swal.fire(
                "Invalid credentials or error network, please try again",
                resp.data.message,
                "warning"
              );
          }
        })
        .catch((error) => {
          Swal.fire("error", "please try again", "warning");
        });
    });
  };

  return (
    <div className="login h-100 d-flex align-items-center">
      <div className="form-container col-12 col-sm-8 col-md-5 col-lg-9 col-xl-7">
        <div>
          <h4 className="pb-2" style={{ color: "var(--main-color-1)" }}>
            Login
          </h4>
        </div>
        <Formik
          initialValues={{
            userName: "",
            password: "",
          }}
          validationSchema={loginSchema}
          onSubmit={onSubmit}
        >
          {(formik) => (
            <Form onSubmit={formik.handleSubmit}>
              <Form.Group className="mb-1" controlId="formBasicEmail">
                <Form.Label>User name</Form.Label>
                <Form.Control
                  name="userName"
                  type="text"
                  placeholder="Enter username"
                  autoComplete="off"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.userName}
                />
                <Form.Text className="error ps-2">
                  <ErrorMessage name="userName" />
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-1" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                <Form.Text className="error ps-2">
                  <ErrorMessage name="password" />
                </Form.Text>
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
