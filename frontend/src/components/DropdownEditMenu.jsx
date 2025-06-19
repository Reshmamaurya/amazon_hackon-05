import React, { useState, useRef, useEffect } from 'react';
import Transition from '../utils/Transition';

function DropdownEditMenu({
  children,
  align,
  ...rest
}) {

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef(null);
  const dropdown = useRef(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (!dropdownOpen || dropdown.current.contains(target) || trigger.current.contains(target)) return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  return (
    <div {...rest}>
      <button
        ref={trigger}
        className={`rounded-full hover:bg-slate-100 text-slate-500 transition-colors`}
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        <span className="sr-only">Menu</span>
        <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
          <circle cx="16" cy="16" r="2" />
          <circle cx="10" cy="16" r="2" />
          <circle cx="22" cy="16" r="2" />
        </svg>
      </button>
      <Transition
        show={dropdownOpen}
        tag="div"
        className={`origin-top-right z-10 absolute top-full min-w-64 bg-indigo-50 border border-indigo-200 text-slate-800 py-2 px-3 rounded-2xl shadow-2xl mt-2 transition-all duration-300 ease-out transform ${
          align === 'right' ? 'right-0' : 'left-0'
        }`}
        enter="transition transform duration-300 ease-out"
        enterStart="opacity-0 scale-90"
        enterEnd="opacity-100 scale-100"
        leave="transition transform duration-200 ease-in"
        leaveStart="opacity-100 scale-100"
        leaveEnd="opacity-0 scale-90"
      >
        <div ref={dropdown} onFocus={() => setDropdownOpen(true)} onBlur={() => setDropdownOpen(false)}>
          {children}
        </div>
      </Transition>
     


    </div>
  );
}

export default DropdownEditMenu;