import React from "react";
import { Link, useLocation } from "react-router-dom";

const NotFound = () => {
  let currPath = useLocation();
  console.log(currPath.pathname);
  
  return (
    
    <section className="notfound">
      <div className="content">
        <img src="/notfound.png" />
        <Link to={"/"}>Return to Home</Link>
      </div>
    </section>
  );
};

export default NotFound;
