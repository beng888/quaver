/* eslint-disable @next/next/no-html-link-for-pages */

import Image from "next/image";
import logoAlt from "@images/logo-alt.svg";
import useGlobalContext from "@context/index";
import { useLocomotiveScroll } from "react-locomotive-scroll";
import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Navbar() {
  const { scroll } = useLocomotiveScroll();
  const { navBG, navMarker } = useGlobalContext();
  const router = useRouter();
  const { pathname } = router;
  const [navBG_val] = navBG;
  const [navMarker_val] = navMarker;

  const refs = useRef(new Array(3));
  const marker = useRef(null);

  const marks = {
    start: refs.current[0],
    cakes: refs.current[1],
    about: refs.current[2],
    contact: refs.current[3],
  };

  useEffect(() => {
    marker.current.style.left = `${refs.current[0].offsetLeft}px`;
    marker.current.style.width = `${refs.current[0].offsetWidth}px`;
    marker.current.style.backgroundColor = `#E85A8A`;
  }, []);

  useEffect(() => {
    marker.current.style.left = `${marks[navMarker_val]?.offsetLeft}px`;
    marker.current.style.width = `${marks[navMarker_val]?.offsetWidth}px`;
  }, [navMarker_val]);

  const links = [
    {
      label: "Home",
      id: "start",
    },
    {
      label: "Menus",
      id: "cakes",
    },
    {
      label: "About Us",
      id: "about",
    },
    {
      label: "Contact",
      id: "contact",
    },
  ];

  return (
    <nav className="fixed z-50 w-screen">
      <div className="h-24 relative w-full flex items-center pb-4 justify-between px-[2vw] font-bold text-xl tracking-wider text-primary gap-24">
        <div
          className={`${
            navBG_val ? "opacity-30" : "opacity-0"
          } duration-1000 absolute inset-0  bg-gradient-to-b from-purple-400 via-purple-400`}
        />

        <div className="flex items-center w-full justify-between gap-[5vw] z-50">
          <Link href="/">
            <a className="relative h-24 w-44">
              <Image
                src={logoAlt}
                alt="logo-alt"
                layout="fill"
                objectFit="contain"
              />
            </a>
          </Link>

          <div
            ref={marker}
            className="absolute hidden h-1 duration-1000 transform translate-y-4 md:block"
          />

          <ul className="w-full gap-[3vw] justify-between hidden md:flex">
            {links.map((n, i) => (
              <li
                key={n.id}
                ref={(el) => (refs.current[i] = el)}
                className={`cursor-pointer ${
                  i === links.length - 1 && "ml-auto"
                } ${pathname === "/[cakes]" && i === 2 && "hidden"}`}
                onClick={() => scroll.scrollTo(`#${n.id}`)}
                style={{ textShadow: "0px 0px 3px rgba(0,0,0,0.8)" }}
              >
                {n.label}
              </li>
            ))}
          </ul>

          <div
            tabIndex={0}
            className="absolute p-3 overflow-hidden duration-700 transform bg-white shadow-lg md:hidden bg-opacity-70 rounded-3xl right-4 group focus:translate-y-24"
          >
            <svg
              viewBox="0 0 100 100"
              width="30"
              height="30"
              className="ml-auto cursor-pointer group-focus:hidden"
            >
              <g className="fill-current">
                <rect y="10" width="100" height="15" rx="5"></rect>
                <rect y="40" width="100" height="15" rx="5"></rect>
                <rect y="70" width="100" height="15" rx="5"></rect>
              </g>
            </svg>
            <ul className="whitespace-nowrap grid gap-[3vw] max-h-0 max-w-0 group-focus:max-h-96 group-focus:max-w-max overflow-hidden group-focus:duration-[2s]">
              {links.map((n, i) => (
                <li
                  key={n.id}
                  className={`delay-${i * 100} ${
                    navMarker_val === n.id && "text-secondary"
                  } cursor-pointer transform translate-x-1/2 opacity-0 group-focus:opacity-100 group-focus:translate-x-0 duration-300 ${
                    pathname === "/[cakes]" && i === 2 && "hidden"
                  }`}
                  onClick={() => scroll.scrollTo(`#${n.id}`)}
                >
                  {n.label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
