import React, { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Card from './Card/Card'
import { DataContext } from '../context/Itemcontext';

export default function Searchresults() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const search = query.get('search')?.toLowerCase() || '';  // Get the search query from URL

  // Access the shared data from the context
  const { products } = useContext(DataContext);
  if ( products.length == 0) {
    return <p>Loading products...</p>;
  }
  // Filter products based on search query
  const filteredProducts = products.filter(product => 
    product.title.toLowerCase().includes(search) 
  );

  return (
    <div style={{ padding: '20px',backgroundColor: '#2a2a2a' }}>

      {filteredProducts.length > 0 ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '20px',
        }}>
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              title={product.title}
              image={product.images[0]} // Assuming the first image is the one to display
              price={product.price}
              pro_id={product.id}
            />
          ))}
        </div>
      ) : (
        <p style={{ color: 'white', textAlign: 'center', marginTop: '20px' }}>
          No products found matching "<strong>{search}</strong>"
        </p>
      )}
    </div>
  );
}
