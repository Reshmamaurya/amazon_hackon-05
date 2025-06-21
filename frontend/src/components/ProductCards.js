import React, { useEffect, useState } from 'react';

const ProductCards = () => {
  const [products, setProducts] = useState([]);
  const styles = {
  wrapper: {
    padding: '1rem',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1rem',
    justifyContent: 'center',
  },
  card: {
    width: '300px',
    height: '300px',
    borderRadius: '12px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  image: {
    width: '100%',
    height: '60%',
    objectFit: 'cover',
  },
  details: {
    padding: '0.5rem',
    height: '40%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: '0.9rem',
    fontWeight: 600,
    color: '#333',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  price: {
    fontSize: '0.85rem',
    color: '#777',
  },
  button: {
    marginTop: '0.25rem',
    padding: '0.4rem',
    fontSize: '0.8rem',
    backgroundColor: '#ff9900',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
};


  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        {products.map((product) => (
          <div key={product._id} style={styles.card}>
            <img src={product.image} alt={product.title} style={styles.image} />
            <div style={styles.details}>
              <h3 style={styles.title}>{product.title}</h3>
              <p style={styles.price}>₹{product.price}</p>
              <button style={styles.button}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ProductCards;