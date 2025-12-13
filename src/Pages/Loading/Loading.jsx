import React from "react";
// import "./index.css"; // Make sure this imports your CSS file

const Loading = () => {
  return (
    <div className="loading-container">
      {/* Spinning Circle */}
      <div className="spinner"></div>

      {/* Loading Text */}
      <h1 className="loading-text">Loading, Please Wait...</h1>

      {/* Bouncing Dots */}
      <div className="dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default Loading;
