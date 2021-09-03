import useGlobalContext from "@context/index";
import { useLocomotiveScroll } from "react-locomotive-scroll";
import { splitText } from "@helpers/index";

import * as cake from "@static/index";

import Image from "next/image";
import Link from "next/link";

import logo from "@images/logo.png";
import portrait from "@images/portrait.jpg";
import about from "@images/about-pic.png";
import gallery from "@images/gallery-pic.webp";
// import vegan from "@images/vegan@3x.png";
// import gluten from "@images/gluten-2@3x.png";
// import sugar from "@images/sugar@3x.png";
// import dairy from "@images/dairy@3x.png";

import { useEffect } from "react";

export default function Home({ data }) {
  const { categories } = data;

  const { scroll } = useLocomotiveScroll();

  // const variants = [
  //   { img: vegan, label: "vegan" },
  //   { img: gluten, label: "gluten" },
  //   { img: sugar, label: "sugar" },
  //   { img: dairy, label: "dairy" },
  // ];

  const { navBG, isMobile, navMarker, modalOpen } = useGlobalContext();
  const [ValModalOpen, SetModalOpen] = modalOpen;
  const [ValNavBg, SetNavBG] = navBG;
  const [, SetNavMarker] = navMarker;

  scroll?.on("call", (obj) => {
    if (obj === "navBG-TRUE" && !ValNavBg) SetNavBG(true);
    if (obj === "navBG-FALSE" && ValNavBg) SetNavBG(false);
    if (obj === "cakes") SetNavMarker(obj);
    if (obj === "start") SetNavMarker(obj);
    if (obj === "gallery") SetNavMarker(obj);
    if (obj === "about") SetNavMarker(obj);
    if (obj === "contact") SetNavMarker(obj);
  });

  useEffect(() => {
    scroll?.update();
    scroll?.start();
    if (ValModalOpen) scroll?.stop();
  }, [ValModalOpen, scroll]);

  return (
    <main className="relative">
      <section
        data-scroll
        data-scroll-repeat
        data-scroll-offset="100%, 50%"
        data-scroll-call={"start"}
        id="start"
        className="relative grid content-center h-screen"
      >
        <div data-scroll data-scroll-repeat data-scroll-call={"navBG-FALSE"} />
        <div className="ml-[5vw] mt-80 lg:mt-0 w-max z-40">
          <p
            data-scroll
            data-scroll-class="show-fade"
            className="fade text-4xl sm:text-5xl md:text-[7vw] tracking-widest font-serif"
          >
            {splitText("SWEET TREATS TO", 100, false, true)}
            <br />
            {splitText("SATISFY YOUR", 100, false, true)} <br />
            {splitText("CRAVINGS", 100, false, true)}
          </p>
        </div>
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 67"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full text-indigo-300 transform fill-current opacity-20"
          style={{ width: "198%", transform: "translateX(-10%)" }}
        >
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
        <div
          data-scroll
          data-scroll-class="show"
          className="absolute right-0 duration-1000 opacity-0 transform w-2/3 sm:w-1/2 h-full translate-x-1/2 delay-300 z-10 pt-[5vw]"
        >
          <div className="relative h-full transform -translate-y-24 sm:h-4/5 sm:-translate-y-0">
            <Image
              src={logo}
              alt="logo"
              data-scroll
              data-scroll-speed={5}
              objectFit="contain"
              layout="fill"
            />
          </div>
        </div>
      </section>
      <p
        data-scroll
        data-scroll-offset="40%"
        data-scroll-class="show"
        className="text-center mt-36 fade text-2xl sm:text-3xl md:leading-[5rem] font-serif md:text-6xl px-[15vw] md:max-w-prose opacity-0 duration-[2s]"
        // style={{ lineHeight: "5vw" }}
      >
        The best things in life are Sweet! Quaver Sweet Temptations specializes
        in delicious desserts for all of the special moments in your life!
      </p>
      <section
        id="cakes"
        className="h-[fit-content]  my-[20vw] "
        data-scroll
        data-scroll-repeat
        data-scroll-offset="80%, 50%"
        data-scroll-call={"cakes"}
      >
        <div data-scroll data-scroll-repeat data-scroll-call={"navBG-TRUE"} />
        <div className="grid md:grid-cols-2 content-center gap-x-[5vw] gap-y-[50vw] sm:gap-y-[25vw] mx-auto w-[fit-content]">
          {categories.map((c, i) => (
            <div
              data-scroll
              data-scroll-class="show-categories"
              data-scroll-offset={i % 2 !== 0 && !isMobile ? "60%" : "15%"}
              key={i}
              className={`${
                i % 2 !== 0 && "md:translate-y-full trans"
              } w-full h-64 md:h-full md:w-[40vw] relative max-w-lg transform scale-50 duration-[2s] cursor-pointer group pointer-events-none`}
            >
              <div className="relative flex items-center justify-center w-full h-full">
                {c.image?.url && (
                  <Image
                    src={c.image?.url}
                    alt={c.image?.fileName}
                    objectFit="contain"
                    layout="fill"
                    className="duration-1000 ease-out pointer-events-auto group-hover:brightness-50 filter z-0"
                  />
                )}
                <Link href={`/?slug=${c.slug}`} as={`/${c.slug}`}>
                  <a
                    onClick={() => SetModalOpen(true)}
                    className="absolute text-xl inset-0 grid place-content-center text-white duration-1000 opacity-0 invisible lg:text-2xl group-hover:opacity-100 group-hover:visible pointer-events-auto"
                  >
                    See more...
                  </a>
                </Link>
              </div>

              <div className="absolute w-full max-w-[90%] mx-auto inset-x-0 pt-4 duration-700 ease-out transform group-hover:-translate-y-full">
                {cake[c?.slug?.replace(/\-/g, "_")]}
              </div>

              <p className="mt-10 max-w-md text-center px-4 sm:text-base lg:text-2xl font-medium font-sans h-[20vw] relative transform -translate-x-1/4 opacity-0 ease-out group-hover:opacity-100 group-hover:translate-x-0 duration-1000">
                <q>{c.description}</q>
              </p>
            </div>
          ))}
        </div>
      </section>
      <section
        data-scroll
        data-scroll-repeat
        data-scroll-offset="80%, 50%"
        data-scroll-call={"about"}
        id="about"
        className="min-h-screen relative pb-[5vw]"
      >
        <svg
          id="wave"
          viewBox="0 0 1440 490"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full absolute top-0 z-0"
        >
          <path
            fill="#EBE6F9"
            d="M0,49L60,89.8C120,131,240,212,360,204.2C480,196,600,98,720,49C840,0,960,0,1080,8.2C1200,16,1320,33,1440,32.7C1560,33,1680,16,1800,32.7C1920,49,2040,98,2160,171.5C2280,245,2400,343,2520,343C2640,343,2760,245,2880,187.8C3000,131,3120,114,3240,130.7C3360,147,3480,196,3600,196C3720,196,3840,147,3960,138.8C4080,131,4200,163,4320,179.7C4440,196,4560,196,4680,179.7C4800,163,4920,131,5040,138.8C5160,147,5280,196,5400,253.2C5520,310,5640,376,5760,351.2C5880,327,6000,212,6120,163.3C6240,114,6360,131,6480,114.3C6600,98,6720,49,6840,57.2C6960,65,7080,131,7200,187.8C7320,245,7440,294,7560,261.3C7680,229,7800,114,7920,106.2C8040,98,8160,196,8280,228.7C8400,261,8520,229,8580,212.3L8640,196L8640,490L8580,490C8520,490,8400,490,8280,490C8160,490,8040,490,7920,490C7800,490,7680,490,7560,490C7440,490,7320,490,7200,490C7080,490,6960,490,6840,490C6720,490,6600,490,6480,490C6360,490,6240,490,6120,490C6000,490,5880,490,5760,490C5640,490,5520,490,5400,490C5280,490,5160,490,5040,490C4920,490,4800,490,4680,490C4560,490,4440,490,4320,490C4200,490,4080,490,3960,490C3840,490,3720,490,3600,490C3480,490,3360,490,3240,490C3120,490,3000,490,2880,490C2760,490,2640,490,2520,490C2400,490,2280,490,2160,490C2040,490,1920,490,1800,490C1680,490,1560,490,1440,490C1320,490,1200,490,1080,490C960,490,840,490,720,490C600,490,480,490,360,490C240,490,120,490,60,490L0,490Z"
          ></path>
        </svg>
        <div className="z-30 h-full px-12 md:px-0 md:text-xl xl:text-2xl grid md:grid-cols-7 w-full">
          <div
            className="m-8 md:mx-auto w-[50vw] h-[50vw] md:w-[40vw] md:h-[40vw] max-w-[500px] max-h-[500px] p-4 col-span-3 bg-[#FCF2F8]"
            style={{ clipPath: `circle(50% at 50% 50%)` }}
          >
            <div className="relative h-full w-full">
              <Image
                src={about}
                alt="about-pic"
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>
          <div className="h-full md:h-screen w-full relative col-span-4 grid place-content-end pr-[5vw]">
            <div
              data-scroll
              data-scroll-repeat
              data-scroll-class="show-contact"
            >
              <svg
                viewBox="0 0 419.4 126.75"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-24 lg:h-[10vw] p-2"
              >
                <g
                  strokeLinecap="round"
                  fillRule="evenodd"
                  fill="none"
                  style={{
                    strokeWidth: "0.4mm",
                  }}
                  className="path"
                >
                  {cake.about}
                </g>
              </svg>
            </div>
            <div>
              <p>
                Owned, operated and managed by Joyce Lucas and Ej Ampat. This
                home-based cake shop started out by producing blueberry, mango,
                oreo and chocomallows cheesecakes. In less than a year, they are
                now selling different variety of desserts and accepting
                customize cakes.
              </p>
              <br />
              <p>
                Quaver Sweet Temptations pleased to offer variety of products,
                including freshly baked Cupcakes, Cakes, Cookies and
                Cheesecakes, as well as DIY Cake Kit and Dessert for souvenirs.
              </p>
              <br />
              <p>Grab a bite and enjoy what we have to offer!</p>
            </div>
          </div>
        </div>
      </section>
      <section
        data-scroll
        data-scroll-repeat
        data-scroll-offset="80%, 50%"
        data-scroll-call={"gallery"}
        id="gallery"
        className="min-h-screen bg-[#EBE6F9] grid content-center relative"
      >
        <div className="bg-[#3F749D] h-[70vh] overflow-hidden relative">
          <Link href="/gallery">
            <a
              data-scroll
              data-scroll-repeat
              data-scroll-class="show-contact"
              className="inset-0 absolute grid content-center bg-[#EBE6F9] "
            >
              <svg
                viewBox="0 0 419.4 126.75"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-24 lg:h-[15vw] p-2 z-30 duration-500 gallery-path cursor-pointer max-w-3xl mx-auto"
              >
                <g
                  strokeLinecap="round"
                  fillRule="evenodd"
                  fill="none"
                  style={{
                    strokeWidth: "0.4mm",
                  }}
                  className="path"
                >
                  {cake.gallery}
                </g>
              </svg>
            </a>
          </Link>
          <div
            data-scroll
            data-scroll-speed={-7}
            className="absolute inset-0 h-screen grid content-center z-0 mix-blend-multiply"
          >
            <Image
              src={gallery}
              alt="gallery picture"
              height={100}
              width={100}
              layout="responsive"
              objectFit="cover"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
