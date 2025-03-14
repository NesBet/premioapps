import React from "react";
import { FaSearchMinus } from "react-icons/fa";
import "./NoResultsFound.css";

const NoResultsFound = ({ searchTerm, resetSearch }) => {
  return (
    <div className="no-results">
      <FaSearchMinus className="no-results-icon" />
      <h3>No APKs Found</h3>
      <p>
        Sorry, we couldn't find any APKs matching "<strong>{searchTerm}</strong>
        ".
      </p>
      <p>Try searching with different keywords or check the spelling.</p>
      <button className="reset-search-btn" onClick={resetSearch}>
        Clear Search
      </button>
    </div>
  );
};

export default NoResultsFound;
