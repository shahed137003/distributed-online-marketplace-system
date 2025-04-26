import React from 'react';

import { useNavigate } from 'react-router-dom';
import './Card.css'
function Card({ title, image, price,pro_id }) {
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
    <h5
      className="card-title"
      style={{ fontSize: '10px', marginBottom: '10px' }}
    >
      {title}
    </h5>

    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <button className="purple-button" style={{ fontSize: '0.8rem', padding: '6px 12px' }} onClick={()=>{navigate(`/itemdetails?product_id=${encodeURIComponent(pro_id)}`)}}>
        Details
      </button>
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
