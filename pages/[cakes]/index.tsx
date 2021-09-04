import { useRef } from "react";
import Category from "@pages/category";
import { getCategories, getCakes } from "@lib/data";
import { GetStaticProps, GetStaticPaths } from "next";
import useGlobalContext from "@context/index";
import { ICategory } from "@lib/interfaces";
import { LocomotiveScrollProvider } from "react-locomotive-scroll";
import Layout from "@layout/index";
import Head from "next/head";

export default function Cakes({ category }: { category: ICategory }) {
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
          <meta name="description" content={category.description}></meta>
          <meta property="og:title" content={category.title} key="ogtitle" />
          <meta
            property="og:description"
            content={category.description}
            key="ogdesc"
          />
          <title>{category.title}</title>
          <meta
            property="og:image"
            content={category.image.url}
            key="ogimage"
          />
        </Head>
        <Layout>
          <div data-scroll-section>
            <Category data={category} />
          </div>
        </Layout>
      </main>
    </LocomotiveScrollProvider>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params.cakes as string;

  const data: { category: ICategory | null } = await getCakes(slug);

  if (!data.category) {
    return {
      notFound: true,
    };
  }

  return {
    props: { category: { ...data.category } },
    revalidate: 60,
    // revalidate: 60 * 60 * 24,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await getCategories();

  return {
    paths: data.categories.map((c) => ({ params: { cakes: c.slug } })),
    fallback: "blocking",
  };
};
