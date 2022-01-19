import React from "react";
import { Form, Button } from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import { registerSchema } from "../../Validations/RegisterValidation";
import axios from "axios";
import Swal from "sweetalert2";
export default function Register() {
  const onSubmit = (values) => {
    const { userName, password, confirmPassword } = values;
    // const Toast = Swal.mixin({
    //   toast: true,
    //   position: "top-end",
    //   showConfirmButton: false,
    //   timer: 3000,
    //   timerProgressBar: true,
    //   didOpen: (toast) => {
    //     toast.addEventListener("mouseenter", Swal.stopTimer);
    //     toast.addEventListener("mouseleave", Swal.resumeTimer);
    //   },
    // });

    // Toast.fire({
    //   icon: "success",
    //   title: "Signed in successfully",
    // });
    const data = {
      userName,
      password,
    };

    /* To authenticate your SPA, your SPA's "login" page should first make a request to the
    sanctum/csrf-cookie endpoint to initialize CSRF protection for the application: */
    axios.get("/sanctum/csrf-cookie").then((response) => {
      // register...
      axios.post("/api/register", data).then((resp) => {
        if (resp.data.status == 200) {
          localStorage.setItem("auth_token", resp.data.token);
          localStorage.setItem("auth_name", resp.data.username);
          localStorage.setItem("id", resp.data.userId);
          //history.push('/...')
        } else {
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
    <div className=" h-100 d-flex align-items-center">
      <div className="form-container col-12 col-sm-8 col-md-5 col-lg-9 col-xl-7">
        <div>
          <h4 className="pb-2" style={{ color: "var(--main-color-1)" }}>
            Registration
          </h4>
        </div>
        <Formik
          initialValues={{
            userName: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={registerSchema}
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
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control
                  name="confirmPassword"
                  type="password"
                  placeholder="Password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmPassword}
                />
                <Form.Text className="error ps-2">
                  <ErrorMessage name="confirmPassword" />
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
