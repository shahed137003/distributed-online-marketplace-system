import React from 'react'
import './Gateway.css'
import axios from './../../../node_modules/axios/lib/axios';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {useFormik} from 'formik';
import {useState} from "react";
import { toast } from 'react-toastify';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faRocket } from '@fortawesome/free-solid-svg-icons';
import { Container, Row, Col, Form, Button, Alert, Spinner} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Gateway = () => {
    const navigate = useNavigate();
    const [isLoading, setisLoading] = useState(false);
  
   // initial values of data fields that should be returned to the backend with the values in the input 
   // formik catches them and update these fields on change and sends them to the onSubmit fn
  const user = {
          name:"",
          email:"",
          password:"",
          rePassword:"",
          phone:""
      }
  
  // signUp fn
  
  async function signUp(values) { // values are sent by formik we can recieve them here 
    setisLoading(true);
  try{
     const {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup",values); // send the values with the post method in the body which are the user object updated with new values 
     toast.success(data.message);
     navigate('/login');
     setisLoading(false);
    }
    catch(e){
     toast.error(e.response.data.message);
     setisLoading(false);
    }
  }
  
  // validationSchema 
  
  const signupSchema = Yup.object().shape({
      name: Yup.string()
        .min(2, 'Name is too short')
        .max(50, 'Name is too long')
        .required('Name is a required field '),
     
      email: Yup.string().email('Invalid email').required('Email is a required field'),
  
      password: Yup.string().required('Password is a required field').matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,"Password must consist of minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"),
      rePassword: Yup.string().required("Re-Password is a required field").oneOf([Yup.ref("password")],"Re-password does not match the original one"),
  
      phone: Yup.string().required("Phone is a required field").matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,"Phone number is invalid")
  
    });
  
  
  const formik = useFormik({
      initialValues: user,
      onSubmit: signUp,
      validationSchema: signupSchema
  })
  
  return (
    <>
    {/* <div className="signUpWrapper"> */}
    <div class="gatewayMain">
  
    <div className="w-100 d-flex justify-content-center align-items-center">
        <h1 className="text-center mt-5 text-violet fs-1 fw-bold">Pay Now</h1>
        {isLoading ? (
          <FontAwesomeIcon icon={faRocket} size="lg" className="text-violet mt-5 ms-3 fa-spin fs-1 fw-bold" />
        ) : (
          <FontAwesomeIcon icon={faRocket} size="lg" className="text-violet mt-5 ms-3 fs-1 fw-bold" />
        )}
      </div>
  
      <Container className="w-100 mx-auto mt-5 d-flex align-items-center justify-content-center">
        <Row className="w-100">
          <Col>
            <Form onSubmit={formik.handleSubmit} className="w-50 mx-auto">
              {/* Name input */}
              <Form.Group className="mb-3" controlId="name">
                <Form.Label className="text-white">Card Holder Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Amany Ehab"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-80 mx-auto"
                  required
                />
              </Form.Group>
              {formik.errors.name && formik.touched.name && (
                <Alert variant="primary" className="mx-auto">
                  Error! {formik.errors.name}
                </Alert>
              )}
  
              {/* Email input */}
              <Form.Group className="mb-3" controlId="email">
                <Form.Label className="text-white">Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="admin@gmail.com"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-80 mx-auto"
                  required
                />
              </Form.Group>
              {formik.errors.email && formik.touched.email && (
                <Alert variant="primary" className="mx-auto">
                  Error! {formik.errors.email}
                </Alert>
              )}

              {/* Phone input */}
              <Form.Group className="mb-4" controlId="phone">
                <Form.Label className="text-white">Phone</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="+201012073589"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-80 mx-auto"
                  required
                />
              </Form.Group>
              {formik.errors.phone && formik.touched.phone && (
                <Alert variant="primary" className="mx-auto">
                  Error! {formik.errors.phone}
                </Alert>
              )}
  
              {/* Card Number input */}
              <Form.Group className="mb-3" controlId="CardNumber">
                <Form.Label className="text-white">Card Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="XXXX-XXXX-XXXX-XXXX"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-80 mx-auto"
                  required
                />
              </Form.Group>
              {formik.errors.password && formik.touched.password && (
                <Alert variant="primary" className="mx-auto">
                  Error! {formik.errors.password}
                </Alert>
              )}
  
              {/* Expiry date input */}
              <Form.Group className="mb-3" controlId="expiryDate">
                <Form.Label className="text-white">Expiry date</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="********"
                  value={formik.values.rePassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-80 mx-auto"
                  required
                />
              </Form.Group>
              {formik.errors.rePassword && formik.touched.rePassword && (
                <Alert variant="primary" className="mx-auto">
                  Error! {formik.errors.rePassword}
                </Alert>
              )}

               {/* CVV input */}
               <Form.Group className="mb-3" controlId="CVV">
                <Form.Label className="text-white">CVV</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="XXX"
                  value={formik.values.rePassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-80 mx-auto"
                  required
                />
              </Form.Group>
              {formik.errors.rePassword && formik.touched.rePassword && (
                <Alert variant="primary" className="mx-auto">
                  Error! {formik.errors.rePassword}
                </Alert>
              )}

               {/* Other account input */}
               <Form.Group className="mb-3" controlId="CVV">
                <Form.Label className="text-white">Beneficiary Account Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="XXXX-XXXX-XXXX-XXXX"
                  value={formik.values.rePassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-80 mx-auto"
                  required
                />
              </Form.Group>
              {formik.errors.rePassword && formik.touched.rePassword && (
                <Alert variant="primary" className="mx-auto">
                  Error! {formik.errors.rePassword}
                </Alert>
              )}
  
              
  
              <Button
                type="submit"
                className="w-100 fw-bold bg-violet rounded-3"
              >
                {isLoading ? (
                  <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                ) : (
                  'Pay'
                )}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
      
    {/* </div> */}
  </>
  
  
  
  
  
  )
  
  }

export default Gateway