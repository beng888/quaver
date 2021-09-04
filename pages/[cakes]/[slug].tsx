import { useRef } from "react";
import { getCategories, getCake, getAllCakes } from "@lib/data";
import { GetStaticProps, GetStaticPaths } from "next";
import Cake from "@pages/category/cake";
import useGlobalContext from "@context/index";
import { ICake } from "@lib/interfaces";
import { LocomotiveScrollProvider } from "react-locomotive-scroll";
import Layout from "@layout/index";
import Head from "next/head";

export default function CAKE({ cake }: { cake: ICake }) {
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
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
          <meta name="description" content={cake.description}></meta>
          <meta property="og:title" content={cake.title} key="ogtitle" />

          <meta
            property="og:description"
            content={cake.description}
            key="ogdesc"
          />
          <title>{cake.title}</title>
          <meta
            property="og:image"
            content={cake.images?.[0].url}
            key="ogimage"
          />
        </Head>
        <Layout>
          <div data-scroll-section>
            <Cake data={cake} />
          </div>
        </Layout>
      </main>
    </LocomotiveScrollProvider>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params.slug as string;

  const data: { cake: ICake | null } = await getCake(slug);

  if (!data.cake) {
    return {
      notFound: true,
    };
  }

  return {
    props: { cake: { ...data.cake } },
    // revalidate: 60 * 60 * 24,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { categories } = await getCategories();
  const { cakes } = await getAllCakes();

  return {
    paths: categories
      .map((category) =>
        cakes.map((cake) => ({
          params: { cakes: category.slug, slug: cake.slug },
        }))
      )
      .flat(),
    fallback: "blocking",
  };
};
