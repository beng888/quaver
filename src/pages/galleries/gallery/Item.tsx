import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import useOnScreen from "@lib/hooks/index";

export default function Item({ d, i }) {
  const ref = useRef(null);
  const [reveal, setReveal] = useState(false);
  const onScreen = useOnScreen(ref);

  useEffect(() => {
    if (onScreen) setReveal(onScreen);
  }, [onScreen]);

  const gridSpan = {
    0: "row-span-2",
    1: "row-start-4 col-span-2 row-span-3",
    2: "row-start-2 col-span-2 row-span-2",
    3: "row-start-4 row-span-3",
    4: "row-span-3",
    5: "row-start-4 col-start-4 row-span-2 col-span-2",
    6: "col-start-5 col-span-2 row-span-3",
    7: "col-start-6 row-start-4 row-span-3",
    8: "col-start-7 row-span-2 col-span-2",
    9: "col-start-7 row-span-4",
    10: "col-start-8 row-span-2",
    11: "row-start-2 row-span-2 col-span-2",
    12: "row-span-3 col-span-3",
    13: "row-span-3 col-span-2",
    14: "row-span-3 col-span-2",
  };

  return (
    <div
      ref={ref}
      data-scroll
      data-scroll-speed={Math.random() * (3.5 + 1.5)}
      key={d.fileName}
      tabIndex={0}
      className={`h-full w-full relative ${gridSpan[i]} min-w-[150px] group cursor-pointer z-0 focus:z-50`}
    >
      <div className="h-full w-full absolute duration-[1.5s] ease-out group-focus:w-[350px] group-focus:h-[350px]">
        <div
          // data-scroll
          // data-scroll-class="show-clip-y"
          className="h-full w-full relative duration-[2s]"
          style={{
            clipPath: reveal ? "inset(0% 0% 0% 0%)" : "inset(0% 100% 0% 0%)",
            transitionTimingFunction: "cubic-bezier(0.77, 0, 0.175, 1)",
          }}
        >
          <Image
            src={d.url}
            alt={d.fileName}
            layout="fill"
            objectFit="contain"
          />
        </div>
      </div>
      {/* <p
        className="text-5xl font-black absolute inset-0 grid place-content-center text-gray-200"
        style={{ textShadow: "2px 2px 2px rgba(0,0,0,0.9)" }}
      >
        {i}
      </p> */}
    </div>
  );
}
