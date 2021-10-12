import React, { useState } from "react";
import Image from "next/image";
import useGlobalContext from "@context/index";

export default function ItemImage({ i, I, g }) {
  const { ShowSlider, SliderImages, Slide } = useGlobalContext();
  const [showImage, setShowImage] = useState(false);
  const [, setShowSlider] = ShowSlider;
  const [, setSliderImages] = SliderImages;
  const [, setSlide] = Slide;
  return (
    <div
      data-scroll
      data-scroll-class="show-on-load"
      className={`duration-1000 ${
        showImage ? "show opacity-100" : "opacity-0"
      }`}
    >
      <Image
        src={i.url}
        alt={i.fileName}
        layout="intrinsic"
        height={300}
        width={300}
        objectFit="cover"
        className="cursor-pointer"
        onLoad={() => setShowImage(true)}
        onClick={() => {
          setShowSlider(true);
          setSliderImages(g.images);
          setSlide(I);
        }}
      />
    </div>
  );
}
