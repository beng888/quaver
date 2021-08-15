import { useRouter } from "next/router";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Modal from "./Modal";
import MessengerCustomerChat from "react-messenger-customer-chat";
import { useEffect, useRef, useState } from "react";
import { useLocomotiveScroll } from "react-locomotive-scroll";
import useGlobalContext from "@context/index";

export default function Layout({ children }) {
  const router = useRouter();
  const { pathname } = router;
  const { scroll } = useLocomotiveScroll();
  const { isMobile } = useGlobalContext();
  const [state, setState] = useState(false);

  console.log("%c⧭", "color: #73998c", scroll);

  console.log("%c%s", "color: yellow", isMobile);

  const ref = useRef(false);

  useEffect(() => {
    if (isMobile && state) {
      scroll?.destroy();
    }
    if (!isMobile && state) {
      scroll?.init();
      location.reload();
    }

    scroll?.update();

    setState(true);
  }, [isMobile]);

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col md:block">
      {pathname !== "/[cakes]/[slug]" && <Navbar />}

      {pathname === "/" && <Modal />}

      {children}

      {pathname !== "/[cakes]/[slug]" && <Footer pathname={pathname} />}

      <MessengerCustomerChat
        pageId="150793413803258"
        appId="293340379212840"
        // htmlRef="<REF_STRING>"
      />
    </div>
  );
}
