import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Card from './Card/Card';
import { DataContext } from '../context/Itemcontext';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import Pagination from 'react-bootstrap/Pagination'; // Ensure to install 'react-bootstrap'


export default function Searchresults() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const search = query.get('search')?.toLowerCase() || '';

  const { products } = useContext(DataContext);

  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 5; // Number of items per page

  if (products.length === 0) {
    return (
      <div style={styles.loadingContainer}>
        <p style={styles.loadingText}>Loading products...</p>
      </div>
    );
  }

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(search)
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Pagination logic
  const currentPageProducts = filteredProducts.slice(
    (activePage - 1) * itemsPerPage,
    activePage * itemsPerPage
  );

  const handlePaginationClick = (page) => {
    setActivePage(page);
  };

  const renderPaginationItems = () => {
    let items = [];
    for (let number = 1; number <= totalPages; number++) {
      items.push(
        <Pagination.Item key={number} active={number === activePage} onClick={() => handlePaginationClick(number)}>
          {number}
        </Pagination.Item>
      );
    }
    return items;
  };

  return (
    <div style={styles.wrapper}>
      <h2 style={styles.header}>
        Search Results for "<span style={styles.highlight}>{search}</span>"
      </h2>

      {filteredProducts.length > 0 ? (
        <>
          <div style={styles.grid}>
            {currentPageProducts.map(product => (
              <Card
                key={product.id}
                title={product.title}
                image={product.images[0]}
                price={product.price}
                pro_id={product.id}
              />
            ))}
          </div>

          {/* Pagination */}
          <Pagination className="custom-pagination" style={styles.pagination}>
            {renderPaginationItems()}
          </Pagination>
        </>
      ) : (
        <div style={styles.noResultsContainer}>
          <SentimentVeryDissatisfiedIcon style={styles.noResultsIcon} />
          <p style={styles.noResults}>
            No products found matching "<strong>{search}</strong>"
          </p>
        </div>
      )}
    </div>
  );
}

const styles = {
  wrapper: {
    padding: '40px',
    backgroundColor: '#2a2a2a',
    minHeight: '100vh',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  header: {
    fontSize: '28px',
    marginBottom: '30px',
    background: 'linear-gradient(45deg, #6f42c1, #8e44ad)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textAlign: 'center',
  },
  highlight: {
    color: '#8b5cf6',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: '24px',
  },
  noResultsContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '40px',
  },
  noResultsIcon: {
    fontSize: 80,
    color: '#9b59b6',
    marginBottom: '10px',
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
    transition: 'transform 0.3s ease',
    animation: 'pulse 1.5s infinite',
  },
  noResults: {
    color: '#ccc',
    fontSize: '20px',
    textAlign: 'center',
  },
  loadingContainer: {
    backgroundColor: '#1e1e2f',
    color: '#fff',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: '22px',
    color: '#bbb',
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '40px',
  },
};
