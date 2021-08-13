import React, { useEffect, useState } from "react";
import Carousel from "@components/carousel";
import useGlobalContext from "@context/index";
import { useRouter } from "next/router";
import { getCakes } from "@lib/data";
import { ICategory } from "@lib/interfaces";
import { splitText } from "@helpers/index";
import Link from "next/link";
import Baking from "@images/baking.gif";
import Image from "next/image";
import logo from "@images/logo.png";
import { cupcake_logo } from "@static/index";

export default function Modal() {
  const { modalOpen, colors } = useGlobalContext();
  const [ValModalOpen, SetModalOpen] = modalOpen;
  const [isLoading, setIsLoading] = useState(true);
  const [color, setColor] = useState(null);
  const [data, setData] = useState(null);
  const router = useRouter();

  const slug = router.query.slug as string;

  useEffect(() => {
    if (slug)
      (async () => {
        const data: { category: ICategory | null } = await getCakes(slug);
        setColor(colors[Math.floor(Math.random() * 5)]);

        setTimeout(() => {
          setIsLoading(false);
        }, 3000);

        return setData(data.category);
      })();
  }, [slug, colors]);

  const OK = data?.cakes?.length > 0;

  return (
    <div
      className={`${
        ValModalOpen ? "visible" : "invisible opacity-0"
      } inset-0 flex bg-black/70 items-center duration-1000 justify-center fixed z-50`}
    >
      <Link href="/">
        <a
          className={`h-12 w-12 bg-tertiary absolute top-[2vw] right-[2vw] rounded-full cursor-pointer z-50`}
          onClick={() => {
            SetModalOpen(false);
            setData(null);
          }}
        >
          <svg viewBox="0 0 100 100">
            <path
              stroke="white"
              strokeWidth="5px"
              fill="none"
              d="M75 75 L25 25"
            />
            <path
              stroke="white"
              strokeWidth="5px"
              fill="none"
              d="M75 25 L25 75"
            />
          </svg>
        </a>
      </Link>

      {slug && (
        <div
          className={`${!isLoading && OK && "opacity-0 duration-1000"} ${
            !ValModalOpen && "opacity-0"
          } inset-0 absolute grid place-content-center pointer-events-none`}
        >
          {cupcake_logo(color)}

          <div className="waving text-center font-black tracking-widest font-serif text-5xl">
            {splitText("Loading...", 200, true)}
            {/* {Array.from("Loading...").map((v, i) => (
              <span
                key={i}
                style={{
                  ["--delay" as any]: `${i * 200}ms`,
                  color: colors[Math.floor(Math.random() * 5)],
                }}
              >
                {v}
              </span>
            ))} */}
          </div>
        </div>
      )}

      <div
        className={`${
          !isLoading && OK
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } duration-1000 transform relative z-20 w-full h-[95%]`}
      >
        {slug && <Carousel data={data} />}
      </div>
    </div>
  );
}
