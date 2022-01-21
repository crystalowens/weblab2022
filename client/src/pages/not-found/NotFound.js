import React from "react";
import "./NotFound.css"; 

const NotFound = () => {
  return (
    <div>
      <h1>404 Not Found</h1>
      <p>The page you requested couldn't be found.</p>
      <a href="\game\" className = "Link404"> Go to game page </a>
    </div>
  );
};

export default NotFound;
