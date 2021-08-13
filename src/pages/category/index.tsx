import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useLocomotiveScroll } from "react-locomotive-scroll";
import useGlobalContext from "@context/index";
import { splitText } from "@helpers/index";

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

  const resizeHandler = () => {
    setWidth(window.innerWidth);

    setTimeout(() => {
      if (!isMobile && window.innerWidth >= 768) return;
      if (isMobile && window.innerWidth < 768) return;
      if (!isMobile && window.innerWidth < 768) {
        return location.reload();
      }
      if (isMobile && window.innerWidth >= 768) {
        return location.reload();
      }
    }, 250);
  };

  const scrollHandler = () => {
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

  const slideRef = useRef(null);

  if (isMobile)
    return (
      <div className="w-full h-[fit-content]">
        <div id="start" className="relative h-[80vw] w-[80vw] mx-auto">
          <Image
            src={`${data.image.url}`}
            alt={data.image.fileName}
            objectFit="contain"
            layout="responsive"
            height={500}
            width={500}
          />
        </div>

        <p
          data-scroll
          data-scroll-class="show-wave"
          className="wave text-center capitalize text-7xl tracking-wide sm:text-8xl lg:text-8xl xl:text-9xl font-serif mb-8"
          style={{ color: color, textShadow: "1px 1px 3px rgba(0,0,0,0.6)" }}
        >
          {splitText(data?.title)}
        </p>

        <div id="cakes" className="grid place-content-center gap-12 my-24">
          {data?.cakes?.map((c, i) => (
            <div key={c.images[0].fileName} className="relative w-96 h-96">
              <Image
                layout="fill"
                src={c.images[0].url}
                alt={c.images[0].fileName}
              />
              <div className="absolute font-mono h-[fit] text-center bg-secondary/70 text-white text-2xl bottom-0 w-full">
                {c.title}
              </div>
            </div>
          ))}
        </div>
      </div>
    );

  return (
    <div className="relative w-[fit-content] h-screen pr-[15vw] mr-[-1px]">
      <div className="flex gap-[2vw] items-end h-[80%]">
        <div
          id="start"
          data-scroll
          data-scroll-repeat
          data-scroll-offset="50%,50%"
          data-scroll-call={"start"}
          className="w-[60vw] flex flex-col justify-center items-center h-full text-5xl capitalize transform translate-y-[10%]"
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
            className="wave text-5xl tracking-wide sm:text-8xl lg:text-8xl xl:text-9xl font-serif mb-8"
          >
            {splitText(data?.title)}
          </p>
        </div>

        <div
          id="cakes"
          data-scroll
          data-scroll-repeat
          data-scroll-offset="80%,80%"
          data-scroll-call={"cakes"}
          className="flex gap-x-12 h-full items-end"
        >
          <div
            className={`absolute inset-0 bg-black duration-1000 ${
              isFocused !== null ? "bg-opacity-70" : "bg-opacity-0"
            }`}
          />
          {data?.cakes?.map((c, i) => (
            <div
              ref={slideRef}
              key={c.images[0].fileName}
              tabIndex={i}
              onClick={() =>
                scroll.scrollTo(`#cake-${i}`, {
                  offset: (slideRef?.current?.offsetWidth - width) / 2,
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
              className={`w-[60vh] duration-500 relative h-[80%] cursor-pointer  ${
                isFocused !== null && slide - 1 !== i && "filter brightness-50"
              }  ${slide - 1 === i && "shadow-2xl"}`}
            >
              <Image
                data-scroll
                data-scroll-repeat
                data-scroll-call={i + 1}
                data-scroll-offset="50%,50%"
                layout="fill"
                src={c.images[0].url}
                alt={c.images[0].fileName}
              />

              {c.images.map((i) => {
                <div className="h-96 w-96">{i.fileName}</div>;
              })}
              {c.images.slice(1).map((img, I) => (
                <div
                  key={c.images[0].fileName}
                  className={`${
                    isFocused === i && slide - 1 === i && "z-30 opacity-100"
                  } absolute h-full w-full pointer-events-none flex justify-center opacity-0 items-center duration-[1.5s]`}
                  style={{
                    transform:
                      isFocused === i &&
                      slide - 1 === i &&
                      `translate(${getRandom(-50, 50)}%,${getRandom(
                        -50,
                        50
                      )}%)`,
                  }}
                >
                  <div
                    className={`h-[30%] w-[30%] relative duration-[2s]`}
                    style={{ boxShadow: "5px 5px 5px rgba(0,0,0,0.5)" }}
                  >
                    <Image layout="fill" src={img.url} alt={img.fileName} />
                  </div>
                </div>
              ))}
              <p
                className={`${slide - 1 === i ? "opacity-100" : "opacity-0"} ${
                  isFocused === i && "text-white"
                } duration-500 absolute text-3xl font-sans bottom-0 transform translate-y-full z-40 w-max italic font-medium hover:text-secondary`}
                style={{
                  textShadow: isFocused === i && "0px 0px 7px rgba(0,0,0,0.9)",
                }}
              >
                See more...
              </p>
            </div>
          ))}
        </div>
      </div>
      <div id="target" className="flex items-center h-[20%]">
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
