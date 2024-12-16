import React from "react";
import { Link, useLocation } from "react-router-dom";
import ScrollToTopButton from "../../components/ReturnToTop";

const NotFound = () => {
  let currPath = useLocation();
  console.log(currPath.pathname);
  
  return (
    
    <section className="notfound">
      <div className="content">
        <img src="/notfound.png" />
        <Link to={"/"} className="mb-10">Return to Home</Link>
      </div>
      <ScrollToTopButton/>
    </section>
  );
};

export default NotFound;
