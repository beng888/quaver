import React, { useState } from "react";
import Image from "next/image";
import useGlobalContext from "@context/index";

export default function ItemMobile({ v, i, data }) {
  const { ShowSlider, SliderImages, Slide } = useGlobalContext();
  const [, setShowSlider] = ShowSlider;
  const [, setSliderImages] = SliderImages;
  const [, setSlide] = Slide;
  const [showImage, setshowImage] = useState(false);

  return (
    <div
      data-scroll
      data-scroll-class="show-on-load"
      onClick={() => {
        setShowSlider(true);
        setSliderImages(data?.images);
        setSlide(i);
      }}
      className={`w-[90%] h-[45vw] sm:h-[30vw] mx-auto relative cursor-pointer  duration-1000 ${
        showImage ? "show opacity-100" : "opacity-0"
      }`}
    >
      <Image
        src={v.url}
        alt={v.fileName}
        layout="fill"
        objectFit="cover"
        onLoad={() => setshowImage(true)}
      />
    </div>
  );
}
