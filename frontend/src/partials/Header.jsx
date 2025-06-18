import React, { useState } from 'react';
import './Header.css';

import SearchModal from '../components/ModalSearch';
import Notifications from '../components/DropdownNotifications';
import Help from '../components/DropdownHelp';
import ThemeToggle from '../components/ThemeToggle';

function Header() {
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  return (
    <header className="custom-header">
      <div className="header-right">
        {/* Search */}
        <button
          className={`icon-button ${searchModalOpen ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            setSearchModalOpen(true);
          }}
          aria-label="Search"
        >
          <svg className="icon-svg" viewBox="0 0 14 14">
            <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7ZM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5Z" />
            <path d="m13.314 11.9 2.393 2.393a.999.999 0 1 1-1.414 1.414L11.9 13.314a8.019 8.019 0 0 0 1.414-1.414Z" />
          </svg>
        </button>
        <SearchModal
          id="search-modal"
          searchId="search"
          modalOpen={searchModalOpen}
          setModalOpen={setSearchModalOpen}
        />

        {/* Notifications */}
        <div className="icon-button" aria-label="Notifications">
          <Notifications align="right" />
        </div>

        {/* Help */}
        <div className="icon-button" aria-label="Help">
          <Help align="right" />
        </div>

        {/* Theme Toggle */}
        <div className="icon-button" aria-label="Theme">
          <ThemeToggle />
        </div>

        
      </div>
    </header>
  );
}

export default Header;
