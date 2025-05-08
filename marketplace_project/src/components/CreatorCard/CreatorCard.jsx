import React from 'react';
import ownerImage from '../../assets/owner.png';
import { useNavigate } from 'react-router-dom';
import authorImg from "../../assets/user.jpg"

export default function CreatorCard({ title = "Default Title", pro_id = 1, price = "100" }) {
  const navigate = useNavigate();

  return (
    <div
      className="card text-white shadow-sm border-0"
      style={{
        maxWidth: '360px',
        borderRadius: '1rem',
        background: 'linear-gradient(135deg, #3a3f51, #1f1f2e)',
        overflow: 'hidden',
        marginTop: '40px',
        transition: 'transform 0.3s ease',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
    >
      {/* Owner Info FIRST */}
      <div
        style={{
          backgroundColor: '#353444',
          borderRadius: '0.5rem',
          padding: '8px 10px',
          display: 'flex',
          alignItems: 'center',
          width: 'fit-content',
          margin: '12px',
        }}
      >
        <img
          src={ownerImage}
          alt="Owner"
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            marginRight: '10px',
            objectFit: 'cover',
          }}
        />
        <div>
          <small className="text-secondary" style={{ fontSize: '10px' }}>Owned by</small>
          <div style={{ fontSize: '9px' }}>Ralph Garraway</div>
        </div>
      </div>

   {/* Image Section */}
<div style={{ display: 'flex', width: '100%' }}>
  {/* Left: One large image (200px height) */}
  <img
    src={authorImg}
    alt="Card visual"
    style={{
      height: '230px',
      width: '63%',
      objectFit: 'cover',
      margin:'10px',
      borderRadius: '1rem',
    }}
  />

  {/* Right: Two small stacked images */}
  <div style={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
    <img
      src={authorImg}
      alt="Card visual"
      style={{
        height: '120px',
        width: '83%',
        margin:'5px',
        marginTop:'10px',
        objectFit: 'cover',
        borderRadius: '1rem',
     
      }}
    />
    <img
      src={authorImg}
      alt="Card visual"
      style={{
        height: '100px',
        width: '83%',
        margin:'5px',
        objectFit: 'cover',
        borderRadius: '1rem',

      }}
    />
  </div>
</div>


    </div>
  );
}
