import React, { useContext, useEffect, useState } from 'react';
import './EditProfile.css';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AuthContext } from "../../context/AuthContext";

function EditProfile() {
  const { token } = useContext(AuthContext);
  
  const {
    getUserProfile,
    facebookLink,
    discordLink,
    twitterLink,
    userImage,
    phoneNumber,
    bio,
    userName
  } = useContext(UserContext);

  const userId = localStorage.getItem('userId') || 'defaultUserId';

  useEffect(() => {
    getUserProfile(userId);
  }, [userId, getUserProfile]);

  const [initialValues, setInitialValues] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userName && phoneNumber) {
      setInitialValues({
        userImage,
        userName,
        bio,
        phoneNumber,
        facebookLink,
        discordLink,
        twitterLink
      });
    }
  }, [
    userImage,
    userName,
    bio,
    phoneNumber,
    facebookLink,
    discordLink,
    twitterLink
  ]);

  async function updateUser(values) {
    setLoading(true);

    const formData = new FormData();

    if (values.userImage) formData.append('file', values.userImage);
    if (values.userName) formData.append('UserName', values.userName);
    if (values.bio) formData.append('bio', values.bio);
    if (values.phoneNumber) formData.append('PhoneNumber', values.phoneNumber);
    if (values.facebookLink) formData.append('Facebook', values.facebookLink);
    if (values.discordLink) formData.append('Discord', values.discordLink);
    if (values.twitterLink) formData.append('Twitter', values.twitterLink);

    try {
      const { data } = await axios.put(
        `https://localhost:7161/api/Profile/${userId}`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      toast.success(data.message);
      localStorage.setItem('token', data.token);
      setLoading(false);
    } catch (e) {
      console.error("Error response:", e.response); 
      console.error("Error message:", e.message); // سجل رسالة الخطأ
      toast.error(e.response?.data?.message || 'An error occurred');
      setLoading(false);
    }
  }

  const validationSchema = Yup.object().shape({
    userImage: Yup.mixed()
      .required('User image is required')
      .test('fileType', 'Unsupported file format', value =>
        value && (typeof value === 'string' || ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type))
      ),
    userName: Yup.string()
      .required('Username is required')
      .matches(/^[a-zA-Z0-9_ ]{3,30}$/, 'Username must be 3-30 characters and contain only letters, numbers, spaces, or underscores'),
    bio: Yup.string().max(200, 'Bio cannot exceed 200 characters'),
    phoneNumber: Yup.string()
      .required('Phone number is required')
      .matches(/^\+?[0-9]{10,15}$/, 'Phone number must be valid and contain 10 to 15 digits'),
    facebookLink: Yup.string().url('Facebook link must be a valid URL'),
    discordLink: Yup.string().url('Discord link must be a valid URL'),
    twitterLink: Yup.string().url('Twitter link must be a valid URL'),
  });

  const handleRemoveImage = (setFieldValue) => {
    setFieldValue('userImage', null);
  };

  return (
    <div className="main">
      <div className="container pt-5 text-white">
        <h1 className="text-center mb-4">Edit Profile</h1>

        {initialValues ? (
          <Formik
            initialValues={initialValues}
            onSubmit={updateUser}
            validationSchema={validationSchema}
            enableReinitialize={true}
          >
            {formik => (
              <form onSubmit={formik.handleSubmit}>
                <div className="d-flex align-items-center justify-content-center flex-column gap-2">
                  {formik.values.userImage && (
                    typeof formik.values.userImage === 'string' ? (
                      <img
                        src={formik.values.userImage}
                        alt="User"
                        className="img-fluid rounded"
                      />
                    ) : (
                      <img
                        src={URL.createObjectURL(formik.values.userImage)}
                        alt="User"
                        className="img-fluid rounded"
                      />
                    )
                  )}
                  <input
                    type="file"
                    name="userImage"
                    onChange={e =>
                      formik.setFieldValue('userImage', e.currentTarget.files[0])
                    }
                    onBlur={formik.handleBlur}
                    className="form-control"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(formik.setFieldValue)}
                  >
                    Remove Image
                  </button>
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

                <div className="form-group mt-3">
                  <label>Facebook Link</label>
                  <input
                    type="text"
                    name="facebookLink"
                    className="form-control"
                    value={formik.values.facebookLink}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.facebookLink && formik.errors.facebookLink && (
                    <div className="text-danger">{formik.errors.facebookLink}</div>
                  )}
                </div>

                <div className="form-group mt-3">
                  <label>Discord Link</label>
                  <input
                    type="text"
                    name="discordLink"
                    className="form-control"
                    value={formik.values.discordLink}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.discordLink && formik.errors.discordLink && (
                    <div className="text-danger">{formik.errors.discordLink}</div>
                  )}
                </div>

                <div className="form-group mt-3">
                  <label>Twitter Link</label>
                  <input
                    type="text"
                    name="twitterLink"
                    className="form-control"
                    value={formik.values.twitterLink}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.twitterLink && formik.errors.twitterLink && (
                    <div className="text-danger">{formik.errors.twitterLink}</div>
                  )}
                </div>

                <div className="text-center mt-4">
                  <button type="submit" className="btn btn-violet fw-bold" disabled={loading}>
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            )}
          </Formik>
        ) : (
          <p>Loading profile...</p>
        )}
      </div>
    </div>
  );
}

export default EditProfile;
