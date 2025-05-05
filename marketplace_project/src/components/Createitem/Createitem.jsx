import React, { useState } from 'react';
import './createitem.css';
import Footer from '../Footer/Footer';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
import Card from 'react-bootstrap/Card';

export default function Createitem() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState({
    price: '',
    title: '',
    description: '',
    category: ''
  });

  const handleChangeData = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setSelectedFile(imageURL);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      setErrorMessage('Please select a file');
      setShow(true);
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('category', formData.category);
    formDataToSend.append('image', document.querySelector('input[type="file"]').files[0]);

    try {
      const response = await axios.post('http://localhost:5000/api/items', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log(response.data);
      setErrorMessage('');
      setShow(true);
    } catch (error) {
      console.error('Submission error:', error);
      setErrorMessage('Failed to submit item');
      setShow(true);
    }
  };

  return (
    <>
      {/* Centered Alert Overlay */}
      {show && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Alert
            variant={errorMessage ? 'danger' : 'success'}
            style={{ width: '400px', textAlign: 'center' }}
          >
            <Alert.Heading>{errorMessage ? 'Submission Error' : 'Success'}</Alert.Heading>
            <p>{errorMessage || 'Your item has been submitted successfully!'}</p>
            <hr />
            <div className="d-flex justify-content-center">
              <Button
                onClick={() => {
                  setShow(false);
                  setErrorMessage('');
                }}
                variant={errorMessage ? 'outline-danger' : 'outline-success'}
              >
                Close
              </Button>
            </div>
          </Alert>
        </div>
      )}

      <div className="itemCreator d-flex justify-content-center align-items-center flex-column">
        <h2 className="fs-1 text-white">Create item</h2>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item text-secondary">
              <a href="/home" className="text-decoration-none text-secondary">Home</a>
            </li>
            <li className="breadcrumb-item text-secondary">
              <a href="/Explore" className="text-decoration-none text-secondary">Explore</a>
            </li>
            <li className="breadcrumb-item active text-white" aria-current="page">Item Details</li>
          </ol>
        </nav>
      </div>

      <div className='Formcontainer'>
        <h3 style={{ color: '#8B5CF6', marginLeft: '180px', marginTop: '20px', fontSize: '20px' }}>
          Preview Item
        </h3>

        <Card
          style={{
            width: '18rem',
            position: 'absolute',
            top: '80px',
            left: '160px',
            background: 'linear-gradient(135deg, #3a3f51, #1f1f2e)',
            color: 'white',
            border: 'none',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Card.Img variant="top" src={selectedFile || "https://via.placeholder.com/150"} />
          <Card.Body>
            <Card.Title>{formData.title || 'Card title'}</Card.Title>
            <Card.Text>{formData.description || 'description'}</Card.Text>
            <Card.Text>price {formData.price || 'price'}</Card.Text>
            <button className="purple-button">Details</button>
          </Card.Body>
        </Card>

        <Form className="custom-form" onSubmit={handleSubmit}>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label className="text-white">Select File</Form.Label>
            <Form.Control type="file" onChange={handleFileChange} />
          </Form.Group>

          <Form.Group controlId="formPrice" className="mb-3">
            <Form.Label className="text-white">Enter price</Form.Label>
            <Form.Control
              name="price"
              type="text"
              placeholder="Type something..."
              value={formData.price}
              onChange={handleChangeData}
            />
          </Form.Group>

          <Form.Group controlId="formTitle" className="mb-3">
            <Form.Label className="text-white">Enter title</Form.Label>
            <Form.Control
              name="title"
              type="text"
              placeholder="Type something..."
              value={formData.title}
              onChange={handleChangeData}
            />
          </Form.Group>

          <Form.Group controlId="formDescription" className="mb-3">
            <Form.Label className="text-white">Enter description</Form.Label>
            <Form.Control
              name="description"
              type="text"
              placeholder="Type something..."
              value={formData.description}
              onChange={handleChangeData}
            />
          </Form.Group>

          <Form.Group controlId="formCategory" className="mb-3">
            <Form.Label className="text-white">Enter Category type</Form.Label>
            <Form.Control
              name="category"
              type="text"
              placeholder="Type something..."
              value={formData.category}
              onChange={handleChangeData}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" className="text-white" />
          </Form.Group>

          <button className="purple-button" type="submit">Submit</button>
        </Form>
      </div>

      <Footer />
    </>
  );
}
