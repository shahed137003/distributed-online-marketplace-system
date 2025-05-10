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
  const paymentData = {
          name:"",
          email:"",
          phone:"",
          cardNumber:"",
          expiryDate:"",
          CVV:"",
          BenAccNum:""
      }
  
  // signUp fn
  
  async function pay(values) { // values are sent by formik we can recieve them here 
    setisLoading(true);
  try{
     const {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup",values); // send the values with the post method in the body which are the user object updated with new values 
     toast.success(data.message);
     navigate('/login'); // navigate to order placed successfully
     setisLoading(false);
    }
    catch(e){
     toast.error(e.response.data.message);
     setisLoading(false);
    }
  }
  
  // validationSchema 

  // Luhn Algorithm Function
  function isValidCardNumber(cardNumber) {
    const digitsOnly = cardNumber.replace(/\s/g, '');
    if (!/^\d{16}$/.test(digitsOnly)) return false;
  
    let sum = 0;
    for (let i = 0; i < 16; i++) {
      let intVal = parseInt(digitsOnly[i]);
      if (i % 2 === 0) {
        intVal *= 2;
        if (intVal > 9) intVal -= 9;
      }
      sum += intVal;
    }
    return sum % 10 === 0;
  }

  // expiry date 
  function isValidExpiryDate(value) {
    if (!/^\d{2}\/\d{2}$/.test(value)) return false;
  
    const [monthStr, yearStr] = value.split('/');
    const month = parseInt(monthStr, 10);
    const year = parseInt(yearStr, 10);
  
    if (month < 1 || month > 12) return false;
  
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear() % 100; // get last two digits
  
    return year > currentYear || (year === currentYear && month >= currentMonth);
  }
  

  

  
  const paymentSchema = Yup.object().shape({
      name: Yup.string()
        .min(2, 'Name is too short')
        .max(50, 'Name is too long')
        .required('Name is a required field '),
     
      email: Yup.string().email('Invalid email').required('Email is a required field'),

      phone: Yup.string().required("Phone is a required field").matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,"Phone number is invalid"),

      cardNumber: Yup.string()
    .required('Card number is a required field')
    .test('valid-format', 'Card must be 16 digits', value => {
      return /^\d{4} ?\d{4} ?\d{4} ?\d{4}$/.test(value || '');
    })
    .test('luhn-check', 'Card number is invalid', value => {
      return isValidCardNumber(value || '');
    }),
    CVV: Yup.string()
    .required('CVV is a required field')
    .test('valid-format', 'CVV must be 3 digits', value => {
      return /^\d{3}$/.test(value || '');
    }),
    BenAccNum:  Yup.string()
    .required('Account number is required')
    .min(10, 'Account number is too short')
    .max(18, 'Account number is too long')
    .test('valid-format', 'Card must be 12 digits', value => {
      return /^\d{4} ?\d{4} ?\d{4}$/.test(value || '');
    }),
    expiryDate: Yup.string()
    .required('Expiry date is required')
    .matches(/^\d{2}\/\d{2}$/, 'Must be in MM/YY format')
    .test('not-expired', 'Card is expired', value => isValidExpiryDate(value || ''))
    })
  
  
  const formik = useFormik({
      initialValues: paymentData,
      onSubmit: pay,
      validationSchema: paymentSchema
  })
  
  return (
    <>
    {/* <div className="signUpWrapper"> */}
    <div className="gatewayMain">
  
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
              <Form.Group className="mb-3" controlId="cardNumber">
                <Form.Label className="text-white">Card Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="XXXX-XXXX-XXXX-XXXX"
                  value={formik.values.cardNumber}
                  onChange={(e) => {
                    // Remove all non-digit characters
                    const rawDigits = e.target.value.replace(/\D/g, '').slice(0, 16); // limit to 16 digits
                
                    // Add space every 4 digits
                    const formatted = rawDigits.replace(/(.{4})/g, '$1 ').trim();
                
                    formik.setFieldValue('cardNumber', formatted);
                  }}
                  onBlur={formik.handleBlur}
                  className="w-80 mx-auto"
                  required
                />
              </Form.Group>
              {formik.errors.cardNumber && formik.touched.cardNumber&& (
                <Alert variant="primary" className="mx-auto">
                  Error! {formik.errors.cardNumber}
                </Alert>
              )}
  
              {/* Expiry date input */}
              <Form.Group className="mb-3" controlId="expiryDate">
                <Form.Label className="text-white">Expiry date</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="mm/yy"
                  value={formik.values.expiryDate}
                  onChange={(e) => {
                    let raw = e.target.value.replace(/\D/g, '').slice(0, 4); // Only digits, max 4
                
                    // Restrict month to 01–12
                    if (raw.length >= 2) {
                      let month = parseInt(raw.slice(0, 2), 10);
                      if (month < 1) {
                        raw = '01' + raw.slice(2);
                      } else if (month > 12) {
                        raw = '12' + raw.slice(2);
                      }
                    }
                
                    // Format to MM/YY
                    if (raw.length >= 3) {
                      raw = ${raw.slice(0, 2)}/${raw.slice(2)};
                    }
                
                    formik.setFieldValue('expiryDate', raw);
                  }}
                  onBlur={formik.handleBlur}
                  className="w-80 mx-auto"
                  required
                />
              </Form.Group>
              {formik.errors.expiryDate && formik.touched.expiryDate && (
                <Alert variant="primary" className="mx-auto">
                  Error! {formik.errors.expiryDate}
                </Alert>
              )}

               {/* CVV input */}
               <Form.Group className="mb-3" controlId="CVV">
                <Form.Label className="text-white">CVV</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="XXX"
                  value={formik.values.CVV}
                  onChange={(e) => {
                    // Remove all non-digit characters
                    const formatted = e.target.value.replace(/\D/g, '').slice(0, 3); // limit to 3 digits
                    formik.setFieldValue('CVV', formatted);
                  }}
                  onBlur={formik.handleBlur}
                  className="w-80 mx-auto"
                  required
                />
              </Form.Group>
              {formik.errors.CVV && formik.touched.CVV && (
                <Alert variant="primary" className="mx-auto">
                  Error! {formik.errors.CVV}
                </Alert>
              )}

               {/* Other account input */}
               <Form.Group className="mb-3" controlId="BenAccNum">
                <Form.Label className="text-white">Beneficiary Account Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="XXXX-XXXX-XXXX"
                  value={formik.values.BenAccNum}
                  onChange={(e) => {
                    // Remove all non-digit characters
                    const rawDigits = e.target.value.replace(/\D/g, '').slice(0, 12); // limit to 12 digits
                
                    // Add space every 4 digits
                    const formatted = rawDigits.replace(/(.{4})/g, '$1 ').trim();
                
                    formik.setFieldValue('BenAccNum', formatted);
                  }}
                  onBlur={formik.handleBlur}
                  className="w-80 mx-auto"
                  required
                />
              </Form.Group>
              {formik.errors.BenAccNum && formik.touched.BenAccNum && (
                <Alert variant="primary" className="mx-auto">
                  Error! {formik.errors.BenAccNum}
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