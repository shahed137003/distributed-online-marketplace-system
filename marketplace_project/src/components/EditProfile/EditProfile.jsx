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
      <div className='container pt-5'>
      <div className='row'> 
     <div className='col-sm-2'>
     <div className='img_container ' style={{backgroundColor:'#201F2D'}}>
     <div className='img'>
     <img src={authorImg}
      className="img-fluid rounded-start rounded-3 w-100 d-block "
      alt="User"/>
     </div>
     <button type="button" className="btn btn-outline-secondary  text-white rounded-4  border border-2 m-3 ">Upload New Photo</button>
     </div>
     </div>
     <div className='col-sm-5'>
      <h2 className='text-white'>Account Info</h2>
      <div className="mb-3">
  <label for="exampleFormControlInput1" className="form-label text-white">Name</label>
  <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Name"/>
</div>
  <div className="mb-3">
  <label for="exampleFormControlInput1" className="form-label text-white">Email address</label>
  <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
</div>
  <div className="mb-3">
  <label for="exampleFormControlInput1" className="form-label text-white">Phone Number</label>
  <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="+20 109 888 999"/>
</div>
<div className="mb-3">
  <label for="exampleFormControlTextarea1" className="form-label text-white">bio</label>
  <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
</div>
     <button type="button" className="btn btn-outline-secondary  text-white rounded-4  border border-2 ">Upload New Photo</button>
     </div>
      <div className='col-sm-5'>
      <h2 className='text-white'>Your Social Media</h2>
        <div className="mb-3">
  <label for="exampleFormControlInput1" className="form-label text-white">facebook link</label>
  <input type="email" class="form-control" id="exampleFormControlInput1" placeholder=""/>
</div>
  <div className="mb-3">
  <label for="exampleFormControlInput1" className="form-label text-white">twitter link</label>
  <input type="email" class="form-control" id="exampleFormControlInput1" placeholder=""/>
</div>
  <div className="mb-3">
  <label for="exampleFormControlInput1" className="form-label text-white">discord link</label>
  <input type="email" class="form-control" id="exampleFormControlInput1" placeholder=""/>
</div>
     </div>
      </div>
      </div>
      </div>
    </>
  )
}

export default EditProfile