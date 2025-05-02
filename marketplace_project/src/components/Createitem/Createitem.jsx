import React , {  useState, useEffect } from 'react'
import './createitem.css'
import Footer from '../Footer/Footer'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


import Card from 'react-bootstrap/Card';
export default function Createitem() {
    const [selectedFile, setSelectedFile] = useState(null);
    
    const [price, setPrice] = useState('');
const [title, setTitle] = useState('');
const [description, setDescription] = useState('');
const [category, setCategory] = useState('');
const handlePriceChange = (e) => setPrice(e.target.value);
const handleTitleChange = (e) => setTitle(e.target.value);
const handleDescriptionChange = (e) => setDescription(e.target.value);
const handleCategoryChange = (e) => setCategory(e.target.value);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setSelectedFile(imageURL);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedFile) {
      console.log('Selected file:', selectedFile);
      // You can use FormData to send it to backend
    } else {
      alert('Please select a file');
    }
  };
  const handleChange = (e) => {
    setInputText(e.target.value);
  };
  return (
    <>
    <div className="itemCreator d-flex justify-content-center align-items-center flex-column">
      <h2 className="fs-1 text-white">Create item</h2>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item text-secondary"><a href="/home" className="text-decoration-none text-secondary">Home</a></li>
          <li className="breadcrumb-item text-secondary"><a href="/Explore" className="text-decoration-none text-secondary">Explore</a></li>
          <li className="breadcrumb-item active text-white" aria-current="page">Item Details</li>
        </ol>
      </nav>
    </div>
    <div className='Formcontainer'>
    <h3 style={{ 
  color: '#8B5CF6', 
marginLeft:'180px', 
  marginTop: '20px', 

  fontSize: '20px' 
}}>
  Preview Item
</h3>
  <Card
    style={{
      width: '18rem',
      position: 'absolute', // Absolute positioning to fix its position relative to Formcontainer
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
    <Card.Img variant="top" src={selectedFile} />
    <Card.Body>
      <Card.Title>{title ? title : 'Card title'}</Card.Title>
      <Card.Text>{description ? description : 'description'}</Card.Text>
      <Card.Text>price {price ? price : 'price'}</Card.Text>
      <button className="purple-button">Details</button>
    </Card.Body>
  </Card>

  <Form className="custom-form">
    <Form.Group controlId="formFile" className="mb-3">
      <Form.Label className="text-white">Select File</Form.Label>
      <Form.Control type="file" onChange={handleFileChange} />
    </Form.Group>

    <Form.Group controlId="formPrice" className="mb-3">
      <Form.Label className="text-white">Enter price</Form.Label>
      <Form.Control
        type="text"
        placeholder="Type something..."
        value={price}
        onChange={handlePriceChange}
      />
    </Form.Group>

    <Form.Group controlId="formTitle" className="mb-3">
      <Form.Label className="text-white">Enter title</Form.Label>
      <Form.Control
        type="text"
        placeholder="Type something..."
        value={title}
        onChange={handleTitleChange}
      />
    </Form.Group>

    <Form.Group controlId="formDescription" className="mb-3">
      <Form.Label className="text-white">Enter description</Form.Label>
      <Form.Control
        type="text"
        placeholder="Type something..."
        value={description}
        onChange={handleDescriptionChange}
      />
    </Form.Group>

    <Form.Group controlId="formCategory" className="mb-3">
      <Form.Label className="text-white">Enter Category type</Form.Label>
      <Form.Control
        type="text"
        placeholder="Type something..."
        value={category}
        onChange={handleCategoryChange}
      />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicCheckbox">
      <Form.Check type="checkbox" label="Check me out" className="text-white" />
    </Form.Group>

    <button className="purple-button">Submit</button>
  </Form>
</div>

    <Footer></Footer>
  </>
  )
}
