'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FaBars, FaTimes } from 'react-icons/fa';

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-blue-600 text-white">
      {/* Logo */}
      <div className="text-2xl font-bold">
        <Link href="/">Logo</Link>
      </div>

      {/* Links for larger screens */}
      <div className="hidden md:flex space-x-6">
        <Link href="/" className="hover:text-gray-300">
          Home
        </Link>
        <Link href="/pay" className="hover:text-gray-300">
          Pay
        </Link>
        <Link href="/about" className="hover:text-gray-300">
          About
        </Link>
      </div>

      {/* Hamburger menu for smaller screens */}
      <button
        className="md:hidden text-2xl"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar for smaller screens */}
      {isMenuOpen && (
        <div className="absolute top-0 left-0 w-3/4 h-full bg-blue-700 text-white flex flex-col items-start p-6 space-y-4 z-50 shadow-lg">
          <Link href="/" className="hover:text-gray-300" onClick={toggleMenu}>
            Home
          </Link>
          <Link href="/pay" className="hover:text-gray-300" onClick={toggleMenu}>
            Pay
          </Link>
          <Link href="/about" className="hover:text-gray-300" onClick={toggleMenu}>
            About
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Nav;
