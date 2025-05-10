import React, {  useContext,useState} from 'react';
import './Balance.css'
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import authorImg from "../../assets/user.jpg"
import {RingLoader} from "react-spinners";
import { useNavigate } from 'react-router-dom';
import { Tabs, Tab } from 'react-bootstrap';
import bannerBg from '../../assets/background_3.jpg';
import Card from '../Card/Card'
import { CartContext } from "../../context/CartContext"
import Pagination from 'react-bootstrap/Pagination';
export default function Balance() {
    //   const { products } = useContext(DataContext);
      const {products,Loading} = useContext(CartContext);
      
        const navigate = useNavigate();
        let active = 1;
let items = [];
for (let number = 3; number <= 5; number++) {
  items.push(
    <Pagination.Item key={number} active={number === active}>
      {number}
    </Pagination.Item>,
  );
}
  return (
   <>
   
   <div className="Balance d-flex justify-content-center align-items-center flex-column">
        <h2 className="fs-1 text-white">Balance view</h2>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item text-secondary">
              <a href="/home" className="text-decoration-none text-secondary">Home</a>
            </li>
            <li className="breadcrumb-item text-secondary">
              <a href="/cart" className="text-decoration-none text-secondary">Orders</a>
            </li>
            <li className="breadcrumb-item active text-white" aria-current="page">Balance</li>
          </ol>
        </nav>
      </div>

      <div className='Formcontainer'>

  

  <div
    style={{
      backgroundImage: `url(${bannerBg})`,
      borderRadius: '0.5rem',
      padding: '1px 20px',
      display: 'flex',
      alignItems: 'center',
      width: 'fit-content',
      color: '#fff',
      fontSize: '1.2rem',
      width: '80%',
      marginLeft:'100px',
      height: '330px',
      boxShadow: '0 4px 10px rgba(111, 66, 193, 0.3)',
    }}
  >
    <Image
    src={authorImg}
    roundedCircle
    style={{
      width: '300px',
      height: '300px',
      objectFit: 'cover',
      // border: '2px solid #6f42c1',
      boxShadow: '0 2px 8px rgba(0,0,0,0.5)',
      marginLeft:'5px'
    }}
  />
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft:'150px' }}>
  {/* Balance Section */}
  <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
    <div>
      <small className="text-secondary" style={{ fontSize: '28px', display: 'block', marginBottom: '4px' }}>
        Current Balance
      </small>
      <div style={{ fontSize: '30px', fontWeight: 'bold' }}>100 EGP</div>
    </div>

    <div style={{  marginLeft: '100px' }}>
      <small className="text-secondary" style={{ fontSize: '28px', display: 'block', marginBottom: '4px' }}>
        sold products number
      </small>
      <div style={{ fontSize: '30px', fontWeight: 'bold' }}>100 </div>
    </div>
  </div>

  {/* Buttons Section */}
  <div style={{ display: 'flex', gap: '15px', marginLeft:'100px',marginTop:'80px'}}>
  <button className="purple-button" type="submit" onClick={()=>{navigate(`/userProfile`)}}>View profile</button>
  <button className="purple-button" type="submit" style={{  marginLeft: '15px' }}>view inventory</button>
  </div>
</div>

</div>

<div style={{ 
  display: 'flex', 
  justifyContent: 'center', 
  alignItems: 'center', 
  marginTop: '20px', 
  flexDirection: 'column' ,
  marginTop:'-42px'
}}>
  <Tabs
    defaultActiveKey="home"
    transition={false}
    id="balance-tabs"
    className="mb-4 custom-tabs"
  >
    <Tab eventKey="home" title="Cart content">
  <div style={{ padding: '1.5rem', width: '100%', maxWidth: '900px' }}>
    {Loading ? (
      <div className="d-flex justify-content-center align-items-center" >
      <RingLoader color="#8B5CF6" size={80} />
    </div>
    ):products.length === 0 ? (
      <p className="text-white text-center">Your cart is empty.</p>
    ) : (
     <Row className="g-4">
  {products.map((item, idx) => (
   <Col key={idx} xs={12} sm={6} md={4} className="d-flex justify-content-center">
  <div
    key={item.product._id}
    style={{
      width: '100%',  // Ensures it takes full available width
      maxWidth: '330px',
      minWidth: '330px',
     hight:'80px',
      borderRadius: '0.75rem',
      paddingLeft: '50px',
      paddingRight: '50px',
      paddingBottom: '10px',
      paddingTop: '5px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
     
      flexShrink: 0,  // Prevent shrinking
      
    }}
  >
    <Card
      title={item.product.title}
      image={item.product.imageCover}
      price={item.price}
      pro_id={item.product._id}
    />
  </div>
</Col>


  ))}
</Row>

    )}
  </div>
</Tab>


    <Tab eventKey="profile" title="Sold items">
    {/* <div style={{ padding: '1.5rem', width: '100%', maxWidth: '900px' }}>
    {products.length === 0 ? (
      <p className="text-white text-center">Your cart is empty.</p>
    ) : (
      <Row className="g-4">
        {products.map((item) => (
          <Col key={item.id} xs={12} sm={6} md={4}>
            {products.map((product) => (
                    <div key={item.id}>
                      <Card
                        title={item.title}
                        image={item.images[0]} // Assuming the first image is the one to display
                        price={item.price}
                        pro_id={item.id}
                      />
                    </div>
                  ))}
          </Col>
        ))}
      </Row>
    )}
  </div> */}
    </Tab>
  </Tabs>
</div>


</div>



   </>
  )
}
