// import { useParams } from 'react-router-dom';
// import  { useState} from 'react';
// import axios from "axios";
// import { useQuery} from '@tanstack/react-query';
// import { CartContext } from "../../context/CartContext"
// import { useContext} from "react";
// import {RingLoader} from "react-spinners";
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
import React from 'react';
import './UserProfile.css'
import authorImg from "../../assets/user.jpg"



function UserProfile() {


  return (
<>
      <div className="userBread d-flex justify-content-center align-items-center flex-column">
        <h2 className="fs-1 text-white">Name</h2>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item text-secondary"><a href="/home" className="text-decoration-none text-secondary">Home</a></li>
            <li className="breadcrumb-item text-secondary"><a href="/Explore" className="text-decoration-none text-secondary">Explore</a></li>
            <li className="breadcrumb-item active text-white" aria-current="page">Profile</li>
          </ol>
        </nav>
      </div>
    <div className='container-fluid' style={{backgroundColor:'#0A0615',height:'200vh'}}>
      <div  className='container'>
      <div className='row'>
      <div className='col p-0'>
      <div className="m-5">
  <div className="row g-4 userCard rounded-4">
    <div className="col-md-4">
      <img src={authorImg} className="img-fluid rounded-start userImg" alt="..."/>
    </div>
    <div className="col-md-8 text-white d-flex align-items-center">
      <div className="">
        <p className="fs-5">User Profile</p>
        <h5 className='fs-1'>Trista Francis</h5>
        <p className=""> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam placeat sunt harum, deserunt impedit deleniti nobis, unde, odit accusamus sed quis distinctio id numquam hic commodi corporis quos nihil ea! Possimus dolore esse soluta reprehenderit ducimus asperiores in ad fuga fugiat odio! Nam, veniam minima ratione, eveniet aperiam cum magni assumenda, velit odit nostrum pariatur provident molestiae harum soluta a.</p>
      </div>
    </div>
  </div>
</div>
      </div>
      </div> 
      <div className='content d-flex justify-content-center'>
      <ul className="nav nav-tabs" id="myTab" role="tablist">
  <li className="nav-item" role="presentation">
    <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">My Cart</button>
  </li>
  <li className="nav-item" role="presentation">
    <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">My Inventory</button>
  </li>
</ul>
<div className="tab-content" id="myTabContent">
  <div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">...</div>
  <div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">...</div>
</div> 
</div>  
      </div>
      </div>



</>
  )
}

export default UserProfile;

