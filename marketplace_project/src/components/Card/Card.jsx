import React from 'react';
import ownerImage from '../../assets/owner.png';
import { useNavigate } from 'react-router-dom';
import './Card.css'
function Card({ title, image, price,pro_id}) {
  const navigate = useNavigate();
  return (
    
<div
  className="card text-white shadow-sm border-0"
  style={{
    maxWidth: '260px',
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
  <img
    src={image}
    alt={title}
    style={{
      height: '200px',
      width: '100%',
      objectFit: 'cover',
      borderTopLeftRadius: '1rem',
      borderTopRightRadius: '1rem',
    }}
  />

  <div style={{ padding: '15px' }}>
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
  <h5 className="card-title" style={{ fontSize: '12px', fontWeight: '600', margin: 0 }}>
    {title}
  </h5>
  <button
    className="purple-button"
    style={{ fontSize: '8px', padding: '5px 8px', borderRadius: '6px', backgroundColor: '#6f42c1', color: 'white', border: 'none' }}
    onClick={() => navigate(`/itemdetails/${pro_id}`)}
  >
    Details
  </button>
</div>


    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
 
      <div
        className="text-white"
        style={{
          backgroundColor: '#353444',
          borderRadius: '0.5rem',
          padding: '6px 8px',
          display: 'flex',
          alignItems: 'center',
          maxWidth: '120px',
        }}
      >
        <img
          src={ownerImage}
          alt="Owner"
          style={{
            width: '30%',
            height: '30%',
            borderRadius: '50%',
            marginRight: '8px',
            objectFit: 'cover',
          }}
        />
        <div>
          <small className="text-secondary" style={{ fontSize: '10px' }}>Owned by</small>
          <div style={{ fontSize: '8px' }}>Ralph Garraway</div>
        </div>
      </div>

      <div style={{ textAlign: 'right' }}>
        <div style={{ fontSize: '0.7rem', color: 'lightgray' }}>Price 🛒</div>
        <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>{price} EGP</div>
      </div>
    </div>
  </div>
</div>


  );
}

export default Card;