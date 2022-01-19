import React from "react";
import { Form, Button } from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import { loginSchema } from "../../Validations/LoginValidation";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { login as loginApi } from "../../api";

export default function Login() {
  let history = useHistory();
  const onSubmit = (values) => {
    const { userName, password } = values;

    //inputs values
    const data = {
      userName,
      password,
    };

    //login request
    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.post("/api/login", data).then((resp) => {
        if (resp.data.status === 200) {
          localStorage.setItem("auth_token", resp.data.token);
          localStorage.setItem("auth_name", resp.data.username);
          localStorage.setItem("id", resp.data.userId);
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
          }).then((resp1) => history.push("/home"));
        } else {
          if (resp.data.status === 401)
            Swal.fire(
              "Invalid credentials or error network, please try again",
              resp.data.message,
              "warning"
            );
        }
      });
    });
  };
  const get = () => {
    axios
      .get("/api/test", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      })
      .then((resp) => console.log(resp));
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
