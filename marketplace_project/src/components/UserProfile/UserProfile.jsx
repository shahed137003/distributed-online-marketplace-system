import React, { useContext, useEffect } from "react";
import "./UserProfile.css";
import authorImg from "../../assets/user.jpg";
import { useNavigate, useParams } from 'react-router-dom';
import Inventory from "../Inventory/Inventory";
import InventoryContextProvider from '../../context/InventoryContext';
import { UserContext } from '../../context/userContext';
import { AuthContext } from "../../context/AuthContext";

function UserProfile() {
  const {
    Loading,
    getUserProfile,
    facebookLink,
    discordLink,
    twitterLink,
    userImage,
    phoneNumber,
    bio,
    userName
  } = useContext(UserContext);

  const { loggedUserId } = useContext(AuthContext);
  const { user_id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (user_id) {
      getUserProfile(user_id);
    }
  }, [user_id]);

  if (Loading)
    return <div className="text-white text-center mt-5">Loading...</div>;

  return (
    <>
      <div className="userBread d-flex justify-content-center align-items-center flex-column">
        <h2 className="fs-1 text-white">{userName}</h2>
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

      <div className="container-fluid" style={{ backgroundColor: "#0A0615", minHeight: "100vh" }}>
        <div className="container">
          <div className="row">
            <div className="col p-0">
              <div className="m-5">
                <div className="row g-4 userCard rounded-4">
                  <div className="col-md-4">
                    <img
                      src={userImage || authorImg}
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
                          <a href={facebookLink || "#"} target="_blank" rel="noopener noreferrer">
                            <i className="fa-brands fa-square-facebook text-white"></i>
                          </a>
                          </div>
                          <div>
                          <a href={discordLink || "#"} target="_blank" rel="noopener noreferrer">
                            <i className="fa-brands fa-discord text-white"></i>
                          </a>
                          </div>
                          <div>
                          <a href={twitterLink || "#"} target="_blank" rel="noopener noreferrer">
                            <i className="fa-brands fa-square-twitter text-white"></i>
                          </a>
                          </div>
                           {loggedUserId === user_id && (
                        <button
                          type="button"
                          className="btn btn-outline-secondary text-white rounded-4 border border-2 mt-2"
                          onClick={() => navigate(`/editProfile`)}
                        >
                          Edit Profile
                        </button>
                      )}
                        </div>
                      </div>
                     
                      <h5 className="fs-1 mt-3">{userName}</h5>
                      <p>{bio}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <span className="ms-5 text-white p-3 fs-4 rounded-4 border border-2 border-light">
            My Inventory
          </span>

          <InventoryContextProvider key={user_id}>
            <Inventory user_id={user_id} />
          </InventoryContextProvider>
        </div>
      </div>
        
                          

              
    </>
  );
}

export default UserProfile;
