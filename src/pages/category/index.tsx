import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useLocomotiveScroll } from "react-locomotive-scroll";
import useGlobalContext from "@context/index";
import { splitText } from "@helpers/index";
import Link from "next/link";

export default function Category({ data }) {
  const { isMobile, navMarker, Darkenfooter, colors } = useGlobalContext();
  const [width, setWidth] = useState(null);
  const [color] = useState(colors[Math.floor(Math.random() * colors?.length)]);

  const [slide, setSlide] = useState(0);
  const slides = data?.cakes?.length;
  const { scroll } = useLocomotiveScroll();
  const [, SetNavMarker] = navMarker;
  const [, setDarkenfooter] = Darkenfooter;
  const [isFocused, setIsFocused] = useState(null);
  const slideRef = useRef([]);

  useEffect(() => {
    if (isMobile && scroll) location.reload();
  }, [isMobile]);

  const resizeHandler = () => {
    setWidth(window.innerWidth);
  };

  const isFocusedRef = useRef(null);

  useEffect(() => {
    isFocusedRef.current = isFocused;
  }, [isFocused]);

  const scrollHandler = () => {
    slideRef.current[isFocusedRef.current]?.blur();
    setIsFocused(null);
    setDarkenfooter(false);
  };

  useEffect(() => {
    setWidth(window.innerWidth);

    scroll?.on("call", (i) => {
      if (i === "start" || i === "cakes" || i === "contact")
        return SetNavMarker(i);
      setSlide(i);
    });

    window.addEventListener("resize", resizeHandler);
    window.addEventListener("wheel", scrollHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
      window.removeEventListener("wheel", scrollHandler);
    };
  }, [scroll]);

  const getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  return (
    <div className="relative w-[fit-content] h-full md:h-screen pr-[15vw] mr-[-1px]">
      <div className="flex flex-col md:flex-row gap-20 items-center md:items-end h-[90%]">
        <div
          id="cakes"
          data-scroll
          data-scroll-repeat
          data-scroll-offset={"50%,50%"}
          data-scroll-call={"cakes"}
          className="w-[60vw] flex flex-col mt-20 md:mt-0 justify-center items-center h-[100vw] md:h-full text-5xl capitalize transform translate-y-[10%]"
          style={{ color: color, textShadow: "2px 2px 5px rgba(0,0,0,0.6)" }}
        >
          <div
            className="relative h-2/3 w-full transform translate-y-1/4 duration-1000 opacity-0"
            data-scroll
            data-scroll-class="show"
          >
            <Image
              src={`${data.image.url}`}
              alt={data.image.fileName}
              objectFit="contain"
              layout="fill"
              className="duration-1000 ease-out pointer-events-auto group-hover:brightness-50 filter z-0"
            />
          </div>

          <p
            data-scroll
            data-scroll-class="show-wave"
            className="wave whitespace-nowrap text-5xl tracking-wide sm:text-8xl lg:text-8xl xl:text-9xl font-serif mb-10"
          >
            {splitText(data?.title)}
          </p>
        </div>

        <div
          // id="cakes"
          data-scroll
          data-scroll-repeat
          data-scroll-offset="50%,50%"
          data-scroll-call={"cakes"}
          className="flex flex-col w-screen md:w-max md:flex-row gap-y-24 gap-x-12 h-full items-center md:items-end mb-48 md:mb-0"
        >
          <div
            className={`absolute inset-0 bg-black duration-1000 ${
              isFocused !== null ? "bg-opacity-70" : "bg-opacity-0"
            }`}
          />
          {data?.cakes?.map((c, i) => (
            <div
              ref={(el) => (slideRef.current[i] = el)}
              data-scroll
              data-scroll-repeat
              data-scroll-call={i + 1}
              data-scroll-offset="50%,50%"
              tabIndex={0}
              onClick={() =>
                scroll.scrollTo(`#cake-${i}`, {
                  offset: (slideRef?.current[0]?.offsetWidth - width) / 2,
                  duration: 500,
                })
              }
              onFocus={() => {
                setIsFocused(i);
                setDarkenfooter(true);
              }}
              onBlur={() => {
                setIsFocused(null);
                setDarkenfooter(false);
              }}
              id={`cake-${i}`}
              key={c.images[0].fileName}
              className="flex-col flex w-[70vw] md:w-[63vh] h-[90vw] md:h-[90%] max-w-[100vw] md:pb-12"
            >
              <div
                className={`duration-500 h-full w-full flex flex-col justify-end relative cursor-pointer group ${
                  isFocused !== null &&
                  slide - 1 !== i &&
                  "filter brightness-50"
                }  ${slide - 1 === i && "shadow-2xl"}`}
              >
                <Image
                  layout="fill"
                  objectFit="cover"
                  src={c.images[0].url}
                  alt={c.images[0].fileName}
                />

                <div className="relative pt-4 bg-gradient-to-t via-black/50 from-black/50 text-white p-2 bottom-0 w-full whitespace-normal text-center font-semibold">
                  <p className="text-3xl mb-2">{c.title}</p>
                  <p
                    className={`overflow-hidden duration-[2s] group-hover:max-h-96 h-auto max-h-0 ${
                      slide - 1 === i ? "" : ""
                    }`}
                  >
                    {c.description}
                  </p>
                </div>

                {/* {c.images.map((i) => {
                  <div className="h-96 w-96 absolute z-40">{i.fileName}</div>;
                })} */}
              </div>
              <div
                className={`${slide - 1 === i ? "opacity-100" : "opacity-0"} ${
                  isFocused === i && "text-white"
                } duration-500 relative text-3xl font-sans bottom-0 transform translate-y-full z-40 w-full text-center italic font-medium hover:text-secondary`}
                style={{
                  textShadow: isFocused === i && "0px 0px 7px rgba(0,0,0,0.9)",
                }}
              >
                <Link href={`/${data.slug}/${c.slug}`}>
                  <a className="w-max">See more...</a>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="fixed right-0 top-0 h-screen grid place-content-center w-[10vw] gap-4 pr-4 md:hidden">
        {data?.cakes?.map((c, i) => (
          <div
            onClick={() => {
              setIsFocused(i);
              setDarkenfooter(true);
              scroll.scrollTo(`#cake-${i}`, {
                offset: "-200%",
                duration: 500,
              });
            }}
            key={c.slug}
            className="h-5 w-5 rounded-full border-2 p-[1px] cursor-pointer"
          >
            <div
              className={`h-full w-full rounded-full border shadow duration-700 ${
                slide - 1 === i ? "bg-tertiary" : "bg-gray-400"
              }`}
            />
          </div>
        ))}
      </div>
      <div id="target" className="items-center h-[10%] hidden md:flex">
        <div
          className="w-screen"
          data-scroll
          data-scroll-sticky
          data-scroll-target="#target"
        >
          <div className="px-8 w-min ml-auto flex items-center gap-8">
            <div className=" w-[400px] h-[2.5px] bg-gray-300 overflow-hidden">
              <div
                style={{
                  width: `${(slide / slides) * 100}%`,
                }}
                className="h-[2.5px] bg-black duration-500"
              />
            </div>
            <div className="flex items-center gap-8">
              <b>{slide}</b>
              <span className="transform scale-y-150 -rotate-45 text-3xl">
                \
              </span>
              <b>{slides}</b>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
