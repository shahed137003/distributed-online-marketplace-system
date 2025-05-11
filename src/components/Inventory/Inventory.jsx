import React, { useContext, useState } from 'react';
import "./inventory.css";
import { InventoryContext } from '../../context/InventoryContext';
import { RingLoader } from "react-spinners";
import Card from "../Card/Card";

function Inventory() {
  const {
    products,
    totalPrice,
    Loading,
    updateProductQnty,
    removeProduct
  } = useContext(InventoryContext);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  if (Loading) {
    return (
      <div className='d-flex justify-content-center align-items-center' style={{ backgroundColor: '#141420', height: '100vh' }}>
        <RingLoader color="#8B5CF6" />
      </div>
    );
  }

  const totalItems = products?.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = products?.slice(startIndex, startIndex + itemsPerPage);
   // console.log(products[0].title);
  return (
    <>
      <div className="d-flex justify-content-evenly align-items-center flex-wrap gap-5 mt-4">
        {currentItems?.map((item) => (
          <div key={item._Id} className='w-25'>
            <Card
              title={item.title}
              image={item.image || "default.jpg"}
              price={item.price}
              pro_id={item._Id}
            />
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-center mt-4 mb-5">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`btn mx-1 ${currentPage === i + 1 ? 'btn btn-light fs-4 rounded-4 border-light' : 'btn btn-outline-secondary text-white fs-4 rounded-4 border border-2'}`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </>
  );
}

export default Inventory;
