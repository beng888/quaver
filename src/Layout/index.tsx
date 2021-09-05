import { useRouter } from "next/router";
import Image from "next/image";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Modal from "./Modal";
import MessengerCustomerChat from "react-messenger-customer-chat";
import dynamic from "next/dynamic";
import useGlobalContext from "@context/index";
import { useLocomotiveScroll } from "react-locomotive-scroll";
import { useEffect } from "react";
import delivery from "@images/delivery.png";

export default function Layout({ children }) {
  const router = useRouter();
  const { pathname } = router;
  const { ShowSlider } = useGlobalContext();
  const [showSlider] = ShowSlider;
  const { scroll } = useLocomotiveScroll();

  const horizontal = pathname === "/gallery/[slug]" || pathname === "/[cakes]";

  const Slider = dynamic(() => import("@components/Slider"), {
    loading: () => <b>Loading...</b>,
  });

  useEffect(() => {
    if (showSlider) scroll?.stop();
    if (!showSlider) scroll?.start();
  }, [showSlider]);

  return (
    <div
      className={`${horizontal && "md:block"} ${
        horizontal && "md:max-w-max"
      } min-h-screen max-w-[100vw]  overflow-x-hidden bg-pink-50 flex flex-col `}
    >
      {/* {pathname !== "/[cakes]/[slug]" && <Navbar />} */}
      <Navbar />

      {pathname === "/" && <Modal />}

      <div
        className={`${
          !showSlider && "opacity-0 pointer-events-none"
        } fixed duration-500 z-50 inset-0 bg-[#EBE6F9] bg-opacity-90`}
      >
        {showSlider && <Slider />}
      </div>

      {children}

      {pathname !== "/[cakes]/[slug]" && <Footer pathname={pathname} />}

      <div className="fixed left-2 bottom-2">
        <div className="h-24 w-24 z-50 relative scale-50 transform origin-bottom-left cursor-pointer duration-500 hover:scale-100">
          <Image src={delivery} alt="delivery" layout="fill" />
        </div>
      </div>

      <MessengerCustomerChat
        pageId="113417067114042"
        appId="1242799936147703"
      />
    </div>
  );
}
