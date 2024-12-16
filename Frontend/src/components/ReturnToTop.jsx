import React, { useState, useEffect } from "react";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {  // Show button after 300px scroll
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div
      className={`${
        isVisible ? "block" : "hidden"
      } fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full cursor-pointer transition-opacity`}
      onClick={scrollToTop}
    >
      ↑
    </div>
  );
};

export default ScrollToTopButton;
