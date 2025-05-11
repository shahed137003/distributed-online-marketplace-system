import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import '../Register/Register.css';
import { useState, useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket } from '@fortawesome/free-solid-svg-icons';
import { Container, Row, Col, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const { setToken, setLoggedUserId } = useContext(AuthContext);

  const user = {
    email: "",
    password: "",
  };

  async function signIn(values) {
    setisLoading(true);
    try {
      const { data } = await axios.post("https://localhost:7161/api/Account/Login", values);
      toast.success(data.message);
      localStorage.setItem("token", data.token);
      setToken(data.token);
      setLoggedUserId(data.userId);
      navigate(`/userProfile/${data.userId}`);
    } catch (e) {
      toast.error(e.response?.data?.message || "Login failed.");
    } finally {
      setisLoading(false);
    }
  }

  const signupSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is a required field'),
    password: Yup.string()
      .required('Password is a required field')
      .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#?!@$ %^&*-]).{8,}$/,
        "Password must have 8+ characters, an uppercase, a lowercase, a number, and a special character"),
  });

  const formik = useFormik({
    initialValues: user,
    onSubmit: signIn,
    validationSchema: signupSchema
  });

  return (
    <div className="main">
      <div className="w-100 d-flex justify-content-center align-items-center">
        <h1 className="text-center mt-5 text-violet fs-1 fw-bold">Login</h1>
        <FontAwesomeIcon icon={faRocket} size="lg" className={`text-violet mt-5 ms-3 fs-1 fw-bold ${isLoading ? "fa-spin" : ""}`} />
      </div>

      <Container className="w-100 mx-auto mt-5 d-flex align-items-center justify-content-center">
        <Row className="w-100">
          <Col>
            <Form onSubmit={formik.handleSubmit} className="w-50 mx-auto">
              <Form.Group className="mb-3" controlId="email">
                <Form.Label className="text-white">Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="admin@gmail.com"
                  {...formik.getFieldProps("email")}
                  className="w-80 mx-auto"
                  required
                />
              </Form.Group>
              {formik.errors.email && formik.touched.email && (
                <Alert variant="primary" className="mx-auto">Error! {formik.errors.email}</Alert>
              )}

              <Form.Group className="mb-3" controlId="password">
                <Form.Label className="text-white">Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="**"
                  {...formik.getFieldProps("password")}
                  className="w-80 mx-auto"
                  required
                />
              </Form.Group>
              {formik.errors.password && formik.touched.password && (
                <Alert variant="primary" className="mx-auto">Error! {formik.errors.password}</Alert>
              )}

              <Button type="submit" className="w-100 fw-bold bg-violet rounded-3">
                {isLoading ? (
                  <Spinner animation="border" size="sm" role="status" />
                ) : 'Login'}
              </Button>

              <h3 className="text-white mt-5 text-center">
                Don't have an account?
                <Link to='/register' className="text-violet ms-3">Sign Up</Link>
              </h3>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
