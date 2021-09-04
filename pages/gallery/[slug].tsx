import { getGalleries, getGallery } from "@lib/data";
import { IGallery } from "@lib/interfaces";
import { GetStaticProps, GetStaticPaths } from "next";
import Head from "next/head";
import Gallery from "@pages/galleries/gallery";

import React, { useRef } from "react";
import Layout from "@layout/index";
import { LocomotiveScrollProvider } from "react-locomotive-scroll";
import useGlobalContext from "@context/index";

export default function GalleryPage({ gallery }: { gallery: IGallery }) {
  const containerRef = useRef(null);
  const { isMobile } = useGlobalContext();

  return (
    <LocomotiveScrollProvider
      options={{
        smooth: !isMobile && true,
        direction: "horizontal",
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
          <meta property="og:title" content={gallery.title} key="ogtitle" />
          <meta
            property="og:image"
            content={gallery?.cake?.category?.image?.url}
            key="ogimage"
          />

          <title>{gallery.title}</title>
        </Head>
        <Layout>
          <div data-scroll-section>
            <Gallery data={gallery} />
          </div>
        </Layout>
      </main>
    </LocomotiveScrollProvider>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params.slug as string;

  const data: { gallery: IGallery | null } = await getGallery(slug);

  if (!data.gallery) {
    return {
      notFound: true,
    };
  }

  return {
    props: { gallery: { ...data.gallery } },
    revalidate: 60 * 10,
    // revalidate: 60 * 60 * 24,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { galleries } = await getGalleries();

  return {
    paths: galleries.map((g) => ({ params: { slug: g.slug } })),
    fallback: "blocking",
  };
};
