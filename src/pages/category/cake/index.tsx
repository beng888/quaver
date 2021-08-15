import React, { useEffect, useState } from "react";
import Image from "next/image";
import useGlobalContext from "@context/index";
import { cakeSlice } from "@static/index";
import { useLocomotiveScroll } from "react-locomotive-scroll";

export default function Cake({ data }) {
  const { scroll } = useLocomotiveScroll();
  const { colors } = useGlobalContext();
  const [color] = useState(colors[Math.floor(Math.random() * colors?.length)]);
  const [inView, setInView] = useState(null);

  // console.log(data);

  const shuffled = data.category.cakes.sort(() => 0.5 - Math.random());

  useEffect(() => {
    scroll?.on("call", (i) => {
      setInView(`#cake-${i}`);
    });
  }, [scroll]);

  const handleClick = (i) => {
    scroll.scrollTo(`#cake-${i}`, {
      duration: 500,
    });
  };

  return (
    <div className="min-h-screen">
      <div className="grid md:grid-cols-2">
        {/* <div className="fixed h-screen w-screen grid place-content-center pointer-events-none">
          <div className="grid">asd</div>
        </div> */}
        <div
          className="flex flex-nowrap w-full h-full md:block max-w-[100vw] relative overflow-x-auto pink-scroll"
          // data-scroll
          // data-scroll-class="show"
          // className="transform translate-y-[100vh] duration-[1.2s] ease-out"
        >
          {data.images.map((v, i) => (
            <div
              data-scroll
              data-scroll-repeat
              data-scroll-call={i}
              data-scroll-offset="60%,60%"
              id={`cake-${i}`}
              key={v.fileName}
              className="relative max-h-screen md-h-screen h-[85vw] min-w-[85vw] md:min-w-full md:w-full border border-red-400"
            >
              <Image
                src={v.url}
                alt={v.fileName}
                layout="fill"
                objectFit="contain"
              />
            </div>
          ))}
        </div>
        <div id="target">
          <div
            data-scroll
            data-scroll-sticky
            className="h-[fit-content] md:h-screen grid place-content-center p-8 sticky top-0"
            data-scroll-target="#target"
          >
            <div>
              <p
                style={{
                  color: color,
                  textShadow: "1px 1px 3px rgba(0,0,0,0.4)",
                }}
                className="text-4xl"
              >
                {data.title}
              </p>
              <div
                style={{ borderColor: color }}
                className="h-1 border-b-2 my-1 shadow"
              />
              <div className="flex gap-4 items-center my-6">
                <div>
                  <p className="text-xs font-bold">Starts at</p>
                  <p className="text-4xl">₱{data.price}</p>
                </div>
                <p className="max-w-[48ch] text-sm">{data.description}</p>
              </div>
              <div className="flex gap-2">
                {data.images.map((v, i) => (
                  <p
                    key={v.fileName}
                    onClick={() => handleClick(i)}
                    style={{
                      color: `#cake-${i}` === inView ? "#EA749C" : "#DCC076",
                    }}
                  >
                    {cakeSlice}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-[fit-content] md:h-screen flex flex-col justify-evenly pb-20">
        <p className="pl-[4vw] text-xl md:text-4xl font-bold py-8">
          YOU MIGHT ALSO LIKE...
        </p>
        <div className="flex flex-nowrap items-center text-center md:justify-evenly h-max overflow-x-auto pink-scroll">
          {shuffled.slice(0, 3).map((v) => (
            <div
              key={v.slug}
              className="relative md:min-w-0 max-w-[60vw] w-full"
            >
              <div className="relative h-full w-full min-h-[60vw] md:min-h-[25vw] md:min-w-0">
                <Image
                  src={v.images[0]?.url}
                  alt={v.images[0]?.fileName}
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <div className="my-2 w-full">
                <p className="text-xl px-12 truncate max-w-full">{v.title}</p>
                <p>from ₱{v.price}.00</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
