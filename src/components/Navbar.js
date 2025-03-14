import React from "react";
import { FaSearch } from "react-icons/fa";
import "./Navbar.css";

const Navbar = ({ searchTerm, setSearchTerm }) => {
  // Function to handle navigation (scrolling to sections)
  const scrollToSection = (e, id) => {
    e.preventDefault(); // Prevent default behavior
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <h3>NESHACKS</h3>
        </div>
        <div className="navbar-links">
          <a href="#home" onClick={(e) => scrollToSection(e, "home")}>
            Home
          </a>
          <a href="#contact" onClick={(e) => scrollToSection(e, "contact")}>
            Contact
          </a>
          <a href="#donate" onClick={(e) => scrollToSection(e, "donate")}>
            Donate
          </a>
          <a href="#about" onClick={(e) => scrollToSection(e, "about")}>
            About
          </a>
        </div>
        <div className="navbar-search">
          <div className="search-input-container">
            <input
              type="text"
              placeholder="Search APKs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="search-icon" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
