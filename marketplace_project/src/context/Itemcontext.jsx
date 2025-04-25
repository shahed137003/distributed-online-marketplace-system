import React, { Children } from 'react'
import  { useState, useEffect, createContext } from 'react';
import axios from 'axios'; 
export const DataContext = createContext()

export default function Itemcontext({children}) {
    const [products, setProducts] = useState([]);
    
      // Fetching products from the API
      useEffect(() => {
        axios
          .get('https://ecommerce.routemisr.com/api/v1/products')
          .then((res) => {
            setProducts(res.data.data);
          })
          .catch((err) => {
            console.error('Error fetching data:', err);
          });
      }, []);
    
  return (
    <div>
     <DataContext.Provider value={{ products }}>
    {children}
    </DataContext.Provider>
    </div>
  )
}
