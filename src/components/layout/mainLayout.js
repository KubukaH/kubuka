// import { ArrowCircleDownIcon } from "@heroicons/react/outline";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

import Footer from "../Footer";
import Navigation from "../navigation/index";
import AlertPopup from "../../alert/alert";

const MainLayout  = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    });
  }, [showButton]);

  return (
    <main>
      <Navigation />
      <div className="relative pt-[60px] md:pt-[70px] lg:pt-[80px] bg-white">
        <AlertPopup />
        <Outlet />
      </div>
      <Footer />
    </main>
  );
};

export default MainLayout;
