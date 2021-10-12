import useGlobalContext from "@context/index";
import Image from "next/image";
import router from "next/router";
import React, { useEffect } from "react";
import { useLocomotiveScroll } from "react-locomotive-scroll";
import { sweetTemptations } from "@static/index";
import Icon from "@lib/icons";
import ItemImage from "./ItemImage";

export default function Galleries(galleries) {
  const { scroll } = useLocomotiveScroll();

  const { navMarker } = useGlobalContext();

  const [, SetNavMarker] = navMarker;

  useEffect(() => {
    scroll?.on("call", (i) => SetNavMarker(i));
  }, [scroll, SetNavMarker]);

  return (
    <div
      id="gallery"
      data-scroll
      data-scroll-repeat
      data-scroll-offset={"50%,50%"}
      data-scroll-call="gallery"
    >
      <div
        data-scroll
        data-scroll-repeat
        data-scroll-class="show-contact"
        className="mt-20 py-[10vw] text-9xl flex flex-col items-center"
      >
        <svg
          viewBox="0 0 911.253 140.401"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full p-[5vw] overflow-visible"
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
            {sweetTemptations}
          </g>
        </svg>
        <Icon
          onClick={() => scroll?.scrollTo("#gallery-start")}
          type="chevron"
          className="h-8 w-8 transform hidden xl:block rotate-90 animate-pulse text-transparent fill-current"
          stroke="#765FA5"
          strokeWidth={15}
        />
      </div>
      <div id="gallery-start" />
      {galleries?.galleries.map((g) => (
        <div key={g.slug}>
          <div className="bg-[#765FA5] h-[60vh] overflow-hidden relative">
            <div className="absolute text-center text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white grid place-content-center inset-0 z-40">
              <p
                data-scroll
                data-scroll-repeat
                data-scroll-class="show"
                onClick={() => router.push(`/gallery/${g.slug}`)}
                className="cursor-pointer opacity-0 duration-1000 delay-150"
              >
                {g.title}
              </p>
            </div>
            <div
              data-scroll
              data-scroll-speed={-7}
              className="relative h-screen w-screen grid content-center z-0 mix-blend-overlay"
            >
              <Image
                src={g?.cake?.images?.[0]?.url}
                alt={g?.cake?.images?.[0]?.fileName}
                layout="fill"
                objectFit="cover"
                objectPosition="center"
              />
            </div>
          </div>
          <div
            data-scroll
            data-scroll-repeat
            data-scroll-class="show"
            className="flex h-full w-full flex-wrap justify-center gap-2 opacity-0 duration-1000 delay-150 my-[10vw]"
          >
            {g.images.map((i, I) => (
              <ItemImage i={i} I={I} g={g} key={i.fileName} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
