import React, { useContext } from 'react'
import "./EditProfile.css";
import authorImg from "../../assets/user.jpg";
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {useFormik} from 'formik';
import { toast } from 'react-toastify';
import axios from "axios";


function EditProfile() {

  const {
    Loading,
    setLoading,
    getUserProfile,
    facebookLink,
    discordLink,
    twitterLink,
    userImage,
    phoneNumber,
    bio,
    userName
  } = useContext(UserContext);



  const userProfile={
    userImage,
    userName,
    bio,
    phoneNumber
  }

  async function updateUser(values) { // values are sent by formik we can recieve them here 
    setLoading(true);
  try{
     const {data} = await axios.post("blablabla",values); // send the values with the post method in the body which are the user object updated with new values 
    toast.success(data.message);
     localStorage.setItem("token",data.token);
     setLoading(false);
    }
    catch(e){
     console.error(e.response.data.message);
     setLoading(false);
    }
  }



const validationSchema = Yup.object().shape({

  userImage: Yup.mixed()
    .required('User image is required')
    .test('fileType', 'Unsupported file format', value =>
      value && ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type)
    ),

  userName: Yup.string()
    .required('Username is required')
    .matches(/^[a-zA-Z0-9_ ]{3,30}$/, 'Username must be 3-30 characters and contain only letters, numbers, spaces, or underscores'),

  bio: Yup.string()
    .max(200, 'Bio cannot exceed 200 characters'),

  phoneNumber: Yup.string()
    .required('Phone number is required')
    .matches(/^\+?[0-9]{10,15}$/, 'Phone number must be valid and contain 10 to 15 digits'),
});

const formik = useFormik({
    initialValues: userProfile,
    onSubmit: updateUser,
    validationSchema: validationSchema
})

   return (
    <div className="main">
      <div className="container mt-5 text-white">
        <h1 className="text-center mb-4">Edit Profile</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="d-flex align-items-center justify-content-center flex-column gap-2">
            <img src={authorImg} alt="User" className="img-fluid rounded" />
            <input
              type="file"
              name="userImage"
              onChange={e => formik.setFieldValue('userImage', e.currentTarget.files[0])}
              onBlur={formik.handleBlur}
              className="form-control"
            />
            {formik.touched.userImage && formik.errors.userImage && (
              <div className="text-danger">{formik.errors.userImage}</div>
            )}
          </div>

          <div className="form-group mt-3">
            <label>Name</label>
            <input
              type="text"
              name="userName"
              className="form-control"
              value={formik.values.userName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.userName && formik.errors.userName && (
              <div className="text-danger">{formik.errors.userName}</div>
            )}
          </div>

          <div className="form-group mt-3">
            <label>Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              className="form-control"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber && (
              <div className="text-danger">{formik.errors.phoneNumber}</div>
            )}
          </div>

          <div className="form-group mt-3">
            <label>Bio</label>
            <textarea
              name="bio"
              className="form-control"
              value={formik.values.bio}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              rows="3"
            />
            {formik.touched.bio && formik.errors.bio && (
              <div className="text-danger">{formik.errors.bio}</div>
            )}
          </div>

          <div className="text-center mt-4">
            <button type="submit" className="btn btn-violet fw-bold">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;