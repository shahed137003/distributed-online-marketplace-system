import React, { useState, useEffect, useContext} from 'react';
import Card from '../Card/Card'
import Carousel from 'react-multi-carousel';
import axios from 'axios'; // for fetching products data
import "react-multi-carousel/lib/styles.css"; // to ensure Carousel styles are applied
import './CardContainer.css'
import CreatorCard from '../CreatorCard/CreatorCard';
// import { DataContext } from '../context/Itemcontext';
import ownerImage from '../../assets/owner.png';
import { DataContext } from '../../context/Itemcontext';

export default function CardContainer() {

  const { products } = useContext(DataContext);
  // Fetching products from the API
 

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    // Use the correct context provider
    
      <section className="cardContainer">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="cardContainer-bx wow zoomIn">
                <h2>Items 🛍️</h2>

                {/* Carousel Component */}
                <Carousel responsive={responsive} infinite={true} className="owl-carousel owl-theme skill-slider">
                  {products.map((product) => (
                    <div key={product.id}>
                      <Card
                        title={product.title}
                        image={product.images[0]} // Assuming the first image is the one to display
                        price={product.price}
                        pro_id={product.id}
                      />
                    </div>
                  ))}
                </Carousel>
              </div>
              <div className="cardContainer-bx wow zoomIn">
                <h2>Creators</h2>

                {/* Carousel Component */}
                <Carousel responsive={responsive} infinite={true} className="owl-carousel owl-theme skill-slider">
                  {products.map((product) => (
                    <div key={product.id}>
                    <CreatorCard></CreatorCard>
                    </div>
                  ))}
                </Carousel>
              </div>
            </div>
          </div>
        </div>
      </section>
   
  );
}
