import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import axios from "axios";

const LoginForm = () => {
  const [showError, setShowError] = useState(false);

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-start login-container py-4"
    >
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          let error = {};

          if (!values.email) {
            error.email = "Please enter a valid email";
          }

          if (!values.password) {
            error.password = "Please enter a password";
          }
          return error;
        }}
        onSubmit={(values, { resetForm }) => {
          const data = {
            email: values.email,
            password: values.password,
          };
          axios
            .post("http://challenge-react.alkemy.org/", data)
            .then((response) =>{

                localStorage.setItem("token", response.data.token);
                window.location.reload();
            }
            )
            .catch(() => {
              setShowError(true);
              setTimeout(() => {
                setShowError(false);
              }, 2000);
            });

          resetForm();
        }}
      >
        {({ errors }) => (
          <Form className="login-form pt-3 pb-4 px-4">
            <div className="d-flex flex-column">
              <label for="email">Email</label>
              <Field type="email" placeholder="Enter your email" name="email" />
              <ErrorMessage
                name="email"
                
                component={() => (
                  <div className="error-login">{errors.email}</div>
                )}
              />
            </div>
            <div className="d-flex flex-column">
              <label for="password">Password</label>
              <Field type="password" placeholder="Enter your password" name="password" />

              <ErrorMessage
                name="password"
                component={() => (
                  <div className="error-login">{errors.password}</div>
                )}
              />
            </div>
            {showError && (
              <div className="error-login">Invalid email or password</div>
            )}
            <button type="submit" className="submit-login mt-3">
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default LoginForm;
