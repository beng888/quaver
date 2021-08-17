import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import useGlobalContext from "@context/index";
import { cakeSlice } from "@static/index";
import { useLocomotiveScroll } from "react-locomotive-scroll";
import Link from "next/link";
import Icon from "@lib/icons";
import { splitText } from "@helpers/index";

export default function Cake({ data }) {
  const { scroll } = useLocomotiveScroll();
  const { colors } = useGlobalContext();
  const [color] = useState(colors[Math.floor(Math.random() * colors?.length)]);
  const [inView, setInView] = useState(null);

  const [hoveredImg, setHoveredImg] = useState(null);

  useEffect(() => {
    scroll?.scrollTo("#top");
  }, [data]);

  const shuffled = data.category.cakes
    .filter((c) => c.title !== data.title)
    .sort(() => 0.5 - Math.random());

  const { current: recommended } = useRef(
    data.category.cakes
      .filter((c) => c.title !== data.title)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
  );

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
      <div id="top" />
      <div className="grid md:grid-cols-2">
        <div
          className="flex flex-nowrap w-full h-full md:block max-w-[100vw] relative overflow-x-auto pink-scroll md:transform md:-translate-x-full opacity-0 duration-[1.5s] ease-out"
          data-scroll
          data-scroll-class="show"
        >
          {data.images.map((v, i) => (
            <div
              data-scroll
              data-scroll-repeat
              data-scroll-call={i}
              data-scroll-offset="60%,60%"
              id={`cake-${i}`}
              key={v.fileName}
              className="relative max-h-screen md-h-screen h-[85vw] min-w-[85vw] md:min-w-full md:w-full"
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
            <Link href="/">
              <a>
                <div
                  className="absolute top-[0.5vw] right-[1vw] h-12 w-12 svg-shadow"
                  style={{
                    color: color,
                  }}
                >
                  <Icon type="home" />
                </div>{" "}
              </a>
            </Link>
            <div>
              <p
                style={{
                  color: color,
                  textShadow: "1px 1px 3px rgba(0,0,0,0.4)",
                }}
                className="fade text-4xl"
                data-scroll
                data-scroll-class="show-fade"
              >
                {splitText(data.title)}
              </p>
              <div
                data-scroll
                data-scroll-class="show"
                style={{ borderColor: color }}
                className="h-1 border-b-2 my-1 shadow duration-[2s] transform scale-x-[0.01] origin-left"
              />
              <div
                data-scroll
                data-scroll-class="show"
                className="flex gap-4 items-center my-6 transform -translate-x-24 opacity-0 duration-1000 delay-300"
              >
                <div>
                  <p className="text-xs font-bold">Starts at</p>
                  <p className="text-4xl">₱{data.price}</p>
                </div>
                <p className="max-w-[48ch] text-sm">{data.description}</p>
              </div>
              <div
                data-scroll
                data-scroll-class="show"
                className="gap-2 hidden md:flex transform -translate-x-24 opacity-0 duration-1000 delay-[600ms]"
              >
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

              <div
                data-scroll
                data-scroll-class="show"
                className="flex border-t-2 w-max gap-12 mt-8 pt-4 svg-shadow transform -translate-x-24 opacity-0 duration-1000 delay-[900ms]"
                style={{
                  color: color,
                  borderColor: color,
                }}
              >
                <div
                  onClick={() => (window.location.href = "tel:5554280940")}
                  title="Call Us!"
                  className="h-10 w-10"
                >
                  <Icon type="phone" />
                </div>
                <div
                  title="Email Us!"
                  onClick={() => window.open("mailto:lawrenceardosa@gmail.com")}
                  className="h-10 w-10"
                >
                  <Icon type="mail" />
                </div>
                <div
                  onClick={() =>
                    window.open(
                      "https://www.facebook.com/QuaverSweetTemptations/photos/?ref=page_internal",
                      "_blank"
                    )
                  }
                  className="h-10 w-10"
                >
                  <Icon type="fb" />
                </div>
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
          {recommended?.map((v, i) => (
            <div
              key={v.slug}
              className="relative md:min-w-0 max-w-[60vw] w-full"
            >
              <div
                onMouseEnter={() => setHoveredImg(i)}
                onMouseLeave={() => setHoveredImg(null)}
                className="relative cursor-pointer mx-auto min-h-[60vw] min-w-[60vw] md:h-full md:w-[25vw] w-full md:min-h-[25vw] md:min-w-0"
              >
                <Link href={`/${data.category.slug}/${v.slug}`}>
                  <a>
                    <Image
                      src={
                        hoveredImg === i ? v.images[1]?.url : v.images[0]?.url
                      }
                      alt={v.images[0]?.fileName}
                      layout="fill"
                      objectFit="contain"
                    />
                  </a>
                </Link>
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
