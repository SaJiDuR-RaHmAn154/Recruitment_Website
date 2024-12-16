import React from "react";
import { useContext } from "react";
import { Context } from "../../main";
import { Navigate } from "react-router-dom";
import HeroSection from "./HeroSection";
import PopularCategories from "./PopularCategories";
import PopularCompanies from "./PopularCompanies";
import ScrollToTopButton from "../../components/ReturnToTop";

const Home = () => {
  const { isAuthorized } = useContext(Context);
  if (!isAuthorized) {
    return <Navigate to={"/login"} />;
  }
  return (
    <>
      <section className="homePage page">
        <HeroSection />
        <PopularCategories />
        <PopularCompanies />
        <ScrollToTopButton/>
      </section>
    </>
  );
};

export default Home;
