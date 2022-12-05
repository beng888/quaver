import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import useGlobalContext from "@context/index";
import Icon from "@lib/icons";

export default function Slider() {
  const { ShowSlider, SliderImages, Slide, isMobile } = useGlobalContext();

  const [, setShowSlider] = ShowSlider;
  const [sliderImages] = SliderImages;
  const [slide] = Slide;

  const [current, setCurrent] = useState(slide);

  const lastSlide = useRef(null);

  useEffect(() => {
    lastSlide.current = current;
  }, [current]);

  const isInvisible = (i) => {
    return i !== current || i !== lastSlide.current;
  };

  const length = sliderImages.length - 1;

  // console.log(SliderImages?.[0]?.[0]?.alt);
  // console.log(SliderImages);

  return (
    <div className="fixed inset-0 text-4xl flex justify-center text-white z-50">
      <Icon
        onClick={() => setShowSlider(false)}
        type="close"
        className="w-9 h-9 bg-tertiary rounded-full top-[2vw] right-[2vw] fixed cursor-pointer z-40"
        stroke="ghostwhite"
        strokeWidth={10}
      />
      <div className="w-full flex h-[fit-content] mt-auto mb-12 md:my-auto justify-center gap-12 md:justify-between px-[5vw] z-10 pointer-events-none">
        <Icon
          type="chevron"
          stroke="white"
          strokeWidth={10}
          className="transform rotate-180 slide-button"
          onClick={() => {
            setCurrent(current > 0 ? current - 1 : length);
          }}
        />
        <Icon
          type="chevron"
          stroke="white"
          strokeWidth={10}
          className="slide-button"
          onClick={() => {
            setCurrent(current < length ? current + 1 : 0);
          }}
        />
      </div>

      {sliderImages.map((img, i) => (
        <div
          key={img.fileName}
          className={`
          ${
            (i === current && "duration-700 delay-300") ||
            (i === lastSlide.current && "duration-700")
          } 
          ${i !== current && "opacity-0 invisible"} 
          ${i !== current && i < current && "-translate-x-1/3"} 
          ${i !== current && i > current && "translate-x-1/3"} 
          ${i === 0 && current === length && "!translate-x-1/3"} 
          ${i === length && current === 0 && "!-translate-x-1/3"} 
          w-full h-full transform absolute flex justify-center`}
        >
          <div
            onClick={() => setShowSlider(false)}
            className="absolute inset-0 z-0"
          />

          <div
            onClick={() => {
              setCurrent(current < length ? current + 1 : 0);
            }}
            className="relative w-screen max-w-3xl h-full cursor-pointer md:shadow-2xl"
          >
            <Image
              src={img.url}
              alt={img.fileName}
              layout="fill"
              objectFit={`${
                SliderImages?.[0]?.[0]?.alt === "delivery_schedule" || isMobile
                  ? "contain"
                  : "cover"
              }`}
              className="z-10"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
