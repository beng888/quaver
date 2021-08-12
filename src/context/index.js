import React, { useContext, useState, useEffect } from "react";

const GlobalContext = React.createContext();

export function GlobalContextWrapper({ children }) {
  const [navBG, setNavBG] = useState(false);
  const [navMarker, setNavMarker] = useState("start");
  const [isMobile, setIsMobile] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [darkenfooter, setDarkenfooter] = useState(false);

  useEffect(() => {
    window.innerWidth > 768 ? setIsMobile(false) : setIsMobile(true);

    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) return setIsMobile(false);
      return setIsMobile(true);
    });
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        navBG: [navBG, setNavBG],
        navMarker: [navMarker, setNavMarker],
        modalOpen: [modalOpen, setModalOpen],
        Darkenfooter: [darkenfooter, setDarkenfooter],
        colors: ["#EFA4BF", "#F9E5AE", "#85BCE1", "#8EDBD3", "#C27628"],
        isMobile,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export default function useGlobalContext() {
  return useContext(GlobalContext);
}
