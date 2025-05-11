import React from 'react';
import './itemsDetails.css';
import flowerImage from '../../assets/flower.png';
import ownerImage from '../../assets/owner.png';
import { useParams } from 'react-router-dom';
import  { useState, useEffect} from 'react';
import axios from "axios";
import { useQuery} from '@tanstack/react-query';
import { CartContext } from "../../context/CartContext"

import { useContext} from "react";
import { toast } from 'react-toastify';
//import { FallingLines } from 'react-loader-spinner';

// import {useState} from "react";

const ItemDetails = () => {
  const {addProductToCart} = useContext(CartContext);
  const { product_id } = useParams();
  const [loading,setLoading] = useState(false);
  
  const getProductDetails = async () => {
    const response = await axios.get(`https://localhost:7161/api/Product/${product_id}`);
    console.log(response.data);
    return response.data; 
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ['ProductDetails', product_id],
    queryFn: getProductDetails,
  });


  async function AddToCart(){
    setLoading(true);
    const data = await addProductToCart(product_id);
   
    if(data != null){
      toast.success("Product added successfully");
      setLoading(false);
    }else{
      toast.error("error");
      setLoading(false);
    }
  }


  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading product.</p>;


  return (
    <>
      <div className="productDetails d-flex justify-content-center align-items-center flex-column">
        <h2 className="fs-1 text-white">{data.title}</h2>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item text-secondary"><a href="/home" className="text-decoration-none text-secondary">Home</a></li>
            <li className="breadcrumb-item text-secondary"><a href="/Explore" className="text-decoration-none text-secondary">Explore</a></li>
            <li className="breadcrumb-item active text-white" aria-current="page">Item Details</li>
          </ol>
        </nav>
      </div>

      <div className="ItemCard text-light w-100 d-flex justify-content-center align-items-center p-5">
        <div className="card mb-3 text-white  w-75" style={{ maxWidth: '1800px',backgroundColor:'#141420' }}>
          <div className="row g-0 h-100">
            <div className="col-md-4 h-100">
              <img src={data.image} alt="Flower" className="img-fluid rounded-start w-100 h-100 object-fit-cover" />
            </div>
            <div className="col-md-8 h-100">
              <div className="card-body">
                <h5 className="card-title display-5">"{data.title}"</h5>

                <div className="card mb-3 text-white w-25" style={{ backgroundColor: '#353444' }}>
                  <div className="row g-0">
                    <div className="col-md-4">
                    <img src={encodeURI(data.ownerImage)} alt="ownerImage" className="img-fluid rounded-start m-2" />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <p className="card-text"><small className="text-secondary">Owned By</small></p>
                        <h5 className="card-title"> {data.name}</h5>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="card-text">
                  {data.productDescription}
                </p>

                <div className="card mb-3 text-white" style={{ backgroundColor: '#353444' }}>
                  <div className="row g-0">
                    <div className="col-md-4 d-flex align-items-center ps-3">Current Price</div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{data.price}EGP</h5>
                      </div>
                    </div>
                  </div>
                </div>
                <button href="#"  onClick={AddToCart}  className="btn btn-outline-light w-100 mt-2 p-3 fs-4">Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemDetails;



