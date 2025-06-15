import React from "react";
import { FaSearch, FaShoppingCart, FaBars, FaMapMarkerAlt } from "react-icons/fa";
import "./Header.css";

const Header = () => {
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

        <div className="account">
          <p>Hello, sign in</p>
          <strong>Account & Lists</strong>
        </div>

        <div className="orders">
          <p>Returns</p>
          <strong>& Orders</strong>
        </div>

        <div className="cart">
          <FaShoppingCart />
          <strong>Cart</strong>
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
