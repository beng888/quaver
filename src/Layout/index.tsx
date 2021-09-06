import { useRouter } from "next/router";
import Image from "next/image";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Modal from "./Modal";
import MessengerCustomerChat from "react-messenger-customer-chat";
import dynamic from "next/dynamic";
import useGlobalContext from "@context/index";
import { useLocomotiveScroll } from "react-locomotive-scroll";
import { useEffect, useState } from "react";
import delivery from "@images/delivery.png";
import delivery_schedule from "@images/delivery_schedule.png";
import order_process from "@images/order_process.png";
import { getEvents } from "@lib/data";
import { IEvents } from "@lib/interfaces";
import Icon from "@lib/icons";

export default function Layout({ children }) {
  const router = useRouter();
  const { pathname } = router;
  const { ShowSlider, SliderImages, Slide } = useGlobalContext();
  const [showSlider, setShowSlider] = ShowSlider;
  const [, setSliderImages] = SliderImages;
  const { scroll } = useLocomotiveScroll();
  const [events, setEvents] = useState(null);
  const [eventModal, setEventModal] = useState(false);

  const horizontal = pathname === "/gallery/[slug]" || pathname === "/[cakes]";

  const Slider = dynamic(() => import("@components/Slider"), {
    loading: () => <b>Loading...</b>,
  });

  const deliverySlide = [
    {
      url: delivery_schedule,
      alt: "delivery_schedule",
    },
    {
      url: order_process,
      alt: "order_process",
    },
  ];

  useEffect(() => {
    if (showSlider) scroll?.stop();
    if (!showSlider) scroll?.start();
  }, [showSlider]);

  useEffect(() => {
    (async () => {
      const events: { event: IEvents | null } = await getEvents();

      setEvents(events);

      setTimeout(() => {
        setEventModal(true);
      }, 5000);

      // return setTimeout(() => {
      //   setEventModal(false);
      // }, 15000);
    })();
  }, []);

  const currentDate = new Date().toJSON().slice(0, 10);
  const from = (date) => new Date(date);
  const to = (date) => new Date(date);
  const today = new Date(currentDate);

  const activeEvent = events?.events?.find(
    (e) => today > from("2021/09/06") && today < to(e.endingDate)
  );

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
        <div
          onClick={() => {
            setShowSlider(true);
            setSliderImages(deliverySlide);
          }}
          className="h-24 w-24 z-50 relative scale-50 transform origin-bottom-left cursor-pointer duration-500 md:hover:scale-100"
        >
          <Image src={delivery} alt="delivery" layout="fill" />
        </div>
      </div>

      <MessengerCustomerChat
        pageId="113417067114042"
        appId="1242799936147703"
      />
      {/* activeEvent */}

      <div
        className={`fixed inset-0 w-full h-full flex items-center bg-black/70 z-50 duration-500 ease-out ${
          activeEvent && eventModal
            ? "opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <Icon
          onClick={() => setEventModal(false)}
          type="close"
          className="w-9 h-9 bg-tertiary rounded-full top-[2vw] right-[2vw] fixed cursor-pointer z-40"
          stroke="ghostwhite"
          strokeWidth={10}
        />
        <div
          className={`${
            activeEvent && eventModal
              ? "translate-y-0 opacity-100"
              : "translate-y-1/4 opacity-0"
          } duration-1000 ease-out transform h-[95%] w-full relative`}
        >
          {activeEvent && (
            <Image
              src={activeEvent.image.url}
              alt={activeEvent.image.fileName}
              layout="fill"
              objectFit="contain"
            />
          )}
        </div>
      </div>
    </div>
  );
}
