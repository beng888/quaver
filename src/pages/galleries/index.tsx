import useGlobalContext from "@context/index";
import Image from "next/image";
import router from "next/router";
import React, { useEffect } from "react";
import { useLocomotiveScroll } from "react-locomotive-scroll";
import { sweetTemptations } from "@static/index";

export default function Galleries(galleries) {
  const { scroll } = useLocomotiveScroll();

  const { navMarker, ShowSlider, SliderImages, Slide } = useGlobalContext();

  const [, SetNavMarker] = navMarker;
  const [, setShowSlider] = ShowSlider;
  const [, setSliderImages] = SliderImages;
  const [, setSlide] = Slide;

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
        className="min-h-[75vh] text-9xl flex items-center"
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
      </div>
      {galleries?.galleries.map((g) => (
        <div key={g.slug}>
          <div className="bg-[#765FA5] h-[60vh] overflow-hidden relative">
            <div className="absolute text-7xl font-black text-white grid place-content-center inset-0 z-40">
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
              className="absolute inset-0 h-screen grid content-center z-0 mix-blend-overlay"
            >
              <Image
                src={g?.cake?.images?.[0]?.url}
                alt={g?.cake?.images?.[0]?.fileName}
                height={100}
                width={100}
                layout="responsive"
                objectFit="cover"
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
              <Image
                key={i.fileName}
                src={i.url}
                alt={i.fileName}
                layout="intrinsic"
                height={300}
                width={300}
                objectFit="cover"
                className="cursor-pointer"
                onClick={() => {
                  setShowSlider(true);
                  setSliderImages(g.images);
                  setSlide(I);
                }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
