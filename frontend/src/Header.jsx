import React, { useEffect, useState } from "react";
import { FaSearch, FaShoppingCart, FaBars, FaMapMarkerAlt } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { auth } from './firebase';         // ✅ Your custom auth instance
import { signOut } from 'firebase/auth';  // import your firebase instance
import "./Header.css";

const Header = () => {
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    signOut(auth).then(() => {
      setUser(null);
      navigate('/');
    });
  };

  return (
    <header className="header">
      {/* Top Bar */}
      <div className="top-bar">
        <div className="logo">amazon<span>.in</span></div>

        <div className="location">
          <FaMapMarkerAlt />
          <div>
            <p>Delivering to Mumbai 400017</p>
            <span>Update location</span>
          </div>
        </div>

        <div className="search-bar">
          <select>
            <option>All</option>
            <option>Electronics</option>
            <option>Fashion</option>
          </select>
          <input type="text" placeholder="Search Amazon.in" />
          <button><FaSearch /></button>
        </div>

        <div className="lang">
          <img src="https://flagcdn.com/in.svg" alt="IN" />
          <span>EN</span>
        </div>

        {/* Account */}
        <div
          className="account-container"
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <div className="account">
            <p>Hello, {user ? (user.displayName || user.email) : 'sign in'}</p>
            <strong>Account & Lists</strong>
          </div>

          {isDropdownOpen && (
            <div className="account-dropdown">
              {!user ? (
                <>
                  <Link to="/signin" className="signin-btn">Sign in</Link>
                  <p>New customer? <Link to="/signin">Start here.</Link></p>
                </>
              ) : (
                <>
                  <button className="signin-btn" onClick={handleSignOut}>Sign Out</button>
                  <p>Welcome back!</p>
                </>
              )}
              <hr />
              <div className="dropdown-columns">
                <div>
                  <strong>Your Lists</strong>
                  <a href="#">Create a List</a>
                  <a href="#">Find a List or Registry</a>
                </div>
                <div>
                  <strong>Your Account</strong>
                  <a href="#">Account</a>
                  <a href="#">Orders</a>
                  <a href="#">Recommendations</a>
                  <a href="#">Browsing History</a>
                  <a href="#">Watchlist</a>
                  <a href="#">Kindle Unlimited</a>
                  <a href="#">Music Library</a>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="orders">
          <p>Returns</p>
          <strong>& Orders</strong>
        </div>

        <div className="cart">
          <FaShoppingCart />
          <strong>Cart</strong>
        </div>
        <div className="smartspend-link">
        <Link to="/dashboard">
          <strong>SmartSpend</strong>
        </Link>
        </div>

      </div>
      
      {/* Bottom Menu */}
      <nav className="nav-menu">
        <div className="nav-item"><FaBars /> All</div>
        <div className="nav-item">Fresh</div>
        <div className="nav-item">MX Player</div>
        <div className="nav-item">Sell</div>
        <div className="nav-item">Bestsellers</div>
        <div className="nav-item">Mobiles</div>
        <div className="nav-item">Prime</div>
        <div className="nav-item">Today's Deals</div>
        <div className="nav-item">Customer Service</div>
        <div className="nav-item">Fashion</div>
        <div className="nav-item">New Releases</div>
        <div className="nav-item">Amazon Pay</div>
        <div className="nav-item">Electronics</div>
        <div className="nav-item">Home & Kitchen</div>
        <div className="nav-item">Computers</div>
        <div className="nav-item">Car & Motorbike</div>
        <div className="nav-item">Books</div>
      </nav>
    </header>
  );
};

export default Header;
