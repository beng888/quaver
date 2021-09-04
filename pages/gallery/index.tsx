import { getGalleries } from "@lib/data";
import { IGalleries } from "@lib/interfaces";
import { GetStaticProps } from "next";
import React, { useRef } from "react";
import Galleries from "@pages/galleries/index";
import Head from "next/head";
import Layout from "@layout/index";
import useGlobalContext from "@context/index";
import { LocomotiveScrollProvider } from "react-locomotive-scroll";

export const getStaticProps: GetStaticProps = async () => {
  const { galleries }: IGalleries = await getGalleries();

  return {
    props: { galleries },
  };
};

export default function Gallery({ galleries }) {
  const containerRef = useRef(null);
  const { isMobile } = useGlobalContext();

  const pageTitle = "Quaver Sweet Temptations Gallery Page";
  const description = "Sweet treats to satisfy your cravings.";
  const previewImage =
    "https://quaver-ph.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fimage%2Fpublic%2Fimages%2Fabout-pic.a5610c8fc527bf7d425c4f13cebe5616.png&w=1920&q=75";

  return (
    <LocomotiveScrollProvider
      options={{
        smooth: !isMobile && true,
        tablet: {
          smooth: !isMobile && true,
          breakpoint: 768,
        },
      }}
      watch={[]}
      containerRef={containerRef}
    >
      <main data-scroll-container ref={containerRef}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
          <meta name="description" content={description} />
          <meta property="og:type" content="website" />
          <meta
            property="og:url"
            content="https://quaver-chi.vercel.app/gallery"
          />
          <meta property="og:title" content={pageTitle} key="ogtitle" />
          <meta property="og:image" content={previewImage} key="ogimage" />
          <meta property="og:description" content={description} key="ogdesc" />
          <title>{pageTitle}</title>
        </Head>
        <Layout>
          <div data-scroll-section>
            <Galleries galleries={galleries} />
          </div>
        </Layout>
      </main>
    </LocomotiveScrollProvider>
  );
}
