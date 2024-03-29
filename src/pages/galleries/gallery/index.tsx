import useGlobalContext from "@context/index";
import { splitText } from "@helpers/index";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Item from "./Item";
import { useLocomotiveScroll } from "react-locomotive-scroll";
import Icon from "@lib/icons";
import ItemMobile from "./ItemMobile";

export default function Gallery({ data }) {
  const divRef = useRef(null);
  const containerRef = useRef(null);
  const { isMobile, navMarker, ReturnUrl } = useGlobalContext();
  const { scroll } = useLocomotiveScroll();
  const [, setReturnUrl] = ReturnUrl;
  const [, SetNavMarker] = navMarker;

  useEffect(() => {
    if (isMobile && scroll) location.reload();
  }, [isMobile]);

  useEffect(() => {
    // divRef.current.style.fontSize = `${
    //   document.getElementById("gallery-container")?.clientWidth / 10
    // }px`;

    setTimeout(() => {
      divRef.current.style.fontSize = `${
        document.getElementById("gallery-container")?.clientWidth / 15
      }px`;
      divRef.current.style.opacity = 1;
    }, 1);

    // setTimeout(() => {
    //   containerRef.current.style.maxWidth = `${
    //     document.getElementById("gallery-container")?.clientWidth
    //   }px`;
    // }, 2000);

    // console.log(document.getElementById("gallery-container")?.clientWidth);
  }, []);

  useEffect(() => {
    setReturnUrl(`/${data?.cake?.category?.slug}/${data?.cake?.slug}`);
  }, [data, setReturnUrl]);

  useEffect(() => {
    scroll?.on("call", (i) => SetNavMarker(i));
  }, [scroll, SetNavMarker]);

  const shuffled = !isMobile
    ? data.images.sort(() => 0.5 - Math.random())
    : data.images;

  return (
    <div
      id="cakes"
      data-scroll
      data-scroll-repeat
      data-scroll-offset={"50%,50%"}
      data-scroll-call="cakes"
    >
      <div
        ref={containerRef}
        id="gallery-container"
        className={`${
          isMobile && "hidden"
        } w-full min-w-[100vw] h-screen flex gap-[4vw] pt-16 overflow-hidden px-[12vw] relative`}
      >
        <div
          ref={divRef}
          className="absolute opacity-0 inset-0 w-full h-full grid place-content-center pointer-events-none select-none text-gray-400"
        >
          {data.title}
        </div>
        <div className="grid gap-[4vw] grid-rows-6 grid-flow-col h-[80vh]">
          {shuffled.slice(0, 15).map((d, i) => (
            <Item key={d.fileName} d={d} i={i} />
          ))}
        </div>
        <div className="grid gap-[4vw] grid-rows-6 grid-flow-col h-[80vh]">
          {shuffled.slice(15, 29).map((d, i) => (
            <Item key={d.fileName} d={d} i={i} />
          ))}
        </div>
        <div className="grid gap-[4vw] grid-rows-6 grid-flow-col h-[80vh]">
          {shuffled.slice(29, 43).map((d, i) => (
            <Item key={d.fileName} d={d} i={i} />
          ))}
        </div>
        <div className="grid gap-[4vw] grid-rows-6 grid-flow-col h-[80vh]">
          {shuffled.slice(43, 57).map((d, i) => (
            <Item key={d.fileName} d={d} i={i} />
          ))}
        </div>
        <div className="grid gap-[4vw] grid-rows-6 grid-flow-col h-[80vh]">
          {shuffled.slice(57, 70).map((d, i) => (
            <Item key={d.fileName} d={d} i={i} />
          ))}
        </div>
        <div className="grid gap-[4vw] grid-rows-6 grid-flow-col h-[80vh]">
          {shuffled.slice(70, 84).map((d, i) => (
            <Item key={d.fileName} d={d} i={i} />
          ))}
        </div>
        <div className="grid gap-[4vw] grid-rows-6 grid-flow-col h-[80vh]">
          {shuffled.slice(84, 98).map((d, i) => (
            <Item key={d.fileName} d={d} i={i} />
          ))}
        </div>
        <div className="grid gap-[4vw] grid-rows-6 grid-flow-col h-[80vh]">
          {shuffled.slice(98, 112).map((d, i) => (
            <Item key={d.fileName} d={d} i={i} />
          ))}
        </div>
        <div className="grid gap-[4vw] grid-rows-6 grid-flow-col h-[80vh]">
          {shuffled.slice(112, 126).map((d, i) => (
            <Item key={d.fileName} d={d} i={i} />
          ))}
        </div>
        <div className="grid gap-[4vw] grid-rows-6 grid-flow-col h-[80vh]">
          {shuffled.slice(126, 140).map((d, i) => (
            <Item key={d.fileName} d={d} i={i} />
          ))}
        </div>
      </div>

      <div className={`${!isMobile && "hidden"} pb-20`}>
        <div className="w-screen h-[80vw] mt-24 mb-12 overflow-hidden relative">
          <div
            className="absolute inset-0 z-10 bg-[#3F749D]"
            style={{ boxShadow: `0px 0px 15vw 7vw rgba(0,0,0,0.24) inset` }}
          >
            <p
              data-scroll
              data-scroll-class="show-wave"
              className="wave text-3xl font-black top-1/4 relative text-center px-4 text-white mx-auto max-w-max delay-1000"
              // style={{ background: "inherit" }}
            >
              {splitText(data?.title)}
            </p>
          </div>
          <div className="relative w-full h-full transform mix-blend-soft-light translate-x-1/4 translate-y-1/4 z-20">
            <Image
              src={data?.cake?.category?.image?.url}
              alt={data?.cake?.category?.image?.fileName}
              layout="fill"
            />
          </div>
        </div>

        <div className="min-h-screen grid grid-cols-2 sm:grid-cols-3 gap-4">
          {data?.images?.map((v, i) => (
            <ItemMobile v={v} i={i} key={v.fileName} data={data} />
          ))}
        </div>
        {/* <div
          className={`${
            slider ? "bg-black/50" : "invisible pointer-events-none"
          } duration-1000 inset-0 fixed z-50 flex items-center`}
        >
          <button
            className={`h-10 w-10 bg-tertiary absolute top-[2vw] right-[2vw] rounded-full cursor-pointer z-50`}
            onClick={() => {
              setSlider(false);
            }}
          >
            <Icon type="close" strokeWidth={5} stroke="white" />
          </button>
          <div
            className={`${
              !slider && "translate-y-[20%] opacity-0"
            } transform relative h-full w-full duration-1000`}
          >
            <Image
              src={data?.images[slide]?.url}
              alt={data?.images[slide]?.fileName}
              layout="fill"
              objectFit="contain"
              className="z-10 pointer-events-none select-none"
            />

            <div className="absolute z-20 text-5xl inset-0 flex items-center px-2 justify-between">
              <Icon
                type="chevron"
                stroke="gray"
                strokeWidth={10}
                onClick={() =>
                  setSlide(slide > 0 ? slide - 1 : slideLength - 1)
                }
                className="transform rotate-180 w-8 cursor-pointer bg-white/0 duration-200 rounded-full p-1 hover:bg-white/50 active:bg-white/50"
              />

              <Icon
                type="chevron"
                stroke="gray"
                strokeWidth={10}
                className="w-8 cursor-pointer bg-white/0 duration-200 rounded-full p-1 hover:bg-white/50 active:bg-white/50"
                onClick={() =>
                  setSlide(slide >= slideLength - 1 ? 0 : slide + 1)
                }
              />
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
