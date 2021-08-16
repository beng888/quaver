import Home from "@pages/home";
import { getCategories } from "@lib/data";
import { GetStaticProps } from "next";
import { useRef } from "react";
import useGlobalContext from "@context/index";
import { LocomotiveScrollProvider } from "react-locomotive-scroll";
import Layout from "@layout/index";

export const getStaticProps: GetStaticProps = async () => {
  const data = await getCategories();

  return {
    props: { data },
  };
};

export default function IndexPage({ data }) {
  const containerRef = useRef(null);
  const { isMobile } = useGlobalContext();

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
        <Layout>
          <div data-scroll-section>
            <Home data={data} />
          </div>
        </Layout>
      </main>
    </LocomotiveScrollProvider>
  );
}
