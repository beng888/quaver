import Image from "next/image";
import useGlobalContext from "@context/index";
import React, { useState } from "react";
import Button from "@components/Button";
import Arrow from "@lib/icons/Arrow";
import Link from "next/link";

export default function Carousel({ data }) {
  const { colors } = useGlobalContext();

  const [slide, setSlide] = useState(0);
  const slides = data?.cakes?.length;
  const COLORS = colors?.length;

  const BG = (i) => Math.round(((i + 1) / slides) * (COLORS - 1));

  console.log("%c⧭", "color: #997326", data);

  return (
    <div className="grid h-full grid-cols-7">
      <div className="z-10 flex flex-col justify-center col-span-2">
        <div className="relative w-[140%] h-1/2 my-auto z-10">
          {data?.cakes?.map((c, i) => (
            <div
              key={c.title}
              className={`${
                i === slide ? "opacity-100" : "opacity-0 duration-1000"
              }`}
            >
              <div
                className={`${
                  slide === i
                    ? "z-10  opacity-100 delay-[2.25s]"
                    : "opacity-0 duration-1000"
                }  absolute flex flex-col justify-between w-full h-full p-[2vw] pb-4 text-left bg-white
                  before:absolute before:inset-y-0 before:bg-red-700 before:w-2 before:left-0`}
              >
                <div className="grid gap-4">
                  <p className="text-2xl capitalize">
                    {c.title} {i}
                  </p>
                  <p className="line-clamp-3"> {c.description}</p>

                  <Link href={`/${data.slug}/${c.slug}`}>
                    <a>
                      <Button cls="w-[fit-content]">See More</Button>
                    </a>
                  </Link>
                </div>
                <b>From ₱ {c.price}.00</b>
                <div
                  className={`${
                    slide === i ? "visible delay-[1s]" : "invisible"
                  } absolute bottom-0 right-0 flex justify-end text-5xl`}
                >
                  <Arrow
                    stroke="white"
                    strokeWidth={7}
                    className="w-16 h-16 p-3 transform rotate-180 bg-[#B8CAD5]"
                    onClick={() => setSlide(slide > 0 ? slide - 1 : slides - 1)}
                  />
                  <Arrow
                    stroke="white"
                    strokeWidth={7}
                    className="w-16 h-16 p-3 bg-[#B8CAD5]"
                    onClick={() => setSlide(slide < slides - 1 ? slide + 1 : 0)}
                  />
                </div>
              </div>
              {/* <div
                className={`${
                  slide === i
                    ? "scale-100 after:scale-x-0 after:delay-[2.25s] duration-1000 ease-out after:ease-out"
                    : "scale-x-0 after:delay-1000"
                } transform absolute inset-0 origin-left z-20 pointer-events-none delay-[1.25s]
                    after:absolute after:inset-0 after:bg-[#90A4B0] after:duration-[0.75s]  after:origin-right`}
              /> */}

              <div
                className={`${
                  slide === i ? "scale-100 duration-1000 ease-out" : "scale-x-0"
                } transform absolute inset-0 origin-left z-20 pointer-events-none delay-[1.25s]`}
              >
                <div
                  className={`${
                    slide === i
                      ? "scale-x-0 delay-[2.25s] ease-out"
                      : "delay-1000 "
                  } absolute inset-0 duration-[0.75s] origin-right transform`}
                  style={{
                    backgroundColor: colors[BG(i)],
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-0 h-full col-span-5 my-auto overflow-hidden">
        {data?.cakes?.map((c, i) => (
          <div
            key={c.title}
            className={`${
              i === slide ? "opacity-100" : "opacity-0 duration-1000"
            }`}
          >
            <Image
              className={`${
                slide === i
                  ? "opacity-100 delay-[2s]"
                  : "opacity-0 duration-1000"
              }`}
              key={c.title}
              src={c.images[0].url}
              alt={c.images[0].fileName}
              layout="fill"
              objectFit="contain"
            />
            {/* <div
              className={`${
                slide === i
                  ? "scale-100 after:scale-x-0 after:delay-[2s] duration-1000 ease-out after:ease-out"
                  : "scale-x-0 after:delay-1000"
              } transform absolute inset-0 origin-left z-20 pointer-events-none delay-1000
                    after:absolute after:inset-0 after:bg-[pink] after:duration-1000 after:origin-right`}
            /> */}

            <div
              className={`${
                slide === i ? "scale-100 duration-1000 ease-out" : "scale-x-0"
              } transform absolute inset-0 origin-left z-20 pointer-events-none delay-1000`}
            >
              <div
                className={`${
                  slide === i ? "scale-x-0 delay-[2s] ease-out" : "delay-1000"
                } absolute inset-0 duration-[0.75s] origin-right transform`}
                style={{
                  backgroundColor: colors[BG(i) + 1 >= COLORS ? 0 : BG(i) + 1],
                }}
              />
            </div>
          </div>
        ))}
        <div className="z-50 absolute inset-0 mt-auto mx-auto h-[fit-content] w-[fit-content] duration-500 to-transparent group transform translate-y-3/4 hover:translate-y-0 hover:bg-black/50 ease-out">
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
                />
              </div>
            ))}{" "}
          </div>
        </div>
      </div>
    </div>
  );
}
