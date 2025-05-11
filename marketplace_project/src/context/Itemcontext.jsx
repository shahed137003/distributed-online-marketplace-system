import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios'; 

export const DataContext = createContext();

export default function Itemcontext({children}) {
  const [products, setProducts] = useState([]);

  // Fetching products from the API
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get('https://localhost:7161/api/Product', {
        headers: {
          'Authorization': `Bearer ${token}`,  
        }
      })
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
      });
  }, []);

  return (
    <DataContext.Provider value={{ products }}>
      {children}
    </DataContext.Provider>
  );
}
