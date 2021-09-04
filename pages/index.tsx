import Home from "@pages/home";
import { getCategories } from "@lib/data";
import { GetStaticProps } from "next";
import { useRef } from "react";
import useGlobalContext from "@context/index";
import { LocomotiveScrollProvider } from "react-locomotive-scroll";
import Layout from "@layout/index";
import Head from "next/head";

export const getStaticProps: GetStaticProps = async () => {
  const data = await getCategories();

  return {
    props: { data },
    revalidate: 60 * 10,
  };
};

export default function IndexPage({ data }) {
  const containerRef = useRef(null);
  const { isMobile } = useGlobalContext();

  const pageTitle = "Quaver Sweet Temptations Home Page";
  const description = "Sweet treats to satisfy your cravings.";
  const previewImage =
    "https://scontent.fmnl6-1.fna.fbcdn.net/v/t1.6435-9/118780784_140037027785379_7124078365707026045_n.png?_nc_cat=107&ccb=1-5&_nc_sid=e3f864&_nc_ohc=Mp8cCxoNLtIAX_6X7Ja&_nc_ht=scontent.fmnl6-1.fna&oh=5e34e88edd4c9d17a3da877349797454&oe=6153A46D";

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
            <Home data={data} />
          </div>
        </Layout>
      </main>
    </LocomotiveScrollProvider>
  );
}
