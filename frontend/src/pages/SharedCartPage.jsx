import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const SharedCartPage = () => {
  const [sharedCart, setSharedCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [friends, setFriends] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        fetchSharedCart(firebaseUser.uid);
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchSharedCart = async (uid) => {
    try {
      const res = await fetch(`http://localhost:5000/api/users/${uid}/shared-cart`);
      const data = await res.json();

      // Debug log
      console.log("Shared Cart Raw:", data);

      // Filter out null/missing products
      const validItems = data.filter(item => item.product && item.product._id);
      setSharedCart(validItems);
    } catch (err) {
      console.error('❌ Error fetching shared cart:', err);
    } finally {
      setLoading(false);
    }
  };

  const removeFromSharedCart = async (productId) => {
    try {
      await fetch(`http://localhost:5000/api/users/${user.uid}/shared-cart/${productId}`, {
        method: 'DELETE',
      });
      fetchSharedCart(user.uid);
    } catch (err) {
      console.error('❌ Failed to remove item:', err);
    }
  };

  const openFriendSelector = async (productId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/users/uid/${user.uid}/friends`);
      const data = await res.json();
      setFriends(data);
      setSelectedFriends([]);
      setSelectedProductId(productId);
      setShowModal(true);
    } catch (err) {
      console.error('❌ Failed to load friends:', err);
    }
  };

  const toggleFriendSelection = (friendId) => {
    setSelectedFriends((prev) =>
      prev.includes(friendId)
        ? prev.filter((id) => id !== friendId)
        : [...prev, friendId]
    );
  };

  const handleAddFriendsToProduct = async () => {
    try {
      await fetch(`http://localhost:5000/api/users/${user.uid}/shared-cart/${selectedProductId}/shared-with`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sharedWith: selectedFriends }),
      });
      setShowModal(false);
      fetchSharedCart(user.uid);
    } catch (err) {
      console.error('❌ Failed to update sharedWith list:', err);
    }
  };

  if (loading) return <p className="p-6">Loading shared cart...</p>;

  if (sharedCart.length === 0) {
    return <div className="p-6 max-w-5xl mx-auto">No items in the shared cart.</div>;
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Shared Cart</h1>

      {sharedCart.map((item, idx) => (
        <div key={idx} className="flex items-start gap-6 border-b pb-6 mb-6">
          {/* Product Image */}
          <img
            src={item.product.image}
            alt={item.product.title}
            className="w-32 h-32 object-contain"
            onError={(e) => (e.target.src = 'https://via.placeholder.com/100')}
          />

          {/* Product Info + Actions */}
          <div className="flex-1">
            <h2 className="text-xl font-semibold">{item.product.title}</h2>
            <p className="text-sm text-gray-600 mt-1">
              {item.product.description?.slice(0, 100)}...
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-lg font-bold text-red-600">₹{item.product.price}</span>
            </div>
            <button
              onClick={() => removeFromSharedCart(item.product._id)}
              className="mt-4 text-sm text-red-500 underline"
            >
              Remove
            </button>
            <button
              onClick={() => openFriendSelector(item.product._id)}
              className="ml-4 text-sm text-blue-500 underline"
            >
              Add Friends
            </button>
          </div>

          {/* Shared With */}
          <div className="min-w-[180px]">
            <h3 className="text-sm font-medium text-gray-700">Shared with:</h3>
            {item.sharedWith?.length === 0 ? (
              <p className="text-sm text-gray-500 italic">No friends yet</p>
            ) : (
              <ul className="mt-1 space-y-1">
                {item.sharedWith.map((friend) => (
                  <li key={friend._id} className="text-sm text-gray-800">
                    {friend.name} ({friend.uid})
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ))}

      {/* Friend Selector Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-md max-w-md w-full">
            <h2 className="text-lg font-semibold mb-4">Select Friends to Share With</h2>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {friends.map((friend) => (
                <label key={friend._id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedFriends.includes(friend._id)}
                    onChange={() => toggleFriendSelection(friend._id)}
                  />
                  <span>{friend.name} ({friend.uid})</span>
                </label>
              ))}
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={() => setShowModal(false)} className="text-gray-500">Cancel</button>
              <button
                onClick={handleAddFriendsToProduct}
                className="bg-blue-600 text-white px-4 py-1 rounded"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SharedCartPage;
