import React, { useState, useEffect } from "react";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";

function Navbar({ searchTerm, setSearchTerm }) {
  const [isSticky, setIsSticky] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll effect for sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className={`navbar ${isSticky ? "sticky" : ""}`}>
      <div className="navbar-container">
        <div className="navbar-brand">NesHacks APK Store</div>

        <div className="hamburger-menu" onClick={toggleMobileMenu}>
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </div>

        <div
          className={`search-container ${mobileMenuOpen ? "mobile-search-visible" : ""}`}
        >
          <div className="search-wrapper">
            <input
              type="text"
              placeholder="Search apps..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <FaSearch className="search-icon" />
          </div>
        </div>

        <ul className={`nav-links ${mobileMenuOpen ? "mobile-menu-open" : ""}`}>
          <li>
            <a href="#home" onClick={() => setMobileMenuOpen(false)}>
              Home
            </a>
          </li>
          <li>
            <a href="#donate" onClick={() => setMobileMenuOpen(false)}>
              Donate
            </a>
          </li>
          <li>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)}>
              Contact
            </a>
          </li>
          <li>
            <a href="#about" onClick={() => setMobileMenuOpen(false)}>
              About
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
