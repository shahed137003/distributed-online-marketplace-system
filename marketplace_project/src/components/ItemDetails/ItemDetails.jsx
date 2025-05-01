import React from 'react';
import './itemsDetails.css';
import flowerImage from '../../assets/flower.png';
import ownerImage from '../../assets/owner.png';

const ItemDetails = () => {
  return (
    <>
      <div className="productDetails d-flex justify-content-center align-items-center flex-column">
        <h2 className="fs-1 text-white">Product Details</h2>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item text-secondary"><a href="/home" className="text-decoration-none text-secondary">Home</a></li>
            <li className="breadcrumb-item text-secondary"><a href="/Explore" className="text-decoration-none text-secondary">Explore</a></li>
            <li className="breadcrumb-item active text-white" aria-current="page">Item Details</li>
          </ol>
        </nav>
      </div>

      <div className="ItemCard text-light w-100 d-flex justify-content-center align-items-center p-5">
        <div className="card mb-3 text-white  w-75" style={{ maxWidth: '1800px',backgroundColor:'#141420' }}>
          <div className="row g-0 h-100">
            <div className="col-md-4 h-100">
              <img src={flowerImage} alt="Flower" className="img-fluid rounded-start w-100 h-100 object-fit-cover" />
            </div>
            <div className="col-md-8 h-100">
              <div className="card-body">
                <h5 className="card-title display-5">"The Fantasy Flower Illustration"</h5>

                <div className="card mb-3 text-white w-25" style={{ backgroundColor: '#353444' }}>
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img src={ownerImage} alt="Owner" className="img-fluid rounded-start m-2" />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <p className="card-text"><small className="text-secondary">Owned By</small></p>
                        <h5 className="card-title">Ralph Garraway</h5>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="card-text">
                  Art is a diverse range of human activity that involves creative or imaginative talent, generally
                  expressive of technical proficiency, beauty, emotional power, or conceptual ideas. It encompasses
                  various media such as painting, sculpture, printmaking, drawing, photography, and installation.
                </p>

                <div className="card mb-3 text-white" style={{ backgroundColor: '#353444' }}>
                  <div className="row g-0">
                    <div className="col-md-4 d-flex align-items-center ps-3">Current Price</div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">Price</h5>
                      </div>
                    </div>
                  </div>
                </div>
                <a href="#" className="btn btn-outline-light w-100 mt-2 p-3 fs-4">Add to Cart</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemDetails;



