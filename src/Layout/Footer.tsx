import Image from "next/image";
import ReCAPTCHA from "react-google-recaptcha";
import telephone from "@images/telephone.svg";
import email from "@images/email.svg";
import facebook from "@images/facebook.svg";
import Button from "@components/Button";
import useGlobalContext from "@context/index";
import { useRef, useState } from "react";
import { getInTouch } from "@static/index";

export default function Footer({ pathname }) {
  const { Darkenfooter } = useGlobalContext();
  const [darkenfooter] = Darkenfooter;
  const [emailResponse, setEmailResponse] = useState(null);
  const [sending, setSending] = useState(false);

  const reRef = useRef<ReCAPTCHA>();

  const handleSubmit = async (e) => {
    e.preventDefault();
    reRef.current.reset();
    setSending(true);
    setEmailResponse(null);

    const formData = {};

    Array.from(e.currentTarget.elements).forEach(({ name, value }) => {
      if (!name) return;
      formData[name] = value;
    });

    const token = await reRef.current.executeAsync();

    const res = await fetch(`/api/mail`, {
      method: "post",
      body: JSON.stringify({ ...formData, token }),
    });

    // const res = await fetch(`/api/mail`, {
    //   method: "post",
    //   body: JSON.stringify({ ...formData }),
    // });

    const data = await res.json();

    setEmailResponse(data);
    setSending(data.loading);

    // console.log(data);
  };

  const horizontal = pathname === "/gallery/[slug]" || pathname === "/[cakes]";

  return (
    <div
      data-scroll-section
      data-scroll
      data-scroll-repeat
      data-scroll-offset="80%"
      data-scroll-call={"contact"}
      className={`${
        horizontal ? "py-24 md:py-0" : "py-24"
      } bg-[#EBE6F9] w-screen min-h-screen text-center relative`}
    >
      <div
        id="contact"
        className={`inset-0 absolute bg-black duration-1000 z-30 pointer-events-none ${
          darkenfooter ? "bg-opacity-70" : "bg-opacity-0"
        }`}
      />
      <div
        data-scroll
        data-scroll-repeat
        data-scroll-class="show-contact"
        className="mb-4"
      >
        <svg
          viewBox="0 0 370.6 96.3"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-24 lg:h-[10vw] p-2"
        >
          <g
            strokeLinecap="round"
            fillRule="evenodd"
            fill="none"
            style={{
              strokeWidth: "0.4mm",
            }}
            className="path"
          >
            {getInTouch}
          </g>
        </svg>
      </div>

      <div
        className={`${
          horizontal ? "grid sm:flex-row-reverse sm:flex" : "grid sm:flex"
        }  gap-8 `}
      >
        <div className="sm:w-1/2 w-full h-[80vw] sm:h-auto grid px-8">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d61855.975247821334!2d120.93038341575559!3d14.311522555211136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397d5b87c111e25%3A0xab8cb698f840321f!2sDasmari%C3%B1as%2C%20Cavite%2C%20Pilipinas!5e0!3m2!1sfil!2sus!4v1625898201984!5m2!1sfil!2sus"
            loading="lazy"
            className="h-full w-full"
            title="our location"
          ></iframe>
        </div>

        <div className="sm:w-1/2 w-full flex flex-col justify-around items-center px-[5vw]">
          <p className="mb-4 whitespace-normal">
            To get your personalized cakes, you can contact in the following
            ways.
          </p>
          <div className="flex gap-[10vw] mb-4">
            <a href="tel:+639164477530" title="Call Us!">
              <Image
                src={telephone}
                alt="telephone"
                height="50px"
                width="50px"
              />
            </a>
            <Image
              onClick={() => window.open("mailto:quaverst.2020@gmail.com")}
              src={email}
              alt="email"
              height="50px"
              width="50px"
              className="cursor-pointer"
              title="Email Us!"
            />
            <a
              href="https://www.facebook.com/QuaverSweetTemptations/"
              target="_blank"
              rel="noreferrer"
              title="Visit our Facebook Page!"
            >
              <Image src={facebook} alt="facebook" height="50px" width="50px" />
            </a>
          </div>

          <div className="flex w-full my-3">
            <hr className="w-full border-t-2" />{" "}
            <span className="mx-2 text-sm font-bold text-gray-400 transform -translate-y-1/2">
              OR
            </span>
            <hr className="w-full border-t-2" />
          </div>

          <form onSubmit={handleSubmit} className="grid w-full gap-4 relative">
            <input
              name="email"
              type="email"
              placeholder="Email address*"
              maxLength={30}
              required
            />
            <input
              name="name"
              type="text"
              placeholder="Your name*"
              maxLength={30}
              required
            />
            <textarea
              className="resize-none"
              name="message"
              cols={30}
              placeholder="Message*"
              rows={5}
              required
              minLength={20}
            />

            <Button
              disabled={sending || emailResponse?.message}
              cls={`${
                emailResponse?.message === "Message Sent!"
                  ? "bg-green-400"
                  : sending
                  ? "bg-gray-400"
                  : "bg-secondary"
              } ${
                emailResponse?.message && "cursor-default"
              } relative duration-500 font-semibold tracking-wide text-xl py-2`}
            >
              <p
                className={`${
                  (emailResponse?.message || sending) &&
                  "-translate-x-1/4 opacity-0"
                } duration-500 transform`}
              >
                Send
              </p>
              <p
                className={`${
                  !sending && "translate-y-full opacity-0"
                } duration-500 transform absolute inset-0 m-auto h-[fit-content]`}
              >
                Sending...
              </p>
              <p
                className={`${
                  !emailResponse?.message && "translate-x-1/4 opacity-0"
                } duration-500 transform absolute inset-0 m-auto h-[fit-content]`}
              >
                {emailResponse?.message}
              </p>
            </Button>

            {emailResponse?.errorMessage && (
              <p className="absolute bottom-0 transform translate-y-full text-red-500 font-black py-1 mt-2 w-full">
                ⚠️ {emailResponse?.errorMessage}
              </p>
            )}
          </form>
          <ReCAPTCHA
            ref={reRef}
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
            size="invisible"
          />
        </div>
      </div>

      <p className="mt-8 mb-2">© QuaverSweetTemptations 2021</p>
    </div>
  );
}
