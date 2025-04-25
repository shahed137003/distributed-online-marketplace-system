// import React from 'react';
// import './itemsDetails.css';
// import flowerImage from '../../assets/flower.png';
// import ownerImage from '../../assets/owner.png';

// const ItemDetails = () => {
//   return (
// <div className="ItemCard text-light bg-primary w-100 d-flex justify-content-center align-items-center p-5 position-absolute top-50 start-50 translate-middle h-100">
// <div className="card mb-3  w-75 text-bg-dark" style={{ maxWidth: '18  q00px' }}>
//   <div className="row g-0">
//     <div className="col-md-4">
//       <img src={flowerImage} className="img-fluid rounded-start product-image" alt="..." style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
//     </div>
//     <div className="col-md-8">
//       <div className="card-body ">
//       <h5 class="card-title display-5">"The Fantasy Flower Illustration"</h5>
//       <div className="card mb-3 text-light w-25 " style={{ maxWidth: '540px',backgroundColor:'#353444'}}>
//   <div className="row g-0">
//     <div className="col-md-4">
//       <img src={ownerImage} className="img-fluid rounded-start" alt="..."/>
//     </div>
//     <div className="col-md-8">
//       <div className="card-body">
//       <p className="card-text"><small className="text-body-secondary">Owned By</small></p>
//         <h5 className="card-title">Ralph Garraway</h5>
//       </div>
//     </div>
//   </div>
// </div> 
//  <p class="card-text"> Art is a diverse range of human activity that involves creative or imaginative talent, generally expressive of technical proficiency, beauty, emotional power, or conceptual ideas. It encompasses various media such as painting, sculpture, printmaking, drawing, photography, and installation.</p>
//  <div className="card mb-3 text-light" style={{ maxWidth: '540px',backgroundColor:'#353444' }}>
//   <div className="row g-0">
//     <div className="col-md-4">
//     Current Price
//     </div>
//     <div className="col-md-8">
//       <div className="card-body">
//         <h5 className="card-title">Price</h5>
//       </div>
//     </div>
//   </div>
// </div>
//  <a href="#" class="btn w-100 btn-outline-light">Go somewhere</a> 
//       </div>
//     </div>
//   </div>
// </div> 
// </div>

//   );
// };

// export default ItemDetails;
import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import './itemsDetails.css';
import flowerImage from '../../assets/flower.png';
import ownerImage from '../../assets/owner.png';

const ItemDetails = () => {
  return (
    <div
      className="ItemCard text-light bg-primary w-100 d-flex justify-content-center align-items-center p-5 position-absolute top-50 start-50 translate-middle">
      <Card className="mb-3 w-75 text-bg-dark h-100" style={{ maxWidth: '1800px' }}>
        <Row noGutters className="h-100">
          <Col md={4} className="h-100">
            <Card.Img
              src={flowerImage}
              alt="Flower"
              className="rounded-start product-image"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Col>
          <Col md={8} className="h-100">
            <Card.Body>
              <Card.Title as="h5" className="display-5">
                "The Fantasy Flower Illustration"
              </Card.Title>
              <Card className="mb-3 text-light w-25" style={{ maxWidth: '540px', backgroundColor: '#353444' }}>
                <Row noGutters>
                  <Col md={4}>
                    <Card.Img src={ownerImage} alt="Owner" className="rounded-start" />
                  </Col>
                  <Col md={8}>
                    <Card.Body>
                      <Card.Text>
                        <small className="text-secondary">Owned By</small>
                      </Card.Text>
                      <Card.Title as="h5">Ralph Garraway</Card.Title>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
              <Card.Text>
                Art is a diverse range of human activity that involves creative or imaginative talent, generally
                expressive of technical proficiency, beauty, emotional power, or conceptual ideas. It encompasses various
                media such as painting, sculpture, printmaking, drawing, photography, and installation.
              </Card.Text>
              <Card className="mb-3 text-light" style={{ maxWidth: '540px', backgroundColor: '#353444' }}>
                <Row noGutters>
                  <Col md={4}>Current Price</Col>
                  <Col md={8}>
                    <Card.Body>
                      <Card.Title as="h5">Price</Card.Title>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
              <Button variant="outline-light" className="w-100" href="#">
                Go somewhere
              </Button>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default ItemDetails;




