import React, { useContext } from "react";
import { Context } from "../../main";
import { Link } from "react-router-dom";
import { FaFacebookF, FaYoutube, FaLinkedin } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

const Footer = () => {
  const { isAuthorized } = useContext(Context);
  return (
    <footer className={isAuthorized ? "footerShow" : "hidden"}>
      <div className="font-semibold">
        Contact us :
        <Link to={"/"} target="_blank">
          <FaFacebookF />
        </Link>
        <Link to={"/"} target="_blank">
          <FaYoutube />
        </Link>
        <Link to={"/"} target="_blank">
          <FaLinkedin />
        </Link>
        <Link to={"/"} target="_blank">
          <RiInstagramFill />
        </Link>
      </div>
      <div className="font-semibold">&copy; 2024, All Rights Reserved By Sajid.</div>
    </footer>
  );
};

export default Footer;
