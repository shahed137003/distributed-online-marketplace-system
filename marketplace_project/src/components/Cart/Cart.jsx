import { CartContext } from "../../context/CartContext";
import { PacmanLoader } from "react-spinners";
import { useContext, useState } from "react";
import Alert from 'react-bootstrap/Alert';
import React from 'react';
import './Cart.css';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Pagination from 'react-bootstrap/Pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTicket } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const { products, totalPrice, Loading, updateProductQnty, removeProduct, clearCart, cartId } = useContext(CartContext);
  const navigate = useNavigate();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const paginatedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (Loading) {
    return (
      <div className="cartLoading d-flex justify-content-center align-items-center">
        <PacmanLoader color="#8B5CF6" />
      </div>
    );
  }

  return (
    <>
      {products.length === 0 ? (
        <div className="empty d-flex flex-column justify-content-center align-items-center">
          <div className="d-flex justify-content-center align-items-center">
            <h3 className="fw-bold me-3 text-light fs-2">Your cart is empty!</h3>
            <PacmanLoader color="#8B5CF6" />
          </div>
          <Link to="/home" className="alertLink text-light fs-2 fw-bold">
            Shop now
          </Link>
        </div>
      ) : (
        <div className="notEmpty p-4">
          <div className="mt-5 d-flex">
            <h2 className="mb-0 text-white totalPriceHeading">
              Total Price:
              <Badge bg="light" className="ms-3 text-muted">
                {totalPrice} EGP
              </Badge>
            </h2>
            <Button
              variant="light"
              size="lg"
              className="ms-auto checkoutBtn"
              onClick={() => navigate('/payment')}
            >
              Proceed to checkout
            </Button>
          </div>

          {paginatedProducts.map((item, idx) => (
            <div key={idx}>
              <Card className="container mt-5 cartCard p-4">
                <div className="d-flex justify-content-center align-items-center">
                  <div className="cartImg">
                    <img src={item.product.imageCover} alt="" className="w-full" />
                  </div>
                  <Card.Body className="text-light ">
                    <Card.Title className="mb-4 fs-2">{item.product.title}</Card.Title>
                    <span className="priceTag position-absolute top-0 end-0 p-5 bg-gradient fw-bold fs-5">
                      {item.price} EGP
                    </span>
                    <Button
                      variant="danger"
                      onClick={() => removeProduct(item.product._id)}
                      className="me-4"
                    >
                      Remove Item
                    </Button>
                    <Button
                      variant="light"
                      onClick={() => updateProductQnty(item.product._id, item.count + 1)}
                      className="me-4"
                    >
                      +
                    </Button>
                    <span>{item.count}</span>
                    <Button
                      variant="light"
                      onClick={() => updateProductQnty(item.product._id, item.count - 1)}
                      className="ms-4"
                    >
                      -
                    </Button>
                  </Card.Body>
                </div>
              </Card>
            </div>
          ))}
          <Button
            variant="danger"
            onClick={clearCart}
            className="mt-5 ms-auto d-flex cartClearBtn p-3"
          >
            Clear Cart
          </Button>
          {/* <h1>{cartId}</h1> */}
          {/* Pagination controls */}
          {totalPages > 1 && (
            <Pagination className="mt-5 justify-content-center customPag">
              {[...Array(totalPages)].map((_, i) => (
                <Pagination.Item
                  key={i + 1}
                  active={i + 1 === currentPage}
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          )}

          
        </div>
      )}
    </>
  );
}

