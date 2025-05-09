import React from 'react'
import "./EditProfile.css";
import authorImg from "../../assets/user.jpg";
import { useNavigate } from 'react-router-dom';


function EditProfile() {
  return (
    <>
     <div className="userBread d-flex justify-content-center align-items-center flex-column">
        <h2 className="fs-1 text-white">Edit Profile</h2>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item text-secondary">
              <a href="/home" className="text-decoration-none text-secondary">
                Home
              </a>
            </li>
            <li className="breadcrumb-item text-secondary" aria-current="page">
            <a href="/userProfile" className="text-decoration-none text-secondary">
                Profile
              </a>
            </li>
            <li className="breadcrumb-item active text-white" aria-current="page">
            <a href="/userProfile" className="text-decoration-none text-secondary">
               Edit Profile
              </a>
            </li>
          </ol>
        </nav>
      </div>
      <div className='container-fluid' style={{ backgroundColor: "#0A0615", height: "200vh" }}>
      <div className='container'>
      <div className='row'>
     <div className='col-sm-2'>
     <div className='img'>
     <img src={authorImg}
      className="img-fluid rounded-start "
      alt="User"/>
     </div>
     </div>
     <div className='col-sm-10'>

     </div>
      </div>
      </div>
      </div>
    </>
  )
}

export default EditProfile