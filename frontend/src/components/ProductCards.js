import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';

const ProductCards = () => {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);

  const styles = {
    wrapper: { padding: '1rem' },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '1rem',
      justifyContent: 'center',
    },
    card: {
  width: '300px',
  height: '350px', // increased from 300px
  borderRadius: '12px',
  backgroundColor: '#fff',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
}
,
    image: {
  width: '100%',
  height: '180px',
  objectFit: 'contain',
  backgroundColor: '#f9f9f9',
  padding: '10px',
}
,
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
    // Fetch products
    fetch('http://localhost:5000/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));

    // Get current Firebase user
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleAddToCart = async (productId) => {
    if (!user) return alert('Please log in to add items to your cart');
  
    try {
      const res = await fetch(`http://localhost:5000/api/users/${user.uid}/cart`, {
        method: 'POST', // ✅ Important!
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId }), // optionally add quantity here
      });
  
      const text = await res.text();
      let result;
      try {
        result = JSON.parse(text);
      } catch {
        throw new Error('Invalid JSON response');
      }
  
      if (!res.ok) throw new Error(result.error || 'Failed to add to cart');
      alert('✅ Product added to cart!');
    } catch (err) {
      console.error(err);
      alert('❌ Error adding product to cart');
    }
  };
  

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        {products.map((product) => (
          <div key={product._id} style={styles.card}>
           <img src={`http://localhost:5000/${product.image}`} alt={product.title} style={styles.image} />
<div style={styles.details}>
              <h3 style={styles.title}>{product.title}</h3>
              <p style={styles.price}>₹{product.price}</p>
              <button
                style={styles.button}
                onClick={() => handleAddToCart(product._id)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCards;
