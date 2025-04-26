import axios from './../../../node_modules/axios/lib/axios';
import { Formik } from 'formik';
import * as Yup from 'yup';
import '../Register/Register.css'
import {useFormik} from 'formik'
import {useState} from "react";
import toast from './../../../node_modules/react-hot-toast/src/index';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faRocket } from '@fortawesome/free-solid-svg-icons';
import { Container, Row, Col, Form, Button, Alert, Spinner} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


const Login = () =>{

  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);

 // initial values of data fields that should be returned to the backend with the values in the input 
 // formik catches them and update these fields on change and sends them to the onSubmit fn
const user = {
       
        email:"",
        password:"",
        
    }

// signUp fn

async function signIn(values) { // values are sent by formik we can recieve them here 
  setisLoading(true);
try{
   const {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin",values); // send the values with the post method in the body which are the user object updated with new values 
   toast.success(data.message);
   navigate('/home');
   setisLoading(false);
  }
  catch(e){
   toast.error(e.response.data.message);
   setisLoading(false);
  }
}

// validationSchema 

const signupSchema = Yup.object().shape({
    
   
    email: Yup.string().email('Invalid email').required('Email is a required field'),

    password: Yup.string().required('Password is a required field').matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,"Password must consist of minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character")
   

  });


const formik = useFormik({
    initialValues: user,
    onSubmit: signIn,
    validationSchema: signupSchema
})

return (
  <>
<div className="w-100 d-flex justify-content-center align-items-center ">
        <h1 className="text-center mt-5 text-violet fs-1 fw-bold">Login </h1>
        {isLoading ? (
          <FontAwesomeIcon icon={faRocket} size="lg" className="text-violet mt-5 ms-3 fa-spin fs-1 fw-bold" />
        ) : (
          <FontAwesomeIcon icon={faRocket} size="lg" className="text-violet mt-5 ms-3 fs-1 fw-bold " />
        )}
      </div>

      <Container className="w-100 mx-auto mt-5 d-flex align-items-center justify-content-center">
        <Row className="w-100">
          <Col>
            <Form onSubmit={formik.handleSubmit} className="w-50 mx-auto">
              
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
              {formik.errors.email && formik.touched.email ? (
                <Alert variant="primary" className="mx-auto">
                  Error! {formik.errors.email}
                </Alert>
              ) : null}

              {/* Password input */}
              <Form.Group className="mb-3" controlId="password">
                <Form.Label className="text-white">Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="********"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-80 mx-auto"
                  required
                />
              </Form.Group>
              {formik.errors.password && formik.touched.password ? (
                <Alert variant="primary" className="mx-auto">
                  Error! {formik.errors.password}
                </Alert>
              ) : null}

              

              <Button
                type="submit"
                className="w-100 fw-bold bg-violet rounded-3"
              >
                {isLoading ? (
                  <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                ) : (
                  'Login'
                )}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>






)

}

export default Login
