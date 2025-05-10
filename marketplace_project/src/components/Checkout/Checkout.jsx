import React from 'react'
import axios from './../../../node_modules/axios/lib/axios';
import '../Register/Register.css'
import {useState} from 'react'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faRocket } from '@fortawesome/free-solid-svg-icons';
import { Container, Row, Col, Form, Button, Alert, Spinner, Nav} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from "react"
import { toast } from 'react-toastify';
import './Checkout.css'
import { CartContext } from './../../context/CartContext';


const Checkout = () => {
    const {cartId,setNumOfItems,setProducts,setTotalPrice} = useContext(CartContext);
    const [phone,setPhone] = useState("");
    const [details,setDetails] = useState("");
    const [city,setCity] = useState("");
    const [loading,setLoading] = useState(false);   
 const checkoutdata = {
    shippingAddress:{
        details:details,
        phone:phone,
        city:city
    }
 }
 const navigate = useNavigate();
 async function cashOrder(){
    setLoading(true);
    try{
      const {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,checkoutdata,{
        headers:{
            token:localStorage.getItem("token")
        }
      });
    setNumOfItems(0);
    setTotalPrice(0);
    setProducts([]);
    setLoading(false);
    toast.success("Order placed successfully"); // to be replaced with navigation to placement page 
    }catch(error){
    console.log(error);
    setLoading(false);
    }
}
async function creditOrder(){
  navigate('/gateway');
}

async function balanceOrder(){
    navigate('/gateway');
  }


return (
    <>
    <div className='checkoutMain p-4'>
    <h1 className="text-center mt-5 text-violet fs-1 fw-bold">Payment Details </h1>
    <Container className="w-100 mx-auto mt-5 d-flex align-items-center justify-content-center ">
    <Row className="w-100">
      <Col>
        

          {/* details input */}
          <Form.Group className="mb-3" controlId="details">
            <Form.Label className="text-white">Details</Form.Label>
            <Form.Control
              type="text"
              placeholder="details......."
              onChange={(e)=>setDetails(e.target.value)}
              className="w-80 mx-auto"
              required
            />
          </Form.Group>

           {/* phone input */}
           <Form.Group className="mb-3" controlId="phone">
            <Form.Label className="text-white">Phone</Form.Label>
            <Form.Control
              type="tel"
              placeholder="+201036059761"
              onChange={(e)=>setPhone(e.target.value)}
              className="w-80 mx-auto"
              required
            />
          </Form.Group>


           {/* city input */}
           <Form.Group className="mb-3" controlId="city">
            <Form.Label className="text-white">City</Form.Label>
            <Form.Control
              type="text"
              placeholder="Cairo"
              onChange={(e)=>setCity(e.target.value)}
              className="w-80 mx-auto"
              required
            />
          </Form.Group>
          <div>
          <Button  className="fw-bold bg-violet rounded-3 w-30" onClick={cashOrder}>
            {loading ? (
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : (
              'Cash'
            )}
          </Button>

          <Button  className="fw-bold bg-violet rounded-3 w-30 ms-4" onClick={balanceOrder}>
            {loading ? (
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : (
              'Balance'
            )}
          </Button>
          <Button  className="fw-bold bg-violet rounded-3 w-30 ms-4" onClick={creditOrder}>
            {loading ? (
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : (
              'Credit'
            )}
          </Button>

          
          </div>

          

          
     
      </Col>
    </Row>
  </Container>
  </div>
    </>
)



}

export default Checkout

