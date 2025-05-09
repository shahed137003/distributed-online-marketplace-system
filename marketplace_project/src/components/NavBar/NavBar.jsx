
// src/components/NavBar.jsx
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useState, useEffect,useContext } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge, IconButton ,Typography} from '@mui/material';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { InputBase} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { FaFire } from 'react-icons/fa'; 
import { useNavigate } from 'react-router-dom';
import {  Avatar } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import './NavBar.css'
import { CartContext } from "../../context/CartContext"
import Dropdown from 'react-bootstrap/Dropdown';
function NavBar() {
  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  // const [cartCount, setCartCount] = useState(3); // Example cart count
  const {numOfItems} = useContext(CartContext);
  const [searchTerm, setSearchTerm] = useState('');
  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  };

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const navigate = useNavigate();
  return (
    <Navbar expand="md" className={`custom-navbar ${scrolled ? 'scrolled' : ''}`}>
    <Container className="d-flex align-items-center justify-content-between">
   
 
      <div className="d-flex align-items-center">
      <IconButton color="inherit">
  <Badge color="default" badgeContent={null}>
    <FaFire
      style={{
        // purple gradient
        background: 'linear-gradient(45deg, #6f42c1, #8e44ad)',
        // clip the gradient to the text (SVG glyph)
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        // fallback in case background-clip isn’t supported
        color: '#6f42c1',
      }}
    />
  </Badge>
</IconButton>
        <h1 style={{color:"#6f42c1",marginTop:"5px",marginLeft:"0px",fontSize:"30px",fontFamily:'Times New Roman'}}>FATION</h1>
      </div>

      {/* Cart & Search */}
      <div className="d-flex align-items-center ms-auto cart-and-search">
     
        <div className="search-box d-flex align-items-center">
          <InputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
            className="search-input"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                navigate(`/researchresults?search=${encodeURIComponent(searchTerm)}`);
                onUpdateActiveLink('');
              }
            }}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
           <IconButton
    type="submit"
    aria-label="search"
    style={{
      color: "#6f42c1",
      transition: 'color 0.3s ease',
      marginLeft:'100px'
    }}

    onMouseEnter={e => (e.currentTarget.style.color = '#8e44ad')}
    onMouseLeave={e => (e.currentTarget.style.color = '#6f42c1')}
  >
    <SearchIcon />
  </IconButton>
        </div>
      </div>

      {/* Links */}
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          {['home', 'Previous orders', 'login'].map((link) => (
            <Nav.Link
              as={Link}
              key={link}
              to={`/${link}`}
              className={`navbar-link ${activeLink === link ? 'active' : ''}`}
              onClick={() => onUpdateActiveLink(link)}
            >
              {link === 'createItem' ? 'Create Item' : link.charAt(0).toUpperCase() + link.slice(1)}
            </Nav.Link>
          ))}
        </Nav>
      </Navbar.Collapse>
      
      <IconButton
          color="inherit"
          className="cart-icon me-3"
          onClick={() => {
            navigate('/cart');
            onUpdateActiveLink('');
          }}
        >
          <Badge
  badgeContent={numOfItems}
  sx={{
    '& .MuiBadge-badge': {
      backgroundColor: '#6f42c1',
      color: '#fff',
    }
  }}
>
  <ShoppingCartIcon fontSize="large" style={{ color: '#fff' }} />
</Badge>
        </IconButton> 
        <IconButton  onClick={() => {
            navigate('/userProfile');
            onUpdateActiveLink('');
          }}>
      <Avatar
        sx={{
          bgcolor: 'transparent',          // make the base transparent
          background: 'linear-gradient(45deg, #6f42c1, #8e44ad)',
          width: 30,
          height: 30,
        }}
      >
        <PersonIcon sx={{ color: '#fff' }} />
      </Avatar>
    </IconButton>
    </Container>
  </Navbar>

  );
}

export default NavBar;
