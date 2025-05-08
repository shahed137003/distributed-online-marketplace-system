import React from "react";
import "./UserProfile.css";
import authorImg from "../../assets/user.jpg";
import { useNavigate } from 'react-router-dom';
import Inventory from "../Inventory/inventory";
import  InventoryContextProvider  from '../../context/InventoryContext';


function UserProfile() {
  const navigate=useNavigate();
  return (
    <>
      <div className="userBread d-flex justify-content-center align-items-center flex-column">
        <h2 className="fs-1 text-white">Name</h2>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item text-secondary">
              <a href="/home" className="text-decoration-none text-secondary">
                Home
              </a>
            </li>
            <li className="breadcrumb-item active text-white" aria-current="page">
              Profile
            </li>
          </ol>
        </nav>
      </div>

      <div className="container-fluid" style={{ backgroundColor: "#0A0615", height: "200vh" }}>
        <div className="container">
          <div className="row">
            <div className="col p-0">
              <div className="m-5">
                <div className="row g-4 userCard rounded-4">
                  <div className="col-md-4">
                    <img
                      src={authorImg}
                      className="img-fluid rounded-start userImg"
                      alt="User"
                    />
                  </div>
                  <div className="col-md-8 text-white d-flex align-items-center">
                    <div>
                      <div className="d-flex justify-content-between align-items-center">
                        <p className="fs-5">User Profile</p>
                        <div
                          className="icons d-flex justify-content-between align-items-center fs-4"
                          style={{ width: "30%" }}
                        >
                          <div>
                            <a href="https://www.linkedin.com/in/habiba-kenawy-65606227a">
                              <i className="fa-brands fa-square-facebook text-white"></i>
                            </a>
                          </div>
                          <div>
                            <a href="#">
                              <i className="fa-brands fa-square-twitter text-white"></i>
                            </a>
                          </div>
                          <div>
                            <a href="#">
                              <i className="fa-brands fa-discord text-white"></i>
                            </a>
                          </div>
                          <button type="button" className="btn btn-outline-secondary  text-white rounded-4  border border-2'"   onClick={() => navigate(`/editProfile`)}>Edit Profile</button>
                        </div>
                      </div>

                      <h5 className="fs-1">Trista Francis</h5>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam
                        placeat sunt harum, deserunt impedit deleniti nobis, unde, odit
                        accusamus sed quis distinctio id numquam hic commodi corporis quos
                        nihil ea! Possimus dolore esse soluta reprehenderit ducimus
                        asperiores in ad fuga fugiat odio! Nam, veniam minima ratione,
                        eveniet aperiam cum magni assumenda, velit odit nostrum pariatur
                        provident molestiae harum soluta a.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <span className="ms-5  text-white p-3 fs-4  rounded-4  border border-2 border-light">My Inventory</span>

   <InventoryContextProvider><Inventory></Inventory></InventoryContextProvider>
     
   
        </div>
      </div>
    </>
  );
}

export default UserProfile;
