import Image from "next/image";
import useGlobalContext from "@context/index";
import React, { useRef, useState } from "react";
import Button from "@components/Button";
import Icon from "@lib/icons/index";
import Link from "next/link";

export default function Carousel({ data }) {
  const { colors, modalOpen, isMobile } = useGlobalContext();

  const [, SetModalOpen] = modalOpen;

  const [slide, setSlide] = useState(0);
  const slides = data?.cakes?.length;
  const COLORS = colors?.length;

  const BG = (i) => Math.round(((i + 1) / slides) * (COLORS - 1));

  const containerRef = useRef<HTMLDivElement>(null);

  const changeSlide = (e) => {
    containerRef.current.style.cursor = "grabbing";
    const downX = e.clientX;
    let moveX, opacity;

    function mouseMoveHandler(e) {
      moveX = e.clientX;
      opacity =
        1 - (moveX < downX ? downX - moveX : moveX - downX) / window.innerWidth;

      containerRef.current.style.opacity = opacity;
    }

    function mouseUpHandler(e) {
      const upX = e.clientX;

      if (upX < downX) setSlide(slide !== slides - 1 ? slide + 1 : 0);
      if (upX > downX) setSlide(slide !== 0 ? slide - 1 : slides - 1);

      containerRef.current.style.opacity = "1";
      containerRef.current.style.cursor = "grab";

      document.removeEventListener("mousemove", mouseMoveHandler);
      document.removeEventListener("mouseup", mouseUpHandler);
    }

    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler);
  };

  const galleryButton = (c) => (
    <Link href={`/gallery/${c.slug}`}>
      <a
        className="w-[fit-content] pointer-events-auto"
        onClick={() => SetModalOpen(false)}
      >
        <Button cls="w-[fit-content] select-auto bg-tertiary">
          See Gallery
        </Button>
      </a>
    </Link>
  );

  const arrows = (
    <>
      <Icon
        type="arrow"
        stroke="white"
        strokeWidth={7}
        className="w-10 h-7 md:h-full p-0 md:w-16 md:p-3 transform rotate-180 bg-[#B8CAD5]"
        onClick={() => setSlide(slide > 0 ? slide - 1 : slides - 1)}
      />
      <Icon
        type="arrow"
        stroke="white"
        strokeWidth={7}
        className="w-10 h-7 md:h-full p-0 md:w-16 md:p-3 bg-[#B8CAD5]"
        onClick={() => setSlide(slide < slides - 1 ? slide + 1 : 0)}
      />
    </>
  );

  return (
    <div
      ref={containerRef}
      onMouseDown={(e) => changeSlide(e)}
      className="cursor-[grab] w-full h-full"
    >
      <div className="flex flex-col-reverse md:flex-row md:px-6 justify-end relative h-full max-w-6xl mx-auto pointer-events-none select-none">
        <div className="z-10 relative md:absolute left-0 h-60 md:h-full md:px-4 flex flex-col  md:justify-center w-full md:w-[35%]">
          <div className="absolute w-full h-full md:h-[45%] md:min-h-[325px] my-auto z-10">
            {data?.cakes?.map((c, i) => (
              <div
                key={c.title}
                className={`${
                  i === slide ? "opacity-100" : "opacity-0 duration-500"
                }`}
              >
                <div
                  className={`${
                    slide === i
                      ? "z-10  opacity-100 delay-[1.5s]"
                      : "opacity-0 duration-1000"
                  }  absolute transform flex flex-col w-full h-full p-[2vw] pb-4 text-left bg-white`}
                >
                  <div
                    className="inset-y-0 absolute w-2 left-0"
                    style={{
                      backgroundColor: colors[BG(i)],
                    }}
                  />

                  <div className="grid pl-2 h-full">
                    <p className="flex justify-between font-semibold md:text-xl capitalize">
                      {c.title}
                      <div className="md:hidden flex gap-2 pointer-events-auto">
                        {/* {c.gallery?.slug && arrows} */}
                        {arrows}
                      </div>
                    </p>
                    <p className="line-clamp clamp-2 text-sm md:text-base h-[fit-content]">
                      {c.description}
                    </p>

                    <div className="flex flex-col-reverse md:gap-4 w-max md:w-full">
                      <div className="flex gap-4 md:gap-2 md:flex-col justify-between whitespace-nowrap">
                        <Link href={`/${data.slug}/${c.slug}`}>
                          <a
                            className="w-[fit-content] pointer-events-auto"
                            onClick={() => SetModalOpen(false)}
                          >
                            <Button cls="w-[fit-content] select-auto">
                              See More
                            </Button>
                          </a>
                        </Link>
                        <div>{c.gallery?.slug && galleryButton(c)}</div>
                      </div>
                      <div className="grid text-xs pl-2 gap-y-1 my-1">
                        {isMobile
                          ? c.pricing.slice(0, 3).map((v) => <b key={v}>{v}</b>)
                          : c.pricing.map((v) => <b key={v}>{v} </b>)}
                      </div>
                    </div>
                  </div>
                  <div
                    className={`${
                      slide === i ? "visible delay-[1s]" : "invisible"
                    } hidden md:flex absolute bottom-0 right-0 justify-end text-5xl pointer-events-auto`}
                  >
                    {arrows}
                  </div>
                </div>

                <div
                  className={`${
                    slide === i
                      ? "scale-100 duration-1000 ease-out"
                      : "scale-x-0"
                  } transform absolute inset-0 origin-left z-20 w-[105%] pointer-events-none delay-[700ms]`}
                >
                  <div
                    className={`${
                      slide === i ? "scale-x-0 delay-[1.5s] " : "delay-300"
                    } absolute inset-0 duration-700 origin-right transform`}
                    style={{
                      backgroundColor: colors[BG(i)],
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-0 h-full w-full grid md:w-[70%] my-auto overflow-hidden">
          {data?.cakes?.map((c, i) => (
            <div
              key={c.title}
              className={`${
                i === slide ? "opacity-100" : "opacity-0 duration-500"
              }`}
            >
              <Image
                className={`${
                  slide === i
                    ? "opacity-100 delay-[1.3s] duration-1000"
                    : "opacity-0 duration-1000"
                }`}
                key={c.title}
                src={c.images[0].url}
                alt={c.images[0].fileName}
                layout="fill"
                objectFit="contain"
              />

              <div
                className={`${
                  slide === i ? "scale-100 duration-1000 ease-out" : "scale-x-0"
                } transform absolute inset-0 origin-left z-20 pointer-events-none delay-300`}
              >
                <div
                  className={`${
                    slide === i ? "scale-x-0 delay-[1.3s] " : "delay-300"
                  } absolute inset-0 duration-[0.75s] origin-right transform`}
                  style={{
                    backgroundColor:
                      colors[BG(i) + 1 >= COLORS ? 0 : BG(i) + 1],
                  }}
                />
              </div>
            </div>
          ))}
          <div className="z-50 pointer-events-auto absolute inset-0 mt-auto mx-auto h-[fit-content] w-[fit-content] duration-500 to-transparent group transform translate-y-3/4 hover:translate-y-0 hover:bg-black/50 ease-out">
            <div className="absolute inset-x-0 flex justify-center gap-2 pt-2 duration-300 group-hover:opacity-0">
              {data?.cakes?.map((c, i) => (
                <div
                  key={c.title}
                  className={`${
                    slide == i
                      ? "bg-gray-400 ring-gray-100"
                      : "bg-gray-100 ring-gray-400"
                  } w-3 h-3 duration-300  rounded-full ring-1`}
                />
              ))}
            </div>

            <div className="flex justify-center gap-2 p-2 duration-300 opacity-0 group-hover:opacity-100">
              {data?.cakes?.map((c, i) => (
                <div
                  key={c.title}
                  className={`${
                    slide === i && "ring-4 ring-offset-white"
                  } duration-300 opacity-0 group-hover:opacity-100 cursor-pointer h-24 w-24 relative`}
                  style={{ transitionDelay: `${(i + 1) * 100}ms` }}
                  onClick={() => setSlide(i)}
                >
                  <Image
                    key={c.title}
                    src={c.images[0].url}
                    alt={c.images[0].fileName}
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
