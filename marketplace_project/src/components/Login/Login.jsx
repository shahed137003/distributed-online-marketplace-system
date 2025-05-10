import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import axios from 'axios';
import { UserContext } from '../../context/userContext';
import authorImg from "../../assets/user.jpg";
import './EditProfile.css';

function EditProfile() {
  const {
    setLoading,
    userImage,
    phoneNumber,
    bio,
    userName,
  } = useContext(UserContext);

  const initialValues = {
    userImage: userImage,
    userName: userName || '',
    bio: bio || '',
    phoneNumber: phoneNumber || ''
  };

  const validationSchema = Yup.object({
    userImage: Yup.mixed()
      .required('User image is required')
      .test('fileType', 'Unsupported format', value =>
        value && ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type)
      ),
    userName: Yup.string()
      .required('Username is required')
      .matches(/^[a-zA-Z0-9_ ]{3,30}$/, 'Must be 3-30 characters'),
    bio: Yup.string().max(200, 'Bio can’t exceed 200 characters'),
    phoneNumber: Yup.string()
      .required('Phone number is required')
      .matches(/^\+?[0-9]{10,15}$/, 'Must be 10-15 digits'),
  });

  const onSubmit = async values => {
    try {
      setLoading(true);
      const { data } = await axios.post("blablablaa", values);
      toast.success(data.message);
      localStorage.setItem("token", data.token);
    } catch (e) {
      toast.error(e.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit
  });

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
