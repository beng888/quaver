import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Item from "./Item";

export default function Gallery({ data }) {
  const divRef = useRef(null);
  const containerRef = useRef(null);

  // const Grid = ({ d, i }) => (
  //   <div
  //     data-scroll
  //     data-scroll-speed={Math.random() * (3 + 1)}
  //     key={d.fileName}
  //     className={`h-full w-full relative ${gridSpan[i]} min-w-[150px] transform scale-y-0 origin-left`}
  //   >
  //     <Image src={d.url} alt={d.fileName} layout="fill" objectFit="contain" />

  //     {/* <p
  //       className="text-5xl font-black absolute inset-0 grid place-content-center text-gray-200"
  //       style={{ textShadow: "2px 2px 2px rgba(0,0,0,0.9)" }}
  //     >
  //       {i}
  //     </p> */}
  //   </div>
  // );

  useEffect(() => {
    divRef.current.style.fontSize = `${
      document.getElementById("gallery-container")?.clientWidth / 10
    }px`;

    setTimeout(() => {
      divRef.current.style.fontSize = `${
        document.getElementById("gallery-container")?.clientWidth / 10
      }px`;
    }, 1);

    setTimeout(() => {
      containerRef.current.style.maxWidth = `${
        document.getElementById("gallery-container")?.clientWidth
      }px`;
    }, 2000);
  });

  const shuffled = data.images.sort(() => 0.5 - Math.random());

  return (
    <div
      ref={containerRef}
      id="gallery-container"
      className="min-w-[100vw] w-full h-screen flex gap-[4vw] pt-16 overflow-hidden px-[12vw] relative"
    >
      {/* <svg className="absolute inset-0 w-full h-full" viewBox="0 0 70 70">
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle">
          {data.title}
        </text>
      </svg> */}
      <div
        ref={divRef}
        className="absolute inset-0 w-full h-full grid place-content-center pointer-events-none select-none"
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
        {shuffled.slice(43, 70).map((d, i) => (
          <Item key={d.fileName} d={d} i={i} />
        ))}
      </div>
    </div>
  );
}
