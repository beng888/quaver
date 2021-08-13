import React from "react";
import Button from "../src/components/Button";
import Link from "next/link";

export default function Error() {
  return (
    <div className="h-screen w-screen bg-pink-50 grid place-content-center text-center px-8">
      <p className="font-serif text-8xl sm:text-[12vw] font-bold">500</p>
      <p className="sm:text-[2vw] mb-4">
        Sorry, This wasn&apos;t supposed to happen
      </p>
      <Link href="/">
        <a>
          <Button>Go to Homepage</Button>
        </a>
      </Link>
    </div>
  );
}
