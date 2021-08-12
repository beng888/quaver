import React, { useState } from "react";
import Image from "next/image";
import useGlobalContext from "@context/index";

export default function Cake({ data }) {
  const { colors } = useGlobalContext();
  const [color] = useState(colors[Math.floor(Math.random() * colors?.length)]);

  console.log(data);

  const shuffled = data.category.cakes.sort(() => 0.5 - Math.random());

  return (
    <div className="min-h-screen">
      <div className="grid grid-cols-2 gap-[5vw]">
        {/* <div className="fixed h-screen w-screen grid place-content-center pointer-events-none">
          <div className="grid">asd</div>
        </div> */}
        <div
          data-scroll
          data-scroll-class="show"
          className="transform translate-y-[100vh] duration-[1.2s] ease-out"
        >
          {data.images.map((v) => (
            <div key={v.fileName} className="relative h-screen">
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
            className="h-screen grid place-content-center border border-red-400 px-8"
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
            </div>
          </div>
        </div>
      </div>

      <div className="h-screen flex flex-col justify-evenly pb-20">
        <p className="pl-[4vw] text-4xl font-bold">YOU MIGHT ALSO LIKE...</p>
        <div className="flex items-center text-center justify-evenly h-max">
          {shuffled.slice(0, 3).map((v) => (
            <div key={v.slug} className="relative h-[25vw] w-full">
              <div className="relative h-full w-full">
                <Image
                  src={v.images[0]?.url}
                  alt={v.images[0]?.fileName}
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <p className="text-xl px-12 mt-3 mb-1">{v.title}</p>
              <p>from ₱{v.price}.00</p>
            </div>
          ))}
        </div>{" "}
      </div>
    </div>
  );
}
