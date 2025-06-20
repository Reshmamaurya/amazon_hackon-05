import React from 'react';

const products = [
  {
    id: 1,
    title: "Wireless Headphones",
    price: "$49.99",
    image: "https://images.unsplash.com/photo-1580894908360-982aa311a08b?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 2,
    title: "Smartwatch",
    price: "$89.99",
    image: "https://images.unsplash.com/photo-1600180758890-6e45c3d8c838?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 3,
    title: "Modern Lamp",
    price: "$34.99",
    image: "https://images.unsplash.com/photo-1616627984152-2eab50aa3004?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 4,
    title: "Stylish Backpack",
    price: "$59.99",
    image: "https://images.unsplash.com/photo-1518118573784-94bc71c55240?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 5,
    title: "Yoga Mat",
    price: "$24.99",
    image: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 6,
    title: "Sneakers",
    price: "$79.99",
    image: "https://images.unsplash.com/photo-1552346154-21d32810aba4?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 7,
    title: "Gaming Mouse",
    price: "$29.99",
    image: "https://images.unsplash.com/photo-1587202372775-98973b6d0a44?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 8,
    title: "Bluetooth Speaker",
    price: "$59.99",
    image: "https://images.unsplash.com/photo-1602524204613-b1617b9e1715?auto=format&fit=crop&w=400&q=80",
  },
];

const ProductCards = () => {
  return (
    <div style={styles.wrapper}>
      {/* <h2 style={styles.heading}>Recommended Products</h2> */}
      <div style={styles.container}>
        {products.map((product) => (
          <div key={product.id} style={styles.card}>
            <img src={product.image} alt={product.title} style={styles.image} />
            <div style={styles.details}>
              <h3 style={styles.title}>{product.title}</h3>
              <p style={styles.price}>{product.price}</p>
              <button style={styles.button}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const boxSize = 300; // size in px for square

const styles = {
  wrapper: {
    // padding: '2rem',
   
  },
  heading: {
    fontSize: '1.5rem',
    marginBottom: '1rem',
    color: '#333',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1.0rem',
    justifyContent: 'center',
  },
  card: {
    width: `${boxSize}px`,
    height: `${boxSize}px`,
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

export default ProductCards;
