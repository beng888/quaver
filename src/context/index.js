import React, { useContext, useState, useEffect, useRef } from "react";

const GlobalContext = React.createContext();

export const colors = ["#EFA4BF", "#F9E5AE", "#85BCE1", "#8EDBD3", "#C27628"];

export function GlobalContextWrapper({ children }) {
  const [navBG, setNavBG] = useState(false);
  const [navMarker, setNavMarker] = useState("start");
  const [isMobile, setIsMobile] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [darkenfooter, setDarkenfooter] = useState(false);
  const [returnUrl, setReturnUrl] = useState("/");

  const isMobileRef = useRef(false);
  const mainContainer = useRef(null);

  const _SetIsMobile = () => {
    isMobileRef.current = true;
    setIsMobile(true);
  };

  const resizeHandler = () => {
    if (window.innerWidth >= 768 && !isMobileRef.current) return;
    if (window.innerWidth < 768 && isMobileRef.current) return;
    if (window.innerWidth < 768 && !isMobileRef.current) return _SetIsMobile();
    if (window.innerWidth >= 768 && isMobileRef.current) location.reload();
  };

  useEffect(() => {
    if (mainContainer?.current?.clientWidth) {
      mainContainer?.current?.clientWidth > 768
        ? setIsMobile(false)
        : setIsMobile(true);
    }
  }, [mainContainer]);

  useEffect(() => {
    window.addEventListener("resize", resizeHandler);
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        navBG: [navBG, setNavBG],
        navMarker: [navMarker, setNavMarker],
        modalOpen: [modalOpen, setModalOpen],
        Darkenfooter: [darkenfooter, setDarkenfooter],
        ReturnUrl: [returnUrl, setReturnUrl],
        colors,
        isMobile,
      }}
    >
      <div ref={mainContainer}>{children}</div>
    </GlobalContext.Provider>
  );
}

export default function useGlobalContext() {
  return useContext(GlobalContext);
}
