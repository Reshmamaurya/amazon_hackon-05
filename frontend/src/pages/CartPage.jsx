import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import axios from 'axios';

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        fetchCart(firebaseUser.uid);
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchCart = async (uid) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/users/${uid}/cart`);
      const items = res.data;
      setCart(items);
      updateSubtotal(items);
    } catch (err) {
      console.error('❌ Error fetching cart:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateSubtotal = (items) => {
    const total = items.reduce((sum, item) => {
      const price = parseFloat(item.product.price?.toString().replace(/[^0-9.]/g, '')) || 0;
      return sum + price * item.quantity;
    }, 0);
    setSubtotal(total);
  };

  const updateQuantity = async (productId, delta) => {
    const item = cart.find(c => c.product._id === productId);
    const newQty = item.quantity + delta;
    if (newQty < 1) return;

    try {
      await axios.post(`http://localhost:5000/api/users/${user.uid}/cart`, {
        productId,
        quantity: delta,
      });
      fetchCart(user.uid);
    } catch (err) {
      console.error('❌ Failed to update quantity:', err);
    }
  };

  const removeItem = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${user.uid}/cart/${productId}`);
      fetchCart(user.uid);
    } catch (err) {
      console.error('❌ Failed to remove item:', err);
    }
  };

  const moveToSharedCart = async (productId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/users/${user.uid}/shared-cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId }),
      });
  
      if (!res.ok) {
        throw new Error('Failed to move item to shared cart');
      }
  
      await removeItem(productId);
    } catch (err) {
      console.error('❌ Failed to move to shared cart:', err);
    }
  };
  

  if (loading) return <p className="p-6">Loading your cart...</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto relative">
      {/* Top Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Shopping Cart</h1>
        <button
          onClick={() => window.location.href = '/shared-cart'}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          View Shared Cart
        </button>
      </div>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item, idx) => {
  if (!item.product) {
    return (
      <div key={idx} className="flex items-center justify-between bg-red-50 p-4 mb-4 rounded">
        <span className="text-red-600 font-medium">
          ⚠️ One of the products in your cart is no longer available.
        </span>
        <button
          onClick={() => removeItem(item._id || item.productId)}
          className="text-sm text-red-500 underline"
        >
          Remove
        </button>
      </div>
    );
  }

  return (
    <div key={idx} className="flex items-start gap-6 border-b pb-6 mb-6">
      <img
        src={item.product.image}
        alt={item.product.title}
        className="w-32 h-32 object-contain"
        onError={(e) => (e.target.src = 'https://via.placeholder.com/100')}
      />
      <div className="flex-1">
        <h2 className="text-xl font-semibold">{item.product.title}</h2>
        <p className="text-sm text-gray-600 mt-1">
          {item.product.description?.slice(0, 100)}...
        </p>
        <div className="flex items-center gap-2 mt-2">
          <span className="bg-red-100 text-red-700 px-2 py-1 text-xs rounded">Limited time deal</span>
          <span className="text-lg font-bold text-red-600">₹{item.product.price}</span>
        </div>

        <div className="flex items-center mt-4 space-x-4">
          <div className="flex items-center">
            <span className="text-sm mr-2">Qty:</span>
            <button onClick={() => updateQuantity(item.product._id, -1)} className="px-2 py-1 bg-gray-200">−</button>
            <span className="px-3">{item.quantity}</span>
            <button onClick={() => updateQuantity(item.product._id, 1)} className="px-2 py-1 bg-gray-200">+</button>
          </div>

          <button
            onClick={() => removeItem(item.product._id)}
            className="text-sm text-red-500 underline"
          >
            Remove
          </button>

          <button
            onClick={() => moveToSharedCart(item.product._id)}
            className="text-sm text-blue-500 underline"
          >
            Move to Shared Cart
          </button>
        </div>
      </div>
    </div>
  );
})}


          <div className="text-right text-xl font-bold">
            Subtotal ({cart.length} item{cart.length > 1 ? 's' : ''}): ₹{subtotal.toFixed(2)}
          </div>

          <div className="text-right mt-6">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-2 font-bold rounded">
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
