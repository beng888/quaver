import Home from "@pages/home";
import { getCategories, getGalleries } from "@lib/data";
import { GetStaticProps } from "next";
import { useRef } from "react";
import useGlobalContext from "@context/index";
import { LocomotiveScrollProvider } from "react-locomotive-scroll";
import Layout from "@layout/index";
import Head from "next/head";
import { IGalleries } from "@lib/interfaces";

export const getStaticProps: GetStaticProps = async () => {
  const data = await getCategories();
  const galleries: IGalleries = await getGalleries();

  return {
    props: { data, galleries: galleries?.galleries },
  };
};

export default function IndexPage({ data, galleries }) {
  const containerRef = useRef(null);
  const { isMobile } = useGlobalContext();

  const pageTitle = "Quaver Sweet Temptations Home Page";
  const description = "Sweet treats to satisfy your cravings.";
  const previewImage =
    "https://www.facebook.com/QuaverSweetTemptations/photos/a.140037091118706/140037024452046";

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
          <meta property="og:url" content="https://quaver-chi.vercel.app/" />
          <meta property="og:title" content={pageTitle} key="ogtitle" />
          <meta property="og:image" content={previewImage} key="ogimage" />
          <meta property="og:description" content={description} key="ogdesc" />
          <title>{pageTitle}</title>
        </Head>
        <Layout>
          <div data-scroll-section>
            <Home data={data} galleries={galleries} />
          </div>
        </Layout>
      </main>
    </LocomotiveScrollProvider>
  );
}
