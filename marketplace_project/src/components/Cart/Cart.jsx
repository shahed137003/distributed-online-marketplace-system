import { CartContext } from "../../context/CartContext"
import { PacmanLoader } from "react-spinners";
import { useContext } from "react"
import Alert from 'react-bootstrap/Alert';
import React from 'react'
import './Cart.css'
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';

export default function Cart() {
  const {products,totalPrice,Loading,updateProductQnty,removeProduct,clearCart} = useContext(CartContext);

 
  if(Loading){
    return <div className="cartLoading d-flex justify-content-center align-items-center"><PacmanLoader color="#8B5CF6"/></div>
  }
  return (
    <>
    {products.length==0?
    <div className="empty d-flex flex-column justify-content-center align-items-center">
    <div className="d-flex justify-content-center align-items-center">
     <h3 className="fw-bold me-3 text-light fs-2"> Your cart is empty!</h3>
     <PacmanLoader color="#8B5CF6"/> 
      </div>
     
      <Link to="/home" className="alertLink text-light fs-2 fw-bold"> Shop now</Link>.
      </div>
     
        :<div className="notEmpty overflow-hidden">
          {products.map(function(item,idx){
           return <div className="" key={idx}>

            <Card className="container mt-5 cartCard p-4">
              <div className="d-flex justify-content-center align-items-center">
                <div className="cartImg">
                  <img src={item.product.imageCover} alt="" className="w-full" />
                </div>
      <Card.Body className="text-light">
        <Card.Title className="mb-4 fs-2">{item.product.title}</Card.Title> 
        <span className="priceTag position-absolute top-0 end-0 p-5 bg-gradient fw-bold fs-5">{item.price} EGP</span>
       
        <Button variant="danger" onClick={()=> removeProduct(item.product._id)} className="me-4">Remove Item</Button>
        <Button variant="light" onClick={()=> updateProductQnty(item.product._id,item.count+1)} className="me-4">+</Button>
        <span>{item.count}</span>
        <Button variant="light" onClick={()=> updateProductQnty(item.product._id,item.count-1)} className="ms-4">-</Button>
      </Card.Body>
              </div>
     
    </Card>

           </div>
          })}
    <Button variant="danger" onClick={clearCart} className="mt-5 ms-auto d-flex cartClearBtn p-3">Clear Cart</Button>

          </div>}
    </>
  )
}
