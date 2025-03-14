import React from "react";
import { FaSearch } from "react-icons/fa";
import "./Navbar.css"; // We'll create this CSS file

const Navbar = ({ searchTerm, setSearchTerm }) => {
  // Function to handle navigation (scrolling to sections)
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <h3>NesHacks</h3>
        </div>
        <div className="navbar-links">
          <a href="#" onClick={() => scrollToSection("home")}>
            Home
          </a>
          <a href="#" onClick={() => scrollToSection("about")}>
            About
          </a>
          <a href="#" onClick={() => scrollToSection("contact")}>
            Contact
          </a>
          <a href="#" onClick={() => scrollToSection("donate")}>
            Donate
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
